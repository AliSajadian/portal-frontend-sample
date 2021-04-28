import React, {Component} from "react";
import { 
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card, 
    CardBody, 
    Button,
 } from "reactstrap";
import { connect } from "react-redux";
import {
    AlertModalToggler,
} from "../redux/actions/alertActions";
import "./component.css"



class AlertModal extends Component {
    hideModal = () => {
        console.log('hide model fired')
        this.props.modalToggleHandler()
    }
    render = () => {
        return (
            <Modal fade={true} contentClassName="alert-container" style={{direction:'rtl'}}
                size="sm"
                centered
                isOpen={this.props.isOpen}
                toggle={this.props.modalToggleHandler}
            >
                <ModalHeader className ="alert-header" style={{direction:'ltr', height:'25px'}} >
                <span className="alert-header-text">توجه</span>
                </ModalHeader>
                <ModalBody className ="alert-body" style={{ textAlign: "center" }}>
                <Card style={{height:'80px'}}>
                    <CardBody>
                        <span style={{fontWeight:'bold'}}>{this.props.message}</span>
                    </CardBody>
                </Card>
                </ModalBody>
                <ModalFooter className="alert-footer">
                    <Button size="sm" color="info" onClick={() => this.hideModal()} style={{fontWeight: 'bold'}}>بستن</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
// Customizing the Modal:
// Making the modal match your brand and design is simple. 
// Use the same methods available for any react component to style a modal, including any CSS-in-js solution, 
// standard CSS, and CSS Modules. If you need to add a class to the modal dialog, use the dialogClassName property.

const mapStateToProps = state => {
    return {
      isOpen: state.alert.isModalOpen,
      message: state.alert.message,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      modalToggleHandler: () => dispatch(AlertModalToggler()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AlertModal);