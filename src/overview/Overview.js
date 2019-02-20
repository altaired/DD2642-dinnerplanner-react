import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Back from '../back/Back';
import './Overview.css';
import { Link } from "react-router-dom";

class Overview extends Component {

  getImageURL = id => `https://spoonacular.com/recipeImages/${id}-240x150.jpg`

  render() {
    return (
      <div className="container-fluid">
        <Back></Back>
        <div className="row d-flex justify-content-around ">
          {this.props.menu.map(dish => {
            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-5 divss" key={dish.id}>
                <img src={this.getImageURL(dish.id)} alt={dish.title}></img>
                <h5>{dish.title}</h5>
                <div className="d-flex justify-content-end"><p>{'SEK ' +
                  Number(dish.extendedIngredients
                    .map(ingr => ingr.amount)
                    .reduce((acc, val) => acc + val) * this.props.guests).toFixed(2)}</p></div>
              </div>
            );
          })}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-5 divss d-flex justify-content-end align-items-end totals"><p>
            {'Total: SEK ' + this.props.menu
              .flatMap(dish => dish.extendedIngredients)
              .reduce((acc, val) => acc + val.amount * this.props.guests, 0).toFixed(2)
            }</p>
          </div>
        </div>
        <Link to="/printout"><button className="btn btn-light">Print</button></Link>
      </div>
    )
  }
}

Overview.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
  guests: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  menu: state.menu.items,
  guests: state.guests.nbr
})

export default connect(mapStateToProps)(Overview)