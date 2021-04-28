import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import DepartmentsList from "../departments/departmentsList/departments";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import DepartmentModal from "../departments/departmentsModal/deparmentsModal";


const Index = (props) => {

  useEffect(() => {
    props.getDepartments();
    props.getCompanies();
  }, []);

  return (
    <Container  className="p-0">
      {/* <h1 className="h3 mb-3">دپارتمان</h1> */}

      <Row>
        <Col>
          <DepartmentsList></DepartmentsList>
        </Col>
      </Row>
      
      <DepartmentModal></DepartmentModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartments: () => dispatch(GetDepartmentsList()),
    getCompanies: () => dispatch(GetCompaniesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
