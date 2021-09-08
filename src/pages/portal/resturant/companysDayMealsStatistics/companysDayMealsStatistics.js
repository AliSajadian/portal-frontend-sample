import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Container, 
  Row,
  Col,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import {GetPersianMonth} from "../../../../redux/actions/commonActions";
import { GetCompanysDayMealsStatistics } from "../../../../redux/actions/personelMealDayActions";
import './index.css'
 

const CompanysTodayMealsStatistics = (props) => {
    const [day, setDay] = useState(1);    
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(1400);
    const [date, setDate] = useState('')

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
      
    const handleDayChange = (e) => {
        let day = Number(e.target.value)
        setDay(day)
      }  
    const handleMonthChange = () => e => {
        let month = Number(e.target.value)
        let day31 = document.getElementById('day31')
        let day30 = document.getElementById('day30')
        if(month > 6){
          day31.hidden = true;
          if(month === 12 && this.state.year % 4 !== 3)
            day30.hidden = true
          else
            day30.hidden = false
        }
        else{
          day30.hidden = false;
          day31.hidden = false;
        }
    
        setMonth(month)
      }
    const handleYearChange = (e) => {
        let year = Number(e.target.value)
        if(year % 4 === 3){
          if(this.state.month === 12){
            let day30 = document.getElementById('day30')
            day30.hidden = true;
          }
          else{
            let day30 = document.getElementById('day30')
            day30.hidden = false;        
          }
        }
        else{
          let day30 = document.getElementById('day30')
          day30.hidden = false;     
        }
        setYear(year)
      }

    const showCompanyTodayMealsStatistics = (year, month, day) => {

        let date = getGregorianDateEx(year, month, day)
        console.log('date: ', date)
        props.getCompanysDayMealsStatistics(date)
        setDate(date)
    }

    return (
        <Card className="card3D" style={{direction:'rtl'}}>{props.getPersianMonth(new Date())}{console.log('selected date: ', date)}
        <CardHeader>
            <CardTitle tag="h2">
            آمار غذاهای روزانه {' به تاریخ '}  {props.persianDate} 
            </CardTitle>
        </CardHeader>
        <CardBody >
            <Container>
                <Container>
                    <Row>
                        <Col xl="4"></Col>
                        <Col xl="1">
                            <select className='date-combobox' value={day}
                            onChange={(e) => handleDayChange(e)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option id='day30' value={30}>30</option>        
                            <option id='day31' value={31}>31</option>                
                            </select>
                            </Col>
                        <Col xl="1">
                            <select className='date-combobox' value={month}
                            onChange={handleMonthChange()}>
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
                            <select className='date-combobox' value={year}
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
                        <Col xl="4"></Col>
                    </Row>                   
                    <Row>
                        <Col xl="12" style={{testAlign:'center'}}>
                            <Button color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} onClick={() => showCompanyTodayMealsStatistics(year, month, day)} >جستجو</Button>
                        </Col>
                    </Row> 
                </Container>    
            {date !== '' && props.departments && props.departments.length > 0 ?
            <Card className='container_item'>
                <CardHeader>
                    <CardTitle tag="h3">
                        آمار غذاهای روزانه شرکتها 
                    </CardTitle>
                </CardHeader>
                <CardBody >
                    <Container>
                    {props.departments.filter(department => props.companies.filter(
                        company => company.name !== 'آسفالت طوس' && company.id === department.company).length > 0).map((department, index) => 
                            props.companysDayMealsStatistics && props.companysDayMealsStatistics.filter(companysTodayMealsStatistic => 
                                companysTodayMealsStatistic.section === department.name) && props.companysDayMealsStatistics.filter(companysDayMealsStatistic => 
                                    companysDayMealsStatistic.section === department.name).length > 0 ? (
                        <Card key={index} className="card_item">
                            <CardHeader>
                                <CardTitle tag="h5">
                                    {department.name}
                                </CardTitle>
                            </CardHeader>
                            <CardBody className='card-body'>
                                {/* companysDayMealsStatistic.section_type === 1 && */}
                            {props.companysDayMealsStatistics.filter(companysDayMealsStatistic => 
                                companysDayMealsStatistic.section === department.name).map((companysDayMealsStatistic, index) => (
                                <Container key={index}>
                                    <label className='meal_no'>{companysDayMealsStatistic.meal_no}</label>
                                    <label>{' :    '}</label>
                                    <label className='meal_name'>{companysDayMealsStatistic.meal_name}</label>
                                    <br/>
                                </Container>
                                ))}
                            </CardBody>
                            <CardFooter className='card-footer'>
                            </CardFooter>
                        </Card>
                    ) : '')}
                    </Container>
                </CardBody>
            </Card> 
            : ''}
            </Container>
        </CardBody>
        <CardFooter>
        </CardFooter>
        </Card>
    );
}

const mapStateToProps = store => {
  return {
    companies: store.companies.companies,
    departments: store.departments.departments,
    companysDayMealsStatistics: store.personelMealDays.companysDayMealsStatistics,
    persianDate: store.common.persianDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPersianMonth: date => {
        dispatch(GetPersianMonth(date))}, 
    getCompanysDayMealsStatistics: (date) => { 
        dispatch(GetCompanysDayMealsStatistics(date))},        
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanysTodayMealsStatistics);
