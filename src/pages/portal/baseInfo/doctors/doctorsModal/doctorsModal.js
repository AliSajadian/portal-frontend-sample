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
  DoctorModalToggler,
  AddDoctor,
  EditDoctor
} from "../../../../../redux/actions/doctorsActions";


class DoctorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      doctorType: 1,
      isFormValid: true,
      flag: true,
      flag2: true,
      flag3: true
    };
  }

  componentDidUpdate() {
    if(this.state.flag3 && this.state.employee === null)
    {
      this.setState({
        employee: this.props.employees && this.props.employees.length > 0 ? this.props.employees[0].id : null,
        doctorType: 1,
        flag3: false
      }); 
    }

    if(this.props.isOpen){
      if (this.props.DoctorInEditStage){    

        if(this.state.flag2 && this.props.DoctorInEditStage.employee !== this.state.employee) { 
          this.setState({
            employee: this.props.DoctorInEditStage.employee,
            doctorType: this.props.DoctorInEditStage.doctorType,
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.employee !== ''){
        this.setState({
          employee: this.props.employees && this.props.employees.length > 0 ? this.props.employees[0].id : null,
          doctorType: 1,
          flag: true
        });        
      }
    }
  }

  SubmitFormHandler = event => {
    event.preventDefault();

    const { employee, doctorType } = this.state;
    const doctor_Add = { employee, doctorType };

    if (!this.props.DoctorInEditStage) {
      // console.log('doctor_Add: ', doctor_Add)
      this.props.addDoctor(doctor_Add);
      this.setState({
        firstName: '',
        lastName: ''
      });
    } else {
      const id = this.props.DoctorInEditStage.id
      const doctor_Edit = { id, employee, doctorType };

      this.props.editDoctor(doctor_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    const { doctorType, employee, isFormValid } = this.state;
    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش پزشک
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>              
              <label>نوع پزشک</label>
                <br/>
                <select value={doctorType}
                onChange={(e) => {this.setState({ doctorType: e.target.value, flag2: this.props.DoctorInEditStage ? false : true })}}>
                {(this.props.doctorTypes && this.props.doctorTypes.length) > 0 ? (
                    this.props.doctorTypes.map(doctorType => <option key={doctorType.id} value={doctorType.id}>{doctorType.name}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                <br/>
                <label>نام پزشک</label>
                <br/>
                <select value={employee}
                onChange={(e) => this.setState({ employee: e.target.value, flag2: this.props.DoctorInEditStage ? false : true })}>
                {(this.props.employees && this.props.employees.length) > 0 ? (
                    this.props.employees.map(employee => <option key={employee.id} value={employee.id}>{employee.first_name + ' ' + employee.last_name}</option>
                    )) : (
                      <div>not found</div>
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
