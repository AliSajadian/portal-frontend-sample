import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import AsftDayMealsStatistics from "./asftDayMealsStatistics";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetProjectsList } from "../../../../redux/actions/projectsActions";


const Index = (props) => {
  useEffect(() => {
    props.getCompaniesList();
    props.getDepartmentsList();
    props.getProjects();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3"> انتخاب ماهیانه غذا </h1> */}
      <Row>
        <Col >
          <AsftDayMealsStatistics/>
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
    getProjects: () => dispatch(GetProjectsList()),
  }
}

export default connect(null, mapDispatchToProps)(Index);

