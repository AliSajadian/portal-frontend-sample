import React, { Component } from "react";
import { Container } from 'react-bootstrap'
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
  Table,
} from "reactstrap";
import {
  // CheckCircle, 
  PlusCircle, Trash, Download
} from "react-feather";
import {
  RemovePatientFile,
  EditPatientFile,
  AddPatientFile
} from "../../../../../redux/actions/patientsActions";
import {
  EditDocAppointment,
} from "../../../../../redux/actions/docAppointmentsActions";
import '../../docAppointment.css'



class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      appointmentID: 0,
      scheduleDay_id: 0,
      scheduleDay_date: null,
      userID: 0,
      description: '',
      used: false,
      fileTitle: '',
      file: null
    };
  }

  componentDidUpdate() {
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
    let currentDate = new Date();
    let year1 = currentDate.getFullYear();
    let year2 = year1-1;
    let date1 = null, date2 = null;
    switch(persianMonth){
        case 'دی':
          date1 = new Date(year2, 11, 21)
          date2 = new Date(year1, 12, 19)
          break ;
        case 'بهمن':
          date1 = new Date(year1, 12, 20)
          date2 = new Date(year1, 1, 19)
          break ;
        case 'اسفند':
          date1 = new Date(year1, 1, 20)
          date2 = new Date(year1, 2, 20)
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
          if(day < 20){
              return (day + 11) + '/ دی';
          }
          else{
              return (day - 19) + '/ بهمن';
          }
      case 2:
          if(day < 19){
              return (day + 12) + '/ بهمن';
          }
          else{
              return (day - 18) + '/ اسفند';
          }
      case 3:
          if(day < 20){
              return (day + 10) + '/ اسفند';
          }
          else{
              return (day - 19) + '/ فروردین';
          }
      case 4:
          if(day < 20){
              return (day + 12) + '/ فروردین';
          }
          else{
              return (day - 19) + '/ اردیبهشت';
          }
      case 5:
          if(day < 21){
              return (day + 11) + '/ اردیبهشت';
          }
          else{
              return (day - 20) + '/ خرداد';
          }
      case 6:
          if(day < 21){
              return (day + 11) + '/ خرداد';
          }
          else{
              return (day - 20) + '/ تیر';
          }
      case 7:
          if(day < 23){
              return (day + 9) + '/ تیر';
          }
          else{
              return (day - 22) + '/ مرداد';
          }
      case 8:
          if(day < 23){
              return (day + 9) + '/ مرداد';
          }
          else{
              return (day - 22) + '/ شهریور';
          }
      case 9:
          if(day < 23){
              return (day + 9) + '/ شهریور';
          }
          else{
              return (day - 22) + '/ مهر';
          }
      case 10:
          if(day < 23){
              return (day + 8) + '/ مهر';
          }
          else{
              return (day - 22) + '/ آبان';
          }
      case 11:
          if(day < 22){
              return (day + 9) + '/ آبان';
          }
          else{
              return (day - 21) + '/ آذر';
          }
      case 12:
          if(day < 22){
              return (day + 9) + '/ آذر';
          }
          else{
              return (day - 21) + '/ دی';
          }
      default:
  }
  };

  showAppointments = (scheduleDay_id, scheduleDay_date) =>{
    const filteredTimes = this.props.docAppointmentTimes.filter(time => (time.schedulesDay === scheduleDay_id))
    const filteredAppointments = this.props.docAppointments.filter(appointment => (filteredTimes.filter(time => time.id === appointment.appointmentTime).length > 0))

    console.log('scheduleDay.id: ', scheduleDay_id)
    console.log('this.props.docAppointmentTimes: ', this.props.docAppointmentTimes)
    console.log('this.props.docAppointments ', this.props.docAppointments)

    console.log('filteredTimes: ', filteredTimes)
    console.log('filteredAppointments: ', filteredAppointments)

    this.setState({
      appointmentID: 0,
      userID: 0,
      appointments: filteredAppointments,
      scheduleDay_id: scheduleDay_id,
      scheduleDay_date: scheduleDay_date,
      description: '',
      date: null,
      now: new Date(),
      fileTitle: '',
      file: null
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

  addPatientInfo = (id, user) => {
    this.setState({
      appointmentID: id,
      userID: user,
    });
  }

  setPatientAppointment = (id) => e => {
    const used = !this.state.used
    const appointment = { id, used };
    // console.log('appointment: ', appointment)
    e.target.checked = !e.target.checked

    this.props.editAppointment(appointment);
    this.setState({ used })
  }

  onChangeHandler = event => {
    switch(event.target.name)
    {
      case 'description':
        this.setState({
          description: event.target.value
        });
        return;
      case 'fileTitle':
        this.setState({
          fileTitle: event.target.value
        });
        return;
      case 'file':
        this.setState({
          file: event.target.files ? event.target.files[0] : null
        });
        return;     
      default:
        return;
    }
  };

  saveDescription = () => {
    const { appointmentID, description } = this.state;
    const id = appointmentID
    const appointment = { id, description };

    this.props.editAppointment(appointment);
  }

  DeleteDescription = (id) => {
    const description = ''
    const appointment = { id, description };

    this.props.editAppointment(appointment);

    this.setState({
      description: description
    })
  }

  PatientFileUpload = () => {
    let form_data = new FormData();
    form_data.append('appointment', this.state.appointmentID);
    form_data.append('file', this.state.file, this.state.file.name);
    form_data.append('fileTitle', this.state.fileTitle);

    this.props.addPatientFile(form_data);

    this.setState({
      file: null,
      fileTitle: ''
    })
  };

  PatientFileDownload = (id, filename) => {
    // console.log('info: ', id, ' , ',  filename)
    fetch(`http://portalapi.asft.co/api/auth/filesdownload/${id}/`).then(
      response => {
        response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;


        // console.log('url: ', url);
        // console.log('file: ', filename);
        // console.log('download: ', filename.substring(filename.lastIndexOf('/')+ 1));
        a.download = filename.substring(filename.lastIndexOf('/')+ 1);
        document.body.appendChild(a);
        let event = new MouseEvent('click');
        a.dispatchEvent(event);
        // a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
        }, 100);
      });

      // window.location.href = response.url;
    });
  }

  // PatientFileDownload = (id, filename) => {
  //   fetch(`http://portalapi.asft.co/api/auth/filesdownload/${id}/`).then(
  //     response => {
  //     //   response.blob().then(blob => {
  //     //   let url = window.URL.createObjectURL(blob);
  //     //   let a = document.createElement("a");
  //     //   a.href = url;
  //     //   a.download = filename.substring(filename.lastIndexOf('/')+ 1);
  //     //   a.target = "_blank";
  //     //   a.click();
  //     // });
      
  //     window.location.href = response.url;
  //   });
  // }

  PatientFileDelete = (id) => {
    this.props.removePatientFile(id)

    this.setState({
      file: null,
      fileTitle: ''
    })
  }

  render = () => {
    const { startdate, enddate, appointments, appointmentID, description, userID, now, fileTitle } = this.state;
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
          سوابق بیمار
          </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
            <Card>
              <Row noGutters>
                <Col >
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
              {startdate && enddate && this.props.docScheduleDays.map((scheduleDay, index) => (this.isDateValid(startdate, scheduleDay.date, enddate))
              ? (
                   <Col key={index}>
                   <Card className={scheduleDay.id === this.state.scheduleDay_id ? 'card-patient-fade' : 'card-patient'}>
                     <Row style={{textAlign:'center'}}>
                       <Col >
                         <Label >{this.getPersianMonth(scheduleDay.date) + "/"}</Label>
                       </Col>
                       <Col >
                         <Label >{this.getWeekDay(new Date(scheduleDay.date).getDay())}</Label>
                       </Col>
                     </Row>
                     {/* <Row>
                        <Card className="mx-0 text-center align-right" style={{width:"60px", height:"50px", backgroundColor:'grey'}}> */}
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
                        {/* </Card>
                     </Row> */}
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
            {appointments.length > 0 ? (
            <Card>
              <Table style={{direction:'rtl'}} hover striped responsive>
                <thead id='th'>
                    <tr id='tr'>
                        <th style={{ width: "5%"}}>#</th>
                        <th style={{ width: "40%", textAlign:'center' }}>نام بیمار</th>
                        <th style={{ width: "15%", textAlign:'center' }}>شماره نوبت</th>
                        <th style={{ width: "26%", textAlign:'center' }}>وقت بیمار</th>
                        <th style={{ width: "7%", textAlign:'center' }}>اطلاعات بیمار</th>
                        <th style={{ width: "7%", textAlign:'center' }}>ویزیت شده</th>
                    </tr>
                </thead>
                <tbody id='tb'>
                  {this.state.appointments.map((appointment, index) => {
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
                          <PlusCircle
                            onClick={() => this.addPatientInfo(appointment.id, appointment.user)}
                            className="align-middle"
                            size={18}
                          />
                        </td>
                        <td style={{ width: "10%", textAlign:'center' }}>
                          {/* <CheckCircle
                            onClick={() => this.setPatientAppointment(appointment.id)}
                            className="align-middle"
                            size={18}
                          /> */}
                              <input 
                                type="checkbox"
                                value={appointment.id}
                                checked={this.state.used}
                              onChange={this.setPatientAppointment(appointment.id)}
                              />
                        </td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card>
            ):''}
            <br/>
            {appointmentID > 0 ? (
            <Container >
              <h4 className="mx-0 xs align-middle">
                {`${this.props.employees.filter(emp => (emp.user === userID))[0].first_name} ${this.props.employees.filter(emp => (emp.user === userID))[0].last_name}`}
              </h4>
              <Card>
                <Row>
                  <Col>
                    <Label >توضیحات</Label>
                    <textarea style={{backgroundColor:'snow'}}
                      className="form-control"
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.onChangeHandler}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="primary"
                            onClick={() =>
                            this.saveDescription()
                            }
                            color="primary"
                            className="sx-1 align-middle"
                            size={'18'}
                        >ذخیره
                    </Button>
                    </Col>
                </Row>
              </Card>
              <Card>
                <Table style={{direction:'rtl'}} hover striped responsive>
                  <thead id='th'>
                      <tr id='t1'>
                        <th style={{ width: "5%", textAlign:'center' }}>#</th>
                        <th style={{ width: "42%", textAlign:'center' }}>نام بیمار</th>
                        <th style={{ width: "20%", textAlign:'center' }}>تاریخ</th>
                        <th style={{ width: "30%", textAlign:'center' }}>توضیحات</th>
                        <th style={{ width: "5%", textAlign:'center' }}></th>
                      </tr>
                  </thead>
                  <tbody id='tb'>

                  {/* {this.props.docAppointments.filter(apnt => (apnt.user === userID && apnt.description !== null && apnt.description !== ''))
                      .filter(apnt => this.props.docAppointmentTimes.filter(apntTime => apntTime.id === apnt.appointmentTime && this.props.docScheduleDays
                        .filter(scheduleDays => scheduleDays.id === apntTime.schedulesDay && (isFinite(date=this.convert(scheduleDays.date).valueOf()) && isFinite(now=this.convert(new Date()).valueOf())) ? date <= now : false )).length > 0).map((appointment, index) => { */}


                    {this.props.docAppointments.filter(apnt => (apnt.user === userID && apnt.description !== null && apnt.description !== ''))
                      .filter(apnt => this.props.docAppointmentTimes.filter(apntTime => apntTime.id === apnt.appointmentTime && this.props.docScheduleDays
                        .filter(scheduleDays => scheduleDays.id === apntTime.schedulesDay && 
                          (new Date(scheduleDays.date).getTime() <= now.getTime()))).length > 0).map((appointment, index) => {
                            // console.log('scheduleDays.date: ', scheduleDays.date)
                      return(
                      <tr key={index}>
                          <td style={{ width: "5%", textAlign:'center' }}>{index + 1}
                          </td>
                          {console.log('test: ', this.props.docScheduleDays.filter(sd => sd.id === this.props.docAppointmentTimes.filter(at => at.id === appointment.appointmentTime)[0].schedulesDay)[0].date)}
                          <td style={{ width: "42%", textAlign:'center' }}>{`${this.props.employees.filter(emp => (emp.user === appointment.user))[0].first_name} ${this.props.employees.filter(emp => (emp.user === appointment.user))[0].last_name}`}</td>
                          <th style={{ width: "20%", textAlign:'center' }}>{this.getPersianMonth(this.props.docScheduleDays.filter(sd => sd.id === this.props.docAppointmentTimes.filter(at => at.id === appointment.appointmentTime)[0].schedulesDay)[0].date)}</th>
                          <td style={{ width: "30%", textAlign:'center' }}>{appointment.description}</td>
                          <td style={{ width: "5%", textAlign:'center' }}>
                            <Trash
                              onClick={() => this.DeleteDescription(appointment.id)}
                              className="align-middle"
                              // color="black"
                              size={18}
                            />
                          </td>
                      </tr>)
                    })}
                  </tbody>
                </Table>
              </Card>
              <Card>
                <Row>
                  <Col>
                    <Label >عنوان فایل</Label>
                    <input style={{backgroundColor:'snow'}}
                      className="form-control"
                      type="text"
                      name="fileTitle"
                      required
                      value={fileTitle}
                      onChange={this.onChangeHandler}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label >فایل</Label>
                    <input style={{backgroundColor:'snow'}}
                      className="form-control"
                      type="file"
                      name="file"
                      required
                      accept="file/pdf, image/png, image/jpeg, image/gif"
                      onChange={this.onChangeHandler}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="primary"
                            onClick={() =>
                            this.PatientFileUpload()
                            }
                            color="primary"
                            className="sx-1 align-middle"
                            size={'18'}
                        >ذخیره
                    </Button>
                    </Col>
                </Row>
              </Card>
              <Card>
                <Table style={{direction:'rtl'}} hover striped responsive>
                  <thead id='th' >
                      <tr id='tr'>
                          <th style={{width: "5%", textAlign:'center' }}>#</th>
                          <th style={{width: "43%", textAlign:'center' }}>نام بیمار</th>
                          <th style={{width: "40%", textAlign:'center' }}>عنوان فایل</th>
                          <th style={{width: "10%", textAlign:'center' }}></th>
                          <th style={{width: "10%", textAlign:'center' }}></th>
                      </tr>
                  </thead>
                  <tbody id='tb'>
                    {this.props.patientsFiles.filter(file => (file.appointment === appointmentID)).map((file, index) => {
                      return(
                      <tr key={index}>
                          <td style={{width: "5%", textAlign:'center' }}>{index + 1}
                          </td>
                          <td style={{width: "42%", textAlign:'center' }}>{`${this.props.employees.filter(emp => (emp.user === userID))[0].first_name} ${this.props.employees.filter(emp => (emp.user === userID))[0].last_name}`}</td>
                          <td style={{width: "42%", textAlign:'center' }}>{file.fileTitle}</td>
                          <td style={{width: "10%", textAlign:'center' }}>
                            <Trash
                              onClick={() => this.PatientFileDelete(file.id)}
                              className="align-middle"
                              // color="black"
                              size={18}
                            />
                          </td>
                          <td style={{width: "10%", textAlign:'center' }}>
                            <Download
                              onClick={() => this.PatientFileDownload(file.id, file.file)}
                              className="align-middle"
                              // color="black"
                              size={18}
                            />
                          </td>
                      </tr>)
                      })}
                  </tbody>
                </Table>
              </Card> 
            </Container>
            ):''}
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
    patientsFiles: store.patientsFiles.patientsFiles
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
    editAppointment: model => {
      dispatch(EditDocAppointment(model))}, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
