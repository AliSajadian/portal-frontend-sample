import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Table,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Card,
  CardBody
} from "reactstrap";
import Container from "reactstrap/lib/Container";
import {
  DocAppointmentModalToggler,
  AddDocAppointment,
  EditDocAppointment
} from "../../../../../redux/actions/docAppointmentsActions";
import "../../docAppointment.css"



class DocAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_name: '',
      user: 0,
      employees: [],
      appointmentTime: 0,
      // checkboxes: new Array(424).fill().map((_, i) => !i),
      name: "",
      isFormValid: true,
      flag: true,
      flag2: true,
      flg: true,
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      
      // console.log('@@@componentDidUpdate => flg , user@@@: ', this.state.flg , ' , ',  Number(this.state.user))
      if(this.state.flg && Number(this.state.user) !== 0)
      {
        let employees = [];
        this.props.employees.map(emp => 
          employees.push({id: Number(emp.id), checked: Number(emp.id) !== Number(this.state.user) ? false : true})
        )
        this.setState({
          employees: this.state.employees,
          flg: false,
        })
        // console.log('@@@componentDidUpdate => this.state.employees.length@@@: ', this.state.employees.length, ' ,checked id', this.state.user)
      }

      if (this.props.DocAppointmentInEditStage){
        // console.log('this.props.DocAppointmentInEditStage.name: ', this.props.DocAppointmentInEditStage.name)
        // console.log('this.state.name: ', this.state.name)

        if(this.state.flag2 && this.props.DocAppointmentInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.DocAppointmentInEditStage.name, 
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '',
          flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      name: event.target.value, 
      flag2: this.props.DocAppointmentInEditStage ? false : true
    });
  };

  selectEmployee = (id) => e => {
    // e.target.checked = !e.target.checked
    let employees = [];
    this.props.employees.map(emp => 
      employees.push({id: Number(emp.id), checked: (emp.id !== Number(e.target.value) ? false : (Boolean(e.target.checked) ? true : false))})
    )
    // console.log('***employees.length***: ', employees.length, ' ,checked id: ', Number(e.target.value), ' , checked: ', e.target.checked)

    this.setState({
      employees: employees,
      user: Boolean(e.target.checked) ? id : 0,
      flg: true,
    })
    // this.setState({ 
    //   user: Boolean(e.target.checked) ? id : 0,
    //   selected: !this.state.selected
    //  })

  

    // console.log('***this.state.employees.length***: ', this.state.employees.length, ' ,checked id: ', this.state.user, ' , checked: ', e.target.checked)
  }

  getAppointmentTime = (scheduleDay_id) => {
    const userID = Number(sessionStorage.getItem('userid'))
    let flg = false
    const filteredAppointmentTimes = this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id))

    // console.log('filteredAppointmentTimes: ', filteredAppointmentTimes)

    this.props.docAppointments && this.props.docAppointments.map(appointment => (appointment.user === userID && 
        filteredAppointmentTimes.filter(time => appointment.appointmentTime === time.id).length > 0) ? flg = true : '')

    const id = (!flg ? 
            (
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 0)) &&
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 0)).length > 0
              ?
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 0))[0].id
              :
              0
            ) : 
            (
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 1)) &&
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 1)).length > 0
              ?
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 1))[0].id
              :
              0
            ))
     return id
  }

  SubmitFormHandler = event => {
    event.preventDefault();

    const { appointmentTime, user } = this.state;
    const doctor = this.props.doctorID
    const docAppointment_Add = { appointmentTime, doctor, user };
    // console.log('docAppointment_Add: ', docAppointment_Add)
    if (!this.props.DocAppointmentInEditStage) {
      this.props.addDocAppointment(docAppointment_Add);
      this.setState({
        name: ""
      });
    } 
  };

  render = () => {
    return (
      <Modal style={{direction:'rtl'}}
        size="lg"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader  style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
        نوبت بیماران
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <Container>
                  <Row>  
                    <Table style={{direction:'rtl'}} hover striped responsive>
                    <thead id="th">
                    <tr id="tr">
                        <th >#</th>
                        <th style={{ width: "10%", textAlign:'center' }}>نام</th>
                        <th style={{ width: "20%", textAlign:'center' }}>
                        <input style={{ width: "100pt", direction:'ltr'}}
                            id="user-filter"
                            type="text"
                            value={this.state.userName}
                            onChange={(e) => this.setState({ last_name: String(e.target.value).toLowerCase() })}
                        />
                        <br/>
                        نام خانوادگی
                        </th>
                        <th style={{ width: "15%", textAlign:'center' }}>شرکت</th>
                        <th style={{ width: "15%", textAlign:'center' }}>دپارتمان</th>
                        <th style={{ width: "15%", textAlign:'center' }}>پروژه</th>
                        <th style={{ width: "20%", textAlign:'center' }}>عکس</th>
                        <th />
                        {/* <th style={{ width: "3%" }}/> */}
                    </tr>
                    </thead>
                    <tbody id="tb"> 
                      {this.props.employees && this.props.employees.length > 0 ? ( (this.state.last_name === '') ?
                        this.props.employees.map((employee, index) => {
                        return ( 
                            (!(employee.first_name === 'ad' && employee.last_name === 'min') && 
                              this.props.docAppointments.filter(appointment => 
                                appointment.user === employee.user && 
                                appointment.doctor === this.props.doctorID &&
                                (this.props.docAppointmentTimes.filter(time => appointment.appointmentTime === time.id && 
                                  time.schedulesDay === this.props.scheduleDayID).length > 0)
                                  ).length === 0 ? (
                            <tr key={index}>
                            <td style={{ width: "2%" }}>{index + 1}</td>
                            <td style={{ width: "10%", textAlign:'center' }}>{employee.first_name}</td>
                            <td style={{ width: "20%", textAlign:'center' }}>{employee.last_name}</td>
                            <td style={{ width: "15%", textAlign:'center' }}>
                                {
                                    (this.props.companies.filter(company => this.props.departments.filter(
                                        department => company.id === department.company && department.id === employee.department) &&
                                        this.props.departments.filter(department => company.id === department.company && 
                                        department.id === employee.department).length > 0) 
                                    &&
                                    this.props.companies.filter(company => this.props.departments.filter(
                                        department => company.id === department.company && department.id === employee.department) &&
                                        this.props.departments.filter(department => company.id === department.company && 
                                        department.id === employee.department).length > 0).length > 0) 
                                    ?
                                    this.props.companies.filter(company => this.props.departments.filter(
                                        department => company.id === department.company && department.id === employee.department) &&
                                        this.props.departments.filter(department => company.id === department.company && 
                                        department.id === employee.department).length > 0)[0].name
                                    : ''
                                }
                            </td>
                            <td style={{ width: "15%", textAlign:'center' }}>{(employee.department && this.props.departments && this.props.departments.length > 0) ? (
                                                    this.props.departments.filter(department => department.id === employee.department)[0]["name"]) : ""}</td>
                            <td style={{ width: "15%", textAlign:'center' }}>{(employee.project && this.props.projects && this.props.projects.length > 0) ? (
                                                    this.props.projects.filter(project => project.id === employee.project)[0]["name"]) : ""}</td>
                            <td style={{ width: "20%", textAlign:'center' }}>
                                {/* {console.log('url: ', employee.picture)} */}
                                <img src={employee.picture}
                                //{this.getEmployeePic(employee.id)} 
                                alt={employee.first_name + ' ' + employee.last_name} width='60' height='70'></img>
                            </td>
                            <td className="table-action" style={{ width: "3%"}}> 
                            {/* {
                              this.state.employees && 
                              this.state.employees.filter(emp => Number(employee.id) === Number(emp.id) && emp.checked) &&
                              this.state.employees.filter(emp => Number(employee.id) === Number(emp.id) && emp.checked).length > 0 ?
                                console.log(employee.id, ' ,checked: ',  this.state.employees && 
                                this.state.employees.filter(emp => Number(employee.id) === Number(emp.id) && emp.checked) &&
                                this.state.employees.filter(emp => Number(employee.id) === Number(emp.id) && emp.checked).length > 0) : ''
                            } */}
                            <input 
                                type="checkbox"
                                value={employee.id}
                                checked={
                                          this.state.employees && 
                                          this.state.employees.filter(emp => Number(employee.id) === Number(emp.id) && emp.checked) &&
                                          this.state.employees.filter(emp => Number(employee.id) === Number(emp.id) && emp.checked).length > 0
                                        }
                                onChange={this.selectEmployee(employee.id)}
                              />
                            </td>
                            </tr>) : <tr key={index}></tr>)
                        );
                        })
                        :
                        this.props.employees.filter(employee => employee.last_name ? employee.last_name.toLowerCase().includes(String(this.state.last_name)) : '').map((employee, index) => {
                            return ( 
                                (!(employee.first_name === 'ad' && employee.last_name === 'min') &&
                                  this.props.docAppointments.filter(appointment => 
                                    appointment.user === employee.user && 
                                    appointment.doctor === this.props.doctorID &&
                                    (this.props.docAppointmentTimes.filter(time => appointment.appointmentTime === time.id && 
                                      time.schedulesDay === this.props.scheduleDayID).length > 0)
                                      ).length === 0 ? (                                  
                                <tr key={index}>
                                <td style={{ width: "2%" }}>{index + 1}</td>
                                <td style={{ width: "5%", textAlign:'center' }}>{employee.first_name}</td>
                                <td style={{ width: "10%", textAlign:'center' }}>{employee.last_name}</td>
                                <td style={{ width: "4%", textAlign:'center' }}>
                                    {
                                    (this.props.companies.filter(company => this.props.departments.filter(
                                        department => company.id === department.company && department.id === employee.department) &&
                                        this.props.departments.filter(department => company.id === department.company && 
                                        department.id === employee.department).length > 0) 
                                    &&
                                    this.props.companies.filter(company => this.props.departments.filter(
                                        department => company.id === department.company && department.id === employee.department) &&
                                        this.props.departments.filter(department => company.id === department.company && 
                                        department.id === employee.department).length > 0).length > 0) 
                                    ?
                                    this.props.companies.filter(company => this.props.departments.filter(
                                        department => company.id === department.company && department.id === employee.department) &&
                                        this.props.departments.filter(department => company.id === department.company && 
                                        department.id === employee.department).length > 0)[0].name
                                    : ''
                                    }
                                </td>
                                <td style={{ width: "10%", textAlign:'center' }}>{(employee.department && this.props.departments && this.props.departments.length > 0) ? (
                                                        this.props.departments.filter(department => department.id === employee.department)[0]["name"]) : ""}</td>
                                <td style={{ width: "12%", textAlign:'center' }}>{(employee.project && this.props.projects && this.props.projects.length > 0) ? (
                                                        this.props.projects.filter(project => project.id === employee.project)[0]["name"]) : ""}</td>
                                <td style={{ width: "14%", textAlign:'center' }}>
                                    {/* {console.log('url: ', employee.picture)} */}
                                    <img src={employee.picture}
                                    //{this.getEmployeePic(employee.id)} 
                                    alt={employee.first_name + ' ' + employee.last_name} width='60' height='70'></img>
                                </td>
                                <td className="table-action" style={{ width: "3%"}}> 
                                <input 
                                    type="checkbox"
                                    value={employee.id}
                                    checked={this.state.selected}
                                    onChange={this.selectEmployee(employee.id)}
                                    />
                                </td>
                                </tr>) : <tr key={index}></tr>)
                            );
                            }))
                    : (<tr><td>not found</td></tr>)}
                  </tbody>
                  <tfoot id="tf">
                    <tr>
                        <th style={{ width: "80%", textAlign:'center' }}> تعداد کارمندان: {this.props.employees && this.props.employees.length > 0 ? (this.state.last_name === '' ? this.props.employees.length - 1 : this.props.employees.filter(user => user.last_name.toLowerCase().includes(this.state.last_name)).length) : ''}</th>
                    </tr>
                  </tfoot>
                </Table>
                  </Row>
                  <Row> 
                    <select value= {this.state.appointmentTime>0 ? this.state.appointmentTime : this.getAppointmentTime(this.props.scheduleDayID)}
                        onChange={(e) => this.setState({ appointmentTime: e.target.value })}>
                        {(this.props.docAppointmentTimes && this.props.docAppointmentTimes.length > 0) ? (
                            this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === this.props.scheduleDayID) && 
                            this.props.docAppointments.filter(appointment => (appointment.appointmentTime === appointmentTime.id)).length === 0).map(appointmentTime =>(
                            <option key={appointmentTime.id} value={appointmentTime.id}>{appointmentTime.reserveNo + '-   ' + appointmentTime.reserveTime}</option>
                            ))) : (
                            <div>not found</div>
                            )}                    
                    </select>
                  </Row>
                  <Row>
                    <Button
                    disabled={!this.state.isFormValid}
                    type="submit"
                    color="success"
                    >
                    تائید
                  </Button>
                  </Row>
                </Container>
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
    companies: state.companies.companies,
    departments: state.departments.departments,
    employees: state.employees.employees,
    docAppointmentTimes: state.docAppointmentTimes.docAppointmentTimes,
    docAppointments: state.docAppointments.docAppointments,
    isOpen: state.docAppointments.isModalOpen,
    doctorID: state.docAppointments.doctorID,
    scheduleDayID: state.docAppointments.scheduleDayID,
    DocAppointmentInEditStage: state.docAppointments.docAppointmentInEditStage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(DocAppointmentModalToggler()),
    addDocAppointment: model => dispatch(AddDocAppointment(model)),
    editDocAppointment: model => dispatch(EditDocAppointment(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocAppointmentModal);
