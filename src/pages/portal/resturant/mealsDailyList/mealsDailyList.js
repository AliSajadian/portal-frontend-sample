import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import {
  GetDepartmentsMealsDailyList,
  GetProjectsMealsDailyList
} from "../../../../redux/actions/personelMealDayActions";
import SectionMealList from "../../../../components/sectionMealList"
import {GetPersianMonth} from "../../../../redux/actions/commonActions";
import '../restaurant.css'
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
    !projectCheck ?  props.getDepartmentsMealsDailyList(department) : props.getProjectsMealsDailyList(project)
    setTitle(!projectCheck ? departmentName : projectName) 
  }

  const onPrintHandle = () => {
    // var allElements = $('*');
    // $($(allElements).each(function(){
    //   if ( $( this ).is( "img" ) ){
    //     $( this ).hide()
    //   }
    //   console.log('-----------------------')
    //   console.log(this)
    // }));

    $('#selCompany').hide();
    $('#selDepartment').hide();
    $('#selProject').hide();
    $('#chkProject').hide();
    $('#btnConfirm').hide();
    $('#printbutton').hide();
    $('#sidebar-bottom').hide();
    window.print();
    $('#selCompany').show();
    $('#selDepartment').show();
    $('#selProject').show();
    $('#chkProject').show();
    $('#btnConfirm').show();
    $('#printbutton').show();
    $('#sidebar-bottom').show();      
  }

  return (
    <Card style={{direction:'rtl'}}>
    <Container>
    <Card style={{textAlign:'center'}}>
    <Row>
      <Col xl="4"></Col>
      <Col xl="4">
      <label >
        {props.getPersianMonth(new Date())}
      </label>
      </Col>
      <Col xl="4"></Col>
    </Row>
    <Row>
      <Col xl="3"></Col>
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
      <Col xl="2">
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
      <Col xl="3"></Col>              
    </Row>
    <Row>
      <Col xl="12" style={{testAlign:'center'}}>
        <Button id='btnConfirm' color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} 
                onClick={() => onConfirmHandler()}
                 >تائید</Button>
      </Col>
    </Row>
  </Card>
  {
    props.mealsDailyList && props.mealsDailyList.length > 0 ? 
    <Container>
      <Row>
        <Col xl='12'>
      <div id='printarea'>
        {/* ref={el => (componentRef = el)}  ref={componentRef}*/}
        <SectionMealList   
        title={title}
        companys={props.companys}  
        company={company} 
        departments={props.departments}
        department={department} 
        projects={props.projects} 
        project={project} 
        projectCheck={projectCheck}
        mealsDailyList={props.mealsDailyList} 
        persianDate={props.persianDate}
        getDepartmentsMealsDailyList={props.getDepartmentsMealsDailyList}
        getProjectsMealsDailyList={props.getProjectsMealsDailyList}
      />
      </div>
      </Col>
      </Row>
      <Row>
      <Col xl='12' style={{testAlign:'center'}}>
      <Button id='printbutton' color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} 
              onClick={() => onPrintHandle()} >چاپ</Button>
      </Col>
      </Row>
    </Container>
  : ''}
  </Container>
    </Card>
    );
};


const mapStateToProps = store => {
  return {
    companys: store.companies.companies,
    departments: store.departments.departments,
    projects: store.projects.projects,
    mealsDailyList: store.personelMealDays.mealsDailyList,
    persianDate: store.common.persianDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDepartmentsMealsDailyList: departmentid => {
      dispatch(GetDepartmentsMealsDailyList(departmentid))}, 
    getProjectsMealsDailyList: departmentid => {
      dispatch(GetProjectsMealsDailyList(departmentid))}, 
    getPersianMonth: date => {
      dispatch(GetPersianMonth(date))}, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsDailyList);
