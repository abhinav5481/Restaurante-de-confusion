import React, { Component } from 'react';
import { Card, CardBody, CardImg , CardImgOverlay ,CardTitle , CardText} from 'reactstrap';

class DishDetail extends Component {
    componentDidMount(){
        console.log("DishDetail ComponentDidMount invoked");
    }

    componentDidUpdate(){
        console.log("DishDetail ComponentDidUpdate invoked");
    }
    
    renderDish(dish){
        console.log("DishDetail render invoked");
        if(dish != null){
             return (
                 <card>
                     <CardImg top src={dish.image} alt={dish.name} className="mb-1" />
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>         
                 </card>  
             );}
        
        else
            return (
                    <div></div>
            );
     }

     renderComments(dish){

         if(dish != null)

             {
                 return (
                 dish.comments.map((comment) =>{
                     return(
                         <div key = {comment.id} className="list-unstyled">
                             <li>
                                 {comment.comment}<br>
                                 </br>
                                 -- {comment.author} , {comment.date}
                             </li>
                         </div>

                     )
                 }
                 )
              );}
        
         else
            return (
                     <div></div>
             );
     }

   
     

    render() {
        const {selectedDish} = this.props; 
        return (
            <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-5 m-1">
            { this.renderDish(this.props.selectedDish) }
            </div>
             <div className="col-xs-12 col-md-5 m-1">
             <h4>Comments</h4>
            { this.renderComments(this.props.selectedDish) }
            </div> 
            
            </div> 
            </div>
                       
          
        )
    }
}

export default DishDetail;
