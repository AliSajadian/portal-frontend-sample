import React, { useState } from 'react';
import {  } from 'reactstrap';
import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    // Collapse,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardImg
} from "reactstrap";
import Container from "reactstrap/lib/Container";
import "./component.css"
import logo from "../assets/img/logos/Logo_bahavand.png";
import website from "../assets/img/links_images/bahavandwebsite.png"
import chargoon from "../assets/img/links_images/chargoon.png"
import bahavandkara from "../assets/img/links_images/kara.png"
import mail from "../assets/img/links_images/mail.PNG"



// const ModalEx = (props) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);
const BahavandLinkModal = (props) => {
  const {
    dialogClassName
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal); 

  return (
    <div >
        <img
            src={logo} onClick={toggle}
            className="avatar img-fluid rounded-circle mr-1"
            alt=""
            style={{height:"25px"}}
        />
      <Modal isOpen={modal} toggle={toggle} size='lg' className="model" dialogClassName={dialogClassName} >
        <ModalHeader toggle={toggle}>لینک سامانه ها</ModalHeader>
        <ModalBody>
    {/* <Collapse isOpen={isOpen} size='lg'> */}
        <Container>
        <Row>
        <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='link-card-header'>
                  وب سایت بهاوند
                </CardTitle>
              </CardHeader>
              <CardImg top width="100px" src={website} alt="Card image cap" />
              <CardBody>
                <a href="http://www.behavand.co/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div className="button">
                  <span >ورود</span>
                  </div>
                </a>
              </CardBody>
            </Card>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='link-card-header'>
                  اتوماسیون اداری چارگون
                </CardTitle>
              </CardHeader>
              <CardImg top width="100px" src={chargoon} alt="Card image cap" />
              <CardBody>
              <a href="http://behchargoon.asft.co/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div className="button">
                  <span >ورود</span>
                  </div>
                </a>                
              </CardBody>
          </Card>
          </Col>
        </Row>
        <Row>
          {/* <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='link-card-header'>
                  Web Cloud
                </CardTitle>
              </CardHeader>
              <CardImg top width="100px" src={webcloud} alt="Card image cap" />
              <CardBody>
              <a href="http://webcloud.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div className="button">
                  <span >ورود</span>
                  </div>
                </a>                
              </CardBody>
          </Card>http://karkard.behavand.co:8091/
          </Col> */}
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='link-card-header'>
                  سامانه کنترل کارکرد
                </CardTitle>
              </CardHeader>
              <CardImg top width="100px" src={bahavandkara} alt="Card image cap" />
              <CardBody>
              <a href="http://karkard.behavand.co:8091/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div className="button">
                  <span >ورود</span>
                  </div>
                </a>                   
              </CardBody>
            </Card>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='link-card-header'>
                  سامانه پست الکترونیک
                </CardTitle>
              </CardHeader>
              <CardImg top width="100px" src={mail} alt="Card image cap" />
              <CardBody>
              <a href="http://mail.behavand.co/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div className="button">
                  <span >ورود</span>
                  </div>
                </a>                   
              </CardBody>
            </Card>
          </Col>          
        </Row>
      </Container>


        </ModalBody> 
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
       </Modal>
      {/* </Collapse> */}
    </div>
  );
}

export default BahavandLinkModal;