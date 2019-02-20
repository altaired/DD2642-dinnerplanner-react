import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './DishItem.css'


export default class DishItem extends Component {

    getImageURL = id => `https://spoonacular.com/recipeImages/${id}-240x150.jpg`

    getDishURL = id => `/dish/${id}`;

    truncate = string => {
        if (string.length > 25)
            return string.substring(0, 25) + '...';
        else
            return string;
    };

    render() {
        const item = this.props.dish
        return (

            <div className="bounding-dish-box">
                <div className="dish-item">
                    <img src={this.getImageURL(item.id)} alt={item.title}></img>
                    <Link to={this.getDishURL(item.id)}>
                        <h3 className="dish-title">{this.truncate(item.title)}</h3>
                    </Link>

                </div>
            </div>

        )
    }
}

DishItem.propTypes = {
    dish: PropTypes.object.isRequired
}

