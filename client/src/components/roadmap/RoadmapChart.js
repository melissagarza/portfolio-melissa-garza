import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createRoadmapChart } from '../../utils/roadmapChart';

const RoadmapChart = ({ roadmap: { roadmapData, loading } }) => {

  const roadmapChart = createRoadmapChart();

  useEffect(() => {
    if (!loading) {
      roadmapChart.draw(roadmapData);
    }
  }, [loading, roadmapChart, roadmapData]);

  return (
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
