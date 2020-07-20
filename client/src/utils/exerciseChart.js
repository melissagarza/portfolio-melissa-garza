import * as d3 from 'd3';
import _ from 'underscore';

export const createExerciseChart = ({ name, title }) => {

  const width = 800;
  const height = 400;
  const parseDate = d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ');
  const margin = {
    top: 50,
    right: 50,
    bottom: 10,
    left: 40
  };

  const draw = (exercises, type = 'volume') => {

    if (exercises.length <= 0) {
      return;
    }

    const dataExercises = _.groupBy(exercises, exercise => exercise.date);
    const dates = _.keys(dataExercises).sort();

    const scaleX = d3.scaleTime()
      .domain(d3.extent(dates, date => parseDate(date)))
      .range([0, width]);

    const axisX = d3.axisBottom(scaleX)
      .tickFormat(d3.timeFormat('%b \'%y'))
      .ticks(d3.timeMonth.every(1));

    const scaleY = d3.scaleLinear()
      .range([height, 0]);

    const axisY = d3.axisLeft(scaleY)
      .ticks(10, '.0f');

    const chartSvgWrapper = d3.select(`.container-${name}`)
      .append('div')
      .attr('class', `svg-wrapper-${name}`);

    chartSvgWrapper.append('h3')
      .attr('class', `title-${name}`)
      .text(`${exercises[0].name} Chart for ${title}`);

    const chartSvg = chartSvgWrapper.append('svg')
      .attr('class', `svg-${name}`)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'none');

    const groupMain = chartSvg.append('g')
      .attr('class', `group-main-${name}`)
      .attr('transform', 'scale(0.93)');

    const groupChart = groupMain.append('g')
      .attr('class', `group-chart-${name}`)
      .attr('transform', `translate(${margin.left}, -${margin.bottom})`);

    const groupAxisX = groupMain.append('g')
      .attr('class', `group-axis-x-${name}`)
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`);

    const groupAxisY = groupMain.append('g')
      .attr('class', `group-axis-y-${name}`)
      .attr('transform', `translate(${margin.left}, -${margin.bottom})`);

    groupAxisX.append('g')
      .call(axisX);

    groupAxisY.append('g')
      .call(axisY);

    const drawVolume = () => {
      const recordWithMaxVolume = _.max(dataExercises, recordsByDate => {
        return _.reduce(recordsByDate, (memo, record) => (memo + record.volume), 0);
      });
      const maxVolume = _.reduce(recordWithMaxVolume, (memo, record) => (memo + record.volume), 0);

      scaleY.domain([0, maxVolume + (maxVolume * 0.1)]);

      const generatorArea = d3.area()
        .x(d => scaleX(parseDate(d)))
        .y0(height)
        .y1(d => {
          const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
          return scaleY(volume);
        });
      
      groupChart.append('path')
        .attr('class', `area-${name}`)
        .attr('d', generatorArea(dates));

      groupChart.selectAll(`circle.point-${name}`)
        .data(dates)
        .enter()
        .append('circle')
        .attr('class', `point-${name}`)
        .attr('cx', d => scaleX(parseDate(d)))
        .attr('cy', d => {
          const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
          return scaleY(volume);
        })
        .attr('r', '3');
    };

    const drawReps = () => {

    };

    switch (type) {
      case 'reps':
        drawReps();
        break;
      case 'volume':
      default:
        drawVolume();
        break;
    }
  };

  return {
    draw
  };
};
