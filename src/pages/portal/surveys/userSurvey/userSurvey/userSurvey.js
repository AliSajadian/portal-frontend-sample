import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle, 
    Container,
    Row,
    Col,
    Button,
    // Table
} from "reactstrap";
import AutosizeInput from 'react-input-autosize';
import {
  AddUserAnswer
} from "../../../../../redux/actions/userSurveyActions";
import {
  EditSurveyReport
} from "../../../../../redux/actions/optionalQuestionsActions";
import { 
  GetUnusedSurveysList 
} from "../../../../../redux/actions/surveysActions";
import '../../surveys.css'



class userSurvey extends Component {
  constructor(props){
    super(props)

    this.state = {
        survey: null,
        userAnswers: [],
        answers: []
    };
  }

  componentDidUpdate() {
    if(this.state.survey === null && this.props.surveys && 
      this.props.surveys.length > 0 && this.props.surveys[0].id !== this.state.survey){
      this.setState({
        survey: this.props.surveys[0].id
      })
    }

    if(this.state.answers === null || this.state.answers.length === 0){
      let answers = this.state.answers;

      this.props.optionalQuestionsAnswer.map(a => (
        answers.push({
          id: a.id,
          question: a.question,
          answer: a.answer,
          checked: false        
        })
      ))
      
      if(this.state.answers.length > 0){
        this.setState({
          answers
        })
      }
    }

    if(this.state.userAnswers === null || this.state.userAnswers.length === 0){
      let userAnswers = this.state.userAnswers;

      this.props.optionalQuestions.map(q => ((q.questionType !== 4) ?
        userAnswers.push({ 
          user: Number(sessionStorage.getItem('userid')),
          question: q.id,
          shortAnswer: "",
          paragraph: "",
          answer: null          
        })
        : ""
      ))
      
      if(this.state.userAnswers.length > 0){
        this.setState({
          userAnswers
        })
      }
    }
  }

  ///////////////////////////////////
  //     Handle Edit ShortAnswer
  ///////////////////////////////////
  handleShortAnswerEdit = (questionID) => e => {
    e.preventDefault()

    let userAnswers = this.state.userAnswers
    userAnswers.map(userAnswer => (userAnswer.question === questionID) ?
    (
      userAnswer.shortAnswer = e.target.value
    ) : "")
    
    this.setState({
      userAnswers
    })
  }

  handleParaghraphEdit = (questionID) => e => {
    e.preventDefault()

    let userAnswers = this.state.userAnswers
    userAnswers.map(userAnswer => (userAnswer.question === questionID) ?
    (
      userAnswer.paragraph = e.target.value
    ) : "")
    
    this.setState({
      userAnswers
    })
  }

  handleMultiChoiceAnswerEdit = (questionID, answerID) => e => {
    e.preventDefault()

    let answers = this.state.answers
    answers.map(a => (a.question === questionID) ?
      (
        a.checked = (a.id === answerID) ? true : false
      ) : ""
    )

    let userAnswers = this.state.userAnswers
    userAnswers.map(userAnswer => (userAnswer.question === questionID) ?
      (
        userAnswer.answer = Number(e.target.value)
      ) : "")
    
    this.setState({
      answers,
      userAnswers
    })    
  }
  
  handleMultiAnswersEdit = (questionID, answerID) => e => {
    e.preventDefault()

    let checkedAnswers = this.state.answers.filter(a => (a.question === questionID && a.checked === true))

    if(checkedAnswers.length > 1 && this.state.answers.filter(a => (a.id === answerID && a.checked === false)).length > 0){
      alert("سوالات چند جوابی نمی توانند بیشتر از دو جواب داشته باشند", "اخطار")
      return;
    }

    let answers = this.state.answers
    answers.map(a => (a.question === questionID && a.id === answerID) ?
    (
      a.checked = e.target.checked
    ) : "")

    let userAnswers = this.state.userAnswers
    if(e.target.checked){
      userAnswers.push({ 
        user: Number(sessionStorage.getItem('userid')),
        question: questionID,
        shortAnswer: "",
        paragraph: "",
        answer: answerID
      })
    }
    else
    {
      userAnswers = userAnswers.filter(ua => (ua.answer !== answerID))
    }
    
    this.setState({
      answers,
      userAnswers
    })
  }

