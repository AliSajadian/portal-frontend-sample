import React, {  Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Card,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import {
  SurveyModalToggler,
  AddSurvey,
  EditSurvey
} from "../../../../../redux/actions/surveysActions";
import {ChooseMarketDate , ChangeCalendarMonthHandler} from "../../../../../redux/actions/pitchPlannerActions";


class SurveyModal extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      departmentID: 1,
      surveyType: 1,
      created_date: today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0'.concat(today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() + 1) < 10 ? '0'.concat(today.getDate() + 1) : (today.getDate() + 1)),
      expired_date: today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0'.concat(today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() + 1) < 10 ? '0'.concat(today.getDate() + 1) : (today.getDate() + 1)),
      description: "",
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.SurveyInEditStage){
        if(this.state.flag2 && this.props.SurveyInEditStage.description !== this.state.description) { 
          this.setState({
            departmentID: this.props.SurveyInEditStage.departmentID,
            surveyType: this.props.SurveyInEditStage.surveyTypeID,
            created_date: this.props.SurveyInEditStage.created_date,
            expired_date: this.props.SurveyInEditStage.expired_date,
            description: this.props.SurveyInEditStage.description,
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.description !== ''){
        var today = new Date();
        this.setState({
          departmentID: 1,
          surveyType: 1,
          created_date: today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0'.concat(today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() + 1) < 10 ? '0'.concat(today.getDate() + 1) : (today.getDate() + 1)),
          expired_date: today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0'.concat(today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() + 1) < 10 ? '0'.concat(today.getDate() + 1) : (today.getDate() + 1)),
          description: "",
          flag: true
        });        
      }
    }
  }

  OnChangeHandler = event => {
    switch(event.target.name)
    {
      case 'created_date':
        this.setState({
          created_date: event.target.value
        });
        return;
      case 'expired_date':
        this.setState({
          expired_date: event.target.value
        });
        return;
      case 'description':
        this.setState({
          description: event.target.value, 
          flag2: this.props.SurveyInEditStage ? false : true
        });
        return;
      default:
        return;
    }
  };

  SubmitFormHandler = e => {
    e.preventDefault();

    const { departmentID, surveyType, created_date, expired_date, description } = this.state;
    const survey_Add = { departmentID, surveyType, created_date, expired_date, description  };

    if (!this.props.SurveyInEditStage) {
        this.props.addSurvey(survey_Add);
        this.setState({
        description: "",
        surveyType: 0,
        created_date: "",
        expired_date: "",
        dept: ""
        });
    }
    else {
        const id = this.props.SurveyInEditStage.id;
        const survey_Edit = {id, departmentID, surveyType, created_date, expired_date, description};
        this.props.editSurvey(survey_Edit);
        this.setState({
          flag2: true
        });
    }
  };


  render = () => {
    const { departmentID, surveyType, created_date, expired_date, description, isFormValid } = this.state;
    return (
      <Modal
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش نظرسنجی
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Card styles={{ card: { backgroundColor: 'red' }}}>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <label>دپارتمان</label>
                <br/>
                <select value={departmentID}
                onChange={(e) => this.setState({ departmentID: e.target.value })}>
                {(this.props.departments && this.props.departments.length) > 0 ? (
                    this.props.departments.map(department => <option key={department.id} value={department.id}>{department.name}</option>
                    )) : (
                      <div>not found</div>
                    )}
                </select>
                <br/>
                <br/>
                <label>نوع نظرسنجی</label>
                <br/>
                <select value={surveyType}
                onChange={(e) => this.setState({ surveyType: e.target.value })}>
                {(this.props.surveyTypes && this.props.surveyTypes.length) > 0 ? (
                    this.props.surveyTypes.map(surveyType => <option key={surveyType.id} value={surveyType.id}>{surveyType.name}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                <br/>
                {/* <DatePicker name="created_date" excludeDates={this.props.disabledDates.map((q) => new Date(q))} onMonthChange={(date) => this.props.changeCalendarMonthHandler(date)}  
                            onChange={(data) => this.props.chooseDate(data)} inline selected={this.props.selectedDate}></DatePicker>
                <DatePicker name="expired_date" excludeDates={this.props.disabledDates.map((q) => new Date(q))} onMonthChange={(date) => this.props.changeCalendarMonthHandler(date)}  
                            onChange={(data) => this.props.chooseDate(data)} inline selected={this.props.selectedDate}></DatePicker> */}

                <label>تاریخ ایجاد</label>
                <input
                className="form-control"
                type="date"
                name="created_date"
                onChange={this.OnChangeHandler}
                value={created_date}
                // format="yyyy/mm/dd"
                />
                <br/>
                <label>تاریخ انقضا</label>
                <input
                className="form-control"
                type="date"
                name="expired_date"
                onChange={this.OnChangeHandler}
                value={expired_date}
                />
                <br/>                            
                <label>توضیحات</label>
                <input
                className="form-control"
                type="text"
                name="description"
                onChange={this.OnChangeHandler}
                value={description}
                />
                <br/>
                <Button
                  disabled={!isFormValid}
                  type="submit"
                  color="success"
                >
                  تائید
                </Button>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  };
}

const mapStateToProps = state => {
  return {
    departments: state.departments.departments,
    surveyTypes: state.surveyTypes.surveyTypes,
    isOpen: state.surveys.isModalOpen,
    SurveyInEditStage: state.surveys.surveyInEditStage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCalendarMonthHandler : (date) => dispatch(ChangeCalendarMonthHandler(date)),
    chooseDate : (date) => dispatch(ChooseMarketDate(date)),
    modalToggleHandler: () => dispatch(SurveyModalToggler()),
    addSurvey: model => dispatch(AddSurvey(model)),
    editSurvey: model => dispatch(EditSurvey(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyModal);
