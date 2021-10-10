import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { connect } from "react-redux";

import {
  RemoveEmployee,
  GetEmployeesModal,
  AddEmployeeModel
} from "../../../../../redux/actions/employeesActions";
import * as types from "../../../../../redux/constants";
import { 
  EmployeeBaseTable 
} from "../../../../../components/tables/EmployeeBaseTable";
import '../../baseInfo.css'



const employeesList = (props) => {
  return (
    <Card className="card3D" >
      <CardHeader>
        <CardTitle tag="h5">
          لیست پرسنل
        </CardTitle>
      </CardHeader>
      <CardBody>
      <EmployeeBaseTable
          employees={props.employees.filter(emp => emp.id !== 1)}
          editEmployee={props.getEmployeesModal}
        />              
      </CardBody>
    </Card>
  );
}

const mapStateToProps = store => {
  return {
    jobPositions: store.jobPositions.jobPositions,
    projects: store.projects.projects,
    companies: store.companies.companies,
    departments: store.departments.departments,
    employees: store.employees.employeesEx,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeEmployee: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveEmployee(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_EMPLOYEE_MODAL
      }),
    getEmployeesModal: id => {
      dispatch(GetEmployeesModal(id))}, 
    addEmployeeModel: () => {
      dispatch(AddEmployeeModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(employeesList);