  ///////////////////////////////////
  //Handle Save Answers 
  ///////////////////////////////////    
  handleSaveUserAnswers = () => e => {
    e.preventDefault();

    let questions = this.props.optionalQuestions.filter(q => (Number(q.survey) === Number(this.state.survey)))
    let questionIDs = questions.map(q => { return q.id})

    let userAnswers = this.state.userAnswers.filter(a => (questionIDs.includes(a.question)))

    let short = false
    let paragraph = false
    let multiChoices = false
    let multiAnswers = 0

    questions.map(q => (
      (q.isRequired) ?
      (userAnswers.map(ua => 
        (ua.question === q.id && q.questionType === 0 && ua.shortAnswer === '') ? short = true :
        (ua.question === q.id && q.questionType === 1 && ua.paragraph === '') ? paragraph = true :
        (ua.question === q.id && q.questionType === 3 && ua.answer === null) ? multiChoices = true : 
        (ua.question === q.id && q.questionType === 4 && ua.answer === null) ? multiAnswers++  : ""
      )) : ""
    ))

    if(short){
      alert("Enter short answer before submit")
      return
    }
    if(paragraph){
      alert("Enter paragrph answer before submit")
      return
    }
    if(multiChoices){
      alert("Choose radio button for multi choices answer before submit")
      return
    }
    if(multiAnswers > 1){
      alert("Choose checkboxs for multi answers before submit")
      return
    }
    
    userAnswers.map(userAnswer => (
      this.props.addUserAnswer(userAnswer)
    ))

    let user = sessionStorage.getItem('userid')
    this.props.getUnusedSurveysList(user)

    this.setState({
      survey: (this.props.surveys && this.props.surveys.length > 0) ? this.props.surveys[0].id : null
    })
  }

