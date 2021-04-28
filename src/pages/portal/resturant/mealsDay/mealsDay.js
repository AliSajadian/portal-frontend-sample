import React, { Component } from 'react';
import { connect } from "react-redux";
import { MinusCircle, PlusCircle } from "react-feather";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle, 
    Container,
    Row,
    Col, 
    Label
} from "reactstrap";
import AutosizeInput from 'react-input-autosize';

import {
    AddMealDay,
    EditMealDay,
    RemoveMealDay
} from "../../../../redux/actions/mealsDayActions";
import '../restaurant.css'
import WeeklyMealsDay from "./components/WeeklyMealsDay"


class MealsDayList extends Component {
  constructor(props){
    super(props)

    this.state = {
      resturant_meal: 1,
      totalNo: "0",
      mealsDays: [{
        date: "",
        resturant_meal: -1,
        totalNo: 0,
        selectedNo: 0,
      }]
    };
  }
  
  componentDidUpdate() {
    // if((this.state.mealsDays === null && 
    //   this.props.mealsDays && this.props.mealsDays.length > 0) || (
    //   this.state.mealsDays && this.state.mealsDays.length > 0 && 
    //   this.props.mealsDays && this.props.mealsDays.length > 0 && 
    //   this.props.mealsDays.length > this.state.mealsDays.length))

    if(this.state.mealsDays !== this.props.mealsDays){
      //  console.log("this.props.mealsDays: ", this.props.mealsDays);
        this.setState({
          mealsDays: this.props.mealsDays
        })
    }
    // console.log("DidUpdate AFTER this.state.mealsDays: ", this.state.mealsDays);
    // console.log("DidUpdate AFTER this.props.mealsDays: ", this.props.mealsDays);
  }

