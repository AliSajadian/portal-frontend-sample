import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import SurveyTypesList from "../surveyTypes/surveyTypesList/surveyTypes";
import { GetSurveyTypesList } from "../../../../redux/actions/surveyTypesActions";
import SurveyTypeModal from "../surveyTypes/surveyTypeModal/surveyTypeModal";


const Index = (props) => {

  useEffect(() => {
    props.getSurveyTypes();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">نوع نظرسنجی</h1> */}

      <Row>
        <Col>
          <SurveyTypesList></SurveyTypesList>
        </Col>
      </Row>
      
      <SurveyTypeModal></SurveyTypeModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSurveyTypes: () => dispatch(GetSurveyTypesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
