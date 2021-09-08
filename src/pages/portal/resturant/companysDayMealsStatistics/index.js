import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import CompanysDayMealsStatistics from "./companysDayMealsStatistics";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";



const Index = (props) => {
  useEffect(() => {
    props.getCompaniesList();
    props.getDepartmentsList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3"> انتخاب ماهیانه غذا </h1> */}
      <Row>
        <Col >
          <CompanysDayMealsStatistics/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompaniesList: () => dispatch(GetCompaniesList()),
    getDepartmentsList: () => dispatch(GetDepartmentsList()),
  }
}

export default connect(null, mapDispatchToProps)(Index);

