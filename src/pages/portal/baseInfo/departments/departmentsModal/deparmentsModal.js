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
  DepartmentModalToggler,
  AddDepartment,
  EditDepartment
} from "../../../../../redux/actions/departmentsActions";



const DepartmentModal = (props) => {
  const [name, setName] = useState('')
  const [company, setCompany] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (props.companies && props.companies.length > 0){
      setCompany(props.companies[0].id)
    }
  },[props.companies])

  useEffect(() => {
    if (props.DepartmentInEditStage){
      setName(props.DepartmentInEditStage.name)
      setCompany(props.DepartmentInEditStage.company)
    }
},[props.DepartmentInEditStage])

  const InputChangeHandler = (event) => {
    setName(event.target.value)
    setIsFormValid(true)
  };
  
  const SubmitFormHandler = event => {
    event.preventDefault();
    
    const department_Add = { name, company};

    if (!props.DepartmentInEditStage) {
      props.addDepartment(department_Add);
      setName('')
      setCompany(props.companies && props.companies.length > 0 ? props.companies[0].id : null)
  } else {
      const id = props.DepartmentInEditStage.id
      const department_Edit = { id, name, company};

      props.editDepartment(department_Edit);
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
        ویرایش دپارتمان
      </ModalHeader>
      <ModalBody style={{ textAlign: "center" }}  className="modal-body">
        <Card>
          <CardBody>
            <Form onSubmit={SubmitFormHandler}>
            <label>شرکت</label>
              <br/>
              <select value={company?company:(props.companies && props.companies.length > 0) ? props.companies[0].id: null} 
              onChange={(e) => setCompany(e.target.value)}>
              {(props.companies && props.companies.length > 0) ? (
                  props.companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>
                  )) : (
                    <div>not found</div>
                  )}                    
              </select>
              <br/>
              <br/>
              <label>دپارتمان</label>
              <br/>
              <input
                type="text"
                name="name"
                value={name}
                onChange={InputChangeHandler}
              ></input>
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
}

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    isOpen: state.departments.isModalOpen,
    DepartmentInEditStage: state.departments.departmentInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(DepartmentModalToggler()),
    addDepartment: model => dispatch(AddDepartment(model)),
    editDepartment: model => dispatch(EditDepartment(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModal);
