import * as d3 from 'd3';
import _ from 'underscore';
import moment from 'moment';

export const createExerciseChart = (rootElem, name, title) => {

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

  const rootSelector = typeof rootElem === 'string' ? rootElem : rootElem.current;

  const chartSvgWrapper = d3.select(rootSelector)
    .append('div')
    .attr('class', `ec-svg-wrapper ec-svg-wrapper-${name}`);

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

  const groupChartArea = groupChart.append('g');

  const groupChartPoints = groupChart.append('g');

  const scaleX = d3.scaleTime()
    .range([0, widthChart]);

  const scaleY = d3.scaleLinear()
    .range([heightChart, 0]);

  const axisX = d3.axisBottom(scaleX)
    .tickFormat(d3.timeFormat('%b \'%y'))
    .ticks(d3.timeMonth.every(1));

  const axisY = d3.axisLeft(scaleY)
    .ticks(10, '.0f');

  const drawVolume = (dataExercises, dates, pointsMerged) => {
    const recordWithMaxVolume = _.max(dataExercises, recordsByDate => {
      return _.reduce(recordsByDate, (memo, record) => (memo + record.volume), 0);
    });
    const maxVolume = _.reduce(recordWithMaxVolume, (memo, record) => (memo + record.volume), 0);

    scaleY.domain([0, maxVolume + (maxVolume * 0.1)]);

    pointsMerged
      // .on('mouseenter', d => {
      //   const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
      //   tooltipShow(`
      //     <span class="tooltip-data">${volume.toFixed()}</span>
      //     <br>
      //     <span class="tooltip-date">${moment(d).format('MMM DD YYYY')}</span>
      //   `);
      // })
      // .on('mouseleave', d => tooltipHide())
      .transition(trans)
      .attr('cx', d => scaleX(parseDate(d)))
      .attr('cy', d => {
        const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
        return scaleY(volume);
      });

    const generatorArea = (d, triggerAnim) => {
      return (
        d3.area()
          .x(d => scaleX(parseDate(d)))
          .y(heightChart)
          .y1(d => {
            if (!triggerAnim) return heightChart;

            const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
            return scaleY(volume);
          })
      )(d);
    };

    groupChartArea.append('path')
      .attr('class', `area area-${name}`)
      .attr('d', generatorArea(dates, false))
      .transition(trans)
      .attr('d', generatorArea(dates, true));

    groupAxisX.transition(trans).call(axisX);
    groupAxisY.transition(trans).call(axisY);
  };

  const drawReps = (dataExercises, dates, pointsMerged) => {
    const recordWithMaxReps = _.max(dataExercises, recordsByDate => {
      const maxRepsOnDate = _.max(recordsByDate, record => record.reps);
      return maxRepsOnDate.reps;
    });
    const maxReps = _.max(recordWithMaxReps, record => record.reps).reps;

    scaleY.domain([0, maxReps]);

    pointsMerged
      // .on('mouseenter', d => {
      //   const recordWithMaxReps = _.max(dataExercises[d], record => record.reps);
      //   tooltipShow(`
      //     <span class="tooltip-data">${recordWithMaxReps.reps}</span>
      //     <br>
      //     <span class="tooltip-date">${moment(d).format('MMM DD YYYY')}</span>
      //   `);
      // })
      // .on('mouseleave', d => tooltipHide())
      .transition(trans)
      .attr('cx', d => scaleX(parseDate(d)))
      .attr('cy', d => {
        const recordWithMaxReps = _.max(dataExercises[d], record => record.reps);
        return scaleY(recordWithMaxReps.reps);
      });

    const generatorArea = (d, triggerAnim) => {
      return (
        d3.area()
          .x(d => scaleX(parseDate(d)))
          .y(heightChart)
          .y1(d => {
            if (!triggerAnim) return heightChart;

            const recordWithMaxReps = _.max(dataExercises[d], record => record.reps);
            return scaleY(recordWithMaxReps.reps);
          })
      )(d);
    };

    groupChartArea.append('path')
      .attr('class', `area area-${name}`)
      .attr('d', generatorArea(dates, false))
      .transition(trans)
      .attr('d', generatorArea(dates, true));

    groupAxisX.transition(trans).call(axisX);
    groupAxisY.transition(trans).call(axisY);
  };

  const draw = (exercises = [], focus = 'volume') => {

    if (exercises.length <= 0) {
      return;
    }

    chartSvgWrapper.append('h3')
      .attr('class', `ec-title ec-title-${name}`)
      .text(`${exercises[0].name} ${focus[0].toUpperCase() + focus.slice(1)} for ${title}`);

    const dataExercises = _.groupBy(exercises, exercise => exercise.date);
    const dates = _.keys(dataExercises).sort();

    scaleX.domain(d3.extent(dates, date => parseDate(date)));

    // const tooltip = d3.select(`.ec-${name}`)
    //   .append('div')
    //   .attr('class', 'tooltip')
    //   .style('opacity', 1);

    const points = groupChartPoints.selectAll(`point-${name}`)
      .data(dates);

    points.exit().remove();

    const pointsEnter = points.enter()
      .append('circle')
      .attr('class', `point point-${name}`)
      .attr('cx', d => scaleX(parseDate(d)))
      .attr('cy', heightChart)
      .attr('r', pointRadius);

    const pointsMerged = points.merge(pointsEnter);

    // const tooltipShow = (html) => {
    //   tooltip
    //     .html(html)
    //     .style('opacity', 1)
    //     .style('left', `${d3.event.pageX - 20}px`)
    //     .style('top', `${d3.event.pageY - 80}px`);
    // };

    // const tooltipHide = () => {
    //   tooltip
    //     .style('opacity', 0)
    //     .style('left', '0px')
    //     .style('top', '0px');
    // };

    switch (focus) {
      case 'reps':
        drawReps(dataExercises, dates, pointsMerged);
        break;
      case 'volume':
      default:
        drawVolume(dataExercises, dates, pointsMerged);
    }
  };

  return {
    draw
  };
};
