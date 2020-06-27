import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import MenuComponent from "./MenuComponent";
import About from "./AboutComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Menu from "./MenuComponent";
import { Connect, connect } from "react-redux";
import { postComment, fetchDishes , fetchComments,fetchPromos} from "../redux/ActionCreators";
import {actions} from 'react-redux-form';
import {CSSTransition , TransitionGroup} from 'react-transition-group';

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes());},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments());},
  fetchPromos: () => { dispatch(fetchPromos());}
});

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  //  onDishSelect(dishId)
  //  {
  //      this.setState({
  //          selectedDish : dishId
  //      });
  //      console.log("You are in onDishDelect",dishId);
  //  }

  render() {
    const homePage = () => {
      return (
        //     <Home
        //     dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        //     promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        //     leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        // />
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
    />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
      );
    };
    return (
      <div>
        <Header />
        {/* <MenuComponent dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* use filter fuction to select the subarray matching the given condition */}
        {/* <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <TransitionGroup>
        <CSSTransition  key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
          <Route path="/home" component={homePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to="/home" />
        </Switch>
        </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
