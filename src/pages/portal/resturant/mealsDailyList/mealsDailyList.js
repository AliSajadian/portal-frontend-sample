import React, { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import {
  GetDepartmentsMealsDailyList,
  GetProjectsMealsDailyList,
  GetDepartmentDayMealsStatistics,
  GetProjectDayMealsStatistics,
} from "../../../../redux/actions/personelMealDayActions";
import SectionMealList from "../../../../components/sectionMealList"
import {GetPersianMonth} from "../../../../redux/actions/commonActions";
import './index.css'
const jQuery = require("jquery");
const $ = jQuery;
window.jQuery = jQuery;



const MealsDailyList = (props) => {  
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(1);
  const [department, setDepartment] = useState(1);
  const [departmentName, setDepartmentName] = useState(props.departments && 
    props.departments.filter(dep => Number(dep.id) === Number(1)) &&
    props.departments.filter(dep => Number(dep.id) === Number(1)).length > 0 ? 
    props.departments.filter(dep => Number(dep.id) === Number(1))[0]['name'] : '');
  const [project, setProject] = useState(1);
  const [projectName, setProjectName] = useState(props.projects && 
    props.projects.filter(prj => Number(prj.id) === Number(1)) &&
    props.projects.filter(prj => Number(prj.id) === Number(1)).length > 0 ? 
    props.projects.filter(prj => Number(prj.id) === Number(1))[0]['name']:'');
  const [projectCheck, setProjectCheck] = useState(false);

  useEffect(() => {
    if(company === 0 && (props.companys && props.companys.length > 0)){
      setCompany(props.companys[0].id)
    }
    if(department === 0 && (props.companys && props.companys.length > 0) && 
        (props.departments && props.departments.length > 0) &&
        props.departments.filter(department => department.company ===  props.companys[0].id) &&
        props.departments.filter(department => department.company ===  props.companys[0].id).length > 0){
          setDepartment(props.departments.filter(department => department.company ===  props.companys[0].id)[0].id)
    }
  }, []);


  const onCompanyChange = (e) => {
    setCompany(e.target.value)

    if(props.departments && props.departments.filter(dep => Number(dep.company) === Number(e.target.value)) &&
        props.departments.filter(dep => Number(dep.company) === Number(e.target.value)).length > 0){
          setDepartment(props.departments.filter(dep => Number(dep.company) === Number(e.target.value))[0]['id']);
          setDepartmentName(props.departments.filter(dep => Number(dep.company) === Number(e.target.value))[0]['name']);
    }
  }

  const onDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setDepartmentName(props.departments.filter(dep => Number(dep.id) === Number(e.target.value))[0]['name']);

  }

  const onProjectChange = (e) => {
    setProject(e.target.value);
    setProjectName(props.projects.filter(prj => Number(prj.id) === Number(e.target.value))[0]['name']);
  }

  const onConfirmHandler = () => {
    if(!projectCheck){
      props.getDepartmentsMealsDailyList(department)
      props.getDepartmentDayMealsStatistics(department)
    } 
    else{ 
      props.getProjectsMealsDailyList(project)
      props.getProjectDayMealsStatistics(project)
    }
    setTitle(!projectCheck ? departmentName : projectName) 
  }

  const onPrintHandle = () => {
    $('#header').css('height', '5em')
    $('#titleText').css('fontSize', '2em')
    $('#tableHeader').css('fontSize', '1.4em')
    $('#tableBody').css('fontSize', '1.2em')
    $('#innerTableBody').css('fontSize', '1.2em')

    $('#selCompany').hide();
    $('#selDepartment').hide();
    $('#selProject').hide();
    $('#chkProject').hide();
    $('#btnConfirm').hide();
    $('#printbutton').hide();
    $('#sidebar-bottom').hide();
    // $('#search').hide();
    $("main").css({'font-size':'large'});
    window.print();
    $('#header').css('height', '3em')
    $('#titleText').css('fontSize', '1.2em')
    $('#tableHeader').css('fontSize', '1.1em')
    $('#tableBody').css('fontSize', '1em')
    $('#innerTableBody').css('fontSize', '1em')
    $('#mainFooter').css('fontSize', '1em')
    $('#mainFooter').css('fontWeight', '450')

    $('#selCompany').show();
    $('#selDepartment').show();
    $('#selProject').show();
    $('#chkProject').show();
    $('#btnConfirm').show();
    $('#printbutton').show();
    $('#sidebar-bottom').show();      
    // $('#search').show();
    $("main").css({'font-size':'small'});
  }

  return (
  <React.Fragment>
  <Card id='search' style={{direction:'rtl'}} className='card3D'>
    <Container >
        <Row>
          <Col xl="2" style={{testAlign:'center'}}>
            <Button 
            id='btnConfirm' 
            color="primary" 
            style={{margin:"1em auto 1em auto", width:'100px'}} 
            onClick={() => onConfirmHandler()}>
                تائید
            </Button>
          </Col>
          <Col xl="2"></Col>
          <Col xl="2">
            <select id='selCompany' value={company} className='combobox-long'
              onChange={(e) => onCompanyChange(e)}>
              {props.companys ? props.companys.map((company) => 
                <option key={company.id} value={company.id}>{company.name}</option>
              ) : ''}
            </select>
          </Col>
          <Col xl="2">
            <select id='selDepartment' value={department} className='combobox-long'
              onChange={(e) => onDepartmentChange(e)}>
              {props.departments ? props.departments.filter(department => Number(department.company) === Number(company)).map((department) => 
                <option key={department.id} value={department.id}>{department.name}</option>
              ) : ''}
            </select>
          </Col>
          <Col xl="3">
            <label>
              <input id='chkProject' 
                type="checkbox"
                name="project_check"
                checked={projectCheck}
                onChange={(e) => setProjectCheck(!projectCheck)}
              />
              <span>   </span>
            </label>
            <select id='selProject' value={project ? project : ""} className='combobox-long' disabled={!projectCheck}
              onChange={(e) => onProjectChange(e)}>
              {props.projects ? props.projects.filter(project => Number(project.company) === Number(company)).map((project) => 
                <option key={project.id} value={project.id}>{project.name}</option>
              ) : ''}
            </select>
          </Col> 
          <Col xl="1"></Col>              
        </Row>
    </Container>
  </Card>    
  <Card id='main' style={{direction:'rtl'}} className='card3D'>{props.getPersianMonth(new Date())}
    <CardHeader id='header' style={{height:'3em', color:'black', borderRadius:'.3em', marginBottom:'2em'}}>
      <CardTitle style={{marginBottom:'1em'}}>
        <span id='titleText' style={{fontWeight:'bold', fontSize:'1.2em'}} >
          { 'لیست غذاهای ' }
          {!projectCheck ?  'واحد ' : ' پروژه '} 
          {title !== '' ? title :
          (props.departments && 
          props.departments.filter(dep => Number(dep.id) === Number(1)) &&
          props.departments.filter(dep => Number(dep.id) === Number(1)).length > 0 ? 
          props.departments.filter(dep => Number(dep.id) === Number(1))[0]['name'] : '')}
          {' به تاریخ '}  
          {props.persianDate} 
        </span>
        <br/>
        <br/>      
      </CardTitle>
    </CardHeader>
    <CardBody>
    {props.mealsDailyList && props.mealsDailyList.length > 0 ? 
      <Container>
        <SectionMealList   
        projectCheck={projectCheck}
        mealsDailyList={props.mealsDailyList} 
        departmentDayMealsStatistics={props.departmentDayMealsStatistics}
        projectDayMealsStatistics={props.projectDayMealsStatistics}
        />
        <Row>
          <Col xl='12' style={{testAlign:'center'}}>
            <Button 
            id='printbutton' 
            color="primary" 
            style={{margin:"1em auto 1em auto", width:'100px'}} 
            onClick={() => onPrintHandle()} >
              چاپ
            </Button>
          </Col>
        </Row>
      </Container>
    : ''}
    </CardBody>
  </Card>
  </React.Fragment>
  );
};


const mapStateToProps = store => {
  return {
    companys: store.companies.companies,
    departments: store.departments.departments,
    projects: store.projects.projects,
    mealsDailyList: store.personelMealDays.mealsDailyList,
    departmentDayMealsStatistics: store.personelMealDays.departmentDayMealsStatistics,
    projectDayMealsStatistics: store.personelMealDays.projectDayMealsStatistics,
    persianDate: store.common.persianDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDepartmentsMealsDailyList: departmentid => {
      dispatch(GetDepartmentsMealsDailyList(departmentid))}, 
    getProjectsMealsDailyList: departmentid => {
      dispatch(GetProjectsMealsDailyList(departmentid))}, 
    getDepartmentDayMealsStatistics: (id) => dispatch(GetDepartmentDayMealsStatistics(id)),
    getProjectDayMealsStatistics: (id) => dispatch(GetProjectDayMealsStatistics(id)),
    getPersianMonth: date => {
      dispatch(GetPersianMonth(date))}, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsDailyList);
