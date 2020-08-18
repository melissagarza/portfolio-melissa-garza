import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadRoadmapData, roadmapDataEdit } from '../../actions/roadmap';
import { Form, Button } from 'react-bootstrap';

const RoadmapForm = ({ roadmap: { roadmapData }, loadRoadmapData, roadmapDataEdit }) => {

  let demoData = [
    {"label":"0.5 POC","start":"07.07.2014","end":"08.10.2014","effort":25,"manpower": 1},
    {"label":"Toolbox 1.0","start":"08.07.2014","end":"10.07.2014","effort":44,"manpower": 1},
    {"label":"Toolbox 1.1","start":"10.03.2014","end":"12.16.2014","effort":53,"manpower": 1},
    {"label":"Toolbox 1.2","start":"12.13.2014","end":"01.20.2015","effort":27,"manpower": 1}
  ];

  const [formData, setFormData] = useState(demoData);

  useEffect(() => {
    loadRoadmapData(demoData);
  }, []);

  const onBlur = (e, index, field) => {
    let newFormData = [...formData];
    newFormData[index][field] = e.target.value;
    setFormData(newFormData);
  };
  
  const onSubmit = e => {
    e.preventDefault();
    loadRoadmapData([...formData]);
  };

  return (
    <Fragment>

      <Form
        className="mb-5"
        onSubmit={e => onSubmit(e)}
      >
        {formData.map((entry, index) => (
          <Form.Row key={index}>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={entry.label}
                onBlur={e => onBlur(e, index, 'label')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={entry.start}
                onBlur={e => onBlur(e, index, 'start')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={entry.end}
                onBlur={e => onBlur(e, index, 'end')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={entry.effort}
                onBlur={e => onBlur(e, index, 'effort')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                defaultValue={entry.manpower}
                onBlur={e => onBlur(e, index, 'manpower')}
              />
            </Form.Group>
          </Form.Row>
        ))}
        <Button type="submit">
          Draw
        </Button>
      </Form>

    </Fragment>
  );
};

RoadmapForm.propTypes = {
  roadmapData: PropTypes.array,
  loadRoadmapData: PropTypes.func.isRequired
};

const mapStateToProps = ({ roadmap }) => ({ roadmap });

export default connect(mapStateToProps, { loadRoadmapData, roadmapDataEdit })(RoadmapForm);
