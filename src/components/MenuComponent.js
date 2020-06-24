

// *************************************MENU COMPONENT AS CLASS COMPONENT ************************************************************
// import React, { Component } from 'react';
// import { Card, CardBody, CardImg , CardImgOverlay ,CardTitle , CardText} from 'reactstrap';


// class MenuComponent extends Component {

//     constructor(props){
//         super(props);
//         console.log("Menu Component Constructor is invoked");
       
//     }

//     componentDidMount(){
//         console.log("Menu ComponentDidMount invoked");
//     }

//     render() {
//         console.log("Menu Component Render is invoked");
//         const menu = this.props.dishes.map((dish) =>
//         {
//             return(
//             <div  className="col-12 col-md-5 m-1">
//                 <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
//                   <CardImg width="100%" src={dish.image} alt={dish.name} />
//                   <CardImgOverlay>
//                       <CardTitle>{dish.name}</CardTitle>
//                   </CardImgOverlay>
//                 </Card>
//             </div>
//             );
//         }
//         );
//         return (
//                 <div className="container">
//                 <div className="row">
//                         {menu}
//                 </div>
//                 </div>
             
                
           
//         );
//     }
// }

// export default MenuComponent;



//************************************************MENU COMPONENT AS FUNCTIONAL COMPONENT ******************************************************

 import React from 'react';
 import { Card, CardBody, CardImg , CardImgOverlay ,CardTitle , CardText, Breadcrumb ,BreadcrumbItem} from 'reactstrap';
 import { Link } from 'react-router-dom';

 function RenderMenuItems({dish ,onClick}){
     return(
        // <Card key={dish.id} onClick={() => onClick(dish.id)}> Before React Router
         <Card key={dish.id}>
         <Link to={`/menu/${dish.id}`}>
                           <CardImg width="100%" src={dish.image} alt={dish.name} />
                           <CardImgOverlay>
                              <CardTitle>{dish.name}</CardTitle>
                          </CardImgOverlay>
                          </Link>
      </Card>
     );
 }

 const Menu = (props) => {

    const menu = props.dishes.map((dish) =>
            {
                return(
                 <div  className="col-12 col-md-5 m-1">
                     <RenderMenuItems dish={dish} />
                 </div>
                 );
             }
             );
             return (
                     <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem> <Link to='/home'>Home</Link>   </BreadcrumbItem>
                                <BreadcrumbItem> <Link active>Menu</Link>   </BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>Menu</h3>
                                <hr />
                            </div>
                      
                     </div>
                     <div className="row">
                             {menu}
                 </div>
                 </div>
                 
                    
               
             );
 }

 export default Menu