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
  DoctorTypeModalToggler,
  AddDoctorType,
  EditDoctorType
} from "../../../../../redux/actions/doctorTypesActions";



const DoctorTypeModal = (props) => {
  const [name, setName] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
      if (props.DoctorTypeInEditStage){
        setName(props.DoctorTypeInEditStage.name)
      }
  },[props.DoctorTypeInEditStage])


  const InputChangeHandler = (event) => {
    setName(event.target.value)
    setIsFormValid(true)
  };

  const SubmitFormHandler = event => {
    event.preventDefault();

    const doctorType_Add = { name};

    if (!props.DoctorTypeInEditStage) {
      props.addDoctorType(doctorType_Add);
      setName('')

    } else {
      const id = props.DoctorTypeInEditStage.id
      const doctorType_Edit = { id, name};

      props.editDoctorType(doctorType_Edit);
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
        ویرایش نوع پزشک
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
    isOpen: state.doctorTypes.isModalOpen,
    DoctorTypeInEditStage: state.doctorTypes.doctorTypeInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(DoctorTypeModalToggler()),
    addDoctorType: model => dispatch(AddDoctorType(model)),
    editDoctorType: model => dispatch(EditDoctorType(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorTypeModal);
