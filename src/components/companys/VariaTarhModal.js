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
import logo from "../../assets/img/logos/Logo_VT.jpeg";
import website from "../../assets/img/links_images/vaiatarh.png"



// const ModalEx = (props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
const VariaTarhModal = (props) => {
  const {
    dialogClassName
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal); 

  return (
    <div >
        <img
            src={logo} onClick={toggle} 
            className="avatar img-fluid  mr-1"
            alt="" 
            style={{width:"45px", height:"25px"}}
        />
      <Modal isOpen={modal} toggle={toggle} size='lg' className="model" dialogClassName={dialogClassName} >
        <ModalHeader toggle={toggle}>لینک سامانه ها</ModalHeader>
        <ModalBody>
    {/* <Collapse isOpen={isOpen} size='lg'> rounded-circle*/}
        <Container>
        <Row>
        <Col sm={{ size: 'auto', offset: 1 }}>
            <Card className="link-card" dir="rtl">
              <CardHeader className="card-header">
                <CardTitle tag="h5" className='link-card-header'>
                  وب سایت وریا طرح
                </CardTitle>
              </CardHeader>
              <CardImg top width="100px" src={website} alt="Card image cap" />
              <CardBody>
                <a href="http://www.variatp.com//" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
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

export default VariaTarhModal;