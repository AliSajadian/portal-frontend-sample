// import React, { Component } from "react";
// import {
//   Link
// } from 'react-router-dom';
// import {
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   CardImg
// } from "reactstrap";
// import { connect } from "react-redux";
// import Container from "reactstrap/lib/Container";
// import "../index.css"
// import website from "../../../../../assets/img/links_images/asftwebsite.png"
// import pmrs from "../../../../../assets/img/links_images/pmrs.png"
// import pmis from "../../../../../assets/img/links_images/pmis.png"
// import chargoon from "../../../../../assets/img/links_images/chargoon.png"
// import webcloud from "../../../../../assets/img/links_images/webcloud.png"
// import mail from "../../../../../assets/img/links_images/mail.png"



// class AsftLinks extends Component {
//   render = () => {
//     return (
//       <Container>
//         <Row>
//         <Col sm={{ size: 'auto', offset: 1 }}>
//             <Card className="card" dir="rtl">
//               <CardHeader className="card-header">
//                 <CardTitle tag="h5" className="mb-0" style={{fontWeight: "bold", textAlign:"center"}}>
//                   وب سایت آسفالت طوس
//                 </CardTitle>
//               </CardHeader>
//               <CardImg top width="100px" src={website} alt="Card image cap" />
//               <CardBody>
//                 <a href="http://www.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
//                   <div className="button">
//                   <span >ورود</span>
//                   </div>
//                 </a>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col sm={{ size: 'auto', offset: 1 }}>
//             <Card className="card" dir="rtl">
//               <CardHeader className="card-header">
//                 <CardTitle tag="h5" className="mb-0" style={{fontWeight: "bold", textAlign:"center"}}>
//                   اتوماسیون اداری چهارگون
//                 </CardTitle>
//               </CardHeader>
//               <CardImg top width="100px" src={chargoon} alt="Card image cap" />
//               <CardBody>
//               <a href="http://chargoon.asft.co/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
//                   <div className="button">
//                   <span >ورود</span>
//                   </div>
//                 </a>                
//               </CardBody>
//           </Card>
//           </Col>
//           <Col sm={{ size: 'auto', offset: 1 }}>
//             <Card className="card" dir="rtl">
//               <CardHeader className="card-header">
//                 <CardTitle tag="h5" className="mb-0" style={{fontWeight: "bold", textAlign:"center"}}>
//                   سامانه پوپک
//                 </CardTitle>
//               </CardHeader>
//               <CardImg top width="100px" src={pmis} alt="Card image cap" />
//               <CardBody>
//               <a href="http://pmis.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
//                   <div className="button">
//                   <span >ورود</span>
//                   </div>
//                 </a>                   
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//         <Row>
//         <Col sm={{ size: 'auto', offset: 1 }}>
//             <Card className="card" dir="rtl">
//               <CardHeader className="card-header">
//                 <CardTitle tag="h5" className="mb-0" style={{fontWeight: "bold", textAlign:"center"}}>
//                   سامانه کنترل پروژه ها
//                 </CardTitle>
//               </CardHeader>
//               <CardImg top width="100px" src={pmrs} alt="Card image cap" />
//               <CardBody>
//                 <a href="http://pmrs.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
//                   <div className="button">
//                   <span >ورود</span>
//                   </div>
//                 </a>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col sm={{ size: 'auto', offset: 1 }}>
//             <Card className="card" dir="rtl">
//               <CardHeader className="card-header">
//                 <CardTitle tag="h5" className="mb-0" style={{fontWeight: "bold", textAlign:"center"}}>
//                   Web Cloud
//                 </CardTitle>
//               </CardHeader>
//               <CardImg top width="100px" src={webcloud} alt="Card image cap" />
//               <CardBody>
//               <a href="http://webcloud.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
//                   <div className="button">
//                   <span >ورود</span>
//                   </div>
//                 </a>                
//               </CardBody>
//           </Card>
//           </Col>
//           <Col sm={{ size: 'auto', offset: 1 }}>
//             <Card className="card" dir="rtl">
//               <CardHeader className="card-header">
//                 <CardTitle tag="h5" className="mb-0" style={{fontWeight: "bold", textAlign:"center"}}>
//                   سامانه پست الکترونیک
//                 </CardTitle>
//               </CardHeader>
//               <CardImg top width="100px" src={mail} alt="Card image cap" />
//               <CardBody>
//               <a href="http://mail.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
//                   <div className="button">
//                   <span >ورود</span>
//                   </div>
//                 </a>                   
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     )}
// }

// const mapStateToProps = store => {
//   return {
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AsftLinks);