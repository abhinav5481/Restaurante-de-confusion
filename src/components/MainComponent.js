import React , {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from '../shared/dishes';
import Home from './HomeComponent';
import MenuComponent from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';

 class Main extends Component {
   constructor(props){
     super(props);
     this.state = {
       dishes : DISHES,
      //  selectedDish: null
     };
   }

  //  onDishSelect(dishId)
  //  {  
  //      this.setState({
  //          selectedDish : dishId
  //      });
  //      console.log("You are in onDishDelect",dishId);
  //  }
   
   
  render() {
   const homePage = () =>{
     return(
       <Home />
     );
   }
    return (
      <div>
       <Header />
        {/* <MenuComponent dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* use filter fuction to select the subarray matching the given condition */}
        {/* <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Switch>
          <Route path="/home" component={homePage} />
          <Route path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;



