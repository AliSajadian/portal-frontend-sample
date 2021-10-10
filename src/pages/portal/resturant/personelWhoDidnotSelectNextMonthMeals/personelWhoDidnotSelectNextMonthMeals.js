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
import '../restaurant.css'



const PersonelWhoDidnotSelectNextMonthMeals = (props) => {
    return(
        <Card className='card3D' style={{width:'80%', margin:'auto', fontSize:'1em'}}>
            <CardHeader style={{height:'4em'}}>
                <CardTitle >
                    <span style={{fontSize:'1.3em', fontWeight:'bold', padding:'auto', marginTop:'0'}}>
                        پرسنلی که غذاهای ماه بعد را انتخاب نکرده اند  
                    </span>
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Card className="card-res-week">
                <Row style={{backgroundColor:'#eff3fa', fontSize:'1.1em', fontWeight:'bold'}}>
                    <Col xl="3" style={{textAlign:'center'}}></Col>
                    <Col xl="2" style={{textAlign:'center'}}>    
                        <Label>شماره تلفن</Label>
                    </Col>
                    <Col xl="2" style={{textAlign:'center'}}>
                        <Label>نام خانوادگی</Label>
                    </Col>     
                    <Col xl="1" style={{textAlign:'center'}}>
                        <Label>نام</Label>
                    </Col> 
                    <Col xl="2" style={{textAlign:'center'}}>
                        <Label>کد</Label>
                    </Col>                                                    
                    <Col xl="2" style={{textAlign:'center'}}>نام قسمت</Col>
                    </Row>
                {props.personelWhoDidnotSelectNextMonthMeals && props.personelWhoDidnotSelectNextMonthMeals.length > 0 ? 
                (
                    props.sectionNames.map((sn, index) => {
                        return(
                            <Container  key={index} style={{backgroundColor:'#c9dcf8', borderRadius:'.5em', marginBottom:'1em', paddingTop:'.5em', paddingBottom:'.5em'}}>
                            <Row key={index} style={{backgroundColor:'#dce6f8', fontSize:'1.1em', fontWeight:'bold'}}>
                                <Col style={{textAlign:'right'}} xl="12">    
                                    <Label>{sn.name}</Label>
                                </Col>
                            </Row>
                            {props.personelWhoDidnotSelectNextMonthMeals.filter(pwdnsnmm => 
                                pwdnsnmm.section === sn.name).map((pwdnsnmm, index) =>
                            (<Row key={index} style={{backgroundColor:'#eff3fa'}}>
                                <Col xl="3" style={{textAlign:'center'}}></Col>
                                <Col xl="2" style={{textAlign:'center'}}>    
                                    <Label>{pwdnsnmm.phone}</Label>
                                </Col>
                                <Col xl="2" style={{textAlign:'center'}}>
                                    <Label>{pwdnsnmm.last_name}</Label>
                                </Col>     
                                <Col xl="1" style={{textAlign:'center'}}>
                                    <Label>{pwdnsnmm.first_name}</Label>
                                </Col> 
                                <Col xl="2" style={{textAlign:'center'}}>
                                    <Label>{pwdnsnmm.id}</Label>
                                </Col>                                                    
                                <Col xl="2" style={{textAlign:'center'}}></Col>
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
    personelWhoDidnotSelectNextMonthMeals: store.personelMealDays.personelWhoDidnotSelectNextMonthMeals,
    sectionNames: store.personelMealDays.sectionNames,
    persianDate: store.common.persianDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonelWhoDidnotSelectNextMonthMeals);
