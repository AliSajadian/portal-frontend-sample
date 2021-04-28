import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle, 
  Container,
  Row,
  Col
} from "reactstrap";
import AutosizeInput from 'react-input-autosize';
import {Pie, HorizontalBar} from 'react-chartjs-2'
import '../../surveys.css'



const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'left',
    labels: {
      boxWidth: 10
    }
  }
}

const baroptions = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'left',
    labels: {
      boxWidth: 10
    }
  },
  scales: {
    xAxes: [{
        stacked: true
    }],
    yAxes: [{
        stacked: true
    }]
  }
}

class surveyReport extends Component {
  constructor(props){
    super(props)

    this.state = {
        survey: 0,
    };
  }

  componentDidUpdate() {
    if(this.state.survey === 0 && this.props.surveys && 
      this.props.surveys.length > 0 && this.props.surveys[0].id !== this.state.survey){console.log('survey Init Done')
      this.setState({
        survey: (this.props.surveys && this.props.surveys.length > 0) ? this.props.surveys[0].id : null
      })
    }
  }
 
  getPieData = (questionID) => {
    let answers = [];
    let answersNo = [];
    let counts = [];
    let count = 0;
    let ansNo = 1;
    let flg = true

    let filteredUserAnswers = this.props.userAnswers
      .filter(ua => ua.question === questionID)
      .sort((a, b) => a.answer > b.answer ? 1:-1)

    let filteredoptionalAnswers = this.props.optionalAnswers
      .filter(oa => oa.question === questionID)
      .sort((a, b) => a.id > b.id ? 1:-1)

      filteredUserAnswers.map(ua => (
      (ua.answer !== null && !answers.includes(ua.answer)) ? (
      filteredUserAnswers.map(ua1 => (ua1.answer === ua.answer) ? 
          (count++) : ""
      ),
      filteredoptionalAnswers.map(oa => ((oa.id !== ua.answer && flg) ? ansNo++ : flg = false)),

      answers.push(ua.answer),
      answersNo.push(ansNo),
      counts.push(count),
      flg = true,
      ansNo = 1,
      count = 0
      ) : ""
    ))

    let data = {
      labels: answersNo,
      datasets: [{
        data: counts,
        backgroundColor: [
          '#E06E84',
          '#36A2EB',
          '#DD11A2',
          '#FFCE56',
          '#1F20AB',
          '#B6022B',
          '#76FFA2',
          '#2400EE'
        ],
        hoverBackgroundColor: [
          '#E06E84',
          '#36A2EB',
          '#DD11A2',
          '#FFCE56',
          '#1F20AB',
          '#B6022B',
          '#76FFA2',
          '#2400EE'
        ]
      }]
    };
    console.log('data: ', data)
    return data
  }

  getBarData = (questionID) => {
    if(this.props.userAnswers === null){
      return null;
    }
    let answers = [];
    let answersNo = [];
    let counts = [];
    let count = 0;
    let ansNo = 1;
    let flg = true;

    let filteredUserAnswers = this.props.userAnswers
      .filter(ua => ua.question === questionID)
      .sort((a, b) => a.answer > b.answer ? 1:-1)

    let filteredoptionalAnswers = this.props.optionalAnswers
      .filter(oa => oa.question === questionID)
      .sort((a, b) => a.id > b.id ? 1:-1)

    filteredUserAnswers.map(ua => (
      (ua.answer !== null && !answers.includes(ua.answer)) ? (
        filteredUserAnswers.map(ua1 => (ua1.answer === ua.answer)? 
          (count++) : ""
      ),
      filteredoptionalAnswers.map(oa => ((oa.id !== ua.answer && flg) ? ansNo++ : flg = false)),
      answers.push(ua.answer),
      answersNo.push(ansNo),
      counts.push(count),
      flg = true,
      ansNo = 1,
      count = 0
      ) : ""
    ))

    let data = {
      labels: answersNo,
      datasets: [{
        data: counts,
        label: 'Horizontal Chart',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      }]
    };
    // console.log('data: ', data)

    return data
  }

