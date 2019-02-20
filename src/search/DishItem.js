import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


export default class DishItem extends Component {

    getImageURL = id => `https://spoonacular.com/recipeImages/${id}-240x150.jpg`

    getDishURL = id => `/dish/${id}`;

    render() {
        const item = this.props.dish
        return (
            <Link to={this.getDishURL(item.id)}>
                <div >
                    <img src={this.getImageURL(item.id)} alt={item.title}></img>
                    <h3>{item.title}</h3>
                </div>
            </Link>
        )
    }
}

DishItem.propTypes = {
    dish: PropTypes.object.isRequired
}