  getPersianMonthWeekNo = date => {
    const day = this.getPersianDay(date)
    const weekDay = date.getDay()
    
    switch(weekDay)
    {
      case 0:
        if(day < 3)
          return 1
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
      case 1:
        if(day < 4)
          return 1
        else if(day >= 4 && day < 11)
          return 2
        else if(day >= 11 && day < 18)
          return 3
        else if(day >= 18 && day < 25)
          return 4
        else 
          return 5
      case 2:
        if(day < 5)
          return 1
        else if(day >= 5 && day < 12)
          return 2
        else if(day >= 12 && day < 19)
          return 3
        else if(day >= 19 && day < 26)
          return 4
        else 
          return 5
      case 3:
        if(day < 6)
          return 1
        else if(day >= 6 && day < 13)
          return 2
        else if(day >= 13 && day < 20)
          return 3
        else if(day >= 20 && day < 27)
          return 4
        else 
          return 5
      case 4:
        if(day < 7)
          return 1
        else if(day >= 7 && day < 14)
          return 2
        else if(day >= 14 && day < 21)
          return 3
        else if(day >= 21 && day < 28)
          return 4
        else 
          return 5
      case 5:
        if(day < 8)
          return 1
        else if(day >= 8 && day < 15)
          return 2
        else if(day >= 15 && day < 22)
          return 3
        else if(day >= 22 && day < 29)
          return 4
        else 
          return 5
      case 6:
        if(day < 2)
          return 1
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

  getPersianDay = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    switch(month){
        case 1:
            if(day < 20){
                return (day + 11);
            }
            else{
                return  (day - 19);
            }
        case 2:
            if(day < 19){
                return (day + 12);
            }
            else{
                return (day - 18);
            }
        case 3:
            if(day < 20){
                return (day + 10);
            }
            else{
                return (day - 19);
            }
        case 4:
            if(day < 20){
                return (day + 12);
            }
            else{
                return (day - 19);
            }
        case 5:
            if(day < 21){
                return (day + 11);
            }
            else{
                return (day - 20);
            }
        case 6:
            if(day < 21){
                return (day + 11);
            }
            else{
                return (day - 20);
            }
        case 7:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 8:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 9:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 10:
            if(day < 22){
                return (day + 9);
            }
            else{
                return (day - 21);
            }
        case 11:
            if(day < 21){
                return (day + 10);
            }
            else{
                return (day - 20);
            }
        case 12:
            if(day < 21){
                return (day + 10);
            }
            else{
                return (day - 20);
            }
        default:
    }
  };

  getPersianMonth = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    const weekDay = this.getPersianWeekDay(date)
    switch(month){
        case 1:
            if(day < 20){
                return weekDay + ' ' + (day + 11) + ' دی ';
            }
            else{
                return  weekDay + ' ' + (day - 19) + ' بهمن ';
            }
        case 2:
            if(day < 19){
                return weekDay + ' ' + (day + 12) + ' بهمن ';
            }
            else{
                return weekDay + ' ' + (day - 18) + ' اسفند ';
            }
        case 3:
            if(day < 20){
                return weekDay + ' ' + (day + 10) + ' اسفند ';
            }
            else{
                return weekDay + ' ' + (day - 19) + ' فروردین ';
            }
        case 4:
            if(day < 20){
                return weekDay + ' ' + (day + 12) + ' فروردین ';
            }
            else{
                return weekDay + ' ' + (day - 19) + ' اردیبهشت ';
            }
        case 5:
            if(day < 21){
                return weekDay + ' ' + (day + 11) + ' اردیبهشت ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' خرداد ';
            }
        case 6:
            if(day < 21){
                return weekDay + ' ' + (day + 11) + ' خرداد ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' تیر ';
            }
        case 7:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + ' تیر ';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' مرداد ';
            }
        case 8:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + ' مرداد ';
            }
            else{
                return weekDay + ' ' + (day - 21) + 'شهریور';
            }
        case 9:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + 'شهریور';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' مهر ';
            }
        case 10:
            if(day < 22){
                return weekDay + ' ' + (day + 9) + ' مهر ';
            }
            else{
                return weekDay + ' ' + (day - 21) + 'آبان';
            }
        case 11:
            if(day < 21){
                return weekDay + ' ' + (day + 10) + ' آبان ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' آذر ';
            }
        case 12:
            if(day < 21){
                return weekDay + ' ' + (day + 10) + ' آذر ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' دی ';
            }
        default:
    }
  };

  inputChangeHandler = (mealDay) => e => {
    e.preventDefault();

    let editMealsDay = mealDay
    editMealsDay.totalNo = e.target.value

    let mealsDays = this.state.mealsDays
    mealsDays.map(mealsDay => mealsDay.id === editMealsDay.id ?
      mealDay.totalNo = e.target.value
      : '')

    this.props.editMealDay(editMealsDay)

    this.setState({ mealsDays })
  };

  ///////////////////////////////////
  //     Handle Edit MealDay
  ///////////////////////////////////
  editMealDay = (mealsDayID, date, totalNo) => e => {
    e.preventDefault()
    const editMealsDay = { 
      id: mealsDayID,
      date: date,
      totalNo: totalNo,
      resturant_meal: e.target.value, 
    }

    let mealsDays = this.state.mealsDays
    .filter(mealsDay => mealsDay.id !== mealsDayID)
    .concat(editMealsDay)

    this.props.editMealDay(editMealsDay)

    this.setState({
      resturant_meal: e.target.value,
      mealsDays: mealsDays
    })
  
    // console.log("EDIT AFTER this.state.mealsDays: ", this.state.mealsDays);
  }
  ///////////////////////////////////
  //      Handle Delete MealDay
  ///////////////////////////////////
  deleteMealDay = id => e => {
    e.preventDefault()

    let mealsDays = this.state.mealsDays.filter(mealsDay => mealsDay.id === id)
    if(mealsDays && mealsDays.length > 0){
      if (!window.confirm("Are you sure, you want delete Meal Day?")) {
        return;
      }
    }
    
    mealsDays = this.state.mealsDays.filter(mealsDay => mealsDay.id !== id)
    // console.log("DELETE BEFORE mealsDays: ", mealsDays);
    this.setState({
      mealsDays
    })

    this.props.removeMealDay(id)
    // console.log("DELETE AFTER this.state.mealsDays: ", this.state.mealsDays);
  }
  ///////////////////////////////////
  //      Handle Add MealDay
  ///////////////////////////////////
  addMealDay = date => e => {
    // e.preventDefault()
    // console.log("Date: ", date);
    let year = date.getFullYear(); 
    let month = date.getMonth()+1; 
    let day = date.getDate();
    let newDate = String(year) + '-' + 
                  (String(month).length < 2 ? ('0' + String(month)) : String(month)) + '-' + 
                  (String(day).length < 2 ? ('0' + String(day)) : String(day))
    const newMealsDay = { 
      date: newDate, 
      resturant_meal: 1, 
      totalNo: 0,
      selectedNo: 0,
    }
    // console.log("newMealsDay: ", newMealsDay);
    // console.log("ADD BEFORE this.state.mealsDays: ", this.state.mealsDays);
    // console.log("ADD BEFORE this.props.mealsDays: ", this.props.mealsDays);

    this.props.addMealDay(newMealsDay);

    this.setState({
      resturant_meal: 1,
      mealsDays: [...this.state.mealsDays, newMealsDay]
    })
    // console.log("year: ", year, " month: ", month, " day: ", day);

    // console.log("ADD AFTER this.state.mealsDays: ", this.state.mealsDays);
    // console.log("ADD AFTER this.props.mealsDays: ", this.props.mealsDays);
  }

  render() {
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader>
            <CardTitle tag="h5">
                لیست غذاهای ماهیانه
            </CardTitle>
        </CardHeader>
        <CardBody>
          <Container> 
            <WeeklyMealsDay 
              weekNo={1}  
              currentMonthDates={this.props.currentMonthDates} 
              getPersianMonthWeekNo={this.getPersianMonthWeekNo}
              addMealDay={this.addMealDay} 
              getPersianMonth={this.getPersianMonth} 
              mealsDays={this.state.mealsDays} 
              editMealDay={this.editMealDay}
              meals={this.props.meals} 
              deleteMealDay={this.deleteMealDay}
              inputChangeHandler={this.inputChangeHandler}
            />
            <WeeklyMealsDay 
              weekNo={2}  
              currentMonthDates={this.props.currentMonthDates} 
              getPersianMonthWeekNo={this.getPersianMonthWeekNo}
              addMealDay={this.addMealDay} 
              getPersianMonth={this.getPersianMonth} 
              mealsDays={this.state.mealsDays} 
              editMealDay={this.editMealDay}
              meals={this.props.meals} 
              deleteMealDay={this.deleteMealDay}
              inputChangeHandler={this.inputChangeHandler}
            />
            <WeeklyMealsDay 
              weekNo={3}  
              currentMonthDates={this.props.currentMonthDates} 
              getPersianMonthWeekNo={this.getPersianMonthWeekNo}
              addMealDay={this.addMealDay} 
              getPersianMonth={this.getPersianMonth} 
              mealsDays={this.state.mealsDays} 
              editMealDay={this.editMealDay}
              meals={this.props.meals} 
              deleteMealDay={this.deleteMealDay}
              inputChangeHandler={this.inputChangeHandler}
            />
            <WeeklyMealsDay 
              weekNo={4}  
              currentMonthDates={this.props.currentMonthDates} 
              getPersianMonthWeekNo={this.getPersianMonthWeekNo}
              addMealDay={this.addMealDay} 
              getPersianMonth={this.getPersianMonth} 
              mealsDays={this.state.mealsDays} 
              editMealDay={this.editMealDay}
              meals={this.props.meals} 
              deleteMealDay={this.deleteMealDay}
              inputChangeHandler={this.inputChangeHandler}
            />
            <WeeklyMealsDay 
              weekNo={5}  
              currentMonthDates={this.props.currentMonthDates} 
              getPersianMonthWeekNo={this.getPersianMonthWeekNo}
              addMealDay={this.addMealDay} 
              getPersianMonth={this.getPersianMonth} 
              mealsDays={this.state.mealsDays} 
              editMealDay={this.editMealDay}
              meals={this.props.meals} 
              deleteMealDay={this.deleteMealDay}
              inputChangeHandler={this.inputChangeHandler}
            />
            <WeeklyMealsDay 
              weekNo={6}  
              currentMonthDates={this.props.currentMonthDates} 
              getPersianMonthWeekNo={this.getPersianMonthWeekNo}
              addMealDay={this.addMealDay} 
              getPersianMonth={this.getPersianMonth} 
              mealsDays={this.state.mealsDays} 
              editMealDay={this.editMealDay}
              meals={this.props.meals} 
              deleteMealDay={this.deleteMealDay}
              inputChangeHandler={this.inputChangeHandler}
            />
          </Container>           
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = store => {
    return {
      meals: store.meals.meals,
      mealsDays: store.mealsDays.mealsDays,
      currentMonthDates: store.currentMonthDates.currentMonthDates
    };
};
    
const mapDispatchToProps = dispatch => {
    return {
      addMealDay: model => dispatch(AddMealDay(model)),
      editMealDay: model => dispatch(EditMealDay(model)),
      removeMealDay: id => dispatch(RemoveMealDay(id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MealsDayList);
