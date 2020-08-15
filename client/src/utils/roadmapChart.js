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
  const scaleColor = d3.scaleOrdinal(d3.schemeTableau10);
  const tr = d3.transition().duration(300).ease(d3.easeLinear);

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

  const groupChartCircles = groupChart.append('g');

  const groupAxisXMonths = groupChart.append('g')
    .attr('class', 'rbc-group-axis-x-months')
    .attr('transform', `translate(0, ${heightChart})`);

  const groupAxisXWeeks = groupChart.append('g')
    .attr('class', 'rbc-group-axis-x-weeks')
    .attr('transform', `translate(0, ${heightChart})`);

  const groupAxisXDays = groupChart.append('g')
    .attr('class', 'rbc-group-axis-x-days')
    .attr('transform', `translate(0, ${heightChart})`);

  const scaleX = d3.scaleTime()
    .range([0, widthChart]);

  const scaleY = d3.scaleLinear()
    .range([heightChart, 0]);

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

    scaleX.domain([startDate, endDate]);
    scaleY.domain([0, totalDuration.asMilliseconds()]);

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

    groupAxisXMonths.call(axisXMonths);
    groupAxisXWeeks.call(axisXWeeks);
    groupAxisXDays.call(axisXDays);

    const circles = groupChartCircles.selectAll('.rbc-circle')
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
      .attr('r', 0)
      .attr('fill', (d, i) => scaleColor(i))
      .attr('opacity', 0.9);

    circlesEnter.merge(circles)
      .on('mouseenter', (d, i) => {
        const dStartDate = moment(d.start).format('MMM DD YYYY');
        const dEndDate = moment(d.end).format('MMM DD YYYY');

        groupChartCircles.append('text')
          .attr('class', 'circle-hover-display circle-text')
          .attr('x', () => {
            const durHalf = getHalfDuration(d.start, d.end);
            return scaleX(moment(d.start).add(durHalf));
          })
          .attr('y', scaleY(totalDuration.asMilliseconds() / 2))
          .text(d.label)
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(0, -5)');

        groupChartCircles.append('line')
          .attr('class', 'circle-hover-display circle-vertical-line')
          .attr('x1', scaleX(moment(d.start)))
          .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
          .attr('x2', scaleX(moment(d.start)))
          .attr('y2', heightChart)
          .attr('stroke', scaleColor(i))
          .attr('stroke-width', 1);

        groupChartCircles.append('line')
          .attr('class', 'circle-hover-display circle-vertical-line')
          .attr('x1', scaleX(moment(d.end)))
          .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
          .attr('x2', scaleX(moment(d.end)))
          .attr('y2', heightChart)
          .attr('stroke', scaleColor(i))
          .attr('stroke-width', 1);

        groupChartCircles.append('line')
          .attr('class', 'circle-hover-display circle-horizontal-line')
          .attr('x1', scaleX(moment(d.start)))
          .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
          .attr('x2', scaleX(moment(d.end)))
          .attr('y2', scaleY(totalDuration.asMilliseconds() / 2))
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '10, 5');

        groupChartCircles.append('text')
          .attr('class', 'circle-hover-display circle-text-date circle-text-date-start')
          .attr('x', scaleX(moment(d.start)))
          .attr('y', heightChart)
          .text(dStartDate)
            .attr('transform', `translate(-3, -3) rotate(-90, ${scaleX(moment(d.start))}, ${heightChart})`);

        groupChartCircles.append('text')
          .attr('class', 'circle-hover-display circle-text-date circle-text-date-end')
          .attr('x', scaleX(moment(d.end)))
          .attr('y', heightChart)
          .text(dEndDate)
            .attr('dominant-baseline', 'hanging')
            .attr('transform', `translate(1, -3) rotate(-90, ${scaleX(moment(d.end))}, ${heightChart})`);

        groupChartCircles.append('text')
          .attr('class', 'circle-hover-display circle-text-duration')
          .attr('x', () => {
            const durHalf = getHalfDuration(d.start, d.end);
            return scaleX(moment(d.start).add(durHalf));
          })
          .attr('y', heightChart)
          .text(() => {
            const dur = getDuration(d.start, d.end);
            return `${dur.asDays().toFixed()} days`;
          })
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(0, -5)');
      })
      .on('mouseleave', () => {
        groupChartCircles.selectAll('.circle-hover-display').remove();
      })
      .transition(tr)
      .attr('r', d => {
        const startOffset = getDuration(startDate, d.start);
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.end).subtract(startOffset).subtract(durHalf));
      });
  };

  return {
    draw
  };
};
