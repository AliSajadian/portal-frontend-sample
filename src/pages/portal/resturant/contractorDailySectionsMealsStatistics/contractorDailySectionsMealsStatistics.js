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
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import {GetPersianMonth} from "../../../../redux/actions/commonActions";
import './index.css';
const jQuery = require("jquery");
const $ = jQuery;
window.jQuery = jQuery;
 

const ContractorSectionsDailyMealsStatistics = (props) => {
    const [allMealsTotalNo, setallMealsTotalNo] = useState(0)

    useEffect(() => {
        if(allMealsTotalNo === 0 && props.todayMealsTotalNo && props.todayMealsTotalNo.length > 0){
            let tmp = 0
            props.todayMealsTotalNo.map(tmtn => tmp += tmtn.meal_no)
            if(tmp > 0){
                setallMealsTotalNo(tmp)
            }
        } 
    }, [props.todayMealsTotalNo])

    const onPrintHandle = () => {
        $('#header').css('height', '5em')
        $('#titleText').css('fontSize', '2em')
        $('#tableHeader').css('fontSize', '1.4em')
        $('#tableBody').css('fontSize', '1.2em')
        $('.dataNumbers').css('fontSize', '1.3em')
        $('#innerTableBody').css('fontSize', '1.3em')
        // $('#table tr').css('padding', '0')
        $('#table td').css('padding', '.5em')
        
        $('#printbutton').hide();
        $('#sidebar-bottom').hide();
        $("main").css({'font-size':'large'});
        window.print();
        $('#header').css('height', '3em')
        $('#titleText').css('fontSize', '1.2em')
        $('#tableHeader').css('fontSize', '1.1em')
        $('#tableBody').css('fontSize', '1em')
        $('.dataNumbers').css('fontSize', '1em')
        $('#innerTableBody').css('fontSize', '1em')
        $('#table td').css('padding', '.9em')

        $('#printbutton').show();
        $('#sidebar-bottom').show();      
        $("main").css({'font-size':'small'});
    }

    return (
        <Card id='main' style={{direction:'rtl', borderRadius:'.3em', boxShadow:'-10px 0px 15px 0px rgba(18, 18, 19, 0.336)'}}>
            {props.getPersianMonth(new Date())}
            <CardHeader id='header' style={{height:'3em',color:'black', borderRadius:'.3em'}}>
                <CardTitle >
                    <span id='titleText' style={{fontWeight:'bold', fontSize:'1.1em'}} >آمار غذاهای بخشهای مختلف {' به تاریخ '}  {props.persianDate}</span>
                    <br/>
                    <br/>
                </CardTitle>
            </CardHeader>
            <CardBody >
            {props.todayMealsNames && props.todayMealsNames.length > 0 && 
            props.contractorSectionsDailyMealsStatistics && props.contractorSectionsDailyMealsStatistics.length > 0 ?
                <div style={{padding:'auto'}}>
                    <Table id='table' hover striped responsive style={{margin:'auto'}}>
                        <thead id='tableHeader' style={{fontWeight:'bold',fontSize:'1.1em',color:'black',backgroundColor:'#cfe1f8',borderRadius:'.3em'}}>
                            <tr >
                                <td style={{ width: "22%" }} >
                                </td>
                                {props.todayMealsNames.map((tmn, index) => {
                                    return(
                                    <td key={index} style={{ width: "23%", textAlign:'center'}} >
                                        {tmn.resturaunt_meal__name}
                                    </td>
                                    );
                                }
                                )}
                            </tr>
                        </thead>
                        <tbody id='tableBody' style={{fontWeight:'bold', color:'rgb(53, 9, 9)'}}>
                            {props.contractorSectionsDailyMealsStatistics.map((sdms, indx) => {
                                return(
                                <tr key={indx} >
                                    <td style={{ width: "22%" }} >
                                        {sdms['employee__department__name']}
                                    </td>
                                    {props.todayMealsNames.map((tmn, index) => {
                                        return(
                                        <td className='dataNumbers' key={index} style={{ width: "23%", textAlign:'center'}} >
                                            {sdms[tmn.resturaunt_meal__name]}
                                        </td>
                                        // 
                                        );
                                    }
                                    )}
                                </tr>
                                );
                            })}
                        </tbody>
                        <tfoot  id='innerTableBody' style={{color:'rgb(194, 81, 81)', backgroundColor:'#cfe1f8', fontWeight:'bold', borderRadius:'.3em'}}>
                            <tr >
                                <td style={{ width: "22%" }} >
                                    جمع
                                </td>
                                {props.todayMealsTotalNo.map((tmtn, index) => {
                                    return(
                                    <td key={index} style={{ width: "23%", textAlign:'center'}} >
                                        {tmtn.meal_no}
                                    </td>
                                    );
                                }
                                )}
                            </tr>
                            <tr >
                                <td style={{ width: "22%" }} >
                                    جمع کل
                                </td>
                                <td style={{ width: "23%" }} ></td>
                                <td style={{ width: "23%", textAlign:'center'}} >
                                    {allMealsTotalNo}
                                </td>
                                <td style={{ width: "23%" }} ></td>
                            </tr>                            
                        </tfoot>
                    </Table>
                    <Row>
                        <Col xl='12' style={{testAlign:'center'}}>
                            <Button id='printbutton' color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} 
                                    onClick={() => onPrintHandle()}>چاپ</Button>
                        </Col>
                    </Row>
                </div>
            : ''}
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
    );
}

const mapStateToProps = store => {
  return {
    contractorSectionsDailyMealsStatistics: store.personelMealDays.contractorSectionsDailyMealsStatistics,
    todayMealsNames: store.personelMealDays.todayMealsNames,
    todayMealsTotalNo: store.personelMealDays.todayMealsTotalNo,
    persianDate: store.common.persianDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPersianMonth: date => {
        dispatch(GetPersianMonth(date))}, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractorSectionsDailyMealsStatistics);
