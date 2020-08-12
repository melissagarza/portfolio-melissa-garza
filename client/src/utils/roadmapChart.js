import * as d3 from 'd3';
import _ from 'underscore';
import moment from 'moment';

export const createRoadmapChart = () => {

  const widthSvg = 800;
  const heightSvg = 400;
  const margin = {
    top: 25,
    right: 25,
    bottom: 75,
    left: 25
  };
  const widthChart = widthSvg - margin.left - margin.right;
  const heightChart = heightSvg - margin.top - margin.bottom;
  const scaleColor = d3.scaleOrdinal(d3.schemePaired);

  const getDuration = (start, end) => {
    return moment.duration(moment(end).diff(moment(start)));
  };

  const getHalfDuration = (start, end) => {
    const dur = moment.duration(moment(end).diff(moment(start)));
    const halfMs = dur.asMilliseconds() / 2;
    return dur.subtract(halfMs, 'milliseconds');
  };

  const draw = (data = []) => {

    if (data.length < 0) {
      return;
    }

    let allStartEndDates = _.reduce(data, (memo, entry) => {
      memo.push(moment(entry.start, 'MM.DD.YYYY').utc());
      memo.push(moment(entry.end, 'MM.DD.YYYY').utc());
      return memo;
    }, []);

    allStartEndDates = allStartEndDates.sort((a, b) => a.diff(b));

    const startDate = allStartEndDates[0];
    const endDate = allStartEndDates.slice(-1)[0];
    const totalDuration = getDuration(startDate, endDate);

    const scaleX = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, widthChart]);

    const scaleY = d3.scaleLinear()
      .domain([0, totalDuration.asMilliseconds()])
      .range([heightChart, 0]);

    const axisXMonths = d3.axisBottom(scaleX)
      .tickFormat(d3.timeFormat(`%b '%y`))
      .tickSize(30);

    const axisXWeeks = d3.axisBottom(scaleX)
      .tickFormat('')
      .ticks(d3.timeWeek.every(1))
      .tickSize(20);

    const axisXDays = d3.axisBottom(scaleX)
      .tickFormat('')
      .ticks(d3.timeDay.every(1))
      .tickSize(10);

    const chartSvgWrapper = d3.select('.rbc-main')
      .append('div')
      .attr('class', 'rbc-svg-wrapper');

    chartSvgWrapper.append('h3')
      .attr('class', 'rbc-title')
      .text('Roadmap Bubble Chart');

    const chartSvg = chartSvgWrapper.append('svg')
      .attr('class', 'rbc-svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('viewBox', `0 0 ${widthSvg} ${heightSvg}`)
      .attr('preserveAspectRatio', 'none');

    const groupChart = chartSvg.append('g')
      .attr('class', 'rbc-group-chart')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const groupAxisXMonths = groupChart.append('g')
      .attr('class', 'rbc-group-axis-x-months')
      .attr('transform', `translate(0, ${heightChart})`);

    const groupAxisXWeeks = groupChart.append('g')
      .attr('class', 'rbc-group-axis-x-weeks')
      .attr('transform', `translate(0, ${heightChart})`);

    const groupAxisXDays = groupChart.append('g')
      .attr('class', 'rbc-group-axis-x-days')
      .attr('transform', `translate(0, ${heightChart})`);

    groupAxisXMonths.call(axisXMonths);
    groupAxisXWeeks.call(axisXWeeks);
    groupAxisXDays.call(axisXDays);

    const groupChartCircles = groupChart.append('g');

    const circles = groupChartCircles.selectAll('rbc-circle')
      .data(data);

    circles.exit().remove();

    const circlesEnter = circles.enter()
      .append('circle')
      .attr('class', 'rbc-circle')
      .attr('cx', d => {
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.start).add(durHalf));
      })
      .attr('cy', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('r', d => {
        const startOffset = getDuration(startDate, d.start);
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.end).subtract(startOffset).subtract(durHalf));
      })
      .attr('fill', (d, i) => {
        return scaleColor(i);
      });
  };

  return {
    draw
  };
};
