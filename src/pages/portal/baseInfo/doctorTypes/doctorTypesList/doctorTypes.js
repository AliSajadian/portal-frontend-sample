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
  RemoveDoctorType,
  GetDoctorTypesModal,
  AddDoctorTypeModel
} from "../../../../../redux/actions/doctorTypesActions";
import * as types from "../../../../../redux/constants";
import { BaseTable } from "../../../../../components/tables/BaseTable";
import '../../baseInfo.css'


const columnList = [
    {
        Header: 'نوع پزشک',
        accessor: 'name',
        maxWidth: '90%',
        minWidth: '80%',
        width: '85%',
    },
]
const doctorTypesList = (props) => {
    return (
      <Card>
        <CardHeader className="card3D">
          <CardTitle tag="h5" className="mb-0">
            انواع پزشک
          </CardTitle>
        </CardHeader>
        <CardBody className="card-body">
          <BaseTable
          dataRecords={props.doctorTypes}
          columnList={columnList}
          editRecord={props.getDoctorTypesModal}
          removeRecord={props.removeDoctorType}
          />
          <PlusCircle
              onClick={() =>
                props.addDoctorTypeModel()
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
    doctorTypes: store.doctorTypes.doctorTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDoctorType: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
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
