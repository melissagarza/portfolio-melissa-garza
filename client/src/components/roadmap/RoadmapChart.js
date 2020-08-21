import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../layout/Loading';
import { createRoadmapChart } from '../../utils/roadmapChart';

const RoadmapChart = () => {

  const { loading, roadmapData } = useSelector(state => state.roadmap);

  const roadmapRoot = useRef(null);
  const roadmapChart = useRef(null);

  useEffect(() => {
    if (!loading) {
      if (roadmapChart.current === null) {
        roadmapChart.current = createRoadmapChart(roadmapRoot);
      }
      roadmapChart.current.draw(roadmapData);
    }
  }, [loading, roadmapData]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div
        ref={roadmapRoot}
        className="rbc-main"
      ></div>
    </Fragment>
  );
};

export default RoadmapChart;
