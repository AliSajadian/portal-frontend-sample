import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import {
  EditPersonelMealDay,
  AddPersonelMealDay,
  BulkAddPersonelMealDays,
  BulkEditPersonelMealDays,
} from "../../../../redux/actions/personelMealDayActions";
import WeeklyMealsDay from "./components/weeklyMealsDay"
import '../restaurant.css'



class PrsonelMealDayList extends Component {
  constructor(props){
    super(props)
    const currentDate = new Date();
    let y = currentDate.getFullYear(); 
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    
    this.state = {
      isSaved: false,
      flag: true,
      selectedMealDays: [],
      next3DaysDate: new Date(y, month, day + 3)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.personelMealDays && nextProps.personelMealDays.length > 0 && 
        nextProps.personelMealDays !== this.props.personelMealDays) {
        this.setState({
            selectedMealDays: nextProps.personelMealDays
        });
    }

    let selectedMealDays = [];
    if(nextProps.personelMealDays && nextProps.personelMealDays.length === 0 && 
        this.props.currentMonthDates && this.props.currentMonthDates.length > 0 && 
        this.props.mealsDays && this.props.mealsDays.length > 0 && this.state.selectedMealDays && 
         (this.props.personelMealDays && this.props.personelMealDays.length === 0)){

        this.props.currentMonthDates.filter(cmd => this.state.next3DaysDate < cmd.date).map(cmd => (
          (this.props.mealsDays.filter(md => (md.date === cmd.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
          )) ? (
            this.props.mealsDays.filter(md => (md.date === cmd.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
            )).map((md, index) => (index === 0) ? (

              selectedMealDays.push({
                employee: Number(sessionStorage.getItem('employeeid')),
                resturaunt_day_meal: md.id,
              })

            ) : "")
          ) : "")
        ));
          this.setState({
            selectedMealDays: selectedMealDays,
          })        
    }

    // console.log('selectedMealDays: ', selectedMealDays)
  }

