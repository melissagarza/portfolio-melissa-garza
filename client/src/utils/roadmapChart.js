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

    const allEfforts = _.map(data, d => d.effort / d.manpower);
    const maxEffort = d3.max(allEfforts);

    const scaleX = d3.scaleTime()
      .domain(d3.extent(allStartEndDates))
      .range([0, widthChart]);

    const scaleY = d3.scaleLinear()
      .domain([0, maxEffort])
      .range([heightChart, 0]);

    const axisX = d3.axisBottom(scaleX);

    const axisY = d3.axisLeft(scaleY);

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

    const groupAxisX = groupChart.append('g')
      .attr('class', 'rbc-group-axis-x')
      .attr('transform', `translate(0, ${heightChart})`);

    const groupAxisY = groupChart.append('g')
      .attr('class', 'rbc-group-axis-y');

    groupAxisX.call(axisX);
    groupAxisY.call(axisY);

    const groupChartEllipses = groupChart.append('g');

    const ellipses = groupChartEllipses.selectAll('rbc-ellipse')
      .data(data);

    ellipses.exit().remove();

    const ellipsesEnter = ellipses.enter()
      .append('ellipse')
      .attr('class', 'rbc-ellipse')
      .attr('cx', d => {
        const halfDur = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.start).add(halfDur));
      })
      .attr('cy', scaleY(maxEffort / 2))
      .attr('rx', 5)
      .attr('ry', 5);

  };
  
  return {
    draw
  };
};
