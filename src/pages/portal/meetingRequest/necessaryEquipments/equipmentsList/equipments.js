import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Table
} from "reactstrap";
import { Edit2, Trash, PlusCircle, Check, X } from "react-feather";
import { connect } from "react-redux";

import {
  RemoveEquipment,
  GetEquipmentsModal,
  AddEquipmentModal
} from "../../../../../redux/actions/meetingEquipmentsActions";
import * as types from "../../../../../redux/constants";
import "../../meetingRequest.css"



class EquipmentsList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            تجهیزات اطاق کنفرانس
          </CardTitle>
        </CardHeader>
        <CardBody >
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th style={{ width: "4%"}}>#</th>
                <th style={{ width: "55%", textAlign:'center' }}>نام تجهیز</th>
                <th style={{ width: "45%", textAlign:'center' }}>ثابت در سالن</th>
                <th style={{ width: "3%"}}/>
                <th style={{ width: "3%"}}/>
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.equipments && this.props.equipments.length > 0 ? (
                this.props.equipments.map((equipment, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%"}}>{index+1}</td>
                      <td style={{ width: "50%", textAlign:'center' }}>{equipment.name}</td>
                      <td style={{ width: "30%", textAlign:'center' }}>
                        { equipment.fixed ? (
                            <Check/>
                          ) : (
                            <X/>
                          )}
                      </td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getEquipmentsModal(equipment.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeEquipment(equipment.id)
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
                  this.props.addEquipmentModal()
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
    equipments: store.equipments.equipments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeEquipment: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveEquipment(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_COMPANY_MODAL
      }),
    getEquipmentsModal: id => {
      dispatch(GetEquipmentsModal(id))}, 
    addEquipmentModal: () => {
      dispatch(AddEquipmentModal())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentsList);
