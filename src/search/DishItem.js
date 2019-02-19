import React, { Component } from 'react'
import PropTypes from 'prop-types';


export default class DishItem extends Component {

    getImageURL = id => `https://spoonacular.com/recipeImages/${id}-240x150.jpg`

    render() {
        const item = this.props.dish
        return (
            <div className="col-sm-12 col-md-6 col-lg-3">
                <img src={this.getImageURL(item.id)} alt={item.title}></img>
                <h3>{item.title}</h3>
            </div>
        )
    }
}

DishItem.propTypes = {
    dish: PropTypes.object.isRequired
}

