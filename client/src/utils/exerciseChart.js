import * as d3 from 'd3';
import _ from 'underscore';

export const createExerciseChart = ({ name, title }) => {

  const widthSvg = 800;
  const heightSvg = 400;
  const margin = {
    top: heightSvg * 0.05,
    right: widthSvg * 0.05,
    bottom: heightSvg * 0.05,
    left: widthSvg * 0.05
  };
  const widthChart = widthSvg - margin.left - margin.right;
  const heightChart = heightSvg - margin.top - margin.bottom;
  const pointRadius = 4;
  const parseDate = d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ');
  const trans = d3.transition().duration(500);

  const draw = (exercises = [], type = 'volume') => {

    if (exercises.length <= 0) {
      return;
    }

    const dataExercises = _.groupBy(exercises, exercise => exercise.date);
    const dates = _.keys(dataExercises).sort();

    const scaleY = d3.scaleLinear()
      .range([heightChart, 0]);

    const axisY = d3.axisLeft(scaleY)
      .ticks(10, '.0f');

    const chartSvgWrapper = d3.select(`.ec-${name}`)
      .append('div')
      .attr('class', `ec-svg-wrapper ec-svg-wrapper-${name}`);

    chartSvgWrapper.append('h3')
      .attr('class', `ec-title ec-title-${name}`)
      .text(`${exercises[0].name} for ${title}`);

    const chartSvg = chartSvgWrapper.append('svg')
      .attr('class', `ec-svg ec-svg-${name}`)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('viewBox', `0 0 ${widthSvg} ${heightSvg}`)
      .attr('preserveAspectRatio', 'none');

    const groupChart = chartSvg.append('g')
      .attr('class', `ec-group-chart ec-group-chart-${name}`)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const groupAxisX = groupChart.append('g')
      .attr('class', `ec-group-axis-x ec-group-axis-x-${name}`)
      .attr('transform', `translate(0, ${heightChart})`);

    const groupAxisY = groupChart.append('g')
      .attr('class', `ec-group-axis-y ec-group-axis-y-${name}`);

    const drawVolume = () => {
      const recordWithMaxVolume = _.max(dataExercises, recordsByDate => {
        return _.reduce(recordsByDate, (memo, record) => (memo + record.volume), 0);
      });
      const maxVolume = _.reduce(recordWithMaxVolume, (memo, record) => (memo + record.volume), 0);

      const scaleX = d3.scaleTime()
        .domain(d3.extent(dates, date => parseDate(date)))
        .range([0, widthChart]);

      const axisX = d3.axisBottom(scaleX)
        .tickFormat(d3.timeFormat('%b \'%y'))
        .ticks(d3.timeMonth.every(1));

      scaleY.domain([0, maxVolume + (maxVolume * 0.1)]);

      const generatorArea = (d, triggerAnim) => {
        return (
          d3.area()
            .x(d => scaleX(parseDate(d)))
            .y(heightChart)
            .y1(d => {
              if (!triggerAnim) return scaleY(0);

              const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
              return scaleY(volume);
            })
        )(d);
      };

      groupChart.append('path')
        .attr('class', `area area-${name}`)
        .attr('d', generatorArea(dates, false))
        .transition(trans)
        .attr('d', generatorArea(dates, true));

      const points = groupChart.selectAll(`point-${name}`)
        .data(dates);

      points.enter()
        .append('circle')
          .attr('class', `point point-${name}`)
          .attr('cx', d => scaleX(parseDate(d)))
          .attr('cy', d => {
            const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
            return scaleY(volume);
          })
          .attr('r', pointRadius)
        .merge(points)
          .transition(trans)
          .attr('class', `point point-${name}`)
          .attr('cx', d => scaleX(parseDate(d)))
          .attr('cy', d => {
            const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
            return scaleY(volume);
          })
          .attr('r', pointRadius);

      groupAxisX.transition(trans).call(axisX);
      groupAxisY.transition(trans).call(axisY);
    };

    const drawReps = () => {
      const recordWithMaxReps = _.max(dataExercises, recordsByDate => {
        const maxRepsOnDate = _.max(recordsByDate, record => record.reps);
        return maxRepsOnDate.reps;
      });
      const maxReps = _.max(recordWithMaxReps, record => record.reps).reps;

      const scaleX = d3.scaleTime()
        .domain(d3.extent(dates, date => parseDate(date)))
        .range([0, widthChart]);

      const axisX = d3.axisBottom(scaleX)
        .tickFormat(d3.timeFormat('%b \'%y'))
        .ticks(d3.timeMonth.every(1));

      scaleY.domain([0, maxReps]);

      const generatorArea = (d, triggerAnim) => {
        return (
          d3.area()
            .x(d => scaleX(parseDate(d)))
            .y(heightChart)
            .y1(d => {
              if (!triggerAnim) return scaleY(0);

              const recordWithMaxReps = _.max(dataExercises[d], record => record.reps);
              return scaleY(recordWithMaxReps.reps);
            })
        )(d);
      };

      groupChart.append('path')
        .attr('class', `area area-${name}`)
        .attr('d', generatorArea(dates, false))
        .transition(trans)
        .attr('d', generatorArea(dates, true));

      const points = groupChart.selectAll(`point-${name}`)
        .data(dates);

      points.exit().remove();

      points.enter()
        .append('circle')
          .attr('class', `point-${name}`)
          .attr('cx', d => scaleX(parseDate(d)))
          .attr('cy', heightChart)
          .attr('r', pointRadius)
        .merge(points)
          .transition(trans)
          .attr('cx', d => scaleX(parseDate(d)))
          .attr('cy', d => {
            const recordWithMaxReps = _.max(dataExercises[d], record => record.reps);
            return scaleY(recordWithMaxReps.reps);
          });

      groupAxisX.transition(trans).call(axisX);
      groupAxisY.transition(trans).call(axisY);
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
