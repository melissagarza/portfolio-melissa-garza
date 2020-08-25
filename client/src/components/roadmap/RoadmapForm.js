import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRoadmapData } from '../../actions/roadmap';
import { Form, Button, Col } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const RoadmapForm = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    label: '',
    start: '',
    end: ''
  });

  useEffect(() => {
    const demoData = [{
      'label': 'Fourth',
      'start': new Date(moment().subtract(35, 'days').toDate()),
      'end': new Date(moment().add(3, 'days').toDate()),
      'effort': 27,
      'manpower': 1
    }, {
      'label': 'Third',
      'start': new Date(moment().subtract(106, 'days').toDate()),
      'end': new Date(moment().subtract(32, 'days').toDate()),
      'effort': 53,
      'manpower': 1
    }, {
      'label': 'Second',
      'start': new Date(moment().subtract(163, 'days').toDate()),
      'end': new Date(moment().subtract(102, 'days').toDate()),
      'effort': 44,
      'manpower': 1
    }, {
      'label': 'First',
      'start': new Date(moment().subtract(194, 'days').toDate()),
      'end': new Date(moment().subtract(160, 'days').toDate()),
      'effort': 25,
      'manpower': 1
    }];

    dispatch(loadRoadmapData(demoData));
    setFormData(demoData);
  }, [dispatch]);

  const compareDates = (a, b) => {
    const dateA = moment(a.start);
    const dateB = moment(b.start);
    const difference = moment(dateA).diff(dateB);

    if (difference > 0) {
      return -1;
    }

    if (difference < 0) {
      return 1;
    }

    return 0;
  };

  const onChangeText = (e, index, field) => {
    let newFormData = [...formData];
    newFormData[index][field] = e.target.value;
    setFormData(newFormData);
  };

  const onChangeDate = (newDate, index, field) => {
    let newFormData = [...formData];
    newFormData[index][field] = newDate;
    setFormData(newFormData);
  };

  const onChangeNewEntry = (e, field) => {
    try {
      setNewEntry({...newEntry, [field]: e.target.value});
    } catch (err) {
      setNewEntry({...newEntry, [field]: e});
    }
  };

  const onClickDelete = index => {
    let newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const onSubmitDraw = e => {
    e.preventDefault();

    let newFormData = [...formData];
    newFormData.sort(compareDates);

    setFormData(newFormData)
    dispatch(loadRoadmapData([...formData]));
  };

  const onSubmitAddEntry = e => {
    e.preventDefault();

    let newFormData = [newEntry, ...formData];
    newFormData.sort(compareDates);

    setFormData(newFormData);
    setNewEntry({label: '', start: '', end: ''});
  };

  return (
    <Fragment>

      <Form className="mb-5" onSubmit={e => onSubmitAddEntry(e)}>

        <Form.Row>
          <Form.Group as={Col}>
            <h3>Label</h3>
          </Form.Group>
          <Form.Group as={Col}>
            <h3>Start Date</h3>
          </Form.Group>
          <Form.Group as={Col}>
            <h3>End Date</h3>
          </Form.Group>
          <Form.Group as={Col}>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              required
              as="input"
              value={newEntry.label}
              onChange={e => onChangeNewEntry(e, 'label')}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <DatePicker
              required
              className="form-control"
              selected={newEntry.start}
              onChange={e => onChangeNewEntry(e, 'start')}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <DatePicker
              required
              className="form-control"
              selected={newEntry.end}
              onChange={e => onChangeNewEntry(e, 'end')}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Button type="submit" variant="secondary">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Form.Group>
        </Form.Row>

      </Form>

      <Form className="mb-5" onSubmit={e => onSubmitDraw(e)}>

        {formData.map((entry, index) => (
          <Form.Row key={index}>
            <Form.Group as={Col}>
              <Form.Control
                required
                as="input"
                value={entry.label}
                onChange={e => onChangeText(e, index, 'label')}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <DatePicker
                required
                className="form-control"
                selected={new Date(entry.start)}
                onChange={date => onChangeDate(date, index, 'start')}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <DatePicker
                required
                className="form-control"
                selected={new Date(entry.end)}
                onChange={date => onChangeDate(date, index, 'end')}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                variant="danger"
                onClick={() => onClickDelete(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Form.Group>
          </Form.Row>
        ))}

        <Button type="submit" variant="primary" size="lg" block>
          Draw
        </Button>
      </Form>

    </Fragment>
  );
};

export default RoadmapForm;
