import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";

import EmployeesList from "../employees/employeesList/employees";
import { GetEmployeesList } from "../../../../redux/actions/employeesActions";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetProjectsList } from "../../../../redux/actions/projectsActions";
import { GetJobPositionsList } from "../../../../redux/actions/jobPositionsActions";
import EmployeeModal from "../employees/employeesModal/employeesModal";


const Index = (props) => {

  useEffect(() => {
    props.getEmployees();
    props.getCompanies();
    props.getDepartments();
    props.getProjects();
    props.getJobPositions();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">پرسنل</h1> */}

      <Row>
        <Col>
          <EmployeesList></EmployeesList>
        </Col>
      </Row>
      
      <EmployeeModal ></EmployeeModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: () => dispatch(GetEmployeesList()),
    getCompanies: () => dispatch(GetCompaniesList()),
    getDepartments: () => dispatch(GetDepartmentsList()),
    getProjects: () => dispatch(GetProjectsList()),
    getJobPositions: () => dispatch(GetJobPositionsList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