  render() {
    return (
      <Card className='card3D'>
        <CardHeader className='card-header'>
            <CardTitle tag="h5" className="mb-0">
                فرم نظرسنجی 
            </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
          <select style={{width:'50%'}} className='select' value={this.state.survey} //disabled={this.state.questions.length > 0}
            onChange={(e) => {this.setState({ survey: e.target.value })
            }}>
            {(this.props.surveys && this.props.surveys.length) > 0 ? (
                this.props.surveys.map(survey => <option key={survey.id} value={survey.id}>{survey.description.substring(0, 100)}</option>
                )) : (
                ""
                )}                    
          </select>
          <br/><br/>
          {(this.props.surveys && this.props.surveys.length) > 0 ? (
          <Card className='card-inner-body'> 
            <Container className='con-question'>
                <Container className='con'>
                  {(this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)) && 
                  this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && question.questionType === 3).length > 0) ?
                  (<Row className='row' style={{textAlign:'left'}}>
                    <Col xs='auto'> 
                    {/* <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> */}
                    </Col>
                  {(this.state.answers.filter(answer => answer.question === 
                    this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && question.questionType === 3)[0].id).map((answer, index) => (
                    <Col key={index} xs='1'> 
                      {answer.answer}
                    </Col>
                  )))}
                  <Col > 
                  </Col>
                  </Row>) : ""}
                </Container>
                <Container className='con'>
                  {this.props.optionalQuestions ?
                  (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).map((question, index) => (
                  <Row key={index} className='row'>
                            {(this.state.answers.filter(answer => answer.question === question.id).map((answer, index) => (
                            <Col key={index} xs='1'>
                              <input 
                              // 
                                type="radio"
                                checked={answer.checked}
                                value={answer.id}
                                onChange={this.handleMultiChoiceAnswerEdit(question.id, answer.id)}
                              />
                            </Col>)))}
                            <Col xs='auto' >    
                            <div style={{textAlign:'right'}}>
                            {question.isRequired ?(
                              <label>
                                { '*' + question.question }
                              </label>)
                              :
                              (<label> {question.question + ' - ' + (index + 1) }</label>)}
                              </div> 
                            </Col>
                        </Row>) )) : ""}
                </Container>
              </Container>
              {(this.props.optionalQuestions && this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)) && 
                  this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && question.questionType === 3).length > 0)?
             <br/>:''}
            <Container className='con'>
              {this.props.optionalQuestions ?
              (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)).map((question, index) => (
                <Container key={index} className='con-question'>
                  <Row className='row'>
                    <Col > 
                      <span key={index} >
                        {question.isRequired ?(
                        <label>
                          { '*' + question.question }
                        </label>)
                        :
                        (<label> {question.question}</label>)}
                          { this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)) ? 
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).length + (index + 1)) : ' - ' + (index + 1)}
                      </span><br/>
                    </Col>
                  </Row>
                  {(this.state.answers.filter(answer => answer.question === question.id).map((answer, index2) => (
                  <Row key={index2} className='row' >
                    <Col className='col1'> 
                    <span className='span1'>
                      <label className='label1'>&nbsp;&nbsp;
                        <AutosizeInput 
                          type="text"
                          value={answer.answer}
                          placeholderIsMinWidth
                          disabled
                        />&nbsp;&nbsp;
                        <input  className='col1'
                          type="checkbox"
                          value={answer.id}
                          checked={answer.checked}
                          onChange={this.handleMultiAnswersEdit(question.id, answer.id)}
                        />&nbsp;
                        { ' - ' + (index2 + 1) }
                      </label>
                      <br/>
                    </span>
                    </Col>
                  </Row>   
                  )))}
                </Container>))) : ""}
                {(this.props.optionalQuestions && this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)) && 
                  this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && question.questionType === 4).length > 0)?
             <br/>:''}
              {this.props.optionalQuestions ? 
              (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)).map((question, index) => (
                <Container key={index} className='con-question'>
                  <Row className='row'>
                    <Col  > 
                      <span  >
                        {question.isRequired ?(
                        <label>
                          { '*' + question.question }
                        </label>)
                        :
                        (<label> {question.question}</label>)}
                          {this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)) ? (
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)) ?
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).length +
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)).length + (index + 1)) :
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).length + (index + 1))) : (
                            this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)) ?
                            ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)).length + (index + 1)) :
                            ' - ' + (index + 1))}
                      </span><br/>
                    </Col>
                  </Row>
                  <Row className='row'>
                    <input
                      type="text" style={{width:'50%', textAlign:'right', fontSize:'1em'}}
                      onChange={this.handleShortAnswerEdit(question.id)}
                    />
                  </Row>
                </Container>))) : ""}

                {(this.props.optionalQuestions && this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)) && 
                  this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && question.questionType === 0).length > 0)?
             <br/>:''}
             
              {this.props.optionalQuestions ?
              (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 1)).map((question, index) => (
                <Container key={index} className='con-question'>
                  <Row className='row'>
                    <Col  > 
                      <span >
                          {question.isRequired ?(
                          <label>
                            { '*' + question.question }
                          </label>)
                          :
                          (<label> {question.question}</label>)}
                          { this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)) ? (
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)) ? (
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)) ?
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).length +
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)).length +
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)).length + (index + 1)) :
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).length +
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)).length + + (index + 1))) : (
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)) ?
                          ' - ' +  (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).length +
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)).length + (index + 1)) :  
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 3)).length + (index + 1)))) : (
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)) ? (
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)) ? 
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)).length +
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)).length + (index + 1)) :
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 4)).length + (index + 1)) ) :
                          this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)) ? 
                          ' - ' + (this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && (question.questionType === 0)).length + (index + 1)) : "")}                        
                      </span><br/>
                    </Col>
                  </Row>
                  <Row className='row'>
                    <textarea style={{width:'50%', height:'100px', textAlign:'right', fontSize:'1em'}}  
                      onChange={this.handleParaghraphEdit(question.id)}
                    />
                  </Row><br/>
                </Container>))) : ""}
              </Container>
              {(this.props.optionalQuestions && this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)) && 
                  this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey) && question.questionType === 1).length > 0)?
             <br/>:''}
            <Container className='con'>
              <Row className='row'>
                <Col style={{textAlign:'center'}} >
                  {(this.props.optionalQuestions && 
                  this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)).length > 0) ? 
                  (
                    <Button style={{width:'150px', fontSize:'1rem'}} color="primary"  onClick={this.handleSaveUserAnswers()}>تائید</Button>
                  ) : ""}
                </Col>
              </Row>
            </Container>
          </Card>
          ) : (
            ""
            )}  
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = store => {
    return {
        surveys: store.unusedSurveys.unusedSurveys,
        optionalQuestions: store.optionalQuestions.optionalQuestions, 
        optionalQuestionsAnswer: store.optionalQuestionsAnswer.optionalQuestionsAnswer
    };
};
    
const mapDispatchToProps = dispatch => {
    return {
      getUnusedSurveysList: userID => dispatch(GetUnusedSurveysList(userID)),
      addUserAnswer: model => dispatch(AddUserAnswer(model)),
      editSurveyReport: model => dispatch(EditSurveyReport(model))      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userSurvey);