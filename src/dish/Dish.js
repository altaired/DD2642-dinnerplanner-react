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
import Sidebar from '../sidebar/Sidebar';
import './Dish.css';
import { Link } from "react-router-dom";
import { InputGroup } from 'react-bootstrap';

class Dish extends Component {

    componentDidMount() {
        const params = this.props.match.params;
        console.log(params);
        this.props.requestDish(params.id);
    }

    render() {
        const svar = this.dish(this.props.dish);


        return (
            <div className="container-fluid">
                <div className ="row">
                    <div className="col-sm-12 col-md-3">
                        <Sidebar ></Sidebar>
                    </div>
                    <div className="col-sm-12 col-md-9 row">
                        <div className="col-sm-12 col-md-6">
                            {this.props.isFetching && <p>Loading...</p>}
                            <h4>{this.props.dish.title}</h4>
                            <img src={`https://spoonacular.com/recipeImages/${this.props.dish.id}-312x231.jpg`} alt="fak"></img>
                            <p dangerouslySetInnerHTML= {{__html: this.props.dish.instructions}}></p>
                            <button className="my-2" onClick={() => this.props.addToMenu(this.props.dish)}>Add to Menu</button>
                        </div>
                        <div className="col-sm-12 col-md-6 bakgru">
                        <h3>Ingredients for {this.props.guests} People</h3>
 
                                    {svar}

                        <Link to="/search">
                            <button className="my-5">Back to Search</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    dish (input) {
        if(input.extendedIngredients!=undefined){return (
        <table className="table">
            <tbody>{(input.extendedIngredients.map( ingr => {
                return(
                    <tr key= {ingr.name}>
                        <td>{Number(ingr.amount * this.props.guests).toFixed(2)}</td><td>{ingr.unit}</td><td>{ingr.name}</td><td>{'SEK: '+Number(ingr.amount * this.props.guests).toFixed(2) }</td>
                    </tr>
                )}))}
            </tbody>
            <tfoot>
                <tr>
                    <td>{"Total: "} </td>
                    <td>{' SEK ' +  input.extendedIngredients
                    .reduce((acc, val) => acc + val.amount * this.props.guests, 0).toFixed(2)} </td>
                </tr>
            </tfoot>
        </table>
        )}
        else{
            return (<p>Loading...</p>)
        }
    };
}

Dish.propTypes = {
    requestDish: PropTypes.func.isRequired,
    addToMenu: PropTypes.func.isRequired,
    guests: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    dish: state.dishes.item,
    isFetching: state.dishes.isFetching,
    error: state.dishes.error,
    guests: state.guests.nbr
})

export default connect(mapStateToProps, {
    requestDish,
    addToMenu
})(Dish)