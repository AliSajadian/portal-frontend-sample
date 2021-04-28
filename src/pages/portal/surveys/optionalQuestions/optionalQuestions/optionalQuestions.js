import React, { Component } from 'react';
import { connect } from "react-redux";
import { MinusCircle, PlusCircle } from "react-feather";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle, 
  Container,
  Row,
  Col,
} from "reactstrap";
import AutosizeInput from 'react-input-autosize';
import {
    AddOptionalQuestion,
    EditOptionalQuestion,
    RemoveOptionalQuestion,
    AddOptionalQuestionAnswer,
    EditOptionalQuestionAnswer,
    RemoveOptionalQuestionAnswer,
    AddSurveyReport,
    EditSurveyReport,
    RemoveSurveyReport
} from "../../../../../redux/actions/optionalQuestionsActions";
import '../../surveys.css'



class optionalQuestions extends Component {
  constructor(props){
    super(props)
    this.state = {
        survey: 1,
        questions: [{
          id: null,
          survey: null,
          question: "",
          questionType: null,
          isRequired: null 
        }],
        answers: [{ 
          id: null,
          answer: "",
          question: null 
        }]
        // ,dropdownOpen: false, 
        // setDropdownOpen: false
    };
  }

  componentDidUpdate() {
    if(this.state.survey === null && this.props.surveys && 
      this.props.surveys.length > 0 && this.props.surveys[0].id !== this.state.survey){
      if(this.props.optionalQuestions !== this.state.questions){
        if(this.props.optionalQuestionsAnswer !== this.state.answers){
          this.setState({
            surveyID: this.props.surveys[0].id,
            questions: this.props.optionalQuestions, 
            answers: this.props.optionalQuestionsAnswer, 
          })
        }else{
          this.setState({
            survey: this.props.surveys[0].id,
            questions: this.props.optionalQuestions, 
          })
        }
      }
      else{
        if(this.props.optionalQuestionsAnswer !== this.state.answers){
          this.setState({
            survey: this.props.surveys[0].id,
            answers: this.props.optionalQuestionsAnswer, 
          })
        }else{
          this.setState({
            survey: this.props.surveys[0].id,
          })
        }
      }
    }else{ 
      if(this.props.optionalQuestions !== this.state.questions){
        if(this.props.optionalQuestionsAnswer !== this.state.answers){
          this.setState({
            questions: this.props.optionalQuestions, 
            answers: this.props.optionalQuestionsAnswer, 
          })
        }else{
          this.setState({
            questions: this.props.optionalQuestions, 
          })
        }
      }else{
        if(this.props.optionalQuestionsAnswer !== this.state.answers){
          this.setState({
            answers: this.props.optionalQuestionsAnswer, 
          })
        }else{
        } 
      }
    }
  }

  ///////////////////////////////////
  //     Handle Edit Question
  ///////////////////////////////////
  handleQuestionEdit = questionID => e => {
    e.preventDefault()

    let filteredQuestion = this.state.questions.filter(question => question.id === questionID)

    let questions = this.state.questions
    // .filter(question => question.id !== questionID)
    // .concat(filteredQuestions[0])

    // console.log('1 questions: ', questions)
    // questions = questions.sort((a, b) => {
    //   console.log('a, b: ', a.id, ' ', b.id)
    //   if(a.id < b.id){
    //     const tmp = a
    //     a = b
    //     b = tmp
    //     console.log('a, b: ', a.id, ' ', b.id)
    //   }
    // })

    questions.map(q => (q.id === questionID) ?
    (
      q = this.setQuestionChange(q, e),
      filteredQuestion = q
    ) : "")

    this.props.editOptionalQuestion(filteredQuestion)

    this.setState({
      questions
    })
  }

  setQuestionChange = (q, e) => {
    if(e.target.type === "text"){
      q.question = e.target.value;
    }
    else if(e.target.type === "select-one"){ 
      q.questionType = e.target.value;
      if(e.target.value === 3 || e.target.value === 4)
      {
        const surveyReport = [q.id, null, null, null, null, null, null, null, null]
        this.props.addSurveyReport(surveyReport)
      }
      else{
        this.props.removeSurveyReport(q.id)
      }
    }
    else if(e.target.type === "checkbox"){
      q.isRequired = !q.isRequired;
    }
    return q
  }
  ///////////////////////////////////
  //     Handle Edit Answer
  ///////////////////////////////////
  handleAnswerTextChange = answerID => e => {
    e.preventDefault()

    let filteredAnswer = null
    // this.state.answers.filter(answer => answer.id === answerID)
    // filteredAnswers[0].answer = e.target.value

    let answers = this.state.answers
    // answers[i1].answer = e.target.value
    answers.map(answer => (answer.id === answerID) ?
    (
      answer.answer = e.target.value,
      filteredAnswer = answer
    ) : "")
    
    this.props.editOptionalQuestionAnswer(filteredAnswer)

    this.setState({
      answers
    })
  }

