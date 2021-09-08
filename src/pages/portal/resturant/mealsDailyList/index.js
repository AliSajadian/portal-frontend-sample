import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import MealsDailyList from "../mealsDailyList/mealsDailyList";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetProjectsList } from "../../../../redux/actions/projectsActions";



const Index = (props) => {
  useEffect(() => {
    props.getCompanysList();
    props.getDepartmentsList();
    props.getProjectsList();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">غذا</h1> */}
      <Row>
        <Col >
          <MealsDailyList/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanysList: () => dispatch(GetCompaniesList()),
    getDepartmentsList: () => dispatch(GetDepartmentsList()),
    getProjectsList: () => dispatch(GetProjectsList()),    
  }
}

export default connect(null, mapDispatchToProps)(Index);

