import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
// import { MinusCircle, PlusCircle } from "react-feather";
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
// import AutosizeInput from 'react-input-autosize';

import {
    GetMealDaysExList,
    GetMonthDates,
    GetGregorianMonthDates,
    AddMealDay,
    EditMealDay,
    RemoveMealDay,
    ActivatePersonelMealDaySelection
} from "../../../../redux/actions/mealsDayActions";

import '../restaurant.css'
import WeeklyMealsDay from "./components/WeeklyMealsDay"



const MealsDayList = (props) => {
  const [resturaunt_meal, setResturaunt_meal] = useState(-1);
  const [meal_index, setMeal_index] = useState(0);
  const [mealsDays, setMealsDays] = useState([]);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1400);
  const [flg1, setFg1] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if(resturaunt_meal === -1 && props.meals && props.meals.length > 0 && props.mealsDays &&
      props.meals.filter(meal => props.mealsDays.filter(mealDay => mealDay.resturaunt_meal === meal.id).length === 0).length > 0){
        // console.log('===meal_index: ', meal_index)
        setResturaunt_meal(props.meals.filter(meal => props.mealsDays.filter(
          mealDay => mealDay.resturaunt_meal === meal.id).length === 0)[meal_index]["id"])
        setMeal_index(meal_index + 1)
    }

    const today = new Date()
    let cyear = today.getFullYear(); 
    const cmonth = today.getUTCMonth(); 
    const cday = today.getUTCDate();
    const pYear = (cmonth < 3 || (cmonth === 3 && cday < 21)) ? cyear - 622 : cyear - 621
    const pMonth = getPersianMonthEx(cmonth, cday)

    if(flg1 && (year !== pYear || month !== pMonth)){
      // console.log('month initialized')
      setYear(pYear)
      setMonth(pMonth)
      setFg1(false)
    }

    // console.log('measDays state change condition: ', mealsDays !== props.mealsDays )
    if(props.mealsDays && props.mealsDays.length > 0 && mealsDays !== props.mealsDays ){
      setMealsDays(props.mealsDays)
      // console.log('mealsDays.length: ', props.mealsDays.length)
      // console.log('mealsDays: ', props.mealsDays)
      // console.log(props.mealsDays.length > 0 ? props.mealsDays[0]['isActive'] : 'mealDay is empty')
      setIsActive(props.mealsDays.length > 0 ? (props.mealsDays[0]['isActive'] ? true : false) : false)
      // console.log('props.mealsDays: ', props.mealsDays)   resturaunt_meal, meal_index, flg1, year, month, mealsDays
    }
  }, [props.meals, props.mealsDays]);

  const getGregorianDateEx = (year, month, day) => {
    let g_year = String(month < 10 ? year + 621 : (month === 10 && day < 11 ? year + 621 : year + 622))
    let g_month = ''
    let g_day = ''
    switch(month){
        case 1:
            if(day < 12){
              g_month = '03';
              g_day = String(Number(day) + 20)
            }
            else{
              g_month = '04'
              g_day = ((day - 11) < 10 ? '0' : '') + String(day - 11)
            }
            break
        case 2:
            if(day < 11){
                g_month = '04';
                g_day = String(Number(day) + 20)
              }
            else{
                g_month = '05';
                g_day =  ((day - 10) < 10 ? '0' : '') + String(day - 10)
              }
            break
        case 3:
            if(day < 11){
              g_month = '05';
              g_day = String(Number(day) + 21)
            }
            else{
              g_month = '06';
              g_day = ((day - 10) < 10 ? '0' : '') + String(day - 10)
            }
            break
        case 4:
            if(day < 10){
              g_month = '06';
              g_day = String(Number(day) + 21)
            }
            else{
              g_month = '07';
              g_day = ((day - 9) < 10 ? '0' : '') + String(day - 9)          
            }
            break
        case 5:
            if(day < 10){
              g_month = '07';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '08';
              g_day = ((day - 9) < 10 ? '0' : '') + String(day - 9)       
            }
            break
        case 6:
            if(day < 10){
              g_month = '08';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '09';
              g_day = ((day - 9) < 10 ? '0' : '') + String(day - 9)           
            }
            break
        case 7:
            if(day < 9){
              g_month = '09';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '10';
              g_day = ((day - 8) < 10 ? '0' : '') + String(day - 8)         
            }
            break
        case 8:
            if(day < 10){
              g_month = '10';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '11';
              g_day = ((day - 9) < 10 ? '0' : '') + String(day - 9)          
            }
            break
        case 9:
            if(day < 10){
              g_month = '11';
              g_day = String(Number(day) + 21)
            }
            else{
              g_month = '12';
              g_day = ((day - 9) < 10 ? '0' : '') + String(day - 9)
            }
            break
        case 10:
            if(day < 11){
              g_month = 12;
              g_day = String(Number(day) + 21)         
            }
            else{
              g_month = '01';
              g_day = ((day - 10) < 10 ? '0' : '') + String(day - 10)
            }
            break
        case 11:
            if(day < 12){
              g_month = '01';
              g_day = String(Number(day) + 20)
            }
            else{
              g_month = '02';
              g_day = ((day - 11) < 10 ? '0' : '') + String(day - 11)
            }
            break
        case 12:
            if(day < 10){
              g_month = '02';
              g_day = String(Number(day) + 19)
            }
            else{
              g_month = '03';
              g_day = ((day - 9) < 10 ? '0' : '') + String(day - 9)
            }
            break
        default:
    }
    return g_year + '-' + g_month + '-' + g_day
    };
  
  const handleMonthChange = (e) => {
    let nyear = year
    let nmonth = Number(e.target.value)
 
    const date = getGregorianDateEx(nyear, nmonth, 10)
    // console.log('date: ', date)
    props.getMealDaysExList(date)
    props.getGregorianMonthDates(nyear, nmonth)

    setMonth(nmonth)
    setIsActive(true)
  }
  const handleYearChange = (e) => {
    let nyear = Number(e.target.value)
    let nmonth = month

    const date = getGregorianDateEx(nyear, nmonth, 10)
    props.getMealDaysExList(date)
    props.getGregorianMonthDates(nyear, nmonth)

    setYear(nyear)
    setIsActive(true)
  }

  const getPersianMonthWeekNo = date => {
    const day = getPersianDay(date)
    const weekDay = date.getDay()
    // console.log('****************** ')
    // console.log('weekDay: ', weekDay, ', day: ', day, ', date:', date)
    // console.log('****************** ')
    // if(date === 'Sun Aug 22 2021 00:00:00 GMT+0430 (Iran Daylight Time)'){
    //   console.log('**** last day **** ', date)
    //   console.log('****    da    **** ', day)
    //   console.log('**** weekDay  **** ', weekDay)
    //   console.log('****************** ')
    // }
    switch(weekDay)
    {
      case 0://Sunday
        if(day < 3){
          // console.log('1.first week')
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
          // console.log('2.first week: ')
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
          // console.log('3.first week: ');
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
          // console.log('4.first week: ')
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
          // console.log('5.first week: ')
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
          // console.log('6.first week: ')
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
          // console.log('7.first week: ')
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
  const getPersianWeekDay = date => {
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
  const getPersianDay = date => {
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
  const getPersianMonth = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    const weekDay = getPersianWeekDay(date);
    // console.log('+++date: ', date)
    // console.log('+++weekDay: ', getPersianWeekDay(date))
    // console.log('+++month: ', month, ', day: ', day)
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
  const getPersianMonthEx = (month, day) => {
    switch(month){
      case 1:
        return day < 5 ? 10 : 11
      case 2:
        return day < 4 ? 11 : 12
      case 3:
        return day < 6 ? 12 : 1
      case 4:
        return day < 4 ? 1 : 2
      case 5:
        return day < 5 ? 2 : 3
      case 6:
        return day < 4 ? 3 : 4
      case 7:
        return day < 6 ? 4 : 5
      case 8:
        return day < 6 ? 5 : 6
      case 9:
        return day < 6 ? 6 : 7
      case 10:
        return day < 7 ? 7 : 8
      case 11:
        return day < 6 ? 8 : 9        
      default:
        return day < 6 ? 9 : 10        
    }
  }

  const inputChangeHandler = (mealDay) => e => {
    e.preventDefault();

    let editMealsDay = mealDay
    editMealsDay.totalNo = e.target.value

    let mealsDays = mealsDays
    mealsDays.map(mealsDay => mealsDay.id === editMealsDay.id ?
      mealDay.totalNo = e.target.value
      : '')

    props.editMealDay(editMealsDay)

    setMealsDays(mealsDays)
  };
  ///////////////////////////////////
  //      Handle Add MealDay
  ///////////////////////////////////
  const addMealDay = date => e => {
    // console.log('isActive: ', isActive)
    if(!isActive){
      return
    }

    if(!props.meals || resturaunt_meal === -1){
      // console.log('1 condition');
      alert('ابتدا باید نام غذاها را وارد سیستم نمائید سپس غذاهای روزانه را تعیین کنید!');
      return;
    }
    if(!props.mealsDays){
      if(meal_index + 1 > props.meals.length){
        // console.log('2 condition');
        alert('ابتدا باید نام غذاهای جدیدی را وارد سیستم نمائید سپس غذاهای روزانه ی دیگری را تعیین کنید!');
        return;
      }
    }
    else{
      if(meal_index + 1 > props.meals.filter(meal => props.mealsDays.filter(
        mealDay => mealDay.resturaunt_meal === meal.id).length === 0).length){
          // console.log('3 condition');
        alert('ابتدا باید نام غذاهای جدیدی را وارد سیستم نمائید سپس غذاهای روزانه ی دیگری را تعیین کنید!');
        return;
      }      
    }

    e.preventDefault()
    let year = date.getFullYear(); 
    let month = date.getMonth()+1; 
    let day = date.getDate();
    let newDate = String(year) + '-' + 
                  (String(month).length < 2 ? ('0' + String(month)) : String(month)) + '-' + 
                  (String(day).length < 2 ? ('0' + String(day)) : String(day))
    const newMealsDay = { 
      date: newDate, 
      resturaunt_meal: resturaunt_meal, 
      totalNo: 0,
      isActive: true,
      selectedNo: 0,
    }

    // console.log('meal_index: ', meal_index)
    // console.log('resturaunt_meal: ', resturaunt_meal)

    // console.log('newMealsDay: ', newMealsDay)
    props.addMealDay(newMealsDay);

    setResturaunt_meal(props.mealsDays && props.mealsDays.length > 0 ? props.meals.filter(meal => props.mealsDays.filter(
      mealDay => mealDay.resturaunt_meal === meal.id).length === 0)[meal_index]["id"] : props.meals[meal_index]["id"])
    setMeal_index(0)
    setMealsDays([...mealsDays, newMealsDay])
  }
  ///////////////////////////////////
  //     Handle Edit MealDay
  ///////////////////////////////////
  const editMealDay = (mealsDayID, date, totalNo) => e => {
    if(!isActive){
      return
    }

    e.preventDefault()
    const editMealsDay = { 
      id: mealsDayID,
      date: date,
      resturaunt_meal: e.target.value, 
      totalNo: 0,
      isActive: true,
      selectedNo: 0,
    }

    let mealsDaysFiltered = mealsDays
    .filter(mealsDay => mealsDay.id !== mealsDayID)
    .concat(editMealsDay)

    props.editMealDay(editMealsDay)

    setResturaunt_meal(e.target.value)
    setMealsDays(mealsDaysFiltered)
    // console.log("EDIT AFTER mealsDays: ", mealsDays);
  }
  ///////////////////////////////////
  //      Handle Delete MealDay
  ///////////////////////////////////
  const deleteMealDay = id => e => {
    if(!isActive){
      return
    }

    e.preventDefault()

    let mealsDaysFiltered = mealsDays.filter(mealsDay => mealsDay.id === id)
    if(mealsDays && mealsDays.length > 0){
      if(!window.confirm("آیا از حذف غذای مورد نظر اطمینان دارید؟")) {
        return;
      }
    }
    
    mealsDaysFiltered = mealsDays.filter(mealsDay => mealsDay.id !== id)
    // console.log("DELETE BEFORE mealsDays: ", mealsDays);
    setMealsDays(mealsDaysFiltered)

    props.removeMealDay(id)
    // console.log("DELETE AFTER mealsDays: ", mealsDays);
  }

  const activateMealsDays = () => {
    let date = getGregorianDateEx(year, month, 10)
    props.activatePersonelMealDaySelection(date)
    setIsActive(false)
  }

// console.log('props.currentMonthDates: ',props.currentMonthDates)
  return (
    <Card style={{direction:'rtl'}} className='card3D'>
      <CardHeader>
          <CardTitle tag="h5">
              لیست غذاهای ماهیانه
          </CardTitle>
      </CardHeader>
      <CardBody>
        <Card>
          <Row>
            <Col xl="5"></Col>
              <Col xl="1">
                <select className="combobox" value={month}
                onChange={(e) => handleMonthChange(e)}>
                  <option value={1}>فروردین</option>
                  <option value={2}>اردیبهشت</option>
                  <option value={3}>خرداد</option>
                  <option value={4}>تیر</option>
                  <option value={5}>مرداد</option>
                  <option value={6}>شهریور</option>
                  <option value={7}>مهر</option>
                  <option value={8}>آبان</option>
                  <option value={9}>آذر</option>
                  <option value={10}>دی</option>
                  <option value={11}>بهمن</option>
                  <option value={12}>اسفند</option>
                </select>
              </Col>
              <Col xl="1">
                <select className="combobox" value={year}
                onChange={(e) => handleYearChange(e)}>
                  <option value={1400}>1400</option>
                  <option value={1401}>1401</option>
                  <option value={1402}>1402</option>
                  <option value={1403}>1403</option>
                  <option value={1404}>1404</option>
                  <option value={1405}>1405</option>
                  <option value={1406}>1406</option>
                  <option value={1407}>1407</option>
                  <option value={1408}>1408</option>
                  <option value={1409}>1409</option>                
                </select>
              </Col>
            <Col xl="5"></Col>
          </Row>            
        </Card>
        <Container> 
          <WeeklyMealsDay 
            weekNo={1}  
            isActive={isActive}
            currentMonthDates={props.currentMonthDates} 
            mealsDays={mealsDays} 
            meals={props.meals} 
            getPersianMonthWeekNo={getPersianMonthWeekNo}
            getPersianMonth={getPersianMonth} 
            addMealDay={addMealDay} 
            editMealDay={editMealDay}
            deleteMealDay={deleteMealDay}
          />
          <WeeklyMealsDay 
            weekNo={2}  
            isActive={isActive}
            currentMonthDates={props.currentMonthDates} 
            mealsDays={mealsDays} 
            meals={props.meals} 
            getPersianMonthWeekNo={getPersianMonthWeekNo}
            getPersianMonth={getPersianMonth} 
            addMealDay={addMealDay} 
            editMealDay={editMealDay}
            deleteMealDay={deleteMealDay}
          />
          <WeeklyMealsDay 
            weekNo={3}  
            isActive={isActive}
            currentMonthDates={props.currentMonthDates} 
            mealsDays={mealsDays} 
            meals={props.meals} 
            getPersianMonthWeekNo={getPersianMonthWeekNo}
            getPersianMonth={getPersianMonth} 
            addMealDay={addMealDay} 
            editMealDay={editMealDay}
            deleteMealDay={deleteMealDay}
          />
          <WeeklyMealsDay 
            weekNo={4}  
            isActive={isActive}
            currentMonthDates={props.currentMonthDates} 
            mealsDays={mealsDays} 
            meals={props.meals} 
            getPersianMonthWeekNo={getPersianMonthWeekNo}
            getPersianMonth={getPersianMonth} 
            addMealDay={addMealDay} 
            editMealDay={editMealDay}
            deleteMealDay={deleteMealDay}
          />
          <WeeklyMealsDay 
            weekNo={5}  
            isActive={isActive}
            currentMonthDates={props.currentMonthDates} 
            mealsDays={mealsDays} 
            meals={props.meals} 
            getPersianMonthWeekNo={getPersianMonthWeekNo}
            getPersianMonth={getPersianMonth} 
            addMealDay={addMealDay} 
            editMealDay={editMealDay}
            deleteMealDay={deleteMealDay}          
          />
          <WeeklyMealsDay 
            weekNo={6}  
            isActive={isActive}
            currentMonthDates={props.currentMonthDates} 
            mealsDays={mealsDays} 
            meals={props.meals} 
            getPersianMonthWeekNo={getPersianMonthWeekNo}
            getPersianMonth={getPersianMonth} 
            addMealDay={addMealDay} 
            editMealDay={editMealDay}
            deleteMealDay={deleteMealDay}          
          />
          <Card>
            <Row>
              <Col xl="2" className="col">
              </Col>
              <Col xl="8" className="col">
                {
                  isActive ?
                <Button 
                  color="primary" 
                  style={{margin:"1em auto 1em auto", width:'15em'}} 
                  onClick={() => activateMealsDays()} 
                  >فعال سازی انتخاب غذاهای این ماه پرسنل</Button>         
                  :
                  <Button 
                  disabled
                  color="primary" 
                  style={{margin:"1em auto 1em auto", width:'15em'}} 
                  onClick={() => activateMealsDays()} 
                  >فعال سازی انتخاب غذاهای این ماه پرسنل</Button>                            
                }
              </Col>
              <Col xl="2" className="col">
              </Col>
            </Row>
          </Card>
        </Container>           
      </CardBody>
    </Card>
  )
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
      getMealDaysExList: (date) => dispatch(GetMealDaysExList(date)),    
      getMonthDates: (startdate, enddate) => dispatch(GetMonthDates(startdate, enddate)),
      getGregorianMonthDates: (year, month) => dispatch(GetGregorianMonthDates(year, month)),
      addMealDay: model => dispatch(AddMealDay(model)),
      editMealDay: model => dispatch(EditMealDay(model)),
      removeMealDay: id => dispatch(RemoveMealDay(id)),
      activatePersonelMealDaySelection: date => {
        if(window.confirm("از فعالسازی انتخاب غذاهای این ماه اطمینان دارید؟")){
          dispatch(ActivatePersonelMealDaySelection(date))
        }
      },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsDayList);
