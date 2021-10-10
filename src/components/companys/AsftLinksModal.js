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
import "../component.css"
import logo from "../../assets/img/logos/logo.png";
import website from "../../assets/img/links_images/asftwebsite.png"
import pmrs from "../../assets/img/links_images/pmrs.png"
import pmis from "../../assets/img/links_images/pmis.png"
import chargoon from "../../assets/img/links_images/chargoon.png"
import webcloud from "../../assets/img/links_images/webcloud.png"
import mail from "../../assets/img/links_images/mail.PNG"



// const ModalEx = (props) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);
const AsftLinksModal = (props) => {
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
            style={{width:"45px", height:"45px"}}
        />
      <Modal isOpen={modal} toggle={toggle} size='lg'  dialogClassName={dialogClassName} className="modal-main">
        <ModalHeader toggle={toggle} className="modal-header">لینک سامانه ها</ModalHeader>
        <ModalBody className="modal-body">
    {/* <Collapse isOpen={isOpen} size='lg'> */}
        <Container>
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='card-title'>
                  وب سایت آسفالت طوس
                </CardTitle>
              </CardHeader>
              <CardImg top src={website} alt="Card image cap" />
              <CardBody className='card-body'>
                <a href="http://www.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} >
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
                <CardTitle tag="h5" className='card-title'>
                  اتوماسیون اداری چارگون
                </CardTitle>
              </CardHeader>
              <CardImg top src={chargoon} alt="Card image cap" />
              <CardBody>
              <a href="http://chargoon.asft.co/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} >
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
                <CardTitle tag="h5" className='card-title'>
                  سامانه پوپک
                </CardTitle>
              </CardHeader>
              <CardImg top src={pmis} alt="Card image cap" />
              <CardBody>
              <a href="http://pmis.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <div className="button">
                  <span >ورود</span>
                  </div>
                </a>                   
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='card-title'>
                  سامانه کنترل پروژه ها
                </CardTitle>
              </CardHeader>
              <CardImg top src={pmrs} alt="Card image cap" />
              <CardBody>
                <a href="http://pmrs.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
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
                <CardTitle tag="h5" className='card-title'>
                  Web Cloud
                </CardTitle>
              </CardHeader>
              <CardImg top src={webcloud} alt="Card image cap" />
              <CardBody>
              <a href="http://webcloud.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
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
                <CardTitle tag="h5" className='card-title'>
                  سامانه پست الکترونیک
                </CardTitle>
              </CardHeader>
              <CardImg top src={mail} alt="Card image cap" />
              <CardBody>
              <a href="http://mail.asfalt-tous.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} >
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

export default AsftLinksModal;