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
  RemoveCaterType,
  GetCaterTypesModal,
  AddCaterTypeModel
} from "../../../../../redux/actions/meetingCaterTypesActions";
import * as types from "../../../../../redux/constants";
import "../../meetingRequest.css"

 

class CaterTypesList extends Component {
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
                <th style={{ width: "100%", textAlign:'center' }}> نام سرویس پذیرائی</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.caterTypes && this.props.caterTypes.length > 0 ? (
                this.props.caterTypes.map((caterType, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%"}}>{index+1}</td>
                      <td style={{ width: "90%", textAlign:'center' }}>{caterType.name}</td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getCaterTypesModal(caterType.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Trash 
                          onClick={() =>
                            this.props.removeCaterType(caterType.id)
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
                  this.props.addCaterTypeModel()
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
    caterTypes: store.caterTypes.caterTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeCaterType: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveCaterType(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_COMPANY_MODAL
      }),
    getCaterTypesModal: id => {
      dispatch(GetCaterTypesModal(id))}, 
    addCaterTypeModel: () => {
      dispatch(AddCaterTypeModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaterTypesList);
