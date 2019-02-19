import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux';
import {
    requestDishes
} from '../actions/dishActions';
import {
    addToMenu
} from '../actions/menuActions';
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
                <button onClick={() => this.props.addToMenu(dish)}> Add To Menu
            </button>
            </div>
        ))
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="row">{dishItems}</div>
            </div>
        )
    }
}

Search.propTypes = {
    requestDishes: PropTypes.func.isRequired,
    addToMenu: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dishes: state.dishes.items,
    menu: state.menu.items,
    isFetching: state.dishes.isFetching,
    error: state.dishes.error
})

export default connect(mapStateToProps, {
    requestDishes,
    addToMenu
})(Search)