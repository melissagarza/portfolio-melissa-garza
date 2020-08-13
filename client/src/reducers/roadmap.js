import {
  ROADMAP_DATA_ADD,
  ROADMAP_DATA_LOAD,
  ROADMAP_DATA_REMOVE
} from '../actions/types';

const initialState = {
  roadmapData: [],
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log(state);

  switch (type) {
    case ROADMAP_DATA_LOAD:
      return {
        ...state,
        roadmapData: payload,
        loading: false
      };
    case ROADMAP_DATA_ADD:
      return {
        ...state,
        roadmapData: state.roadmapData.push(payload),
        loading: false
      };
    case ROADMAP_DATA_REMOVE:
      return {
        ...state,
        roadmapData: state.roadmapData.splice(payload, 1),
        loading: false
      };
    default:
      return state;
  }
};
