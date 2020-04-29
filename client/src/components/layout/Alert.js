import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';
import { Alert as AlertBS } from 'react-bootstrap';

const Alert = ({ alerts, removeAlert }) => {

  const onClickDelete = (id) => {
    removeAlert(id);
  };

  if (alerts !== null && alerts.length > 0) {
    return alerts.map(alert => {
      const { id, msg, alertType } = alert;

      return (
        <AlertBS
          key={id}
          variant={alertType}
          onClose={() => onClickDelete(id)}
          dismissible
        >
          {msg}
        </AlertBS>
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
