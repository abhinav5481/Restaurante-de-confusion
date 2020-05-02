import React, { Component } from 'react';
import { Card, CardBody, CardImg , CardImgOverlay ,CardTitle , CardText} from 'reactstrap';

class MenuComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedDish : null
        };
    }

    onDishSelect(dish)
    {
        this.setState({
            selectedDish : dish
        });
    }

    displayDish(dish){
       if(dish != null)
            return (
                <card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardImgOverlay>
                </card>
            );
       
       else
           return (
               
                   <div></div>
               
           );
    }
    render() {
        const menu = this.props.dishes.map((dish) =>
        {
            return(
            <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
            </div>
            );
        }
        );
        return (
            <div className="container">
                <div className="row">
                        {menu}
                </div>
                <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.displayDish(this.state.selectedDish)}
                        </div>
                </div>
            </div>
        );
    }
}

export default MenuComponent;
