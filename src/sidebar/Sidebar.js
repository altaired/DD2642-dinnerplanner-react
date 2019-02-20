import React, { Component } from "react";
import "./Sidebar.css";
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGuests } from '../actions/guestActions';
import { Link } from "react-router-dom";


class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      open: true
    };
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.changeGuests(Number(e.target.value));
  };



  render() {
    const { open } = this.state;
    return (
      <div className='Sidebar'>
        <ButtonToolbar id='sidebar-toggle' className='pull-right'>
          <ButtonGroup className="d-md-none d-lg-none d-sm-block d-xs-block">
            <Button onClick={() => this.setState({ open: !open })}>
              Toggle
          </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <h4>My Dinner</h4>
        <Collapse in={this.state.open} className="d-lg-block d-md-block">
          <div className="d-lg-block d-md-block">
            <div className="bleee">People</div>
            <div className="input-group-lg">
            <input
            className="form-control"
              type="number"
              value={this.props.guests}
              onChange={this.onNumberOfGuestsChanged}
              min="1"
            />
            </div>
            <table className ="table table-hover table-dark " id="sidebarTable">
              <tbody>
                <tr>
                  <th>Dish Name</th>
                  <th>Cost</th>
                </tr>

                {this.props.menu.map(dish => {
                  return (
                    <tr key={dish.id}>
                      <td>
                        {dish.title}
                      </td>
                      <td className="">
                        {'SEK ' +
            Number(dish.extendedIngredients
                .map(ingr => ingr.amount)
                .reduce((acc, val) => acc + val) * this.props.guests).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/*Total number of guests: {this.state.numberOfGuests}*/}       
             <Link to="/overview">
            <button className="btn btn-light" id="confirmDinner">Confirm order</button>
            </Link>
          </div>
        </Collapse>

        <h5 className="my-3" id="total-due">{ 'Total: SEK ' + this.props.menu
			.flatMap(dish => dish.extendedIngredients)
			.reduce((acc, val) => acc + val.amount * this.props.guests, 0).toFixed(2)
	}</h5>
      </div>

    );
  }
}

Sidebar.propTypes = {
  changeGuests: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
  guests: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  menu: state.menu.items,
  guests: state.guests.nbr
})

export default connect(mapStateToProps, {
  changeGuests
})(Sidebar)