  ///////////////////////////////////
  //      Handle Delete Question
  ///////////////////////////////////
  handleDeleteQuestion = questionID => e => {
    e.preventDefault()

    let answers = this.state.answers.filter(answers => answers.question === questionID)
    if(answers && answers.length > 0){
      if (!window.confirm("Are you sure, you want delete question?")) {
        return
      }
    }
    
    let questions = this.state.questions.filter(question => question.id !== questionID)
    this.setState({
      questions
    })

    this.props.removeSurveyReport(questionID)
    this.props.removeOptionalQuestion(questionID)
  }

  ///////////////////////////////////
  //      Handle Delete Answer
  ///////////////////////////////////  
  handleDeleteAnswer = answerID => e => {
    e.preventDefault()

    if (!window.confirm("Are you sure, you want delete optional answer?")) {
      return
    }

    let answers = this.state.answers.filter(answer => answer.id !== answerID)
    this.setState({
      answers
    })

    this.props.removeOptionalQuestionAnswer(answerID)
  }

  ///////////////////////////////////
  //      Handle Add Question
  ///////////////////////////////////
  addQuestion = e => {
    e.preventDefault()

    const Question = { 
      id: null, 
      survey: this.state.survey, 
      question: "",
      questionType: 0,
      isRequired: false
    }

    const newQuestion = { 
      survey: this.state.survey, 
      question: "",
      questionType: 0,
      isRequired: false
    }

    this.props.addOptionalQuestion(newQuestion);

    this.setState({
      questions: [...this.state.questions, Question]
    })
  }

  ///////////////////////////////////
  //      Handle Add Answer
  ///////////////////////////////////
  addAnswer = questionID => e => {
    e.preventDefault()

    if(this.state.questions.filter(q => q.id === questionID)[0].questionType < 3){
      alert("Short and paragraph answers are not optional!", "Warning")
      return;
    }

    const Answer = { 
      id: null, 
      answer: "",
      question: questionID 
    }
    // let answers = this.state.answers
    // answers.push(Answer)

    const newAnswer = { 
      answer: "",
      question: questionID
    }
    
    this.props.addOptionalQuestionAnswer(newAnswer)

    this.setState({
      answers: [...this.state.answers, Answer]
    })
  }

  ///////////////////////////////////
  //Handle Save Question (Deprecated)
  ///////////////////////////////////    
  handleSaveQuestion = i => e => {
    e.preventDefault();

    const { questions } = this.state;
    const question = questions[i];
    let flg = false
    question.answers.map(answer => flg = (answer.answer === ""))
    
    if(question.question === "" || question.answers.length < 2 || flg){
      alert('Please first enter question and answers, then press save it!')
      return
    }

    // let newQuestion = { 
    //   surveyID: question.surveyID, 
    //   question: question.question, 
    //   answers: [{ answer: "" }] 
    // }

    // let newAnswer = { 
    //   answer: "" 
    // }
    // question.answers.map(function(answer) {
    //   newAnswer.answer = answer.answer
    //   newQuestion.answers.push(newAnswer)
    //   return 0
    // })

    this.props.addOptionalQuestion(question);
  }

  isDisable = i => {
    return this.state.questions[i].question === ""
  }

