import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRoadmapData } from '../../actions/roadmap';
import { Form, Button } from 'react-bootstrap';

const RoadmapForm = () => {

  const dispatch = useDispatch();

  const demoData = [
    {"label":"0.5 POC","start":"07.07.2014","end":"08.10.2014","effort":25,"manpower": 1},
    {"label":"Toolbox 1.0","start":"08.07.2014","end":"10.07.2014","effort":44,"manpower": 1},
    {"label":"Toolbox 1.1","start":"10.03.2014","end":"12.16.2014","effort":53,"manpower": 1},
    {"label":"Toolbox 1.2","start":"12.13.2014","end":"01.20.2015","effort":27,"manpower": 1}
  ];

  const [formData, setFormData] = useState(demoData);

  useEffect(() => {
    dispatch(loadRoadmapData(demoData));
  }, [dispatch, demoData]);

  const onBlur = (e, index, field) => {
    let newFormData = [...formData];
    newFormData[index][field] = e.target.value;
    setFormData(newFormData);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(loadRoadmapData([...formData]));
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

export default RoadmapForm;
