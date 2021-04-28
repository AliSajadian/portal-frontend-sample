import React, { Component } from "react";
import { Form } from 'react-bootstrap'
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
  Input
} from "reactstrap";
import {
  RemoveDocScheduleDay,
  AddDocScheduleDay
} from "../../../../../redux/actions/docScheduleDaysActions";
import '../../docAppointment.css'



class docScheduleDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      visitDuration: 5,
      start_hour: "12:00",
      end_hour: "14:00",
      doctor: 0,
      visitDurations: [ 
        {id:5, value:'5 min'}, 
        {id:10, value:'10 min'},
        {id:15, value:'15 min'},
        {id:20, value:'20 min'},
        {id:30, value:'30 min'},
        {id:45, value:'45 min'},
        {id:60, value:'60 min'},
        {id:90, value:'90 min'},
        {id:120, value:'120 min'}
      ]
    };
  }
  
  componentDidUpdate() {
    if(this.props.doctors && this.props.doctors.length > 0 && this.state.doctor === 0)
    {
      this.setState({
        doctor: this.props.doctors[0].id,
        visitDuration: this.props.doctors[0].visitDuration !== null ? this.props.doctors[0].visitDuration : this.state.visitDuration
      })
    }
  }

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
            if(day < 22){
                months = [{month : 'تیر'}, {month : 'مرداد'}, {month : 'شهریور'}];
            }
            else{
                months = [{month : 'مرداد'}, {month : 'شهریور'}, {month : 'مهر'}];
            }
            break;
        case 8:
            if(day < 22){
                months = [{month : 'مرداد'}, {month : 'شهریور'}, {month : 'مهر'}];
            }
            else{
                months = [{month : 'شهریور'}, {month : 'مهر'}, {month : 'آبان'}];
            }
            break;
        case 9:
            if(day < 22){
                months = [{month : 'شهریور'}, {month : 'مهر'}, {month : 'آبان'}];
            }
            else{
                months = [{month : 'مهر'}, {month : 'آبان'}, {month : 'آذر'}];
            }
            break;
        case 10:
            if(day < 22){
                months = [{month : 'مهر'}, {month : 'آبان'}, {month : 'آذر'}];
            }
            else{
                months = [{month : 'آبان'}, {month : 'آذر'}, {month : 'دی'}];
            }
            break;
        case 11:
            if(day < 21){
                months = [{month : 'آبان'}, {month : 'آذر'}, {month : 'دی'}];
            }
            else{
                months = [{month : 'آذر'}, {month : 'دی'}, {month : 'بهمن'}];
            }
            break;
        case 12:
            if(day < 21){
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
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
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
            if(day < 22){
                return 'تیر' + (day + 10);
            }
            else{
                return 'مرداد' + (day - 21);
            }
        case 8:
            if(day < 22){
                return 'مرداد' + (day + 10);
            }
            else{
                return 'شهریور' + (day - 21);
            }
        case 9:
            if(day < 22){
                return 'شهریور' + (day + 10);
            }
            else{
                return 'مهر' + (day - 21);
            }
        case 10:
            if(day < 22){
                return 'مهر' + (day + 9);
            }
            else{
                return 'آبان' + (day - 21);
            }
        case 11:
            if(day < 21){
                return 'آبان' + (day + 10);
            }
            else{
                return 'آذر' + (day - 20);
            }
        case 12:
            if(day < 21){
                return 'آذر' + (day + 10);
            }
            else{
                return 'دی' + (day - 20);
            }
        default:
    }
  };

  setMonthState = month => {
    let monthNo = 0
    switch(month){
        case 'فروردین':
            monthNo = 1;
            break;
        case 'اردیبهشت':
            monthNo = 2;
            break;
        case 'خرداد':
            monthNo = 3;
            break;
        case 'تیر':
            monthNo = 4;
            break;
        case 'مرداد':
            monthNo = 5;
            break;
        case 'شهریور':
            monthNo = 6;
            break;
        case 'مهر':
            monthNo = 7;
            break;
        case 'آبان':
            monthNo = 8;
            break;
        case 'آذر':
            monthNo = 9;
            break;
        case 'دی':
            monthNo = 10;
            break;
        case 'بهمن':
            monthNo = 11;
            break;
        case 'اسفند':
            monthNo = 12;
            break;                                                            
        default:
    }

    let newdates = []
    let date = null
    let checked = false;
    var { startdate, enddate } = this.validDates(monthNo)
    date = new Date(startdate.getFullYear(), startdate.getUTCMonth(), startdate.getUTCDate()+1)
    let id = 1
    let tmpdate = null

    while(startdate < enddate){
      for(var i=0; i<this.props.docScheduleWeeklyDays.length; i++){ 
        if(Number(this.props.docScheduleWeeklyDays[i].week_day) === (Number(date.getDay())) && 
          Number(this.props.docScheduleWeeklyDays[i].doctor) === Number(this.state.doctor)){
          for(var j=0; j<this.props.docScheduleDays.length; j++){    
            if(
            //   String(date.getFullYear()) + '-' + 
            // ((date.getUTCMonth()+1) > 9 ? String(date.getUTCMonth()+1) : ('0' + String(date.getUTCMonth()+1))) + '-' + 
            // ((date.getUTCDate()+1) > 9 ? String(date.getUTCDate()+1) : ('0' + String(date.getUTCDate()+1)))
            date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) === String(this.props.docScheduleDays[j].date)){
              newdates.push({id: id, date: date, checked: true}) //= [...newdates, date]
              id++
              checked = true;
              break;
            }
          }
          if(!checked){
            newdates.push({id: id, date: date, checked: false }) //= [...newdates, date]
            id++
          }
          checked = false;     
          break
        }
      }
      startdate.setDate(startdate.getDate() + 1);
      tmpdate = date
      date = new Date(startdate.getFullYear(), startdate.getUTCMonth(), startdate.getUTCDate())

      if(tmpdate.getDate() === date.getDate()){
        startdate.setDate(startdate.getDate() + 1);
        tmpdate = date
        date = new Date(startdate.getFullYear(), startdate.getUTCMonth(), startdate.getUTCDate())
      }
    }

    this.setState({
        month: monthNo,
        dates: newdates
    });
  };

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

  getGregorianMontheAndDay = month => {
    const currentDate = new Date();
    let y = currentDate.getFullYear(); 
    let m = currentDate.getMonth()+1;
    let y1, m1, d1, y2, m2, d2
    switch(month){
      case 1:
        y1 = y;
        y2 = y;
        m1 = 3;
        m2 = 4;
        d1 = 20;
        d2 = 19;
          break;
      case 2:
        y1 = y;
        y2 = y;
        m1 = 4;
        m2 = 5;
        d1 = 20;
        d2 = 20;
          break;
      case 3:
        y1 = y;
        y2 = y;
        m1 = 5;
        m2 = 6;
        d1 = 21;
        d2 = 20;
          break;
      case 4:
        y1 = y;
        y2 = y;
        m1 = 6;
        m2 = 7;
        d1 = 21;
        d2 = 21;
          break;
      case 5:
        y1 = y;
        y2 = y;
        m1 = 7;
        m2 = 8;
        d1 = 22;
        d2 = 21;
          break;
      case 6:
        y1 = y;
        y2 = y;
        m1 = 8;
        m2 = 9;
        d1 = 22;
        d2 = 21;
          break;
      case 7:
        y1 = y;
        y2 = y;
        m1 = 9;
        m2 = 10;
        d1 = 22;
        d2 = 21;
          break;
      case 8:
        y1 = y;
        y2 = y;
        m1 = 10;
        m2 = 11;
        d1 = 22;
        d2 = 20;
          break;
      case 9:
        y1 = y;
        y2 = y;
        m1 = 11;
        m2 = 12;
        d1 = 21;
        d2 = 21;
          break;
      case 10:
        y1 = (m === 1) ? y - 1 : y;
        y2 = (m === 1) ? y : y + 1;
        m1 = 12;
        m2 = 1;
        d1 = 21;
        d2 = 20;
          break;
      case 11:
        y1 = (m === 11 || m === 12) ? y + 1 : y;
        y2 = (m === 11 || m === 12) ? y + 1 : y;
        m1 = 1;
        m2 = 2;
        d1 = 20;
        d2 = 19;
          break;
      case 12:
        y1 = (m === 12) ? y + 1 : y;
        y2 = (m === 12) ? y + 1 : y;
        m1 = 2;
        m2 = 3;
        d1 = 19;
        d2 = 21;
          break;                                                            
      default:
    }
    return { y1, y2, m1, m2, d1, d2 }
  }

  validDates = month => {
    const { y1, y2, m1, m2, d1, d2 } = this.getGregorianMontheAndDay(month);

    let startdate = new Date(y1, m1-1, d1), enddate = new Date(y2, m2-1, d2)

    return { startdate, enddate }
  }

  setWeekDayState = weekdaystate => {
    this.setState({
        week_day: weekdaystate
    });
  };

  onChangeTime = event => {
    switch(event.target.name)
    {
      case 'start_hour':
        this.setState({
          start_hour: event.target.value
        });
        return;
      case 'end_hour':
        this.setState({
          end_hour: event.target.value
        });
        return;
      default:
        return;
    }
  };

  onChangeCheck = (dates, id, week_day) => e => {
    let selecteddate = dates.filter(date => date.id === id)[0]
    selecteddate.checked = !selecteddate.checked

    //1. const date = String(selecteddate.date.getFullYear()) + '-' + 
    //   ((selecteddate.date.getUTCMonth()+1) > 9 ? String(selecteddate.date.getUTCMonth()+1) : ('0' + String(selecteddate.date.getUTCMonth()+1))) + '-' + 
    //   ((selecteddate.date.getUTCDate()+1) > 9 ? String(selecteddate.date.getUTCDate()+1) : ('0' + String(selecteddate.date.getUTCDate()+1)))
    //2. const date = new Intl.DateTimeFormat('en-US', {month: '2-digit',day: '2-digit', year: 'numeric'}).format(selecteddate.date);
    //3. const date = selecteddate.date.toISOString().substring(0, selecteddate.date.toISOString().indexOf('T'));
    const date = selecteddate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
    // console.log('---date*:', date);

    if(e.target.checked){
      const { doctor, visitDuration } = this.state;
      let scheduleWeeklyDay = this.props.docScheduleWeeklyDays.filter(scheduleWeeklyDay => Number(scheduleWeeklyDay.doctor) === Number(doctor) && Number(scheduleWeeklyDay.week_day) === Number(week_day))
      if(scheduleWeeklyDay.length > 0){
        let start_hour = scheduleWeeklyDay[0].start_hour
        let end_hour = scheduleWeeklyDay[0].end_hour
        let schedulesWeekDay = scheduleWeeklyDay[0].id
        const selectedday = { schedulesWeekDay, date, start_hour, end_hour, visitDuration };
        console.log('---selectedday: ', selectedday)
        this.props.addDocScheduleDay(selectedday);
      }
    }
    else{
      if(this.props.docScheduleDays && this.props.docScheduleDays.filter(scheduleDay => scheduleDay.date === date) &&
      this.props.docScheduleDays.filter(scheduleDay => scheduleDay.date === date).length > 0){
        const id = this.props.docScheduleDays.filter(scheduleDay => scheduleDay.date === date)[0].id
        this.props.removeDocScheduleDay(id);
      }
    }

    this.setState({
      dates: dates,
      visitDuration: 5,
      start_hour: "12:00",
      end_hour: "14:00",
    });
  }

  render = () => {
    const { dates, visitDuration, doctor } = this.state;
    const currentDate = new Date();
    const months = this.getPersianMonthes(currentDate); 
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader className='card-header'>
          <CardTitle tag="h5" className="mb-0">
            برنامه روزانه
          </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
            <Card>
              <Row noGutters>
                <Col >
                  <select value={doctor} style={{width:'75%'}} className='select'
                    onChange={(e) => this.setState({ doctor: e.target.value, dates: [] })}>
                    {(this.props.doctors && this.props.doctors.length) > 0 ? (
                        this.props.doctors.map(doctor => 
                          <option key={doctor.id} value={doctor.id}>{
                          ((this.props.employees.filter(employee => employee.id === doctor.employee)) && 
                          (this.props.employees.filter(employee => employee.id === doctor.employee)).length>0 ? ' دکتر ' +
                          (this.props.employees.filter(employee => employee.id === doctor.employee))[0].first_name: '') + ' ' +
                          ((this.props.employees.filter(employee => employee.id === doctor.employee)) && 
                          (this.props.employees.filter(employee => employee.id === doctor.employee)).length>0 ?
                          (this.props.employees.filter(employee => employee.id === doctor.employee))[0].last_name: '')}</option>)) : (
                          "not found"
                        )}                    
                  </select>
                </Col>
                <Col >
                <select value={visitDuration}
                    onChange={(e) => this.setState({ visitDuration: e.target.value })}>
                    {this.state.visitDurations.map(duration => (
                      <option key={duration.id} value={duration.id}>{duration.value}</option>)
                    )}                    
                  </select>
                </Col>
                <Col >
                  {months.map((month, index) => 
                    <Button key={index} variant="primary"
                            onClick={() =>
                              this.setMonthState(month.month)
                            }
                            color="danger"
                            className="mx-1 align-middle"
                            size={'18'}
                        ><span style={{fontSize:'.8rem', fontWeight:'bold', color:'white'}}>{month.month}</span>
                    </Button>)}
                </Col>
              </Row>
            </Card>
              
            <Card>
              <Row>
            {  dates.map((date, index) => (
                   <Col key={index}>
                   <Card className='card-shadule-day' >
                     <Row>
                       <Col >
                         <Label >{this.getPersianMonth(date.date) + "/"}</Label>
                       </Col>
                       <Col >
                         <Label >{this.getWeekDay(date.date.getDay())}</Label>
                       </Col>
                     </Row>
                     <Row>
                       <Col >
                         <Label >ساعت شروع</Label>
                       </Col>
                       <Col >
                         <Input 
                           type="time"
                           name="start_hour"
                           onChange={() => this.OnChangeTime}
                           value={(this.props.docScheduleWeeklyDays.filter(scheduleWeekDay => 
                             scheduleWeekDay.week_day === date.date.getDay()))[0].start_hour}
                           inputlabelprops={{
                             shrink: true,
                           }}
                           inputprops={{
                             step: 300, // 5 min
                           }}
                         />
                       </Col>
                       <Col >
                         <Label >ساعت پایان</Label>
                       </Col>
                       <Col >
                         <Input 
                           id="time"
                           type="time"
                           onChange={() => this.OnChangeTime}
                           name="end_hour"
                           value={(this.props.docScheduleWeeklyDays.filter(scheduleWeekDay => 
                             scheduleWeekDay.week_day === date.date.getDay()))[0].end_hour}
                           inputlabelprops={{
                             shrink: true,
                           }}
                           inputprops={{
                             step: 300, // 5 min
                           }}
                         />
                       </Col>
                     </Row>
                     <Row>
                       <Col>
                         <Form>
                           <Form.Check 
                             type="switch"
                             label="انتخاب شده"
                             value={date.checked}
                             checked={date.checked}
                             readOnly={true}
                           />
                        <input 
                          type="checkbox"
                          value={date.id}
                          checked={date.checked}
                          onChange={this.onChangeCheck(dates, date.id, date.date.getDay())}
                        />
                         </Form>
                       </Col>
                     </Row>
                   </Card>
                   </Col>
            ))}
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
    docScheduleWeeklyDays: store.docScheduleWeeklyDays.docScheduleWeeklyDays,
    docScheduleDays: store.docScheduleDays.docScheduleDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDocScheduleDay: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveDocScheduleDay(id));
      }
    },
    addDocScheduleDay: model => {
      dispatch(AddDocScheduleDay(model))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(docScheduleDays);
