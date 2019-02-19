import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux';
import {
    requestDish
} from '../actions/dishActions';
import {
    addToMenu
} from '../actions/menuActions';
import PropTypes from 'prop-types';

class Dish extends Component {

    componentDidMount() {
        const params = this.props.match.params;
        console.log(params);
        this.props.requestDish(params.id);
    }

    render() {
        return (
            <div>
                {this.props.isFetching && <p>Loading...</p>}
                <p>{JSON.stringify(this.props.dish)}</p>
                <button onClick={() => this.props.addToMenu(this.props.dish)}>Add to Menu</button>
            </div>

        );
    }
}

Dish.propTypes = {
    requestDish: PropTypes.func.isRequired,
    addToMenu: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dish: state.dishes.item,
    isFetching: state.dishes.isFetching,
    error: state.dishes.error
})

export default connect(mapStateToProps, {
    requestDish,
    addToMenu
})(Dish)