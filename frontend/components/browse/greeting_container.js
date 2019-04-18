import { connect } from 'react-redux';
import { logout } from './../../actions/session_actions';
import Greeting from './greeting';
import React from 'react';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.currentUserId]
  });
};

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});


export default connect(msp, mdp)(Greeting);
