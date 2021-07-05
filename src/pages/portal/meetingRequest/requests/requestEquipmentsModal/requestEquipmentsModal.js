import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";

import {
  RequestEquipmentModalToggler,
} from "../../../../../redux/actions/meetingRequestsActions";


class RoomEquipmentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      description: "",
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.requestEquipmentInEditStage){
        console.log('this.props.requestEquipmentInEditStage: ', this.props.requestEquipmentInEditStage)
        // console.log('this.state.description: ', this.state.description)

        if(this.state.flag2 && this.props.requestEquipmentInEditStage.description !== this.state.description) { 
          this.setState({
            qty: this.props.requestEquipmentInEditStage.qty, 
            description: this.props.requestEquipmentInEditStage.description, 
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.description !== ''){
        this.setState({
          description: '',
          flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      description: String(event.target.value), 
      flag2: this.props.requestEquipmentInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    this.props.modalToggleHandler()
    this.props.onSave(this.props.requestEquipmentInEditStage === null ? false : true, this.state.qty, this.state.description)
    this.setState({
      qty: 1,
      description: '',
      flag: true,
      flag2: true,
    })
  };

  CancelHandler = () => {
    this.props.modalToggleHandler()
    this.props.onClose(this.props.requestEquipmentInEditStage === null ? false : true, )
    this.setState({
      qty: 1,
      description: '',
      flag: true,
      flag2: true,
    })  
  }

  render = () => {
    const { qty, description } = this.state
    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader  style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
        اطلاعات درخواست تجهیزات سالن
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler} style={{paddingTop:'.2em', paddingBottom:'.2em'}}>
                <Row>
                  <Col>
                  تعداد :
                  </Col>
                  <Col>
                    <input
                      type="text"
                      name="qty"
                      value={qty}
                      onChange={(e) => this.setState({ qty: Number(e.target.value), flag2: this.props.requestEquipmentInEditStage ? false : true })}
                    ></input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  توضیحات :
                  </Col>
                  <Col>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <textarea  
                        style={{width:'100%', height:'100px', textAlign:'right', fontSize:'1em', backgroundColor: "whitesmoke", marginBottom:'.2em'}}  
                        value={description} 
                        onChange={(e) => this.InputChangeHandler(e)}
                        >
                    </textarea>  
                  </Col>
                </Row>
                <Row style={{marginTop:'.2em', marginBottom:'.2em'}}>
                  <Col>
                    <Button style={{width:'100px', height:'27px'}}
                      disabled={!this.state.isFormValid}
                      type="submit"
                      color="success"
                    >
                      تائید
                    </Button>                  
                  </Col>
                  <Col>
                    <Button style={{width:'100px', height:'27px'}}
                      onClick={() => this.CancelHandler()}
                      color="danger"
                    >
                      انصراف
                    </Button>                    
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  };
}

const mapStateToProps = state => {
  return {
    isOpen: state.requests.isreModalOpen,
    requestEquipmentInEditStage: state.requests.requestEquipmentInEditStage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(RequestEquipmentModalToggler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomEquipmentsModal);
