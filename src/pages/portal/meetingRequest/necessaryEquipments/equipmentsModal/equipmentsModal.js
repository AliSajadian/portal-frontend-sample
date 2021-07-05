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
      fixed: false,
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.EquipmentInEditStage){
        // console.log('this.props.EquipmentInEditStage.name: ', this.props.EquipmentInEditStage.name)
        // console.log('this.state.name: ', this.state.name)

        if(this.state.flag2 && this.props.EquipmentInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.EquipmentInEditStage.name, 
            fixed: this.props.EquipmentInEditStage.fixed, 
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '',
          fixed: false,
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

  onChangeHandler = event => { 
    switch(event.target.name)
    {
      case 'fixed':
        this.setState({
          fixed: !this.state.fixed
        });
        return;
      case 'name':
        this.setState({
          name: event.target.value, 
          flag2: this.props.EmployeeInEditStage ? false : true
        });
        return;
      default:
        return;
    }
  }

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name, fixed } = this.state;
    const equipment_Add = { name, fixed};

    if (!this.props.EquipmentInEditStage) {
      this.props.addEquipment(equipment_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.EquipmentInEditStage.id
      const equipment_Edit = { id, name, fixed};

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
              <label>تجهیز: </label>
                <br/>                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <label>ثابت در اطاق: </label>
                <br/>
                <label>
                  <input 
                    type="checkbox"
                    name="fixed"
                    checked={this.state.fixed}
                    onChange={this.onChangeHandler}
                  />
                  <span>   </span>
                </label>
                <br/>
                <br/>
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
