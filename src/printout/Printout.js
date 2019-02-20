import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';
import './Printout.css';
import Back from '../back/Back';

class Printout extends Component {

    componentWillMount() {
        
    }

    render() {
        return (
            <div className="container-fluid">
            <Back guests={this.props.guests}></Back>
                {console.log(this.props,this.props.menu)}
                {this.props.menu.map(dish => {
                  return (
                    <div className = "media mt-5" key={dish.id}>
                        <img className ="align-self-center media-left mr-3 printout-image" alt={dish.id} src= {"https://spoonacular.com/recipeImages/" + dish.id + "-240x150.jpg"}></img>
                      <div className ="media-body"><h4 className="mt-0">{dish.title}</h4><p dangerouslySetInnerHTML= {{__html: dish.instructions}}></p>{console.log(dish.instructions)}
                      </div>
                        <div className = "media-right"><h4 className="mt-0">Type</h4><ul>{dish.dishTypes.map(type =>{
                            return <li key={type}>{type}</li>
                        })}</ul></div>
                    </div>
                  );
                })}
            </div>
        )
    }
}

Printout.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.object).isRequired,
    guests: PropTypes.number.isRequired
  }
  
  const mapStateToProps = state => ({
    menu: state.menu.items,
    guests: state.guests.nbr
  })
  
  export default connect(mapStateToProps)(Printout)