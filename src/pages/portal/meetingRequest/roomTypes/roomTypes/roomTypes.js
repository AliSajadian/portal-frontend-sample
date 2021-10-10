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
  RemoveRoomType,
  GetRoomTypesModal,
  AddRoomTypeModel
} from "../../../../../redux/actions/meetingRoomTypesAction";
import * as types from "../../../../../redux/constants";
import "../../meetingRequest.css"

 

class roomTypesList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            خدمات پذیرائی
          </CardTitle>
        </CardHeader>
        <CardBody >
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center' }}> نوع اتاق</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.roomTypes && this.props.roomTypes.length > 0 ? (
                this.props.roomTypes.map((roomType, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%"}}>{index+1}</td>
                      <td style={{ width: "90%", textAlign:'center' }}>{roomType.name}</td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getRoomTypesModal(roomType.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Trash 
                          onClick={() =>
                            this.props.removeRoomType(roomType.id)
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
                  this.props.addRoomTypeModel()
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
    roomTypes: store.roomTypes.roomTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeRoomType: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveRoomType(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_ROOMTYPE_MODAL
      }),
    getRoomTypesModal: id => {
      dispatch(GetRoomTypesModal(id))}, 
    addRoomTypeModel: () => {
      dispatch(AddRoomTypeModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(roomTypesList);
