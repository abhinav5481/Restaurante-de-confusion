import React , {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from '../shared/dishes';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import MenuComponent from './MenuComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

 class Main extends Component {
   constructor(props){
     super(props);
     this.state = {
       dishes : DISHES,
       comments: COMMENTS,
       promotions: PROMOTIONS,
       leaders: LEADERS
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
  //     <Home 
  //     dish={this.state.dishes.filter((dish) => dish.featured)[0]}
  //     promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
  //     leader={this.state.leaders.filter((leader) => leader.featured)[0]}
  // />
       <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
       promotion={this.state.promotions.filter((promo) => promo.featured)[0]} 
       leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
     );
   }

   const DishWithId = ({match}) => {
    return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };
    return (
      <div>
       <Header />
        {/* <MenuComponent dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* use filter fuction to select the subarray matching the given condition */}
        {/* <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Switch>
          <Route path="/home" component={homePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/aboutus"  component={() => <About leaders={this.state.leaders} />}  />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;



