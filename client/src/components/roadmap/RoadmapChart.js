import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';
import { createRoadmapChart } from '../../utils/roadmapChart';

const RoadmapChart = ({ roadmap: { roadmapData, loading } }) => {

  const roadmapChart = useRef(null);

  useEffect(() => {
    if (!loading) {
      if (roadmapChart.current === null) {
        roadmapChart.current = createRoadmapChart();
      }
      roadmapChart.current.draw(roadmapData);
    }
  }, [loading, roadmapData]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="rbc-main"></div>
    </Fragment>
  );
};

RoadmapChart.propTypes = {
  roadmap: PropTypes.object
};

const mapStateToProps = ({ roadmap }) => ({ roadmap });

export default connect(mapStateToProps, {})(RoadmapChart);
