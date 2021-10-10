import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
  Label
} from "reactstrap";
import { connect } from "react-redux";
// import {GetPersianMonthEx} from "../../../../redux/actions/commonActions";
import '../restaurant.css'



const ContractorMonthlyMealsStatisticsList = (props) => {
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

    return(
        <Card className='card3D' style={{width:'80%', margin:'auto', fontSize:'1em'}}>
            <CardHeader style={{height:'4em'}}>
                <CardTitle>
                    <span style={{fontSize:'1.3em', fontWeight:'bold', padding:'auto', marginTop:'0'}}>
                        آمار کلی غذاهای ماهانه                      
                    </span>                    
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Card className="card-res-week">
                {props.contractorMonthlyMealsStatistics && props.contractorMonthlyMealsStatistics.length > 0 ? 
                (
                    props.datesList.map((date, index) => {
                        return(
                            <Container  key={index} style={{backgroundColor:'#c9dcf8', borderRadius:'.5em', marginBottom:'1em', paddingTop:'.5em', paddingBottom:'.5em'}}>
                            <Row key={index} style={{backgroundColor:'#dce6f8', fontSize:'1.1em', fontWeight:'bold'}}>
                                <Col style={{textAlign:'right'}} xl="12">    
                                    <Label>{getPersianMonth(date.date)}</Label>
                                </Col>
                            </Row>
                            {props.contractorMonthlyMealsStatistics.filter(mealDay => 
                                mealDay.date === date.date).map((mealDay, index) =>
                            (<Row key={index} style={{backgroundColor:'#eff3fa'}}>
                                <Col xl="5" style={{textAlign:'right'}}>    
                                    <Label>{mealDay.meal_no}</Label>
                                </Col>
                                <Col xl="5" style={{textAlign:'center'}}>
                                    <Label>{mealDay.meal_name}</Label>
                                </Col>                        
                                <Col xl="2" style={{textAlign:'center'}} >    
                                </Col>
                            </Row>))
                            }
                            </Container>
                        );
                    })
                ):""}
                </Card>
            </CardBody>      
        </Card>
    )
};

const mapStateToProps = store => {
  return {
    contractorMonthlyMealsStatistics: store.personelMealDays.contractorMonthlyMealsStatistics,
    datesList: store.personelMealDays.datesList,
    persianDate: store.common.persianDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getPersianMonth: date => {
    //     dispatch(GetPersianMonthEx(date))}, 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractorMonthlyMealsStatisticsList);
