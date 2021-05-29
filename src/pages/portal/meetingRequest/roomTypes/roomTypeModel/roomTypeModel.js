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
  RoomTypeModalToggler,
  AddRoomType,
  EditRoomType
} from "../../../../../redux/actions/meetingRoomTypesActions";



class RoomTypeModal extends Component {
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
      if (this.props.RoomTypeInEditStage){
        console.log('this.props.RoomTypeInEditStage.name: ', this.props.RoomTypeInEditStage.name)
        console.log('this.state.name: ', this.state.name)

        if(this.state.flag2 && this.props.RoomTypeInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.RoomTypeInEditStage.name, 
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
      flag2: this.props.RoomTypeInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const roomType_Add = { name};

    if (!this.props.RoomTypeInEditStage) {
      this.props.addRoomType(roomType_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.RoomTypeInEditStage.id
      const roomType_Edit = { id, name};

      this.props.editRoomType(roomType_Edit);
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
          ویرایش سرویس پذیرائی
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
    isOpen: state.roomTypes.isModalOpen,
    RoomTypeInEditStage: state.roomTypes.roomTypeInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(RoomTypeModalToggler()),
    addRoomType: model => dispatch(AddRoomType(model)),
    editRoomType: model => dispatch(EditRoomType(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeModal);
