import React, { Component } from "react";
import {connect} from "react-redux";
import {
  Button,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {
  RemoveDocAppointment,
  EditDocAppointment,
  AddDocAppointment
} from "../../../../../redux/actions/docAppointmentsActions";
import '../../docAppointment.css'



class docAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      doctor: 0,
      appointmentTime: 0,
      start_hour: "12:00",
      end_hour: "14:00"
    };
  }

  componentDidUpdate() {
    if(this.props.doctors && this.props.doctors.length > 0 && this.state.doctor === 0)
    {
      this.setState({
        doctor: this.props.doctors[0].id
      })
    }
  }

  getWeekDay = day => {
    switch(day){
        case 6: 
          return 'شنبه';
        case 0:
          return 'یکشنبه';
        case 1:
          return 'دوشنبه';
        case 2:
          return 'سه شنبه';
        case 3:
          return 'چهارشنبه';
        case 4:
          return 'پنجشنبه';
        case 5:
          return 'جمعه';
        default:
    }
  }

  getGregorianDatesRange = persianMonth => {
    const currentDate = new Date();
    // const currentDate = new Date(2020, 11, 23);
    // console.log('currentDate: ', currentDate)
    let y = currentDate.getFullYear();
    let m = currentDate.getMonth()+1;
    let d = currentDate.getDate();
    // console.log('Test Date: ', y,'/', m,'/', d)
    let date1 = null, date2 = null;
    switch(persianMonth){
        case 'دی':
          // console.log('date1: ', new Date((m === 1) ? y - 1 : y, 11, 21))
          // console.log('date2: ', new Date((m === 1) ? y - 1 : y, 12, 19))

          date1 = new Date((m === 1) ? y - 1 : y, 11, 21)
          date2 = new Date((m === 1) ? y - 1 : y, 12, 19)
          // console.log('startdate: ', date1, ' ,endDate:', date2)
          break ;
        case 'بهمن':
          // console.log('date1: ', new Date((m === 1 || m === 2) ? y - 1 : y, 12, 20))
          // console.log('date2: ', new Date((m === 1 || m === 2) ? y : y + 1, 1, 18))

          date1 = new Date((m === 1 || m === 2) ? y - 1 : y, 12, 20)
          date2 = new Date((m === 1 || m === 2) ? y : y + 1, 2 - 1, 18)
          // console.log('startdate: ', date1, ' ,endDate:', date2)
          break ;
        case 'اسفند':
          // console.log('date1: ', new Date((m === 1 || m === 2 || m === 3) ? y : y + 1, 1, 19))
          // console.log('date2: ', new Date((m === 1 || m === 2 || m === 3) ? y : y + 1, 2, 20))

          date1 = new Date((m === 1 || m === 2 || m === 3) ? y : y + 1, 2 - 1, 19)
          date2 = new Date((m === 1 || m === 2 || m === 3) ? y : y + 1, 3 - 1, 20)
          // console.log('startdate: ', date1, ' ,endDate:', date2)
          break ;
        case 'فروردین':
          date1 = new Date(y, 3 - 1, 20)
          date2 = new Date(y, 4 - 1, 19)
          break ;
        case 'اردیبهشت':
          date1 = new Date(y, 4 - 1, 20)
          date2 = new Date(y, 5 - 1, 20)
          break ;
        case 'خرداد':
          date1 = new Date(y, 5 - 1, 21)
          date2 = new Date(y, 6 - 1, 20)
          break ;
        case 'تیر':
          date1 = new Date(y, 6 - 1, 21)
          date2 = new Date(y, 7 - 1, 21)
          break ;
        case 'مرداد':
          date1 = new Date(y, 7 - 1, 22)
          date2 = new Date(y, 8 - 1, 21)
          break ;
        case 'شهریور':
          date1 = new Date(y, 8 - 1, 22)
          date2 = new Date(y, 9 - 1, 21)
          break ;
        case 'مهر':
          date1 = new Date(y, 9 - 1, 22)
          date2 = new Date(y, 10 - 1, 21)
          break ;
        case 'آبان':
          date1 = new Date(y, 10 - 1, 22)
          date2 = new Date(y, 11 - 1, 20)
          break ;
        case 'آذر':
          date1 = new Date(y, 11 - 1, 21)
          date2 = new Date(y, 12 - 1, 20)
          break ;
        default:
    }
    this.setState({
        startdate: date1,
        enddate: date2
    });
  };

  getPersianMonthes = currentDate => {
    let month = currentDate.getUTCMonth()+1; 
    let day = currentDate.getUTCDate();
    let months = []
    switch(month){
        case 1:
            if(day < 21){
              months = [{month : 'دی'}, {month : 'بهمن'}, {month : 'اسفند'}];
            }
            else{
              months = [{month : 'بهمن'}, {month : 'اسفند'}, {month : 'فروردین'}];
            }
            break;
        case 2:
            if(day < 20){
              months = [{month : 'بهمن'}, {month : 'اسفند'}, {month : 'فروردین'}];
            }
            else{
              months = [{month : 'اسفند'}, {month : 'فروردین'}, {month : 'اردیبهشت'}];
            }
            break;
        case 3:
            if(day < 21){
              months = [{month : 'اسفند'}, {month : 'فروردین'}, {month : 'اردیبهشت'}];
            }
            else{
              months = [{month : 'فروردین'}, {month : 'اردیبهشت'}, {month : 'خرداد'}];
            }
            break;
        case 4:
            if(day < 21){
              months = [{month : 'فروردین'}, {month : 'اردیبهشت'}, {month : 'خرداد'}];
            }
            else{
                months = [{month : 'اردیبهشت'}, {month : 'خرداد'}, {month : 'تیر'}];
            }
            break;
        case 5:
            if(day < 22){
                months = [{month : 'اردیبهشت'}, {month : 'خرداد'}, {month : 'تیر'}];
            }
            else{
                months = [{month : 'خرداد'}, {month : 'تیر'}, {month : 'مرداد'}];
            }
            break;
        case 6:
            if(day < 22){
                months = [{month : 'خرداد'}, {month : 'تیر'}, {month : 'مرداد'}];
            }
            else{
                months = [{month : 'تیر'}, {month : 'مرداد'}, {month : 'شهریور'}];
            }
            break;
        case 7:
            if(day < 23){
                months = [{month : 'تیر'}, {month : 'مرداد'}, {month : 'شهریور'}];
            }
            else{
                months = [{month : 'مرداد'}, {month : 'شهریور'}, {month : 'مهر'}];
            }
            break;
        case 8:
            if(day < 23){
                months = [{month : 'مرداد'}, {month : 'شهریور'}, {month : 'مهر'}];
            }
            else{
                months = [{month : 'شهریور'}, {month : 'مهر'}, {month : 'آبان'}];
            }
            break;
        case 9:
            if(day < 23){
                months = [{month : 'شهریور'}, {month : 'مهر'}, {month : 'آبان'}];
            }
            else{
                months = [{month : 'مهر'}, {month : 'آبان'}, {month : 'آذر'}];
            }
            break;
        case 10:
            if(day < 23){
                months = [{month : 'مهر'}, {month : 'آبان'}, {month : 'آذر'}];
            }
            else{
                months = [{month : 'آبان'}, {month : 'آذر'}, {month : 'دی'}];
            }
            break;
        case 11:
            if(day < 22){
                months = [{month : 'آبان'}, {month : 'آذر'}, {month : 'دی'}];
            }
            else{
                months = [{month : 'آذر'}, {month : 'دی'}, {month : 'بهمن'}];
            }
            break;
        case 12:
            if(day < 22){
                months = [{month : 'آذر'}, {month : 'دی'}, {month : 'بهمن'}];
            }
            else{
                months = [{month : 'دی'}, {month : 'بهمن'}, {month : 'اسفند'}];
            }
            break;
        default:
    }
    return months;
  };
  
  getPersianMonth = date => {
    let date1 = String(date)
    let month = Number(date1.substring(date1.indexOf('-') + 1, date1.lastIndexOf('-'))); 
    let day = Number(date1.substring(date1.lastIndexOf('-') + 1)); 
    switch(month){
      case 1:
          if(day < 20){
              return 'دی' + (day + 11);
          }
          else{
              return 'بهمن' + (day - 19);
          }
      case 2:
          if(day < 19){
              return 'بهمن' + (day + 12);
          }
          else{
              return 'اسفند' + (day - 18);
          }
      case 3:
          if(day < 20){
              return 'اسفند' + (day + 10);
          }
          else{
              return 'فروردین' + (day - 19);
          }
      case 4:
          if(day < 20){
              return 'فروردین' + (day + 12);
          }
          else{
              return 'اردیبهشت' + (day - 19);
          }
      case 5:
          if(day < 21){
              return 'اردیبهشت' + (day + 11);
          }
          else{
              return 'خرداد' + (day - 20);
          }
      case 6:
          if(day < 21){
              return 'خرداد' + (day + 11);
          }
          else{
              return 'تیر' + (day - 20);
          }
      case 7:
          if(day < 23){
              return 'تیر' + (day + 10);
          }
          else{
              return 'مرداد' + (day - 21);
          }
      case 8:
          if(day < 23){
              return 'مرداد' + (day + 10);
          }
          else{
              return 'شهریور' + (day - 21);
          }
      case 9:
          if(day < 23){
              return 'شهریور' + (day + 10);
          }
          else{
              return 'مهر' + (day - 21);
          }
      case 10:
          if(day < 23){
              return 'مهر' + (day + 9);
          }
          else{
              return 'آبان' + (day - 21);
          }
      case 11:
          if(day < 22){
              return 'آبان' + (day + 10);
          }
          else{
              return 'آذر' + (day - 20);
          }
      case 12:
          if(day < 22){
              return 'آذر' + (day + 10);
          }
          else{
              return 'دی' + (day - 20);
          }
      default:
  }
  };

  setAppointment = (at) =>{
    const { doctor } = this.state;
    const appointmentTime = at
    const user = Number(sessionStorage.getItem('userid'))
    const selectedTime = { doctor, user, appointmentTime };
    // console.log('selectedTime: ', selectedTime)
    this.props.addAppointment(selectedTime);
    
    this.setState({
      appointmentTime: appointmentTime
    });
  }

  cancelAppointment = id =>{
    this.props.removeAppointment(id);
    this.setState({
      appointmentTime: 0,
    });
  }

  isDateValid = (startdate, scheduleDate, enddate) =>{
    const y1 = startdate.getFullYear()
    const y = Number(String(scheduleDate).substring(0, String(scheduleDate).indexOf('-')))
    const y2 = enddate.getFullYear()
    const m1 = startdate.getUTCMonth()+1
    const m = Number(String(scheduleDate).substring(String(scheduleDate).indexOf('-') + 1, String(scheduleDate).lastIndexOf('-')))
    const m2 = enddate.getUTCMonth()+1
    const d1 = startdate.getUTCDate()+1
    const d = Number(String(scheduleDate).substring(String(scheduleDate).lastIndexOf('-') + 1))
    const d2 = enddate.getUTCDate()+1
        
    if(y1<y){
      if(y<y2){
        return true
      } else if(y===y2){
        if(m<m2){
          return true
        } else if(m===m2){
          if(d<=d2){
            return true;
          }
        }
      }
    } else if(y1===y){
      if(m1<m){
        if(y<y2){
          return true
        } else if(y===y2){
          if(m<m2){
            return true
          } else if(m===m2){
            if(d<=d2){
              return true;
            }
          }
        }
      } else if(m1===m){
        if(d1<=d){
          if(y<y2){
            return true
          } else if(y===y2){
            if(m<m2){
              return true
            } else if(m===m2){
              if(d<=d2){
                return true;
              }
            }
          }
        }
      }
    }
    return false
  }

  getAppointmentTime = (scheduleDay_id) => {
    const userID = Number(sessionStorage.getItem('userid'))
    let flg = false
    const filteredAppointmentTimes = this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id))
    this.props.docAppointments && this.props.docAppointments.map(appointment => (appointment.user === userID && 
      filteredAppointmentTimes.filter(time => appointment.appointmentTime === time.id).length > 0) ? flg = true : '')

    const id = (!flg ? 
            (
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 0))[0].id
            ) : 
            (
              this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay_id) && 
              (this.props.docAppointments.filter(appointment => (appointment.user === userID) && 
              (appointment.appointmentTime === appointmentTime.id)).length === 1))[0].id
            ))
    return id
  }

  render = () => {
    const { doctor, startdate, enddate, appointmentTime } = this.state;
    const currentDate = new Date();
    // const currentDate = new Date(2020, 11, 23);
    // console.log('currentDate: ', currentDate)

    const months = this.getPersianMonthes(currentDate); 
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader className='card-header'>
          <CardTitle tag="h5" className="mb-0">
          نوبت دهی 
          </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
            <Card>
              <Row noGutters>
                <Col >
                  <select value={doctor} style={{width:'50%'}} className='select'
                    onChange={(e) => this.setState({ doctor: e.target.value })}>
                    {(this.props.doctors && this.props.doctors.length) > 0 ? (
                        this.props.doctors.map(doctor => 
                          <option key={doctor.id} value={doctor.id}>{
                            ((this.props.employees.filter(employee => employee.id === doctor.employee)) && 
                            (this.props.employees.filter(employee => employee.id === doctor.employee)).length>0 ? ' دکتر ' +
                            (this.props.employees.filter(employee => employee.id === doctor.employee))[0].first_name: '') + ' ' +
                            ((this.props.employees.filter(employee => employee.id === doctor.employee)) && 
                            (this.props.employees.filter(employee => employee.id === doctor.employee)).length>0 ?
                            (this.props.employees.filter(employee => employee.id === doctor.employee))[0].last_name: '')}</option>
                        )) : (
                        "not found"
                        )}                    
                  </select>
                </Col>
                <Col >
                  {months.map((month, index) => 
                    <Button key={index} variant="primary"
                            onClick={() =>
                              this.getGregorianDatesRange(month.month)
                            }
                            // value={month.month}
                            color="danger"
                            className="mx-1 align-middle"
                            size={'18'}
                        ><span style={{fontSize:'.8rem', fontWeight:'bold'}}>{month.month}</span>
                    </Button>)}
                </Col>
              </Row>
            </Card>
            <Card>
              <Row> 
            {  startdate && enddate && this.props.docScheduleDays.map((scheduleDay, index) => 
            (this.props.docScheduleWeeklyDays.filter(swd => swd.id === scheduleDay.schedulesWeekDay && Number(swd.doctor) === Number(doctor)).length > 0 &&
              this.isDateValid(startdate, scheduleDay.date, enddate))
              ? (
                   <Col key={index}>
                    <Card className='card-doc-appointment'>
                     <Row style={{textAlign:'center'}}>
                       <Col >
                         <Label >{this.getPersianMonth(scheduleDay.date) + "/"}</Label>
                       </Col>
                       <Col >
                         <Label >{this.getWeekDay(new Date(scheduleDay.date).getDay())}</Label>
                       </Col>
                     </Row>
                     <Row style={{textAlign:'center'}}>
                       <Col>
                          <br/>
                          {/* {
                            appointmentTime === 0 ? console.log('appointmentTime === 0, scheduleDay.id: ', scheduleDay.id, 'appointmentTime.id: ', this.getAppointmentTime(scheduleDay.id)) : console.log('appointmentTime !== 0, scheduleDay.id ', scheduleDay.id)
                          } */}
                          {/* appointmentTime > 0 ? appointmentTime :  */}
                          <select value= {appointmentTime>0 ? appointmentTime : this.getAppointmentTime(scheduleDay.id)}
                              onChange={(e) => this.setState({ appointmentTime: e.target.value })}>
                              {(this.props.docAppointmentTimes && this.props.docAppointmentTimes.length) > 0 ? (
                                  this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay.id) && 
                                  this.props.docAppointments.filter(appointment => (appointment.appointmentTime === appointmentTime.id)).length === 0).map(appointmentTime =>(
                                  // (this.props.docAppointments.filter(appointment => (appointment.user !== Number(sessionStorage.getItem('userid'))) && 
                                  //   (appointment.appointmentTime === appointmentTime.id)).length === 0 ? ( 
                                  <option key={appointmentTime.id} value={appointmentTime.id}>{appointmentTime.reserveNo + '-   ' + appointmentTime.reserveTime}</option>
                                  ))) : (
                                    <div>not found</div>
                                  )}                    
                          </select>
                       </Col>
                     </Row>
                     <Row>
                      <Col>
                      </Col>
                      <Col><br/>
                      </Col>
                     </Row>
                     <Row style={{textAlign:'center'}}>
                       {(this.props.docAppointments.filter(appointment => (appointment.user === Number(sessionStorage.getItem('userid'))) && 
                       this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay.id) && 
                       (appointment.appointmentTime === appointmentTime.id)).length > 0).length === 0 ? (
                            <Col>
                              <Button variant="primary" style={{width:'5em'}}
                                      onClick={() =>
                                        this.setAppointment(appointmentTime === 0 ? this.getAppointmentTime(scheduleDay.id) : appointmentTime)
                                      }
                                      color="primary"
                                      className="sx-1 align-middle"
                                      size={'18'}
                                  >تائید
                              </Button>
                              </Col>) : (
                              <Col>
                              <Button variant="primary" style={{width:'5em'}}
                                      onClick={() =>
                                        this.cancelAppointment(this.props.docAppointments.filter(appointment => (appointment.user === Number(sessionStorage.getItem('userid'))) && 
                                        this.props.docAppointmentTimes.filter(appointmentTime => (appointmentTime.schedulesDay === scheduleDay.id) && 
                                        (appointment.appointmentTime === appointmentTime.id)).length > 0)[0].id)
                                      }
                                      color="danger"
                                      className="sx-1 align-middle"
                                      size={'18'}
                                  >کنسل
                              </Button>
                        </Col>))}
                     </Row>
                   </Card>
                   </Col>
            ):"")}
            </Row>
          </Card>
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    employees: store.employees.employees,
    doctors: store.doctors.doctors,
    docAppointmentTimes: store.docAppointmentTimes.docAppointmentTimes,
    docAppointments: store.docAppointments.docAppointments,
    docScheduleDays: store.docScheduleDays.docScheduleDays,
    docScheduleWeeklyDays: store.docScheduleWeeklyDays.docScheduleWeeklyDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeAppointment: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveDocAppointment(id));
      }
    },
    editAppointment: model => {
      dispatch(EditDocAppointment(model))}, 
    addAppointment: model => {
      dispatch(AddDocAppointment(model))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(docAppointments);
