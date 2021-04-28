import React, { Component } from "react";
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
  SurveyDepartmentModalToggler,
  AddSurveyDepartment
} from "../../../../../redux/actions/surveyDepartmentActions";



class SurveyDepartmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: 1,
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){console.log('surveyDepartment_surveryID: ', this.props.surveyDepartment_surveryID,)
      if (this.props.surveyDepartmentInEditStage){console.log(this.props.surveyDepartmentInEditStage)
        if(this.state.flag2 && this.props.surveyDepartmentInEditStage.survey !== this.state.survey) { 
          this.setState({
            department: Number(this.props.surveyDepartmentInEditStage.department),
            survey: this.props.surveyDepartmentInEditStage.survey,
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.survey !== 0){
        this.setState({
          department: 1,
          survey: this.props.surveyDepartment_surveryID,
          flag: true
        });        
      }
    }
  }

  SubmitFormHandler = e => {
    e.preventDefault();

    const { department } = this.state;
    const survey = this.props.surveyDepartment_surveryID 
    const surveyDepartment_Add = { department, survey };
    console.log('surveyDepartment_Add: ', surveyDepartment_Add)

    if (!this.props.surveyDepartmentInEditStage) {
        this.props.addSurveyDepartment(surveyDepartment_Add);
        this.setState({
            department: 1
        });
    }
  };

  render = () => {
    const { department, isFormValid } = this.state;
    return (
      <Modal
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش دپارتمان نظزسنجی
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Card styles={{ card: { backgroundColor: 'red' }}}>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <label>دپارتمان</label>
                <br/>
                <select value={department}
                onChange={(e) => this.setState({ department: e.target.value })}>
                {(this.props.departments && this.props.departments.length) > 0 ? (
                    this.props.departments.map(department => <option key={department.id} value={department.id}>{department.name}</option>
                    )) : (
                      <tr><td>not found</td></tr>
                      )}
                </select>
                <br/>
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
    isOpen: state.surveyDepartments.isSurveyDepartmentModalOpen,
    surveyDepartmentInEditStage: state.surveyDepartments.surveyDepartmentInEditStage,
    surveyDepartment_surveryID: state.surveyDepartments.surveyDepartment_surveryID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(SurveyDepartmentModalToggler()),
    addSurveyDepartment: model => dispatch(AddSurveyDepartment(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDepartmentModal);
