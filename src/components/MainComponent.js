import React , {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from '../shared/dishes';
import MenuComponent from './MenuComponent';
import DishDetail from './DishdetailComponent';


 class Main extends Component {
   constructor(props){
     super(props);
     this.state = {
       dishes : DISHES,
       selectedDish: null
     };
   }

   onDishSelect(dishId)
   {  
       this.setState({
           selectedDish : dishId
       });
       console.log("You are in onDishDelect",dishId);
   }
   
   
  render() {
    console.log("You are in onDishDelect",this.state.selectedDish);
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Vive La</NavbarBrand>
          </div>
        </Navbar>
        <MenuComponent dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        {/* use filter fuction to select the subarray matching the given condition */}
        <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      </div>
    );
  }
}

export default Main;



