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
      room_type: 1,
      name: "",
      capacity: 10,
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.RoomInEditStage){
        // console.log('this.props.RoomInEditStage: ', this.props.RoomInEditStage)
        // console.log('this.state.name: ', this.state.name)

        if(this.state.flag2 && this.props.RoomInEditStage.name !== this.state.name) { 
          this.setState({
            room_type: this.props.RoomInEditStage.room_type,
            name: this.props.RoomInEditStage.name, 
            capacity: this.props.RoomInEditStage.capacity,
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          room_type: 1,
          name: '',
          capacity: 10,
          flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    switch(event.target.name)
    {
      case 'name':
        this.setState({
          name: event.target.value, 
          flag2: this.props.RoomInEditStage ? false : true
        });
        return;
      case 'capacity':
        this.setState({
          capacity: event.target.value, 
          flag2: this.props.RoomInEditStage ? false : true
        });
        return;
      default:
        return;
    }

  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name, capacity, room_type } = this.state;
    const room_Add = { name, capacity, room_type};

    if (!this.props.RoomInEditStage) {
      this.props.addRoom(room_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.RoomInEditStage.id
      const room_Edit = { id, name, capacity, room_type};

      this.props.editRoom(room_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    const { room_type, name, capacity, isFormValid } = this.state;
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
                <label>نوع اتاق:</label>
                <br/>
                <select value={room_type ? room_type : 0} 
                onChange={(e) => this.setState({ room_type: e.target.value })}>
                {(this.props.roomTypes && this.props.roomTypes.length) > 0 ? (
                    this.props.roomTypes.map(roomType => <option key={roomType.id} value={roomType.id}>{roomType.name}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                <label>شماره اتاق:</label>
                <br/>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.InputChangeHandler}
                ></input>
                <br/>
                <label>ظرفیت اتاق:</label>
                <br/>
                <input
                  type="text"
                  name="capacity"
                  value={capacity}
                  onChange={this.InputChangeHandler}
                ></input>
                <br/>
                <br/>
                <Button
                  disabled={!isFormValid}
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
    RoomInEditStage: state.rooms.roomInEditStage,
    roomTypes: state.roomTypes.roomTypes,
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
