import React, { Component } from 'react';
import { Card, CardBody, CardImg , CardImgOverlay ,CardTitle , CardText,Breadcrumb, BreadcrumbItem , Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label,Row,Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control ,LocalForm ,Errors} from 'react-redux-form';


const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);


function RenderDish({dish}) {
    if (dish != null) {
      return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }


 const RenderComments = (comments) => {

    if(comments != null)

        {
            return (
            comments.comments.map((comment) =>{
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

class  CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalopen: false
          }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal(){
        this.setState(
         { 
           isModalOpen : !this.state.isModalOpen
        }
          );
      }
      handleSubmit(values){
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    
render(){
    return (
        <div>
             <Button outline onClick={this.toggleModal} >
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
         <ModalHeader  toggle={this.toggleModal}> Submit Comment</ModalHeader>
         <ModalBody>
         <LocalForm onSubmit= {values => this.handleSubmit(values)}>
                             <Row className="form-group">
                                <Label htmlFor="rating" className="ml-3">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control ml-3 mr-3"
                                     >
                                      <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                     </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" className="ml-3">Your Name</Label>
                                <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control ml-3 mr-3" 
                                validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)}}
                                    />
                                     <Errors className ="text-danger ml-3" model=".name" show="touched" messages={{
                                        minLength:'Must be greater than 2 characters',maxLength: 'Must be 15 characters or less'
                                        }} />
                            </Row>
                          
                            <Row className="form-group">
                                <Label htmlFor="comment" className="ml-3">Comment</Label>
                                <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"
                                      />
                                      </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
         </ModalBody>
       </Modal>
        </div>
    )
}
}

class DishDetail extends Component {
   
     
    render() {
        // const {dish} = this.props; 
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={this.props.comments} /><br/>
                       <CommentForm />
                        
                    </div>
                </div>
                </div>           
          
        )
    }
}

export default DishDetail;
