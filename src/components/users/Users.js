import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
export const Users = ({ users, loading }) => {
  if (loading) {
    console.log(loading);
    return <Spinner />;
  } else {
    console.log(loading);
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem'
};
export default Users;
