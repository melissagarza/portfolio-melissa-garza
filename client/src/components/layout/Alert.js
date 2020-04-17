import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';

const Alert = ({ alerts, removeAlert }) => {

  const onClickDelete = (e, id) => {
    e.preventDefault();
    removeAlert(id);
  };

  if (alerts !== null && alerts.length > 0) {
    return alerts.map(alert => {
      const { id, msg, alertType } = alert;
      return (
        <div key={id} className={`notification is-light is-${alertType}`}>
          <button
            className="delete"
            onClick={e => onClickDelete(e, id)}
          ></button>
          {msg}
        </div>
      );
    });
  }
  return null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = ({ alert }) => ({ alerts: alert });

export default connect(mapStateToProps, { removeAlert })(Alert);
