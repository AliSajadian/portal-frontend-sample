import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import OptionalQuestions from "../optionalQuestions/optionalQuestions/optionalQuestions";
import { GetSurveysList } from "../../../../redux/actions/surveysActions";
import { GetOptionalQuestions, GetOptionalQuestionsAnswer } from "../../../../redux/actions/optionalQuestionsActions";



const Index = (props) => {
  useEffect(() => {
    props.getSurveys();
    props.getOptionalQuestions();
    props.getOptionalQuestionsAnswer();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      <h1 className="h4 mb-3" style={{fontWeight:'bold'}}>طراحی سوالات نظرسنجی</h1>
      <Row>
        <Col >
          <OptionalQuestions></OptionalQuestions>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSurveys: () => dispatch(GetSurveysList()),
    getOptionalQuestions: () => dispatch(GetOptionalQuestions()),
    getOptionalQuestionsAnswer: () => dispatch(GetOptionalQuestionsAnswer())
  }
}

export default connect(null, mapDispatchToProps)(Index);

