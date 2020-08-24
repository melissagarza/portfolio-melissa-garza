import * as d3 from 'd3';
import _ from 'underscore';
import moment from 'moment';

export const createRoadmapChart = rootElem => {

  const widthSvg = 800;
  const heightSvg = 600;
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

  const rootSelector = typeof rootElem === 'string' ? rootElem : rootElem.current;

  const chartSvgWrapper = d3.select(rootSelector).append('div')
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
    .attr('class', 'rbc-grp-chart')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const groupChartCircles = groupChart.append('g');

  const groupAxisXMonths = groupChart.append('g')
    .attr('class', 'rbc-grp-axis-x-months')
    .attr('transform', `translate(0, ${heightChart})`);

  const groupAxisXWeeks = groupChart.append('g')
    .attr('class', 'rbc-grp-axis-x-weeks')
    .attr('transform', `translate(0, ${heightChart})`);

  const groupAxisXDays = groupChart.append('g')
    .attr('class', 'rbc-grp-axis-x-days')
    .attr('transform', `translate(0, ${heightChart})`);

  const scaleX = d3.scaleTime()
    .range([0, widthChart]);

  const scaleY = d3.scaleLinear()
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
      memo.push(moment(entry.start).utc());
      memo.push(moment(entry.end).utc());
      return memo;
    }, []);

    allStartEndDates = allStartEndDates.sort((a, b) => a.diff(b));

    const startDate = allStartEndDates[0];
    const endDate = allStartEndDates.slice(-1)[0];
    const totalDuration = getDuration(startDate, endDate);

    scaleX.domain([startDate, endDate]);
    scaleY.domain([0, totalDuration.asMilliseconds()]);

    groupAxisXMonths.call(axisXMonths);
    groupAxisXWeeks.call(axisXWeeks);
    groupAxisXDays.call(axisXDays);

    const dataPoints = groupChartCircles.selectAll('.rbc-datapoint')
      .data(data);

    dataPoints.exit().remove();

    const dataPointsEnter = dataPoints.enter().append('g')
      .attr('class', 'rbc-datapoint');

    dataPointsEnter.append('circle')
      .attr('class', 'rbc-datapoint-circle')
      .attr('cx', d => {
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.start).add(durHalf));
      })
      .attr('cy', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('r', 0)
      .attr('fill', (d, i) => scaleColor(i))
      .attr('opacity', 0.75)
      .on('mouseenter', (d, i, nodes) => {
        d3.select(nodes[i].parentElement).selectAll('.rbc-datapoint-hover')
          .attr('opacity', 1);
      })
      .on('mouseleave', (d, i, nodes) => {
        d3.select(nodes[i].parentElement).selectAll('.rbc-datapoint-hover')
          .attr('opacity', 0);
      });

    dataPointsEnter.append('text')
      .attr('class', 'rbc-datapoint-hover rbc-datapoint-text')
      .attr('opacity', 0)
      .attr('x', d => {
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.start).add(durHalf));
      })
      .attr('y', scaleY(totalDuration.asMilliseconds() / 2))
      .text(d => d.label)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(0, -5)');

    dataPointsEnter.append('line')
      .attr('class', 'rbc-datapoint-hover rbc-datapoint-vertical-line-start')
      .attr('opacity', 0)
      .attr('x1', d => scaleX(moment(d.start)))
      .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('x2', d => scaleX(moment(d.start)))
      .attr('y2', heightChart)
      .attr('stroke', (d, i) => scaleColor(i))
      .attr('stroke-width', 1);

    dataPointsEnter.append('line')
      .attr('class', 'rbc-datapoint-hover rbc-datapoint-vertical-line-end')
      .attr('opacity', 0)
      .attr('x1', d => scaleX(moment(d.end)))
      .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('x2', d => scaleX(moment(d.end)))
      .attr('y2', heightChart)
      .attr('stroke', (d, i) => scaleColor(i))
      .attr('stroke-width', 1);

    dataPointsEnter.append('line')
      .attr('class', 'rbc-datapoint-hover rbc-datapoint-horizontal-line')
      .attr('opacity', 0)
      .attr('x1', d => scaleX(moment(d.start)))
      .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('x2', d => scaleX(moment(d.end)))
      .attr('y2', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '10, 5');

    dataPointsEnter.append('text')
      .attr('class', 'rbc-datapoint-hover rbc-datapoint-date rbc-datapoint-date-start')
      .attr('opacity', 0)
      .attr('x', d => scaleX(moment(d.start)))
      .attr('y', heightChart)
      .text(d => moment(d.start).format('MMM DD YYYY'))
        .attr('transform', d => {
          return `translate(-3, -3) rotate(-90, ${scaleX(moment(d.start))}, ${heightChart})`;
        });

    dataPointsEnter.append('text')
      .attr('class', 'rbc-datapoint-hover rbc-datapoint-date rbc-datapoint-date-end')
      .attr('opacity', 0)
      .attr('x', d => scaleX(moment(d.end)))
      .attr('y', heightChart)
      .text(d => moment(d.end).format('MMM DD YYYY'))
        .attr('dominant-baseline', 'hanging')
        .attr('transform', d => {
          return `translate(1, -3) rotate(-90, ${scaleX(moment(d.end))}, ${heightChart})`;
        });

    dataPointsEnter.append('text')
      .attr('class', 'rbc-datapoint-hover rbc-datapoint-duration')
      .attr('opacity', 0)
      .attr('x', d => {
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.start).add(durHalf));
      })
      .attr('y', heightChart)
      .text(d => {
        const dur = getDuration(d.start, d.end);
        return `${dur.asDays().toFixed()} days`;
      })
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(0, -5)');

    const dataPointsMerged = dataPoints.merge(dataPointsEnter);

    dataPointsMerged.transition(tr)
      .select('.rbc-datapoint-circle')
        .attr('cx', d => {
          const durHalf = getHalfDuration(d.start, d.end);
          return scaleX(moment(d.start).add(durHalf));
        })
        .attr('cy', scaleY(totalDuration.asMilliseconds() / 2))
        .attr('r', d => {
          const startOffset = getDuration(startDate, d.start);
          const durHalf = getHalfDuration(d.start, d.end);
          return scaleX(moment(d.end).subtract(startOffset).subtract(durHalf));
        });

    dataPointsMerged.select('.rbc-datapoint-text')
      .attr('x', d => {
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.start).add(durHalf));
      })
      .attr('y', scaleY(totalDuration.asMilliseconds() / 2))
      .text(d => d.label);

    dataPointsMerged.select('.rbc-datapoint-vertical-line-start')
      .attr('x1', d => scaleX(moment(d.start)))
      .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('x2', d => scaleX(moment(d.start)));

    dataPointsMerged.select('.rbc-datapoint-vertical-line-end')
      .attr('x1', d => scaleX(moment(d.end)))
      .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('x2', d => scaleX(moment(d.end)));

    dataPointsMerged.select('.rbc-datapoint-horizontal-line')
      .attr('x1', d => scaleX(moment(d.start)))
      .attr('y1', scaleY(totalDuration.asMilliseconds() / 2))
      .attr('x2', d => scaleX(moment(d.end)))
      .attr('y2', scaleY(totalDuration.asMilliseconds() / 2));

    dataPointsMerged.select('.rbc-datapoint-date-start')
      .attr('x', d => scaleX(moment(d.start)))
      .text(d => moment(d.start).format('MMM DD YYYY'))
        .attr('transform', d => {
          return `translate(-3, -3) rotate(-90, ${scaleX(moment(d.start))}, ${heightChart})`;
        });

    dataPointsMerged.select('.rbc-datapoint-date-end')
      .attr('x', d => scaleX(moment(d.end)))
      .text(d => moment(d.end).format('MMM DD YYYY'))
        .attr('dominant-baseline', 'hanging')
        .attr('transform', d => {
          return `translate(1, -3) rotate(-90, ${scaleX(moment(d.end))}, ${heightChart})`;
        });

    dataPointsMerged.select('.rbc-datapoint-duration')
      .attr('x', d => {
        const durHalf = getHalfDuration(d.start, d.end);
        return scaleX(moment(d.start).add(durHalf));
      })
      .text(d => {
        const dur = getDuration(d.start, d.end);
        return `${dur.asDays().toFixed()} days`;
      });
  };

  return {
    draw
  };
};
