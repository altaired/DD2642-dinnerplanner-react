import React, { Component } from "react";
import "./Sidebar.css";
import {ButtonToolbar,ButtonGroup,Button} from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Fade from 'react-bootstrap/Fade';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      currentMenu: this.props.model.getFullMenu(),
      open: true
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      currentMenu: this.props.model.getFullMenu(),
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };



  render() {
    const { open } = this.state;
    return (
      <div className='Sidebar'>
        <ButtonToolbar id='sidebar-toggle' className='pull-right'>
          <ButtonGroup className = "d-md-none d-lg-none d-sm-block d-xs-block">
          <Button onClick={() => this.setState({ open: !open })}>
          Toggle
          </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <h4>My Dinner</h4>
        <Collapse in={this.state.open}    className="d-lg-block d-md-block">
          <div className="d-lg-block d-md-block">
          <div className ="bleee">People</div>
          <input
          className="ble"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
            min="0"
          />
          <table  id="sidebarTable">
          <tbody>
            <tr className="border">
              <th>Dish Name</th>
              <th>Cost</th>
            </tr>
            
            {this.state.currentMenu.map(dish => {return(
              <tr key = {dish.id}>
                <td>
                  {dish.title}
                </td>
                <td className="">
                { 'SEK ' +
                  Number(dish.extendedIngredients
                    .map(ingr => ingr.amount)
                    .reduce((acc, val) => acc + val) * this.state.numberOfGuests).toFixed(2) }
                </td>
              </tr>
            );})}
            </tbody>
          </table>
          {/*Total number of guests: {this.state.numberOfGuests}*/}
          <button className="btn btn-light" id="confirmDinner">Confirm order</button>
          </div>
        </Collapse>

      <h5 id="total-due">Total: $75</h5>
            </div>
    
    );
  }
}

export default Sidebar;