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
  RemoveDepartment,
  GetDepartmentsModal,
  AddDepartmentModel
} from "../../../../../redux/actions/departmentsActions";
import * as types from "../../../../../redux/constants";
import { CompanyChildBaseTable } from "../../../../../components/tables/CompanyChildBaseTable";
import '../../baseInfo.css'


const departmentsList = (props) => {
  return (
    <Card className="card3D">
      <CardHeader>
        <CardTitle tag="h5">
          دپارتمانها
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CompanyChildBaseTable
          parentRecords={props.companies}
          childRecords={props.departments}
          header={'دپارتمان'}
          editRecord={props.getDepartmentsModal}
          removeRecord={props.removeDepartment}
        />        
        <PlusCircle
            onClick={() =>
              props.addDepartmentModel()
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
    companies: store.companies.companies,
    departments: store.departments.departments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDepartment: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveDepartment(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_DEPARTMENT_MODAL
      }),
    getDepartmentsModal: id => {
      dispatch(GetDepartmentsModal(id))}, 
    addDepartmentModel: () => {
      dispatch(AddDepartmentModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(departmentsList);
