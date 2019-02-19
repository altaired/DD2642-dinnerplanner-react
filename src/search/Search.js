import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux';
import {
    requestDishes
} from '../actions/dishActions';
import DishItem from './DishItem';
import PropTypes from 'prop-types';
import './Search.css';
import Sidebar from '../sidebar/Sidebar';

class Search extends Component {

    componentWillMount() {
        this.props.requestDishes();
    }

    render() {
        const dishItemStyle = 'dish-item-box';
        const dishItems = this.props.dishes.map(dish => (
            <div key={dish.id} className={dishItemStyle}>
                <DishItem dish={dish} />
            </div>
        ))
        return (
            <div className="row">
                <Sidebar className="col-sm-12 col-md-3"></Sidebar>
                <div className="row col-sm-12 col-md-9=">{dishItems}</div>
            </div>
        )
    }
}

Search.propTypes = {
    requestDishes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dishes: state.dishes.items,
    menu: state.menu.items,
    isFetching: state.dishes.isFetching,
    error: state.dishes.error
})

export default connect(mapStateToProps, {
    requestDishes
})(Search)