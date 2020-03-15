import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ Alert }) => {
  return (
    Alert != null && (
      <div className={`alert alert-${Alert.type}`}>
        <i className='fas fa-info-circle'></i>
        {Alert.msg}
      </div>
    )
  );
};

Alert.propTypes = {
  Alert: PropTypes.object
};

export default Alert;
