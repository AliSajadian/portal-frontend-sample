import React, { Component } from "react";
// import { Link } from "react-router-dom";
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
  RoomModalToggler,
  AddRoom,
  EditRoom
} from "../../../../../redux/actions/meetingRoomsActions";


class RoomModal extends Component {
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
      if (this.props.RoomInEditStage){
        console.log('this.props.RoomInEditStage.name: ', this.props.RoomInEditStage.name)
        console.log('this.state.name: ', this.state.name)

        if(this.state.flag2 && this.props.RoomInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.RoomInEditStage.name, 
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
      flag2: this.props.RoomInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const room_Add = { name};

    if (!this.props.RoomInEditStage) {
      this.props.addRoom(room_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.RoomInEditStage.id
      const room_Edit = { id, name};

      this.props.editRoom(room_Edit);
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
          ویرایش اطاق کنفرانس
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
    isOpen: state.rooms.isModalOpen,
    RoomInEditStage: state.rooms.roomInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(RoomModalToggler()),
    addRoom: model => dispatch(AddRoom(model)),
    editRoom: model => dispatch(EditRoom(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomModal);
