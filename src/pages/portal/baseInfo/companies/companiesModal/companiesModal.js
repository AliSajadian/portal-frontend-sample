import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
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
  CompanyModalToggler,
  AddCompany,
  EditCompany
} from "../../../../../redux/actions/companiesActions";


const CompanyModal = (props) => {
  const [name, setName] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)


  useEffect(() => {
    if (props.CompanyInEditStage){
      setName(props.CompanyInEditStage.name)
    }
  },[props.CompanyInEditStage])

  const InputChangeHandler = (event) => {
    setName(event.target.value)
    setIsFormValid(true)
  };

  const SubmitFormHandler = event => {
    event.preventDefault();

    const company_Add = {name};

    if (!props.CompanyInEditStage) {
      props.addCompany(company_Add);
      setName('')
    } else {
      const id = props.CompanyInEditStage.id
      const company_Edit = { id, name};

      props.editCompany(company_Edit);
    }
  };

  return (
    <Modal style={{direction:'rtl'}}
      size="sm"
      centered
      isOpen={props.isOpen}
      toggle={props.modalToggleHandler}
    >
      <ModalHeader  style={{direction:'ltr'}} toggle={props.modalToggleHandler} className="card-header">
        ویرایش شرکت
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
    isOpen: state.companies.isModalOpen,
    CompanyInEditStage: state.companies.companyInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(CompanyModalToggler()),
    addCompany: model => dispatch(AddCompany(model)),
    editCompany: model => dispatch(EditCompany(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyModal);
