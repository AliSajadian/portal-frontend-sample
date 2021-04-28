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
  EmployeeModalToggler,
  AddEmployee,
  EditEmployee,
  EditEmployeeEx
} from "../../../../../redux/actions/employeesActions";
import { GetEmployeesList } from "../../../../../redux/actions/employeesActions";



class EmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personel_code: '',
      first_name: "",
      last_name: "",
      gender: false,
      picture: null,
      pictureChanged: false,
      phone: "",
      email: "",
      department: 1,
      jobPosition: 1,
      project: 1,
      projectCheck: false,
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.EmployeeInEditStage){
        if(this.state.flag2 && this.props.EmployeeInEditStage.personel_code !== this.state.personel_code) { 
          this.setState({
            personel_code: this.props.EmployeeInEditStage.personel_code,
            first_name: this.props.EmployeeInEditStage.first_name,
            last_name: this.props.EmployeeInEditStage.last_name,
            gender: this.props.EmployeeInEditStage.gender,
            phone: this.props.EmployeeInEditStage.phone,
            picture: this.props.EmployeeInEditStage.picture,
            email: this.props.EmployeeInEditStage.email,
            department: this.props.EmployeeInEditStage.department,
            jobPosition: this.props.EmployeeInEditStage.jobPosition,
            project: this.props.EmployeeInEditStage.project,
            projectCheck: this.props.EmployeeInEditStage.project? true: false,
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.first_name !== ''){
        this.setState({
          personel_code: '',
          first_name: '',
          last_name: '',
          gender: false,
          phone: '',
          picture: null,
          email: '',
          department: 1,
          jobPosition: 1,
          project: 1,
          projectCheck: false,
          flag: true
        });        
      }
    }
  }

  onChangeHandler = event => { 
    switch(event.target.name)
    {
      case 'project_check':
        this.setState({
          projectCheck: !this.state.projectCheck
        });
        return;
      case 'personel_code':
        this.setState({
          personel_code: event.target.value, 
          flag2: this.props.EmployeeInEditStage ? false : true
        });
        return;
      case 'first_name':
        this.setState({
          first_name: event.target.value, 
          // flag2: this.props.EmployeeInEditStage ? false : true
        });
        return;
      case 'last_name':
        this.setState({
          last_name: event.target.value
        });
        return;
      case 'gender':
        this.setState({
          gender: event.target.value
        });
        return;
      case 'picture':
        this.setState({
          picture: event.target.files ? event.target.files[0] : null,
          pictureChanged: true
        });
        return;            
      case 'phone':
        this.setState({
          phone: event.target.value
        });
        return;
      case 'email':
        this.setState({
          email: event.target.value
        });
        return;          
      default:
        return;
    }
  };

  submitFormHandler = event => {
    event.preventDefault();

    const { personel_code, first_name, last_name, picture, email, phone, department, jobPosition, project, gender, projectCheck } = this.state;

    if (!this.props.EmployeeInEditStage) {
      if(picture && picture.name){
        let employee_add = new FormData();
        employee_add.append('personel_code', personel_code);
        employee_add.append('first_name', first_name);
        employee_add.append('last_name', last_name);
        employee_add.append('picture', picture, picture.name)
        employee_add.append('phone', phone);
        employee_add.append('email', email);
        if(!projectCheck){
          employee_add.append('department', department);
        }
        employee_add.append('jobPosition', jobPosition);
        if(projectCheck){
          employee_add.append('project', project);
        }
        employee_add.append('gender', gender);

        this.props.addEmployee(employee_add);
      }
      else
      {
        let employee_add = {
          'personel_code': personel_code,
          'first_name': first_name,
          'last_name': last_name,
          'phone': phone,
          'email': email,
          'department': !projectCheck ? department : null,
          'jobPosition': jobPosition,
          'project': projectCheck ? project : null,
          'gender': gender
          }
          this.props.addEmployee(employee_add);  
      }
    } else {
      const id = this.props.EmployeeInEditStage.id
      if(picture && picture.name){
        let employee_edit = new FormData();
        employee_edit.append('personel_code', personel_code);
        employee_edit.append('first_name', first_name);
        employee_edit.append('last_name', last_name);
        employee_edit.append('picture', picture , picture.name)
        employee_edit.append('phone', phone);
        employee_edit.append('email', email);
        if(!projectCheck){
          employee_edit.append('department', department);
        }
        employee_edit.append('jobPosition', jobPosition);
        if(projectCheck){
          employee_edit.append('project', project);
        }
        employee_edit.append('gender', gender);
        this.props.editEmployeeEx(id, employee_edit);
        this.setState({
          flag2: true
        });
      }
      else
      {
        let employee_edit = {
        'id': id,
        'personel_code': personel_code,
        'first_name': first_name,
        'last_name': last_name,
        'phone': phone,
        'email': email,
        'department': !projectCheck ? department : null,
        'jobPosition': jobPosition,
        'project': projectCheck ? project : null,
        'gender': gender
        }
        this.props.editEmployee(employee_edit);        
        this.setState({
          flag2: true
        });
      }
    }

    this.setState({
      personel_code: "",
      first_name: "",
      last_name: "",
      gender: false,
      picture: null,
      pictureChanged: false,
      phone: "",
      email: "",
      department: 1,
      jobPosition: 1,
      project: 1,
      projectCheck: false,
      flag: false
    });
  };

  render = () => {
    const { personel_code, first_name, last_name, gender, email, phone, department, jobPosition, project, projectCheck, isFormValid } = this.state;
    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش پرسنل
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.submitFormHandler}> 
                <label>پروژه</label>
                <br/>
                <label>
                  <input 
                    type="checkbox"
                    name="project_check"
                    checked={projectCheck}
                    onChange={this.onChangeHandler}
                  />
                  <span>   </span>
                </label>
                <select value={project ? project : ""} disabled={!projectCheck}
                onChange={(e) => this.setState({ project: e.target.value })}>
                {(this.props.projects && this.props.projects.length) > 0 ? (
                    this.props.projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                <br/>           
                <label>دپارتمان</label>
                <br/>
                <select value={department ? department : ""} disabled={projectCheck}
                onChange={(e) => this.setState({ department: e.target.value })}>
                {(this.props.departments && this.props.departments.length) > 0 ? (
                    this.props.departments.map(department => <option key={department.id} value={department.id}>{department.name}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                <br/>
                <label>عنوان شغلی</label>
                <br/>
                <select value={jobPosition ? jobPosition : jobPosition}
                onChange={(e) => this.setState({ jobPosition: e.target.value })}>
                {(this.props.jobPositions && this.props.jobPositions.length) > 0 ? (
                    this.props.jobPositions.map(jobPosition => <option key={jobPosition.id} value={jobPosition.id}>{jobPosition.name}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                <br/>
                <label>کد پرسنلی</label>
                <input
                  className="form-control"
                  type="text"
                  name="personel_code"
                  value={personel_code}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <label>نام</label>
                <input
                  className="form-control"
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <label>نام خانوادگی</label>
                <input
                  className="form-control"
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <label>جنیست</label>
                <select value={gender}
                onChange={(e) => this.setState({ gender: e.target.value })}>
                  <option key='1' value={false}>آقا</option>
                  <option key='2' value={true}>خانم</option>
                </select>
                <br/>
                <br/>
                <label>پست الکترونیکی</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <label>تلفن</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <label>عکس</label>
                <input style={{backgroundColor:'snow'}}
                  className="form-control"
                  type="file"
                  name="picture"
                  // value={picture}
                  onChange={this.onChangeHandler}
                ></input>
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
    jobPositions: state.jobPositions.jobPositions,
    projects: state.projects.projects,
    isOpen: state.employees.isModalOpen,
    EmployeeInEditStage: state.employees.employeeInEditStage,
    employees: state.employees.employees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(EmployeeModalToggler()),
    addEmployee: model => dispatch(AddEmployee(model)),
    editEmployee: model => dispatch(EditEmployee(model)),
    editEmployeeEx: (id, model) => dispatch(EditEmployeeEx(id, model)),
    getEmployees: () => dispatch(GetEmployeesList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModal);
