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
  DoctorModalToggler,
  AddDoctor,
  EditDoctor
} from "../../../../../redux/actions/doctorsActions";


const DoctorModal = (props) => {
  const [employee, setEmployee] = useState(null)
  const [doctorType, setDoctorType] = useState(null)

  
  useEffect(() => {
    if(props.employees && props.employees.length > 0){
      setEmployee(props.employees[0].id)
    }
  },[props.employees])

  useEffect(() => {
    if(props.doctorTypes && props.doctorTypes.length > 0){
      setDoctorType(props.doctorTypes[0].id)
    }
  },[props.doctorTypes])

  useEffect(() => {
    if (props.DoctorInEditStage){
      setEmployee(props.DoctorInEditStage.employee)
      setDoctorType(props.DoctorInEditStage.doctorType)
    }
  },[props.DoctorInEditStage])

  const SelectedChangeHandler = (e) => {
    switch(e.target.name)
    {
      case 'doctorType':
        setDoctorType(e.target.value)
        return
      case 'employee':
        setEmployee(e.target.value)
        return
      default:
        return
    };
  }

  const SubmitFormHandler = e => {
    e.preventDefault();

    if(employee === null){
      alert('ابتدا باید عنوان شغلی پزشک مربوطه را در صفحه پرسنلی مشخص نمائید.')
      return
    }
    if(doctorType === null){
      alert('ابتدا باید نوع پزشک را به سامانه اضافه نمائید.')
      return
    }

    const doctor_Add = { employee, doctorType };
    if (!props.DoctorInEditStage) {
      props.addDoctor(doctor_Add);
      setEmployee(props.employees && props.employees.length > 0 ? props.employees[0].id : null)
      setDoctorType(props.doctorTypes && props.doctorTypes.length > 0 ? props.doctorTypes[0].id : null)
    } else {
      const id = props.DoctorInEditStage.id
      const doctor_Edit = { id, employee, doctorType };

      props.editDoctor(doctor_Edit);
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
        ویرایش پزشک
      </ModalHeader>
      <ModalBody style={{ textAlign: "center" }} className="modal-body">
        <Card>
          <CardBody>
            <Form onSubmit={SubmitFormHandler}>              
            <label>نوع پزشک</label>
              <br/>
              <select 
                name='doctorType' 
                value={doctorType}
                onChange={(e) => {SelectedChangeHandler(e)}}>
              {(props.doctorTypes && props.doctorTypes.length) > 0 ? (
                  props.doctorTypes.map(doctorType => <option key={doctorType.id} value={doctorType.id}>{doctorType.name}</option>
                  )) : (
                    <div>not found</div>
                  )}                    
              </select>
              <br/>
              <br/>
              <label>نام پزشک</label>
              <br/>
              <select 
                name='employee' 
                value={employee}
                onChange={(e) => {SelectedChangeHandler(e)}}>
              {(props.employees && props.employees.length) > 0 ? (
                  props.employees.map(employee => <option key={employee.id} value={employee.id}>{employee.first_name + ' ' + employee.last_name}</option>
                  )) : (
                    <div>not found</div>
                  )}                    
              </select>
              <br/>
              <br/>
              <Button
                // disabled={!isFormValid}
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
    employees: state.employees.employees,
    doctorTypes: state.doctorTypes.doctorTypes,
    isOpen: state.doctors.isModalOpen,
    DoctorInEditStage: state.doctors.doctorInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(DoctorModalToggler()),
    addDoctor: model => dispatch(AddDoctor(model)),
    editDoctor: model => dispatch(EditDoctor(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorModal);
