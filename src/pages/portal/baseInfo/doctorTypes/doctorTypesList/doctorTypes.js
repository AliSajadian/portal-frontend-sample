import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import { Edit2, Trash, PlusCircle } from "react-feather";
import { connect } from "react-redux";
import {
  RemoveDoctorType,
  GetDoctorTypesModal,
  AddDoctorTypeModel
} from "../../../../../redux/actions/doctorTypesActions";
import * as types from "../../../../../redux/constants";
import '../../baseInfo.css'

 

class doctorTypesList extends Component {
  render = () => {
    return (
      <Card>
        <CardHeader className="card3D">
          <CardTitle tag="h5" className="mb-0">
            انواع پزشک
          </CardTitle>
        </CardHeader>
        <CardBody className="card-body">
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center' }}>نوع</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.doctorTypes.length > 0 ? (
                this.props.doctorTypes.map((doctorType, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index+1}</td>
                      <td style={{ width: "100%", textAlign:'center' }}>{doctorType.name}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getDoctorTypesModal(doctorType.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeDoctorType(doctorType.id)
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
          <PlusCircle
              onClick={() =>
                this.props.addDoctorTypeModel()
              }
              className="align-middle"
              size={18}
          />
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    doctorTypes: store.doctorTypes.doctorTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDoctorType: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveDoctorType(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_DOCTORTYPE_MODAL
      }),
    getDoctorTypesModal: id => {
      dispatch(GetDoctorTypesModal(id))}, 
    addDoctorTypeModel: () => {
      dispatch(AddDoctorTypeModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(doctorTypesList);
