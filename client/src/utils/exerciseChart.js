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

  const _drawVolume = (data) => {
    console.log('draw volume');
  };

  const _drawReps = (data) => {
    console.log('draw reps');
  };

  const draw = (data, type = 'volume') => {
    console.log(data);
    console.log('draw');
    switch (type) {
      case 'reps':
        _drawReps(data);
        break;
      case 'volume':
      default:
        _drawVolume(data);
        break;
    }
  };

  return {
    draw
  };
};
