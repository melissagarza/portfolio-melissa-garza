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

  const draw = (data) => {

    if (data.length < 0) {
      return;
    }

    let allStartEndDates = _.reduce(data, (memo, entry) => {
      memo.push(moment(entry.start, 'MM.DD.YYYY').utc());
      memo.push(moment(entry.end, 'MM.DD.YYYY').utc());
      return memo;
    }, []);

    allStartEndDates = allStartEndDates.sort((a, b) => a.diff(b));

    const scaleX = d3.scaleTime()
      .domain(d3.extent(allStartEndDates, date => date.format()))
      .range([0, widthChart]);

    const scaleY = d3.scaleLinear()
      .domain([0, 100])
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

  };
  
  return {
    draw
  };
};
