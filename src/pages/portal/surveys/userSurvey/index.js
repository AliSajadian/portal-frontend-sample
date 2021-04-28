import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import UserSurvey from "../userSurvey/userSurvey/userSurvey";
import { GetUnusedSurveysList } from "../../../../redux/actions/surveysActions";
import { GetOptionalQuestions, GetOptionalQuestionsAnswer } from "../../../../redux/actions/optionalQuestionsActions";



const Index = (props) => {
  useEffect(() => {
    let user = sessionStorage.getItem('userid')
    props.getUnusedSurveysList(user);
    props.getOptionalQuestions();
    props.getOptionalQuestionsAnswer();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">نظرسنجی</h1> */}
      <Row>
        <Col >
          <UserSurvey></UserSurvey>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUnusedSurveysList: userID => dispatch(GetUnusedSurveysList(userID)),
    getOptionalQuestions: () => dispatch(GetOptionalQuestions()),
    getOptionalQuestionsAnswer: () => dispatch(GetOptionalQuestionsAnswer())
  }
}

export default connect(null, mapDispatchToProps)(Index);

