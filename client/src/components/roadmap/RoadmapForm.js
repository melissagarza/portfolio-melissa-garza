import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loadRoadmapData,
  roadmapDataAdd,
  roadmapDataEdit,
  roadmapDataRemove
} from '../../actions/roadmap';
import { Form, Button } from 'react-bootstrap';

const RoadmapForm = ({
  roadmap: {
    roadmapData,
    loading
  },
  loadRoadmapData,
  roadmapDataAdd,
  roadmapDataEdit,
  roadmapDataRemove
}) => {

  let formData = [
    {"label":"0.5 POC","start":"07.07.2014","end":"08.10.2014","effort":25,"manpower": 1},
    {"label":"Toolbox 1.0","start":"08.07.2014","end":"10.07.2014","effort":44,"manpower": 1},
    {"label":"Toolbox 1.1","start":"10.03.2014","end":"12.16.2014","effort":53,"manpower": 1},
    {"label":"Toolbox 1.2","start":"12.13.2014","end":"01.20.2015","effort":27,"manpower": 1}
  ];

  useEffect(() => {
    loadRoadmapData(formData);
  }, []);

  const onBlur = (e, index, field) => {
    let newFormData = [...formData];
    newFormData[index][field] = e.target.value;
    formData = newFormData;
  };

  const onSubmit = e => {
    e.preventDefault();
    loadRoadmapData(formData);
  };

  return (
    <Fragment>

      <Form
        className="mb-5"
        onSubmit={e => onSubmit(e)}
      >
        {roadmapData.map((entry, index) => (
          <Form.Row key={index}>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={formData[index].label}
                onBlur={e => onBlur(e, index, 'label')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={formData[index].start}
                onBlur={e => onBlur(e, index, 'start')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={formData[index].end}
                onBlur={e => onBlur(e, index, 'end')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={formData[index].effort}
                onBlur={e => onBlur(e, index, 'effort')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={formData[index].manpower}
                onBlur={e => onBlur(e, index, 'manpower')}
              />
              </Form.Group>
          </Form.Row>
        ))}
        <Button type="submit" variant="primary">
          Draw
        </Button>
      </Form>

    </Fragment>
  );
};

RoadmapForm.propTypes = {
  roadmapData: PropTypes.array,
  loadRoadmapData: PropTypes.func.isRequired,
  roadmapDataAdd: PropTypes.func.isRequired,
  roadmapDataEdit: PropTypes.func.isRequired,
  roadmapDataRemove: PropTypes.func.isRequired
};

const mapStateToProps = ({ roadmap }) => ({ roadmap });

export default connect(mapStateToProps, {
  loadRoadmapData,
  roadmapDataAdd,
  roadmapDataEdit,
  roadmapDataRemove
})(RoadmapForm);
