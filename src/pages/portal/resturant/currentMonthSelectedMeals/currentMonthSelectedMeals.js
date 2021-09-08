import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import '../restaurant.css'
 

const CurrentMonthSelectedMeals = (props) => {
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
    
    const getPersianMonth = date => {
    //   console.log(new Date(date))
      date = new Date(date)
      let month = date.getUTCMonth()+1; 
      let day = date.getUTCDate();
      const weekDay = getPersianWeekDay(date);
    // console.log('+++date: ', date)
    // console.log('+++weekDay: ', this.getPersianWeekDay(date))
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
            if(day < 22){
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
            if(day < 21){
                return weekDay + ' ' + (day + 9) + ' آذر ';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' دی ';
            }
        default:
    }
    };

    return (
        <Card className="card3D">
        <CardHeader>
            <CardTitle tag="h5">
            لیست غذاهای انتخاب شده 
            </CardTitle>
        </CardHeader>
        <CardBody >
            <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
                <tr id="tr">
                <th style={{ width: "3%", textAlign:'center' }}>#</th>
                <th style={{ width: "47%", textAlign:'center' }}>تاریخ</th>
                <th style={{ width: "47%", textAlign:'center' }}>غذای انتخاب شده</th>
                <th />
                </tr>
            </thead>
            <tbody id="tb">
                {props.currentMonthSelectedMeals && props.currentMonthSelectedMeals.length > 0 ? (
                props.currentMonthSelectedMeals.map((currentMonthSelectedMeal, index) => {
                    return ( 
                    <tr key={index}>
                        <td style={{ width: "3%"}}>{index+1}</td>
                        <td style={{ width: "47%", textAlign:'center' }}>{getPersianMonth(currentMonthSelectedMeal.resturaunt_day_meal__date)}</td>
                        <td style={{ width: "47%", textAlign:'center' }}>{currentMonthSelectedMeal.resturaunt_day_meal__resturaunt_meal__name}</td>
                    </tr>
                    );
                })
                ) : (
                <tr><td>not found</td></tr>
                )}
            </tbody>
            </Table>
        </CardBody>
        <CardFooter>
        </CardFooter>
        </Card>
    );
}

const mapStateToProps = store => {
  return {
    currentMonthSelectedMeals: store.personelMealDays.currentMonthSelectedMeals,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMonthSelectedMeals);
