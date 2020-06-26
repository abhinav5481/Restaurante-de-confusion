import React , {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import MenuComponent from './MenuComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import { Connect, connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';


const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


 class Main extends Component {
   constructor(props){
     super(props);
     
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
       <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} 
       promotion={this.props.promotions.filter((promo) => promo.featured)[0]} 
       leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
     );
   }

   const DishWithId = ({match}) => {
    return(
      <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
      comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
      addComment={this.props.addComment}
    />
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
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/aboutus"  component={() => <About leaders={this.props.leaders} />}  />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));



