import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Table
} from "reactstrap";
import { Edit2, Trash, PlusCircle } from "react-feather";
import { connect } from "react-redux";

import {
  RemoveRoom,
  GetRoomsModal,
  AddRoomModel
} from "../../../../../redux/actions/meetingRoomsActions";
import * as types from "../../../../../redux/constants";

 

class RoomsList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
          اطاق های کنفرانس
          </CardTitle>
        </CardHeader>
        <CardBody >
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center' }}>شماره اطاق</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.rooms && this.props.rooms.length > 0 ? (
                this.props.rooms.map((room, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%"}}>{index+1}</td>
                      <td style={{ width: "90%", textAlign:'center' }}>{room.name}</td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getRoomsModal(room.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeRoom(room.id)
                          }
                          className="align-middle "
                          size={18}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td>not found</td></tr>
              )}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <PlusCircle
                onClick={() =>
                  this.props.addRoomModel()
                  // this.generateCode()
                }
                className="align-middle"
                size={18}
            />
        </CardFooter>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    rooms: store.rooms.rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeRoom: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveRoom(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_COMPANY_MODAL
      }),
    getRoomsModal: id => {
      dispatch(GetRoomsModal(id))}, 
    addRoomModel: () => {
      dispatch(AddRoomModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);
