import {
  ROADMAP_DATA_ADD,
  ROADMAP_DATA_EDIT,
  ROADMAP_DATA_LOAD,
  ROADMAP_DATA_REMOVE
} from './types';

export const loadRoadmapData = data => dispatch => {
  dispatch({
    type: ROADMAP_DATA_LOAD,
    payload: data
  });
};

export const roadmapDataAdd = dataEntry => dispatch => {
  dispatch({
    type: ROADMAP_DATA_ADD,
    payload: dataEntry
  });
};

export const roadmapDataEdit = (index, dataEntry) => dispatch => {
  dispatch({
    type: ROADMAP_DATA_EDIT,
    payload: { index, dataEntry }
  });
};

export const roadmapDataRemove = index => dispatch => {
  dispatch({
    type: ROADMAP_DATA_REMOVE,
    payload: index
  });
};
