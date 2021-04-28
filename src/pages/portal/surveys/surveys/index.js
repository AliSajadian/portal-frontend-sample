import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import SurveysList from "./surveysList/surveys";
import { GetSurveysList } from "../../../../redux/actions/surveysActions";
import SurveyModal from "../surveys/surveyModal/surveyModal";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetSurveyTypesList } from "../../../../redux/actions/surveyTypesActions";
import SurveyDepartmentModal from "./surveyDepartmentModal/surveyDepartmentModal";
import { GetSurveyDepartmentsList } from "../../../../redux/actions/surveyDepartmentActions";



const Index = (props) => {

  useEffect(() => {
    props.getSurveyDepartmentsList();
    props.getSurveys();
    props.getDepartments();
    props.getSurveyTypes();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">Survey</h1> */}

      <Row>
        <Col >
          <SurveysList></SurveysList>
        </Col>
      </Row>

      <SurveyModal></SurveyModal>
      <SurveyDepartmentModal></SurveyDepartmentModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartments : () => dispatch(GetDepartmentsList()),
    getSurveyTypes : () => dispatch(GetSurveyTypesList()),
    getSurveys: () => dispatch(GetSurveysList()),
    getSurveyDepartmentsList: () => dispatch(GetSurveyDepartmentsList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
