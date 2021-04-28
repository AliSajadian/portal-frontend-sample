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
  SurveyTypeModalToggler,
  AddSurveyType,
  EditSurveyType
} from "../../../../../redux/actions/surveyTypesActions";



class SurveyTypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.SurveyTypeInEditStage){
        if(this.state.flag2 && this.props.SurveyTypeInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.SurveyTypeInEditStage.name, flag: false, flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '', flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      name: event.target.value,
      flag2: this.props.SurveyTypeInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const surveyType_Add = { name};

    if (!this.props.SurveyTypeInEditStage) {
      this.props.addSurveyType(surveyType_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.SurveyTypeInEditStage.id
      const surveyType_Edit = { id, name};

      this.props.editSurveyType(surveyType_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش نوع نظرسنجی
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.InputChangeHandler}
                ></input>
                <Button
                  disabled={!this.state.isFormValid}
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
    isOpen: state.surveyTypes.isModalOpen,
    SurveyTypeInEditStage: state.surveyTypes.surveyTypeInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(SurveyTypeModalToggler()),
    addSurveyType: model => dispatch(AddSurveyType(model)),
    editSurveyType: model => dispatch(EditSurveyType(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyTypeModal);