  render() {
    return (
      <Card className="card3D" >
        <CardHeader className="card-header">
            <CardTitle tag="h5" className="mb-0">
                گزارش نظرسنجی انجام شده
            </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
          <select style={{width:'50%'}} className='select' value={this.state.survey} //disabled={this.state.questions.length > 0}
            onChange={(e) => {this.setState({ survey: e.target.value })}}>
            {(this.props.surveys && this.props.surveys.length) > 0 ? (
                this.props.surveys.map(survey => <option key={survey.id} value={survey.id}>{survey.description.substring(0, 100)}</option>
                )) : (
                ""
                )}                    
          </select>
          <br/><br/>
          <Card className='card-inner-body'>
            {this.props.optionalQuestions ?
            this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)).map((question, index) => (
              <Card key={index}> 
                <Container >  
                  {(question.questionType === 0) ?
                    <Container className='con'>
                    <Row>
                      <Col style={{padding:0, textAlign:'right'}}> 
                        <span >
                          {question.isRequired ?(
                          <label>
                            { '*' + question.question }
                          </label>)
                          :
                          (<label> {question.question + ' - ' + (index + 1)}</label>)}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span>
                          {(this.props.userAnswers) ?
                            this.props.userAnswers.filter(ua => ua.question === question.id).map((ua, index) => (
                            <Row key={index}>
                              <Col style={{padding:0, textAlign:'left'}}> 
                                <span key={index} >
                                  <label>
                                   {/* style={{backgroundColor:'#e0e8f7'}}color='#e0e8f7' */}
                                    <AutosizeInput 
                                      type="text"
                                      value={ua.shortAnswer}
                                      placeholderIsMinWidth
                                      disabled
                                      
                                    />
                                  </label>
                                </span>
                              </Col>
                            </Row>
                          )) : ""}
                        </span>
                      </Col>
                    </Row>
                    </Container>
                  : (question.questionType === 1) ?
                  <Container className="con" >
                    <Row>
                      <Col style={{padding:0, textAlign:'right'}}> 
                        <span key={index} >
                            {question.isRequired ?(
                            <label>
                              { '*' + question.question }
                            </label>)
                            :
                            (<label> {question.question}</label>)}
                            { ' - ' + (index + 1) }
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span>
                          {(this.props.userAnswers) ?
                            this.props.userAnswers.filter(ua => ua.question === question.id).map((ua, index) => (
                            <Row key={index}>
                              <Col style={{padding:0, textAlign:'left'}}> 
                                <span >
                                  <label>
                                    <textarea style={{backgroundColor:'#e0e8f7'}}
                                      type="text"
                                      value={ua.paragraph}
                                      // placeholderIsMinWidth
                                      disabled
                                    />
                                  </label>
                                </span>
                              </Col>
                            </Row>
                          )) : ''}
                        </span>
                      </Col>
                    </Row>
                  </Container>
                  : (question.questionType === 3) ? 
                  <Row xs="1">
                    <Col style={{padding:0, textAlign:'left'}}>    
                    {(this.props.userAnswers && this.props.userAnswers.length > 0) ?
                      <Pie data={this.getPieData(question.id)} height={200} width={250} options={options}/> : ""
                    }
                    </Col>
                    <Col style={{padding:0, textAlign:'right'}}> 
                      <span key={index} >
                          {question.isRequired ?(
                          <label>
                            { '*' + question.question }
                          </label>)
                          :
                          (<label> {question.question}</label>)}
                          { ' - ' + (index + 1) }
                      </span>
                    </Col>
                  </Row> 
                  : (question.questionType === 4) ? 
                  <Row xs="1">
                    <Col style={{padding:0, textAlign:'left'}}>      
                      <HorizontalBar data={this.getBarData(question.id)} height={200} width={400} options={baroptions}/>
                    </Col>
                    <Col style={{padding:0, textAlign:'right'}}> 
                    <span key={index} >
                        {question.isRequired ?(
                        <label>
                          { '*' + question.question }
                        </label>)
                        :
                        (<label> {question.question}</label>)}
                        { ' - ' + (index + 1) }
                    </span>
                  </Col>
                  </Row> 
                  : ""}
                </Container>
              </Card>
            )) : ""}
             <Container>
               <Row>
                 <Col>
                 </Col>
                 <Col>
                 </Col>
                 <Col>
                 </Col>
                 <Col>
                 </Col>
                 <Col style={{padding:5}}>
                   {(this.props.optionalQuestions && 
                   this.props.optionalQuestions.filter(question => Number(question.survey) === Number(this.state.survey)).length > 0) ? 
                   (<span>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   {/* <Button color="info" onClick={this.handleSaveUserAnswers()}>Submit</Button> */}
                   </span>) : ""}
                 </Col>
               </Row>
             </Container>
          </Card>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = store => {
    return {
        surveys: store.usedSurveys.usedSurveys,
        optionalQuestions: store.optionalQuestions.optionalQuestions, 
        userAnswers: store.userAnswers.userAnswers,
        optionalAnswers: store.optionalQuestionsAnswer.optionalQuestionsAnswer
    };
};
    
// const mapDispatchToProps = dispatch => {
//     return {
//       addUserAnswer: model => dispatch(AddUserAnswer(model)),
//     };
// };

export default connect(mapStateToProps)(surveyReport);

