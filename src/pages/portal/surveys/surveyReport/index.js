import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import SurveyReport from "../surveyReport/surveyReport/surveyReport";
import { GetUsedSurveysList } from "../../../../redux/actions/surveysActions";
import { GetOptionalQuestions } from "../../../../redux/actions/optionalQuestionsActions";
import { GetUserAnswers } from "../../../../redux/actions/userSurveyActions";
import { GetOptionalQuestionsAnswer } from "../../../../redux/actions/optionalQuestionsActions";



const Index = (props) => {
  useEffect(() => {
    let userID = sessionStorage.getItem('userid')
    props.getUsedSurveys(userID);
    props.getOptionalQuestions();
    props.getUserAnswers();
    props.getOptionalAnswers();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">گزارش نظزسنجی</h1> */}
      <Row>
        <Col >
          <SurveyReport></SurveyReport>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsedSurveys: userID => dispatch(GetUsedSurveysList(userID)),
    getOptionalQuestions: () => dispatch(GetOptionalQuestions()),
    getUserAnswers: () => dispatch(GetUserAnswers()),
    getOptionalAnswers: () => dispatch(GetOptionalQuestionsAnswer())
  }
}

export default connect(null, mapDispatchToProps)(Index);

