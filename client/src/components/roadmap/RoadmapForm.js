import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRoadmapData } from '../../actions/roadmap';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoadmapForm = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const demoData = [{
        'label': '0.5 POC',
        'start': new Date('07.07.2014'),
        'end': new Date('08.10.2014'),
        'effort': 25,
        'manpower': 1
      }, {
        'label': 'Toolbox 1.0',
        'start': new Date('08.07.2014'),
        'end': new Date('10.07.2014'),
        'effort': 44,
        'manpower': 1
      }, {
        'label': 'Toolbox 1.1',
        'start': new Date('10.03.2014'),
        'end': new Date('12.16.2014'),
        'effort': 53,
        'manpower': 1
      }, {
        'label': 'Toolbox 1.2',
        'start': new Date('12.13.2014'),
        'end': new Date('01.20.2015'),
        'effort': 27,
        'manpower': 1
      }
    ];
    dispatch(loadRoadmapData(demoData));
    setFormData(demoData);
  }, [dispatch]);

  const onChangeDate = (newDate, index, field) => {
    let newFormData = [...formData];
    newFormData[index][field] = newDate;
    setFormData(newFormData);
  };

  const onChangeText = (e, index, field) => {
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
                value={entry.label}
                onChange={e => onChangeText(e, index, 'label')}
              />
            </Form.Group>
            <Form.Group>
              <DatePicker
                className="form-control"
                selected={new Date(entry.start)}
                onChange={date => onChangeDate(date, index, 'start')}
              />
            </Form.Group>
            <Form.Group>
              <DatePicker
                className="form-control"
                selected={new Date(entry.end)}
                onChange={date => onChangeDate(date, index, 'end')}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Control
                as="input"
                value={entry.effort}
                onChange={e => onChangeText(e, index, 'effort')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="input"
                value={entry.manpower}
                onChange={e => onChangeText(e, index, 'manpower')}
              />
            </Form.Group> */}
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
