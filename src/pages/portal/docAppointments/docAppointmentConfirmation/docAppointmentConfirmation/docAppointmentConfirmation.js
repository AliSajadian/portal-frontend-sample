import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Col,
  Row,
  Table,
} from "reactstrap";
import {
  ChevronDown, ChevronUp, Trash, PlusCircle, Bell
} from "react-feather";
import {
  RemovePatientFile,
  EditPatientFile,
  AddPatientFile
} from "../../../../../redux/actions/patientsActions";
import {
  EditDocAppointment,
  RemoveDocAppointment,
  GetDocAppointmentModal,
  AddDocAppointmentModel,
  SetDocAppointmentDoctorID,
  SetDocAppointmentScheduleDayID,
} from "../../../../../redux/actions/docAppointmentsActions";
import {
  AddNotification,
} from "../../../../../redux/actions/notificationsActions";
import '../../docAppointment.css'
import * as types from "../../../../../redux/constants";



class AppointmentConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: 0,
      appointments: [],
      isOpen: false,
      appointmentID: 0,
      scheduleDay_id: 0,
      scheduleDay_date: null,
      userID: 0,
      description: '',
      used: false,
      fileTitle: '',
      file: null,
    };
  }

  componentDidUpdate() {
    const filteredTimes = this.props.docAppointmentTimes.filter(time => (time.schedulesDay === this.state.scheduleDay_id))
    let filteredAppointments = this.props.docAppointments.filter(appointment => (filteredTimes.filter(time => time.id === appointment.appointmentTime).length > 0))
    filteredAppointments = filteredAppointments.sort((a, b) => a.appointmentTime - b.appointmentTime)

    if(this.state.appointments.length > 0 && filteredAppointments.length > 0 && !this.compareAppointments(this.state.appointments, filteredAppointments)){
      this.setState({
        appointments: filteredAppointments,
      })
    }

    if(this.props.doctors && this.props.doctors.length > 0 && this.state.doctor === 0)
    {
      this.setState({
        doctor: this.props.doctors[0].id,
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

  getGregorianDatesRange1 = persianMonth => {
    const currentDate = new Date();
    let y = currentDate.getFullYear();
    let m = currentDate.getMonth()+1;
    // let d = currentDate.getDate();
    let date1 = null, date2 = null;
    let year1 = currentDate.getFullYear();
    // let year2 = year1-1;
    switch(persianMonth){
        // case 'دی':
        //   date1 = new Date(year2, 11, 21)
        //   date2 = new Date(year1, 12, 19)
        //   break ;
        // case 'بهمن':
        //   date1 = new Date(year1, 12, 20)
        //   date2 = new Date(year1, 1, 19)
        //   break ;
        // case 'اسفند':
        //   date1 = new Date(year1, 1, 20)
        //   date2 = new Date(year1, 2, 20)
        //   break ;
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
          date1 = new Date(year1, 2, 20)
          date2 = new Date(year1, 3, 19)
          break ;
        case 'اردیبهشت':
          date1 = new Date(year1, 3, 20)
          date2 = new Date(year1, 4, 20)
          break ;
        case 'خرداد':
          date1 = new Date(year1, 4, 21)
          date2 = new Date(year1, 5, 20)
          break ;
        case 'تیر':
          date1 = new Date(year1, 5, 21)
          date2 = new Date(year1, 6, 21)
          break ;
        case 'مرداد':
          date1 = new Date(year1, 6, 22)
          date2 = new Date(year1, 7, 21)
          break ;
        case 'شهریور':
          date1 = new Date(year1, 7, 22)
          date2 = new Date(year1, 8, 21)
          break ;
        case 'مهر':
          date1 = new Date(year1, 8, 22)
          date2 = new Date(year1, 9, 21)
          break ;
        case 'آبان':
          date1 = new Date(year1, 9, 22)
          date2 = new Date(year1, 10, 20)
          break ;
        case 'آذر':
          date1 = new Date(year1, 10, 21)
          date2 = new Date(year1, 11, 20)
          break ;
        default:
    }
    this.setState({
        appointmentID: 0,
        startdate: date1,
        enddate: date2,
        description: '',
        fileTitle: '',
        file: null
    });
  };

  getGregorianDatesRange = persianMonth => {
    const currentDate = new Date();
    let y = currentDate.getFullYear();
    let m = currentDate.getMonth()+1;
    let d = currentDate.getDate();
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
      appointmentID: 0,
      appointments: [],
      isOpen: false,
      startdate: date1,
      enddate: date2,
      description: '',
      fileTitle: '',
      file: null
    });
  };

  getPersianMonthes = currentDate => {
    let month = currentDate.getUTCMonth()+1; 
    let day = currentDate.getUTCDate();
    let months = []
    switch(month){
        case 1:
            if(day < 20){
              months = [{month : 'دی'}, {month : 'بهمن'}, {month : 'اسفند'}];
            }
            else{
              months = [{month : 'بهمن'}, {month : 'اسفند'}, {month : 'فروردین'}];
            }
            break;
        case 2:
            if(day < 19){
              months = [{month : 'بهمن'}, {month : 'اسفند'}, {month : 'فروردین'}];
            }
            else{
              months = [{month : 'اسفند'}, {month : 'فروردین'}, {month : 'اردیبهشت'}];
            }
            break;
        case 3:
            if(day < 20){
              months = [{month : 'اسفند'}, {month : 'فروردین'}, {month : 'اردیبهشت'}];
            }
            else{
              months = [{month : 'فروردین'}, {month : 'اردیبهشت'}, {month : 'خرداد'}];
            }
            break;
        case 4:
            if(day < 20){
              months = [{month : 'فروردین'}, {month : 'اردیبهشت'}, {month : 'خرداد'}];
            }
            else{
                months = [{month : 'اردیبهشت'}, {month : 'خرداد'}, {month : 'تیر'}];
            }
            break;
        case 5:
            if(day < 21){
                months = [{month : 'اردیبهشت'}, {month : 'خرداد'}, {month : 'تیر'}];
            }
            else{
                months = [{month : 'خرداد'}, {month : 'تیر'}, {month : 'مرداد'}];
            }
            break;
        case 6:
            if(day < 21){
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
          if(day < 21){
              return (day + 10) + '/ دی';
          }
          else{
              return (day - 20) + '/ بهمن';
          }
      case 2:
          if(day < 20){
              return (day + 11) + '/ بهمن';
          }
          else{
              return (day - 19) + '/ اسفند';
          }
      case 3:
          if(day < 21){
              return (day + 9) + '/ اسفند';
          }
          else{
              return (day - 20) + '/ فروردین';
          }
      case 4:
          if(day < 21){
              return (day + 11) + '/ فروردین';
          }
          else{
              return (day - 20) + '/ اردیبهشت';
          }
      case 5:
          if(day < 22){
              return (day + 11) + '/ اردیبهشت';
          }
          else{
              return (day - 20) + '/ خرداد';
          }
      case 6:
          if(day < 22){
              return (day + 11) + '/ خرداد';
          }
          else{
              return (day - 20) + '/ تیر';
          }
      case 7:
          if(day < 23){
              return (day + 11 ) + '/ تیر';
          }
          else{
              return (day - 21) + '/ مرداد';
          }
      case 8:
          if(day < 23){
              return (day + 10) + '/ مرداد';
          }
          else{
              return (day - 21) + '/ شهریور';
          }
      case 9:
          if(day < 23){
              return (day + 8) + '/ شهریور';
          }
          else{
              return (day - 21) + '/ مهر';
          }
      case 10:
          if(day < 23){
              return (day + 9) + '/ مهر';
          }
          else{
              return (day - 21) + '/ آبان';
          }
      case 11:
          if(day < 22){
              return (day + 9) + '/ آبان';
          }
          else{
              return (day - 20) + '/ آذر';
          }
      case 12:
          if(day < 22){
              return (day + 10) + '/ آذر';
          }
          else{
              return (day - 20) + '/ دی';
          }
      default:
  }
  };

  showAppointments = (scheduleDay_id, scheduleDay_date) =>{
    const filteredTimes = this.props.docAppointmentTimes.filter(time => (time.schedulesDay === scheduleDay_id))
    const filteredAppointments = this.props.docAppointments.filter(appointment => (filteredTimes.filter(time => time.id === appointment.appointmentTime).length > 0))

    this.setState({
      appointmentID: 0,
      userID: 0,
      appointments: filteredAppointments,
      isOpen: true,
      scheduleDay_id: scheduleDay_id,
      scheduleDay_date: scheduleDay_date,
      description: '',
      date: null,
      now: new Date(),
      fileTitle: '',
      file: null
    });

    this.props.setDocAppointmentScheduleDayID(scheduleDay_id)
    this.props.SetDocAppointmentDoctorID(this.state.doctor)
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

  pushUp = (appointmentID, appointmentTimeID) => {
    let id = appointmentID
    let appointmentTime = appointmentTimeID
    let reserveNo = this.props.docAppointmentTimes.filter(time => (time.id === appointmentTime))[0].reserveNo
    if(reserveNo === 1) {
      alert('عملیات مجاز نمیباشد')
      return
    }
    const previousNo = reserveNo - 1
    const previousTimeID = this.props.docAppointmentTimes.filter(time => (time.reserveNo === previousNo && time.schedulesDay === this.state.scheduleDay_id))[0].id
    const previousAppointmentID = this.props.docAppointments.filter(apnt => apnt.appointmentTime === previousTimeID) &&
                this.props.docAppointments.filter(apnt => apnt.appointmentTime === previousTimeID).length > 0 ? 
                this.props.docAppointments.filter(apnt => apnt.appointmentTime === previousTimeID)[0].id : 0

    if(previousAppointmentID !== 0){
      appointmentTime = previousTimeID
      const upperAppointment = { id, appointmentTime };
      id = previousAppointmentID
      appointmentTime = appointmentTimeID
      const lowerAppointment = { id, appointmentTime };

      this.props.editAppointment(upperAppointment);
      this.props.editAppointment(lowerAppointment);
    }else{
      appointmentTime = previousTimeID
      const appointment = { id, appointmentTime };

      this.props.editAppointment(appointment);
    }
  }

  pushDown = (appointmentID, appointmentTimeID) => {
    let id = appointmentID
    let appointmentTime = appointmentTimeID
    let reserveNo = this.props.docAppointmentTimes.filter(time => (time.id === appointmentTime))[0].reserveNo
    const lastNo = this.props.docAppointmentTimes.filter(time => (time.schedulesDay === this.state.scheduleDay_id)).length
    if(reserveNo === lastNo) {
      alert('عملیات مجاز نمیباشد')
      return
    }
    const nextNo = reserveNo + 1
    const nextTimeID = this.props.docAppointmentTimes.filter(time => (time.reserveNo === nextNo && time.schedulesDay === this.state.scheduleDay_id))[0].id
    const nextAppointmentID = this.props.docAppointments.filter(apnt => apnt.appointmentTime === nextTimeID) &&
                  this.props.docAppointments.filter(apnt => apnt.appointmentTime === nextTimeID).length ? 
                  this.props.docAppointments.filter(apnt => apnt.appointmentTime === nextTimeID)[0].id : 0

    if(nextAppointmentID !== 0){
      appointmentTime = nextTimeID
      const lowerAppointment = { id, appointmentTime };
      appointmentTime = appointmentTimeID
      id = nextAppointmentID
      const upperAppointment = { id, appointmentTime };

      this.props.editAppointment(upperAppointment);
      this.props.editAppointment(lowerAppointment);
    }else{
      appointmentTime = nextTimeID
      const appointment = { id, appointmentTime };

      this.props.editAppointment(appointment);
    }
  }

  compareAppointments = (appointments1, appointments2) => {
    const a = appointments1.filter(a1 => appointments2.filter(a2 => Number(a1.id) === Number(a2.id) && Number(a1.appointmentTime) === Number(a2.appointmentTime)) ?
                            appointments2.filter(a2 => Number(a1.id) === Number(a2.id) && Number(a1.appointmentTime) === Number(a2.appointmentTime)).length === 1 :
                            false) ?
                            appointments1.filter(a1 => appointments2.filter(a2 => Number(a1.id) === Number(a2.id) && Number(a1.appointmentTime) === Number(a2.appointmentTime)) ?
                            appointments2.filter(a2 => Number(a1.id) === Number(a2.id) && Number(a1.appointmentTime) === Number(a2.appointmentTime)).length === 1 :
                            false).length : 
                            false
    const b = appointments1.length
    const c = appointments2.length
    return a===b && a===c && b===c
  }

  sendNotification = (userID, timeID) => {
    const time = this.props.docAppointmentTimes.filter(time => time.id === timeID)[0]
    console.log('time: ', time)
    const reserveNo = time.reserveNo
    const reserveTime = time.reserveTime
    const date = this.props.docScheduleDays.filter(sd => sd.id === time.schedulesDay)[0].date 
    const currentDate = new Date();
    console.log('date: ', date)
    console.log('currentDate: ', currentDate)

    if(date < currentDate){
      alert('این تاریخ مطب گذشته است')
      return
    }
    const persianDate = this.getPersianMonth(date)
    const weekDay = this.getWeekDay(new Date(date).getDay())
    const description = 'تاریخ:' + persianDate + ' ' + weekDay + ' ساعت: ' + reserveTime + ' شما نفر ' + reserveNo + 'ام میباشید'

    
    let y = currentDate.getFullYear();
    let m = currentDate.getMonth()+1;
    let d = currentDate.getDate();
    const created_date = String(y) + '-' + (m < 10 ? '0' + String(m) : String(m)) + '-' + (d < 10 ? '0' + String(d) : String(d))

    let notification = {type:1, title:'وقت مطب', description:description, created_date:created_date, expired_date:date, notifier_user:userID}
    console.log('notification: ', notification)
    console.log('created_date: ', created_date)


    this.props.addNotification(notification)
  }
 

  render = () => {
    const { startdate, enddate, appointments, doctor, isOpen } = this.state;
    const currentDate = new Date();
    const months = this.getPersianMonthes(currentDate); 

    // var day_card = {
    //   position: 'absolute',
    //   opacity: this.props.error && Number(loginTrialNo) >= 2  ? "2.85em" : "-9999px"
    // }
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader className='card-header'>
          <CardTitle tag="h5" className="mb-0">
          تائید نوبت بیماران
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
                        ""
                        )}                    
                </select>                
              </Col>
              <Col>
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
              {startdate && enddate && this.props.docScheduleDays.map((scheduleDay, index) => (
                this.props.docScheduleWeeklyDays.filter(swd => swd.id === scheduleDay.schedulesWeekDay && Number(swd.doctor) === Number(doctor)).length > 0 && 
                this.isDateValid(startdate, scheduleDay.date, enddate))
              ? (
                  <Col key={index}>
                    <Card className={scheduleDay.id === this.state.scheduleDay_id ? 'card-patient-fade' : 'card-patient'} style={{marginRight:'2em'}}>
                    <Row style={{textAlign:'center'}}>
                      <Col >
                        <Label >{this.getPersianMonth(scheduleDay.date)}</Label>
                      </Col>
                      <Col >
                        <Label >{this.getWeekDay(new Date(scheduleDay.date).getDay())}</Label>
                      </Col>
                    </Row>
                        <Row style={{textAlign:'center'}}>
                            <Col>
                                    {scheduleDay.start_hour}
                            </Col>
                        </Row>
                        <Row style={{textAlign:'center'}}>
                            <Col>
                                    {scheduleDay.end_hour}
                            </Col>
                        </Row>
                    <Row>
                      <Col>
                      </Col>
                      <Col>
                      </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                        <Button variant="primary"
                                onClick={() =>
                                this.showAppointments(scheduleDay.id, scheduleDay.date)
                                }
                                color="primary"
                                className="sx-1 align-middle"
                                size={'18'}
                            >نمایش
                        </Button>
                        </Col>
                    </Row>
                  </Card>
                  </Col>
              ):"")}
            </Row>
            <br/>
            <Row >
              {appointments.length > 0 || isOpen? (
              <Card className="card3D" style={{width:'95%', margin:'auto'}}>
                <CardHeader>
                  <CardTitle tag="h5">
                    وقت بیماران
                  </CardTitle>
                </CardHeader>
                <CardBody >
                  <Table style={{direction:'rtl'}} hover striped responsive>
                    <thead id='th'>
                        <tr id='tr'>
                            <th >#</th>
                            <th style={{ width: "48%", textAlign:'center' }}>نام بیمار</th>
                            <th style={{ width: "18%", textAlign:'center' }}>شماره نوبت</th>
                            <th style={{ width: "25%", textAlign:'center' }}>وقت بیمار</th>
                            <th ></th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody id='tb'>
                      {this.state.appointments.sort((a, b) => a.appointmentTime - b.appointmentTime).map((appointment, index) => {
                        return(
                        <tr key={index}>
                            <td style={{ width: "5%"}}>{index + 1}
                            </td>
                            <td style={{ width: "42%", textAlign:'center' }}>{`${this.props.employees.filter(emp => (emp.user === appointment.user)) ? this.props.employees.filter(emp => (emp.user === appointment.user))[0].first_name : ''} ${this.props.employees.filter(emp => (emp.user === appointment.user)) ? this.props.employees.filter(emp => (emp.user === appointment.user))[0].last_name : ''}`}</td>

                            <td style={{ width: "15%", textAlign:'center' }}>{this.props.docAppointmentTimes.filter(time => (time.id === appointment.appointmentTime))[0].reserveNo}</td>
                            <td style={{ width: "25%", textAlign:'center' }}>
                                {this.props.docAppointmentTimes.filter(time => (time.id === appointment.appointmentTime))[0].reserveTime}
                            </td>
                            <td style={{ width: "10%", textAlign:'center' }}>
                            <ChevronDown
                            onClick={() => this.pushDown(appointment.id, appointment.appointmentTime)}
                            className="align-middle"
                            size={18}
                            />
                            </td>
                            <td style={{ width: "10%", textAlign:'center' }}>
                            <ChevronUp
                                onClick={() => this.pushUp(appointment.id, appointment.appointmentTime)}
                                className="align-middle"
                                size={18}
                              />                          
                            </td>
                            <td style={{ width: "10%", textAlign:'center' }}>
                            <Trash 
                            onClick={() => this.props.removeDocAppointment(appointment.id)}
                            className="align-middle"
                            size={18}
                            />
                            </td>
                            <td style={{ width: "10%", textAlign:'center' }}>
                            <Bell 
                            onClick={() => this.sendNotification(appointment.user, appointment.appointmentTime)}
                            className="align-middle"
                            size={18}
                            />
                            </td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <PlusCircle
                        onClick={() => this.props.addDocAppointmentModel()}
                        className="align-middle"
                        size={18}
                    />
                </CardFooter>
              </Card>
              ):''}
            </Row>
          </Card>
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    doctors: store.doctors.doctors,
    employees: store.employees.employees,
    docAppointmentTimes: store.docAppointmentTimes.docAppointmentTimes,
    docAppointments: store.docAppointments.docAppointments,
    docScheduleDays: store.docScheduleDays.docScheduleDays,
    docScheduleWeeklyDays: store.docScheduleWeeklyDays.docScheduleWeeklyDays,
    // patientsFiles: store.patientsFiles.patientsFiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removePatientFile: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemovePatientFile(id));
      }
    },
    editPatientFile: model => {
      dispatch(EditPatientFile(model))}, 
    addPatientFile: model => {
      dispatch(AddPatientFile(model))},
    removeDocAppointment: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveDocAppointment(id));
      }
    },
    editAppointment: model => {
      dispatch(EditDocAppointment(model))}, 
    toggleModal: () =>
    dispatch({
      type: types.TOGGLE_SURVEY_TYPE_MODAL
    }),
    getDocAppointmentModal: id => {dispatch(GetDocAppointmentModal(id))}, 
    addDocAppointmentModel: () => {dispatch(AddDocAppointmentModel())},  
    SetDocAppointmentDoctorID: id => {dispatch(SetDocAppointmentDoctorID(id))},
    setDocAppointmentScheduleDayID: id => {dispatch(SetDocAppointmentScheduleDayID(id))},

    addNotification: model => {
      dispatch(AddNotification(model))},    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentConfirmation);
