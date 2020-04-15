import * as d3 from 'd3';
import _ from 'underscore';

export const createChart = (name, exercises) => ({

  width: 800,

  height: 400,

  parseDate: d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"),

  chartPadding: {
    top: 50,
    right: 50,
    bottom: 20,
    left: 40
  },

  draw() {

    if (exercises.length <= 0) {
      return;
    }

    const dataExercises = _.groupBy(exercises, exercise => exercise.date);
    const dates = _.keys(dataExercises).sort();

    const scaleX = d3.scaleTime()
      .domain(d3.extent(dates, date => this.parseDate(date)))
      .range([0, this.width]);

    const axisX = d3.axisBottom(scaleX)
      .tickFormat(d3.timeFormat('%b \'%y'))
      .ticks(d3.timeMonth.every(1));

    const recordWithMaxVolume = _.max(dataExercises, recordsByDate => {
      return _.reduce(recordsByDate, (memo, record) => (memo + record.volume), 0);
    });

    const maxVolume = _.reduce(recordWithMaxVolume, (memo, record) => (memo + record.volume), 0);

    const scaleY = d3.scaleLinear()
      .domain([0, maxVolume + (maxVolume * 0.1)])
      .range([this.height, 0]);

    const axisY = d3.axisLeft(scaleY)
      .ticks(10, '.0f');

    const generatorArea = d3.area()
      .x(d => scaleX(this.parseDate(d)))
      .y0(this.height)
      .y1(d => {
        const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
        return scaleY(volume);
      });

    const generatorLine = d3.area()
      .x(d => scaleX(this.parseDate(d)))
      .y(d => {
        const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
        return scaleY(volume);
      });

    const chartSvgWrapper = d3.select(`.container-${name}`)
      .append('div')
      .attr('class', `svg-wrapper-${name}`);

    chartSvgWrapper.append('h3')
      .attr('class', `title-${name}`)
      .text(`${exercises[0].name} by ${exercises[0].user.alias}`);

    const chartSvg = chartSvgWrapper.append('svg')
      .attr('class', `svg-${name}`)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('preserveAspectRatio', 'none');

    const groupMain = chartSvg.append('g')
      .attr('class', `group-main-${name}`)
      .attr('transform', 'scale(0.95)');

    const groupChart = groupMain.append('g')
      .attr('class', `group-chart-${name}`)
      .attr('transform', `translate(${this.chartPadding.left}, -${this.chartPadding.bottom})`);

    const groupAxisX = groupMain.append('g')
      .attr('class', `group-axis-x-${name}`)
      .attr('transform', `translate(${this.chartPadding.left}, ${this.height - this.chartPadding.bottom})`);

    const groupAxisY = groupMain.append('g')
      .attr('class', `group-axis-y-${name}`)
      .attr('transform', `translate(${this.chartPadding.left}, -${this.chartPadding.bottom})`);

    groupChart.append('path')
      .attr('class', `area-${name}`)
      .attr('d', generatorArea(dates));

    groupChart.append('path')
      .attr('class', `line-${name}`)
      .attr('d', generatorLine(dates));

    groupChart.selectAll(`circle.point-${name}`)
      .data(dates)
      .enter()
      .append('circle')
      .attr('class', `point-${name}`)
      .attr('cx', d => scaleX(this.parseDate(d)))
      .attr('cy', d => {
        const volume = _.reduce(dataExercises[d], (memo, record) => (memo + record.volume), 0);
        return scaleY(volume);
      })
      .attr('r', '3');

    groupAxisX.append('g')
      .call(axisX);

    groupAxisY.append('g')
      .call(axisY);
  }
});

