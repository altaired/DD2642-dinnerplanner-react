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

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchType: ''
        }
    }

    componentWillMount() {
        this.props.requestDishes();
    }

    onInputChange(event) {
        this.setState({
            ...this.state,
            searchTerm: event.target.value
        })
    }

    onSelectChange(event) {
        this.setState({
            ...this.state,
            searchType: event.target.value
        })
    }

    search() {
        this.props.requestDishes(this.state.searchType, this.state.searchTerm);
    }

    render() {
        const dishItemStyle = 'dish-item-box';
        const dishItems = this.props.dishes.map(dish => (
            <div key={dish.id} className={dishItemStyle}>
                <DishItem dish={dish} />
            </div>
        ))
        return (
            <div className="container">
                <Sidebar className="col-sm-12 col-md-3"></Sidebar>
                <div>
                    {this.props.isFetching && <p>Im Loading</p>}
                    <div className="input-group col-6">
                        <select className="form-control" id="exampleFormControlSelect1" value={this.state.searchType} onChange={(evt) => this.onSelectChange(evt)}>
                            <option value="main course">Main Course</option>
                            <option value="side dish">Side Dish</option>
                            <option value="dessert">Dessert</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="salad">Salad</option>
                            <option value="bread">Bread</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="soup">Soup</option>
                            <option value="beverage">Beverage</option>
                            <option value="sauce">Sauce</option>
                            <option value="drink">Drink</option>
                        </select>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                        </div>
                        <input type="text" value={this.state.searchTerm} onChange={(evt) => this.onInputChange(evt)} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        <button className="btn btn-light" onClick={() => this.search()} id="search">Search</button>
                    </div>
                    <div className="row col-sm-12 col-md-9=">{dishItems}</div>
                </div>
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