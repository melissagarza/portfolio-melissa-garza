import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loadRoadmapData,
  roadmapDataAdd,
  roadmapDataRemove
} from '../../actions/roadmap';
import { Form } from 'react-bootstrap';

const RoadmapForm = ({
  roadmap: {
    roadmapData,
    loading
  },
  loadRoadmapData,
  roadmapDataAdd,
  roadmapDataRemove
}) => {

  useEffect(() => {
    loadRoadmapData([
      {"label":"0.5 POC","start":"07.07.2014","end":"08.10.2014","effort":25,"manpower": 1},
      {"label":"Toolbox 1.0","start":"08.07.2014","end":"10.07.2014","effort":44,"manpower": 1},
      {"label":"Toolbox 1.1","start":"10.03.2014","end":"12.16.2014","effort":53,"manpower": 1},
      {"label":"Toolbox 1.2","start":"12.13.2014","end":"01.20.2015","effort":27,"manpower": 1}
    ]);
  }, [loadRoadmapData]);

  return (
    <Fragment>

      <Form className="mb-5">

      </Form>

    </Fragment>
  );
};

RoadmapForm.propTypes = {
  roadmapData: PropTypes.array,
  loadRoadmapData: PropTypes.func.isRequired,
  roadmapDataAdd: PropTypes.func.isRequired,
  roadmapDataRemove: PropTypes.func.isRequired
};

const mapStateToProps = ({ roadmap }) => ({ roadmap });

export default connect(mapStateToProps, {
  loadRoadmapData,
  roadmapDataAdd,
  roadmapDataRemove
})(RoadmapForm);
