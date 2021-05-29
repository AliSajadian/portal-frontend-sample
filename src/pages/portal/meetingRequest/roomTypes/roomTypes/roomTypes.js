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
  RemoveroomType,
  GetroomTypesModal,
  AddroomTypeModel
} from "../../../../../redux/actions/meetingroomTypesActions";
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
                            this.props.getroomTypesModal(roomType.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Trash 
                          onClick={() =>
                            this.props.removeroomType(roomType.id)
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
                  this.props.addroomTypeModel()
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
    removeroomType: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveroomType(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_COMPANY_MODAL
      }),
    getroomTypesModal: id => {
      dispatch(GetroomTypesModal(id))}, 
    addroomTypeModel: () => {
      dispatch(AddroomTypeModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(roomTypesList);
