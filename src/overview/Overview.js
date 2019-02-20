import React, { Component } from "react";
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Back from '../back/Back';
import './Overview.css';

class Overview extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
  }

  getImageURL = id => `https://spoonacular.com/recipeImages/${id}-240x150.jpg`

  render() {
    return (
        <div className="container-fluid">
        <Back guests={this.props.guests}></Back>
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
            { 'Total: SEK ' + this.props.menu
			.flatMap(dish => dish.extendedIngredients)
			.reduce((acc, val) => acc + val.amount * this.props.guests, 0).toFixed(2)
	}</p>
            </div>
            </div>
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