  render() {
    return (
      <Card color="dark" style={{direction:'rtl'}}>
        <CardHeader className='card-header'>
            <CardTitle tag="h5" className="mb-0">
                سوالات
            </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
          <select style={{width:'50%'}} value={this.state.survey} //disabled={this.state.questions.length > 0}
            onChange={(e) => {this.setState({ survey: e.target.value })
            }}>
            {(this.props.surveys && this.props.surveys.length) > 0 ? (
                this.props.surveys.map(survey => <option key={survey.id} value={survey.id}>{survey.description.substring(0, 100)}</option>
                )) : (
                ""
                )}                    
          </select>
          <PlusCircle
            // color={'white'}
            onClick={this.addQuestion}
            className="align-middle"
            size={18}
          />
          <br/><br/>
          <Card className='card-inner-body'>
            {this.state.questions ?
            this.state.questions.filter(question => Number(question.survey) === Number(this.state.survey)).map((question, index) => (
              <Card key={index} color="light" className="card-question" > 
                <Container>
                  <Row >
                    <Col style={{padding:0}} sm="9"> 
                      {/* {console.log("key: ", index)} */}
                      <span >
                        <label>
                          { (index + 1) + ' - ' }
                          <AutosizeInput 
                            type="text"
                            onChange={this.handleQuestionEdit(question.id)}
                            value={question.question}
                            placeholder="سوال را وارد کنید"
                            placeholderIsMinWidth
                          />
                        </label>
                        <PlusCircle
                          // color={'green'}
                          onClick={this.addAnswer(question.id)}
                          className="align-middle"
                          size={18}
                        />
                        <MinusCircle
                          // color={'red'}
                          onClick={this.handleDeleteQuestion(question.id)}
                          className="align-middle"
                          size={18}
                        />
                      </span><br/>
                    </Col>
                    <Col style={{padding:3}} sm="1.85">                     {/* id={index} */}
                      <select value={question.questionType} 
                        onChange={this.handleQuestionEdit(question.id)}
                        >
                        <option key={0} value={0} disabled={(this.state.answers.filter(answer => answer.question === question.id)).length > 0}>جواب کوتاه     </option>                   
                        <option key={1} value={1} disabled={(this.state.answers.filter(answer => answer.question === question.id)).length > 0}>جواب بلند        </option>                   
                        <option key={2} value={2} disabled={true}>__________________</option>                   
                        <option key={3} value={3}>چند گزینه ای با یک جواب     </option>                   
                        <option key={4} value={4}>چند گزینه ای با چند جواب       </option>                   
                        {/* <option key={5} value={5}>Dropdown         </option>                    */}
                      </select>
                   </Col>
                    <Col style={{padding:0}} sm="1.1">
                      <label>
                        <span>الزامی</span>
                        <input 
                          type="checkbox"
                          checked={question.isRequired}
                          onChange={this.handleQuestionEdit(question.id)}
                        />
                      </label>
                    </Col>
                  </Row>
                  <Row xs="1">
                    <Col style={{padding:0}}>                      
                      {this.state.answers 
                      ?
                      this.state.answers.filter(answer => answer.question === question.id).map((answer, index1) => (
                        <span key={index1}>
                          <label>
                            { (index1 + 1) + ' - ' }
                            <AutosizeInput
                              type="text"
                              onChange={this.handleAnswerTextChange(answer.id)}
                              value={answer.answer}
                              placeholder="جواب انتخابی را وارد کنید"
                              placeholderIsMinWidth
                            />
                          </label>
                          <MinusCircle
                            // color={'red'}
                            onClick={this.handleDeleteAnswer (answer.id)}
                            className="align-middle"
                            size={18}
                          />
                          <br/>
                        </span>
                      )) : ""}
                    </Col>
                  </Row>
                </Container>
              </Card>
            )) : ""}
          </Card>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = store => {
    return {
        surveys: store.surveys.surveys,
        optionalQuestions: store.optionalQuestions.optionalQuestions, 
        optionalQuestionsAnswer: store.optionalQuestionsAnswer.optionalQuestionsAnswer
    };
};
    
const mapDispatchToProps = dispatch => {
    return {
      addOptionalQuestion: model => dispatch(AddOptionalQuestion(model)),
      editOptionalQuestion: id => dispatch(EditOptionalQuestion(id)),
      removeOptionalQuestion: id => dispatch(RemoveOptionalQuestion(id)),

      addOptionalQuestionAnswer: model => dispatch(AddOptionalQuestionAnswer(model)),
      editOptionalQuestionAnswer: id => dispatch(EditOptionalQuestionAnswer(id)),
      removeOptionalQuestionAnswer: id => dispatch(RemoveOptionalQuestionAnswer(id)),

      addSurveyReport: model => dispatch(AddSurveyReport(model)),
      editSurveyReport: id => dispatch(EditSurveyReport(id)),
      removeSurveyReport: id => dispatch(RemoveSurveyReport(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(optionalQuestions);


                  //  {/*<Col style={{padding:0}}>
                  //      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  //       <DropdownToggle caret>
                  //         Question Type
                  //       </DropdownToggle>
                  //       <DropdownMenu>

                  //         <DropdownItem>Short Answer                           </DropdownItem>
                  //         <DropdownItem>Paragraph                              </DropdownItem>

                  //         <DropdownItem divider />
                  //         <DropdownItem>Multi Choice                           </DropdownItem>
                  //         <DropdownItem>Checkboxes                             </DropdownItem>
                  //         <DropdownItem>Dropdown                               </DropdownItem>
                  //       </DropdownMenu>
                  //     </Dropdown>
                  //   </Col> 
                  //   */}
                  //         {/* <DropdownItem header>Header</DropdownItem> */}
                  //         {/* <DropdownItem disabled>Action (disabled)             </DropdownItem> */}


                  // onChange={(e) => {
                  //   let filteredQuestion = question
                  //   filteredQuestion.questionType = e.target.value
                  //   const questions = this.state.questions.filter(q => q.id !== question.id).concat(filteredQuestion)
                  //   this.setState({ questions })
                  // }}


                  // onChange={(e) => {
                  //   let filteredQuestion = question
                  //   filteredQuestion.isRequired = e.target.value
                  //   const questions = this.state.questions.filter(q => q.id !== question.id).concat(filteredQuestion)
                  //   this.setState({ questions })
                  // }}