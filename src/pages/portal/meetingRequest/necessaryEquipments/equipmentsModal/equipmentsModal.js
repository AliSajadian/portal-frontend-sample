import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Card,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";

import {
  EquipmentModalToggler,
  AddEquipment,
  EditEquipment
} from "../../../../../redux/actions/meetingEquipmentsActions";


class EquipmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.EquipmentInEditStage){
        console.log('this.props.EquipmentInEditStage.name: ', this.props.EquipmentInEditStage.name)
        console.log('this.state.name: ', this.state.name)

        if(this.state.flag2 && this.props.EquipmentInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.EquipmentInEditStage.name, 
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '',
          flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      name: event.target.value, 
      flag2: this.props.EquipmentInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const equipment_Add = { name};

    if (!this.props.EquipmentInEditStage) {
      this.props.addEquipment(equipment_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.EquipmentInEditStage.id
      const equipment_Edit = { id, name};

      this.props.editEquipment(equipment_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader  style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش تجهیز اطاق کنفرانس
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.InputChangeHandler}
                ></input>
                <Button
                  disabled={!this.state.isFormValid}
                  type="submit"
                  color="success"
                >
                  تائید
                </Button>
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
    isOpen: state.equipments.isModalOpen,
    EquipmentInEditStage: state.equipments.equipmentInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(EquipmentModalToggler()),
    addEquipment: model => dispatch(AddEquipment(model)),
    editEquipment: model => dispatch(EditEquipment(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentModal);
