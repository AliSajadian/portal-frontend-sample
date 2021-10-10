import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { PlusCircle } from "react-feather";
import { connect } from "react-redux";
import {
  RemoveDoctor,
  GetDoctorsModal,
  AddDoctorModel
} from "../../../../../redux/actions/doctorsActions";
import * as types from "../../../../../redux/constants";
import { DoctorTypeChildBaseTable } from "../../../../../components/tables/DoctorTypeChildBaseTable";
import '../../baseInfo.css'

 

const doctorsList = (props) => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            پزشکان
          </CardTitle>
        </CardHeader>
        <CardBody>
          <DoctorTypeChildBaseTable
            parentRecords={props.doctorTypes}
            childRecords={props.doctors}
            childName={props.employees}
            header={'پزشک'}
            editRecord={props.getDoctorsModal}
            removeRecord={props.removeDoctor}
          />            
          <PlusCircle
              onClick={() =>
                props.addDoctorModel()
              }
              className="align-middle"
              size={18}
          />
        </CardBody>
      </Card>
    );
}

const mapStateToProps = store => {
  return {
    employees: store.employees.employees,
    doctorTypes: store.doctorTypes.doctorTypes,
    doctors: store.doctors.doctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDoctor: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveDoctor(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_DOCTOR_MODAL
      }),
    getDoctorsModal: id => {
      dispatch(GetDoctorsModal(id))}, 
    addDoctorModel: () => {
      dispatch(AddDoctorModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(doctorsList);
