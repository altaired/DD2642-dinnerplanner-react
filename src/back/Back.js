import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Back.css';
import {
  connect
} from 'react-redux';

class Back extends Component {
  render() {
    return (
      <div className="Back d-flex justify-content-between">
        <h5>My dinner for {this.props.guests} People </h5>
        <div className="float-right">
          <Link to="/search">
            <button className="btn btn-light">Back to search</button>
          </Link>
        </div>

      </div>
    );
  }
}


Back.propTypes = {
  guests: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  guests: state.guests.nbr
})

export default connect(mapStateToProps, {})(Back)
