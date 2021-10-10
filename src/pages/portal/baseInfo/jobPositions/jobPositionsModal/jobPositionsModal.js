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
  JobPositionModalToggler,
  AddJobPosition,
  EditJobPosition
} from "../../../../../redux/actions/jobPositionsActions";



const JobPositionModal = (props) => {
  const [name, setName] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (props.JobPositionInEditStage){
        setName(props.JobPositionInEditStage.name)
    }
  },[props.JobPositionInEditStage])

  const InputChangeHandler = (event) => {
    setName(event.target.value)
    setIsFormValid(true)
  };

  const SubmitFormHandler = event => {
    event.preventDefault();

    const jobPosition_Add = { name};

    if (!props.JobPositionInEditStage) {
      props.addJobPosition(jobPosition_Add);
      setName('')
    } else {
      const id = props.JobPositionInEditStage.id
      const jobPosition_Edit = { id, name};

      props.editJobPosition(jobPosition_Edit);
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
        ویرایش عنوان شغلی
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
    isOpen: state.jobPositions.isModalOpen,
    JobPositionInEditStage: state.jobPositions.jobPositionInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(JobPositionModalToggler()),
    addJobPosition: model => dispatch(AddJobPosition(model)),
    editJobPosition: model => dispatch(EditJobPosition(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPositionModal);
