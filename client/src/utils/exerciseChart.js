import * as d3 from 'd3';
import _ from 'underscore';

export const createExerciseChart = ({ name, title }) => ({

  width: 800,

  height: 400,

  parseDate: d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ'),

  margin: {
    top: 50,
    right: 50,
    bottom: 10,
    left: 40
  },

  draw(data, type = 'volume') {
    console.log(data);
    console.log('draw');
    switch (type) {
      case 'reps':
        this.drawReps(data);
        break;
      case 'volume':
      default:
        this.drawVolume(data);
        break;
    }
  },

  drawVolume(data) {
    console.log('draw volume');
  },

  drawReps(data) {
    console.log('draw reps');
  }

});
