import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { connect } from "react-redux";

import SectionMealList from "./sectionMealList"
import {GetPersianMonth} from "../../../../redux/actions/commonActions";
import './index.css'
const jQuery = require("jquery");
const $ = jQuery;
window.jQuery = jQuery;



const SectionMealsDailyList = (props) => {  
  const onPrintHandle = () => {
  $('#header').css('height', '5em')
  $('#titleText').css('fontSize', '2em')
  $('#tableHeader').css('fontSize', '1.4em')
  $('#tableBody').css('fontSize', '1.2em')
  $('#innerTableBody').css('fontSize', '1.2em')

  $('#printbutton').hide();
  $('#sidebar-bottom').hide();
  $("main").css({'font-size':'large'});
  window.print();
  $('#header').css('height', '3em')
  $('#titleText').css('fontSize', '1.2em')
  $('#tableHeader').css('fontSize', '1.1em')
  $('#tableBody').css('fontSize', '1em')
  $('#innerTableBody').css('fontSize', '1em')
  $('#mainFooter').css('fontSize', '1em')    
  $('#mainFooter').css('fontWeight', '450')

  $('#printbutton').show();
  $('#sidebar-bottom').show();      
  $("main").css({'font-size':'small'});
  }

  return (
    <Card id='main' style={{direction:'rtl'}} className='card3D'>{props.getPersianMonth(new Date())}
      <CardHeader id='header' style={{height:'3em',color:'black', borderRadius:'.3em', marginBottom:'2em'}}>
        <CardTitle >
          <span id='titleText' style={{fontWeight:'bold' , fontSize:'1.2em'}} >
            { 'لیست غذاهای ' }
            {props.sectionName} {' به تاریخ '}  {props.persianDate}           
          </span>
          <br/>
          <br/>
        </CardTitle>
      </CardHeader>
      <CardBody >
  {
    props.mealsDailyList && props.mealsDailyList.length > 0 ? 
    <Container>
      <SectionMealList   
        mealsDailyList={props.mealsDailyList} 
        sectionDayMealsStatistics={props.sectionDayMealsStatistics}
      />
      <Row>
        <Col xl='12' style={{testAlign:'center'}}>
          <Button id='printbutton' color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} 
                  onClick={() => onPrintHandle()} >چاپ</Button>
        </Col>
      </Row>
    </Container>
    : ''}
        </CardBody>
    </Card>
    );
};


const mapStateToProps = store => {
  return {
    sectionName: store.personelMealDays.sectionName,
    mealsDailyList: store.personelMealDays.mealsDailyList,
    sectionDayMealsStatistics: store.personelMealDays.sectionDayMealsStatistics,
    persianDate: store.common.persianDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPersianMonth: date => {
      dispatch(GetPersianMonth(date))}, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionMealsDailyList);