  getPersianMonthWeekNo = date => {
    const day = this.getPersianDay(date)
    const weekDay = date.getDay()
    switch(weekDay)
    {
      case 0://Sunday
        if(day < 3){
          return 1
        }
        else if(day >= 3 && day < 10)
          return 2
        else if(day >= 10 && day < 17)
          return 3
        else if(day >= 17 && day < 24)
          return 4
        else if(day >= 24 && day < 31)
          return 5
        else
          return 6
      case 1://Monday
        if(day < 4){
          return 1
        }
        else if(day >= 4 && day < 11)
          return 2
        else if(day >= 11 && day < 18)
          return 3
        else if(day >= 18 && day < 25)
          return 4
        else 
          return 5
      case 2://tusday
        if(day < 5){
          return 1
        }
        else if(day >= 5 && day < 12)
          return 2
        else if(day >= 12 && day < 19)
          return 3
        else if(day >= 19 && day < 26)
          return 4
        else 
          return 5
      case 3://Wedensday
        if(day < 6){
          return 1
        }
        else if(day >= 6 && day < 13)
          return 2
        else if(day >= 13 && day < 20)
          return 3
        else if(day >= 20 && day < 27)
          return 4
        else 
          return 5
      case 4://Thursday
        if(day < 7){
          return 1
        }
        else if(day >= 7 && day < 14)
          return 2
        else if(day >= 14 && day < 21)
          return 3
        else if(day >= 21 && day < 28)
          return 4
        else 
          return 5
      case 5: //Friday
        if(day < 8){
          return 1
        }
        else if(day >= 8 && day < 15)
          return 2
        else if(day >= 15 && day < 22)
          return 3
        else if(day >= 22 && day < 29)
          return 4
        else 
          return 5
      case 6: //Satureday
        if(day < 2){
          return 1
        }
        else if(day >= 2 && day < 9)
          return 2
        else if(day >= 9 && day < 16)
          return 3
        else if(day >= 16 && day < 23)
          return 4
        else if(day >= 23 && day < 30)
          return 5
        else
          return 6
      default:
    }
  }
  getPersianDay = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    switch(month){
        case 1:
            if(day < 21){
                return (day + 10);
            }
            else{
                return  (day - 20);
            }
        case 2:
            if(day < 20){
                return (day + 11);
            }
            else{
                return (day - 19);
            }
        case 3:
            if(day < 20){
                return (day + 9);
            }
            else{
                return (day - 20);
            }
        case 4:
            if(day < 21){
                return (day + 11);
            }
            else{
                return (day - 20);
            }
        case 5:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 6:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 7:
            if(day < 23){
                return (day + 9);
            }
            else{
                return (day - 22);
            }
        case 8:
            if(day < 23){
                return (day + 9);
            }
            else{
                return (day - 22);
            }
        case 9:
            if(day < 23){
                return (day + 9);
            }
            else{
                return (day - 22);
            }
        case 10:
            if(day < 23){
                return (day + 8);
            }
            else{
                return (day - 22);
            }
        case 11:
            if(day < 22){
                return (day + 9);
            }
            else{
                return (day - 21);
            }
        case 12:
            if(day < 22){
                return (day + 9);
            }
            else{
                return (day - 21);
            }
        default:
    }
  };

  getPersianWeekDay = date => {
    var weekday = new Array(7);
    weekday[0] = "یکشنبه";
    weekday[1] = "دوشنبه";
    weekday[2] = "سه شنبه";
    weekday[3] = "چهارشنبه";
    weekday[4] = "پنجشنبه";
    weekday[5] = "جمعه";
    weekday[6] = "شنبه";
    return weekday[date.getDay()];
  }
  getPersianMonth = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    const weekDay = this.getPersianWeekDay(date);
    switch(month){
        case 1:
            if(day < 21){
                return weekDay + ' ' + (day + 10) + ' دی ';
            }
            else{
                return  weekDay + ' ' + (day - 20) + ' بهمن ';
            }
        case 2:
            if(day < 20){
                return weekDay + ' ' + (day + 11) + ' بهمن ';
            }
            else{
                return weekDay + ' ' + (day - 19) + ' اسفند ';
            }
        case 3:
            if(day < 21){
                return weekDay + ' ' + (day + 9) + ' اسفند ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' فروردین ';
            }
        case 4:
            if(day < 21){
                return weekDay + ' ' + (day + 11) + ' فروردین ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' اردیبهشت ';
            }
        case 5:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + ' اردیبهشت ';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' خرداد ';
            }
        case 6:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + ' خرداد ';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' تیر ';
            }
        case 7:
            if(day < 23){
                return weekDay + ' ' + (day + 9) + ' تیر ';
            }
            else{
                return weekDay + ' ' + (day - 22) + ' مرداد ';
            }
        case 8:
            if(day < 23){
                return weekDay + ' ' + (day + 9) + ' مرداد ';
            }
            else{
                return weekDay + ' ' + (day - 22) + 'شهریور';
            }
        case 9:
            if(day < 23){
                return weekDay + ' ' + (day + 9) + 'شهریور';
            }
            else{
                return weekDay + ' ' + (day - 22) + ' مهر ';
            }
        case 10:
            if(day < 23){
                return weekDay + ' ' + (day + 8) + ' مهر ';
            }
            else{
                return weekDay + ' ' + (day - 22) + 'آبان';
            }
        case 11:
            if(day < 22){
                return weekDay + ' ' + (day + 9) + ' آبان ';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' آذر ';
            }
        case 12:
            if(day < 22){
                return weekDay + ' ' + (day + 9) + ' آذر ';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' دی ';
            }
        default:
    }
  };

  onChanged = (e, date) => {
    const {mealsDays, personelMealDays} = this.props
    let selectedMealDays = this.state.selectedMealDays

    if(mealsDays.filter(md => Number(md.resturaunt_meal) === Number(e.target.value) && String(md.date) === String(date)) &&
      mealsDays.filter(md => Number(md.resturaunt_meal) === Number(e.target.value) && String(md.date) === String(date)).length > 0){
        const resturaunt_day_meal = mealsDays.filter(md => Number(md.resturaunt_meal) === Number(e.target.value) && String(md.date) === String(date))[0].id
        let selectedMealDay = null;
        const filteredMealDay = mealsDays.filter(md => String(md.date) === String(date))
        const filteredPersonelMealDay = this.state.selectedMealDays.filter(smd => filteredMealDay.filter(md => md.id === smd.resturaunt_day_meal).length > 0)[0]
        if(filteredPersonelMealDay !== null){
          if(personelMealDays && personelMealDays.length > 0){
              selectedMealDay = {
                  id: filteredPersonelMealDay.id,
                  employee: Number(sessionStorage.getItem('employeeid')),
                  resturaunt_day_meal: resturaunt_day_meal,
              };

              selectedMealDays = selectedMealDays.filter(smd => (smd.resturaunt_day_meal !== filteredPersonelMealDay.resturaunt_day_meal)).concat(selectedMealDay)
          }
          else{
              selectedMealDay = {
                  employee: Number(sessionStorage.getItem('employeeid')),
                  resturaunt_day_meal: resturaunt_day_meal,
              };

              selectedMealDays = selectedMealDays.filter(smd => (smd.resturaunt_day_meal !== filteredPersonelMealDay.resturaunt_day_meal)).concat(selectedMealDay)
          }
          this.setState({
              selectedMealDays
          })
        }
    }
  }

  save = () => {
    if (window.confirm("آیا از ذخیره اطلاعات اطمینان دارید؟")) {

      if (this.props.personelMealDays && this.props.personelMealDays.length === 0) {
        console.log('add this.state.selectedMealDays: ', this.state.selectedMealDays)
        this.props.bulkAddPersonelMealDays(this.state.selectedMealDays)
      }
      else{
        console.log('edit this.state.selectedMealDays: ', this.state.selectedMealDays)
        this.props.bulkEditPersonelMealDays(this.state.selectedMealDays)
      }
      window.alert("اطلاعات با موفقیت ذخیره شد.");
    }
  }

  render() {
    const currentDate = new Date();
    let y = currentDate.getFullYear(); 
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    const next3DaysDate = new Date(y, month, day + 3)

    const {currentMonthDates} = this.props
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader>
            <CardTitle tag="h5">
               انتخاب ماهیانه غذا  
            </CardTitle>
        </CardHeader>
        <CardBody>
        <Container>
          <Card className="card-res-week">
          {currentMonthDates && currentMonthDates.length > 0 ? 
          currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 1))
                                      .map((currentMonthDate, index) => (
                                        <WeeklyMealsDay   
                                        key={index}
                                        index={index}
                                        currentMonthDate={currentMonthDate}  
                                        persianMonth={this.getPersianMonth(currentMonthDate.date)} 
                                        next3DaysDate={next3DaysDate}
                                        meals={this.props.meals} 
                                        mealsDays={this.props.mealsDays} 
                                        personelMealDays={this.props.personelMealDays} 
                                        selectedMealDays={this.state.selectedMealDays}
                                        onChanged={this.onChanged}
                                      />
             )) : ""}
            </Card>
          <Card className="card-res-week">
          {currentMonthDates && currentMonthDates.length > 0 ? 
          currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 2))
                                      .map((currentMonthDate, index) => (
                                        <WeeklyMealsDay   
                                        key={index}
                                        index={index}
                                        currentMonthDate={currentMonthDate}  
                                        persianMonth={this.getPersianMonth(currentMonthDate.date)} 
                                        next3DaysDate={next3DaysDate}
                                        meals={this.props.meals} 
                                        mealsDays={this.props.mealsDays} 
                                        personelMealDays={this.props.personelMealDays} 
                                        selectedMealDays={this.state.selectedMealDays}
                                        onChanged={this.onChanged}
                                      />         
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {currentMonthDates && currentMonthDates.length > 0 ? 
          currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 3))
                                      .map((currentMonthDate, index) => (
                                        <WeeklyMealsDay   
                                        key={index}
                                        index={index}
                                        currentMonthDate={currentMonthDate}  
                                        persianMonth={this.getPersianMonth(currentMonthDate.date)} 
                                        next3DaysDate={next3DaysDate}
                                        meals={this.props.meals} 
                                        mealsDays={this.props.mealsDays} 
                                        personelMealDays={this.props.personelMealDays} 
                                        selectedMealDays={this.state.selectedMealDays}
                                        onChanged={this.onChanged}
                                      />       
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {currentMonthDates && currentMonthDates.length > 0 ? 
          currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 4))
                                      .map((currentMonthDate, index) => (
                                        <WeeklyMealsDay   
                                        key={index}
                                        index={index}
                                        currentMonthDate={currentMonthDate}  
                                        persianMonth={this.getPersianMonth(currentMonthDate.date)} 
                                        next3DaysDate={next3DaysDate}
                                        meals={this.props.meals} 
                                        mealsDays={this.props.mealsDays} 
                                        personelMealDays={this.props.personelMealDays} 
                                        selectedMealDays={this.state.selectedMealDays}
                                        onChanged={this.onChanged}
                                      />         
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {currentMonthDates && currentMonthDates.length > 0 ? 
          currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 5))
                                      .map((currentMonthDate, index) => (
                                        <WeeklyMealsDay   
                                        key={index}
                                        index={index}
                                        currentMonthDate={currentMonthDate}  
                                        persianMonth={this.getPersianMonth(currentMonthDate.date)} 
                                        next3DaysDate={next3DaysDate}
                                        meals={this.props.meals} 
                                        mealsDays={this.props.mealsDays} 
                                        personelMealDays={this.props.personelMealDays} 
                                        selectedMealDays={this.state.selectedMealDays}
                                        onChanged={this.onChanged}
                                      />         
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {currentMonthDates && currentMonthDates.length > 0 ? 
          currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 6))
                                      .map((currentMonthDate, index) => (
                                        <WeeklyMealsDay   
                                        key={index}
                                        index={index}
                                        currentMonthDate={currentMonthDate}  
                                        persianMonth={this.getPersianMonth(currentMonthDate.date)} 
                                        next3DaysDate={next3DaysDate}
                                        meals={this.props.meals} 
                                        mealsDays={this.props.mealsDays} 
                                        personelMealDays={this.props.personelMealDays} 
                                        selectedMealDays={this.state.selectedMealDays}
                                        onChanged={this.onChanged}
                                      />         
          )) : ""}
          </Card>
          <Card className="card-res-bottom">
              <Row>
                <Col style={{textAlign:'center', width:'150px'}}>
                    <Button color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} onClick={() => this.save()} >ذخیره</Button>
                </Col>
              </Row>
          </Card>
          </Container>
        </CardBody>
      </Card>
          // ):''
    )

  }
};

const mapStateToProps = store => {
  return {
    meals: store.meals.meals,
    mealsDays: store.mealsDays.mealsDays,
    personelMealDays: store.personelMealDays.personelMealDays,
    currentMonthDates: store.currentMonthDates.currentMonthDates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bulkEditPersonelMealDays: (personelMealDays) => {
        dispatch(BulkEditPersonelMealDays(personelMealDays))
    },
    editPersonelMealDay: (model) => {
      dispatch(EditPersonelMealDay(model))
    }, 
    bulkAddPersonelMealDays: (personelMealDays) => {
        dispatch(BulkAddPersonelMealDays(personelMealDays))
    },
    addPersonelMealDay: (model) => {
      dispatch(AddPersonelMealDay(model))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrsonelMealDayList);
