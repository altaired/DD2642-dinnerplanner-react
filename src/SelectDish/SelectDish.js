import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";
import {Container, Col, Row} from 'react-bootstrap';

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">
        <h2>This is the Select Dish screen</h2>
        <Container>
        <Row>
          {/* We pass the model as property to the Sidebar component */}
          <Sidebar model={this.props.model} />
          
            <Row>
              <Col sm="12" md="4">
                <input type="text" id="dish"/>
              </Col>
              <Col sm= "12" md="4">
                <select name="category" id="options">
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

                  {/*main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink */}
                </select>
              </Col>
              <Col sm="12" md="4">
                <button id="search" variant="btn btn-light">Search</button>
              </Col>
          
          <Dishes />
          </Row>
        </Row>
        </Container>
      </div>
    );
  }
}

export default SelectDish;