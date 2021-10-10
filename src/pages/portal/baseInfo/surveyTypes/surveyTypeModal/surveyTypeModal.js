import React, { useState, useEffect } from "react";
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



const SurveyTypeModal = (props) => {
  const [name, setName] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)


  useEffect(() => {
    if (props.SurveyTypeInEditStage){
      setName(props.SurveyTypeInEditStage.name)
    }
  },[props.SurveyTypeInEditStage])

  const InputChangeHandler = (event) => {
    setName(event.target.value)
    setIsFormValid(true)
  };

  const SubmitFormHandler = event => {
    event.preventDefault();

    const company_Add = {name};

    if (!props.SurveyTypeInEditStage) {
      props.addSurveyType(company_Add);
      setName('')
    } else {
      const id = props.SurveyTypeInEditStage.id
      const company_Edit = { id, name};

      props.editSurveyType(company_Edit);
    }
  };
  
  return (
    <Modal style={{direction:'rtl'}}
      size="sm"
      centered
      isOpen={props.isOpen}
      toggle={props.modalToggleHandler}
    >
      <ModalHeader style={{direction:'ltr'}} toggle={props.modalToggleHandler} className="card-header">
        ویرایش نوع نظرسنجی
      </ModalHeader>
      <ModalBody style={{ textAlign: "center" }} className="modal-body">
        <Card>
          <CardBody>
            <Form onSubmit={SubmitFormHandler}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={InputChangeHandler}
              ></input>
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
