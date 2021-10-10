import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
  Label
} from "reactstrap";
import { connect } from "react-redux";
import {
  GetDepartmentMealsDayList,
  GetProjectMealsDayList,
  EditGuestMealDayJunction,
  // EditGuestMealDay_Junction,
 } from "../../../../redux/actions/mealsDayActions";
import {
  GetGuestMealsDayList,
  GetDepartmentGuestMealDayList,
  GetProjectGuestMealDayList,
  EditGuestMealDay,
  SaveGuestsMealsDay,
} from "../../../../redux/actions/guestMealDayActions";
import '../restaurant.css'
// import Label from "reactstrap/lib/Label";
import AutosizeInput from 'react-input-autosize';



class GuestMealDayList extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      day: 1,
      month: 1,
      year: 1400,
      date: '',
      company: 0,
      department: 0,
      project: 1,
      projectCheck: false,
      mealsNo: [],
      mealsDay: [],
      guestMealsDay: [],
      description: '',
    };
  }

  componentDidUpdate() {
    // console.log('===========================componentDidUpdate===========================')

    // console.log('this.props.companys: ', this.props.companys, ', this.props.departments: ', this.props.departments)

    if(this.state.company === 0 && (this.props.companys && this.props.companys.length > 0)){
        this.setState({
          company: this.props.companys[0].id,
        })
    }
    if(this.state.department === 0 && (this.props.departments && this.props.departments.length > 0)){
      this.setState({
        department: this.props.departments[0].id
      })
    }
    if(this.props.mealsDay && this.props.mealsDay !== this.state.mealsDay){
      this.setState({
        mealsDay: this.props.mealsDay
      })
    }
    if(this.props.guestMealsDay && this.props.guestMealsDay !== this.state.guestMealsDay){
      this.setState({
        guestMealsDay: this.props.guestMealsDay,
        description: this.props.guestMealsDay.length > 0 ? String(this.props.guestMealsDay[0]['description']) : ''
      })
    }    

    // console.log('---------------------componentDidUpdate--------------------')
    // console.log('this.props.mealsDay !== this.state.mealsDay = ', this.props.mealsDay !== this.state.mealsDay)
    // console.log('props mealsDay: ', this.props.mealsDay)
    // console.log('state mealsDay: ', this.state.mealsDay)

    // console.log('this.state.company: ', this.state.company, ', this.state.department: ', this.state.department)
    // console.log('-----------------------------------------------------------')
  }

  getGregorianDate = (year, month, day) => {
  let g_year = month < 10 ? year + 621 : (month === 10 && day < 11 ? year + 621 : year + 622)
  let g_month = 1
  let g_day = 1
  switch(month){
      case 1:
          if(day < 12){
            g_month = 3;
            g_day = Number(day) + 20
          }
          else{
            g_month = 4
            g_day = day - 11
          }
          break
      case 2:
          if(day < 11){
              g_month = 4;
              g_day = Number(day) + 20
            }
          else{
              g_month = 5;
              g_day = day - 10
            }
          break
      case 3:
          if(day < 11){
            g_month = 5;
            g_day = Number(day) + 21
          }
          else{
            g_month = 6;
            g_day = day - 10
          }
          break
      case 4:
          if(day < 10){
            g_month = 6;
            g_day = Number(day) + 21
          }
          else{
            g_month = 7;
            g_day = day - 9            
          }
          break
      case 5:
          if(day < 10){
            g_month = 7;
            g_day = Number(day) + 22
          }
          else{
            g_month = 8;
            g_day = day - 9            
          }
          break
      case 6:
          if(day < 10){
            g_month = 8;
            g_day = Number(day) + 22
          }
          else{
            g_month = 9;
            g_day = day - 9            
          }
          break
      case 7:
          if(day < 9){
            g_month = 9;
            g_day = Number(day) + 22
          }
          else{
            g_month = 10;
            g_day = day - 8          
          }
          break
      case 8:
          if(day < 10){
            g_month = 10;
            g_day = Number(day) + 22
          }
          else{
            g_month = 11;
            g_day = day - 9            
          }
          break
      case 9:
          if(day < 10){
            g_month = 11;
            g_day = Number(day) + 21
          }
          else{
            g_month = 12;
            g_day = day - 9  
          }
          break
      case 10:
          if(day < 11){
            g_month = 12;
            g_day = Number(day) + 21            
          }
          else{
            g_month = 1;
            g_day = day - 10
          }
          break
      case 11:
          if(day < 12){
            g_month = 1;
            g_day = Number(day) + 20
          }
          else{
            g_month = 2;
            g_day = day - 11
          }
          break
      case 12:
          if(day < 10){
            g_month = 2;
            g_day = Number(day) + 19
          }
          else{
            g_month = 3;
            g_day = day - 9  
          }
          break
      default:
  }
  return new Date(g_year, g_month - 1, g_day)
  };

  getGregorianDateEx = (year, month, day) => {
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

  handleDayChange = (e) => {
    let day = Number(e.target.value)
    this.setState({day})
  }  
  handleMonthChange = () => e => {
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

    this.setState({month})
  }
  handleYearChange = (e) => {
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
    this.setState({year})
  }
  
  showMealsDay = (day, month, year, department, project) => {
    // console.log('+++department: ', this.state.department)
    let date = this.getGregorianDateEx(year, month, day)
    if(!this.state.projectCheck){
      this.props.getDepartmentMealsDayList(date, department)
      this.props.getDepartmentGuestMealDayList(date, department)
    }
    else{
      this.props.getProjectMealsDayList(date, project)
      this.props.getProjectGuestMealDayList(date, project)
    }

    this.setState({ 
      mealsDay: this.props.mealsDay,
      guestMealsDay: this.props.guestMealsDay 
    })
  }

  saveGuestMeals = (mealDay) => (e) => {

    e.preventDefault();
    const { department, project, description, mealsNo } = this.state
    const object_add = {department, project, description, mealsNo}
    this.props.saveGuestsMeals(object_add)

    let guestMealDayId = this.props.guestMealsDay && this.props.guestMealsDay.length > 0 ? Number(this.props.guestMealsDay[0]['id']) : 0
    // console.log('-------------------------------')
    // console.log('Junction__qty: ', mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__qty)
    // console.log('guestMealDayId: ', guestMealDayId)
    if(mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__qty === null){
      //add
      if(guestMealDayId === 0){
        // console.log('=========================');console.log('mood 1');
        const addGuestJunction = {
          department_id: department,
          project_id: project,
          id: mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__id !== null ? mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__id : 0,
          resturaunt_day_mea_id: mealDay.id,
          resturaunt_guest_day_meal_id: guestMealDayId,
          qty: e.target.value,
          mood: 1
        }

        const object_add = {department, project, description, mealsNo}
        this.props.saveGuestsMeals(object_add)

        let mealsDay = this.state.mealsDay
        mealsDay.map(md => md.id === mealDay.id ?
          mealDay.qty = e.target.value
          : '')

        const { year, month, day, department} = this.state
        let date = this.getGregorianDateEx(year, month, day)

        console.log('addGuestJunction', addGuestJunction)
        this.props.editGuestMealDayJunction(addGuestJunction)
        this.props.getGuestMealsDayList(date, department)

        this.setState({ 
          mealsDay,
          guestMealsDay: this.props.guestMealsDay,
         }) 
      }
      else{
        // console.log('=========================');console.log('mood 2');
        const addJunction = {
          department_id: 0,
          id: mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__id !== null ? mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__id : 0,
          resturaunt_day_mea_id: mealDay.id,
          resturaunt_guest_day_meal_id: guestMealDayId,
          qty: e.target.value,
          mood: 2
        }

        let mealsDay = this.state.mealsDay
        mealsDay.map(md => md.id === mealDay.id ?
          mealDay.qty = e.target.value
          : '')

        this.props.editGuestMealDayJunction(addJunction)
  
        this.setState({ mealsDay }) 
      }
    }
    else{
      // console.log('=========================');console.log('mood 3');
      const editJunction = {
        department_id: 0,
        id: mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__id !== null ? mealDay.ResturantDayMeal_ResturantGuestDayMealJunction__id : 0,
        resturaunt_day_mea_id: mealDay.id,
        resturaunt_guest_day_meal_id: guestMealDayId,
        qty: e.target.value,
        mood: 3
      }
 
      let mealsDay = this.state.mealsDay
      mealsDay.map(md => md.id === mealDay.id ?
        mealDay.qty = e.target.value
        : '')

      this.props.editGuestMealDayJunction(editJunction)

      this.setState({ mealsDay }) 
    }
  }

  handleDescriptionEdit = (e) => e =>  {
    // e.preventDefault()

    // if(guestMealsDayId > 0){
    //   let filteredguestMealDay = null

    //   let guestMealsDay = this.state.guestMealsDay
    //   guestMealsDay.map(guestMealDay => (guestMealDay.id === guestMealsDayId) ?
    //   (
    //     guestMealDay.description = e.target.value,
    //     filteredguestMealDay = guestMealDay
    //   ) : "")

    //   this.props.editGuestMealDay(filteredguestMealDay)

    //   this.setState({ guestMealsDay })
    // }
    if (this.state.mealsNo && this.state.mealsNo.length === 0){
      alert('ابتدا تعداد سفارشات را تعیین کنید.')
    }
    else{
      this.setState({
        description: String(e.target.value)
      })
    }
  }

  handleDepartmentEdit = (guestMealsDayId) => e =>  {
    e.preventDefault()

    // console.log('guestMealsDayId: ', guestMealsDayId)
    if(guestMealsDayId > 0){
      let filteredguestMealDay = null

      let guestMealsDay = this.state.guestMealsDay
      guestMealsDay.map(guestMealDay => (guestMealDay.id === guestMealsDayId) ?
      (
        guestMealDay.department = e.target.value,
        filteredguestMealDay = guestMealDay
      ) : "")

      this.props.editGuestMealDay(filteredguestMealDay)

      this.setState({ 
        department: Number(e.target.value), 
        guestMealsDay,
      })
    }
    else
      this.setState({ 
        department: Number(e.target.value), 
      })
  }

  handleProjectEdit = () => {

  }

  onChangeHandeling = (mealDay) => e => {
    let mealsDay = this.state.mealsDay
    mealsDay.filter(md => md.id === mealDay.id).map(md => 
      md.ResturauntDayMeal_ResturauntGuestDayMealJunction__qty = Number(e.target.value)
    )
    this.setState({mealsDay})
  }

  getMealNoValue = (mealName) => {
    let mealsNo = this.state.mealsNo;
    let mNo = 0;
    mealsNo.filter(mealNo => mealNo.mealName === mealName).map(mealNo => mNo = mealNo.mealNo);
    return mNo;
  }

   render() {     //console.log('props.projects: ', this.props.mealsDay)

    // console.log('=================================RENDER=================================')
    console.log('props.mealsDay: ', this.props.mealsDay)
    console.log('state.mealsDay: ', this.state.mealsDay)
    console.log('props.guestMealsDay: ', this.props.guestMealsDay)
    console.log('state.guestMealsDay: ', this.state.guestMealsDay)
    console.log('========================================================================')
    const {day, month, year, company, department, project, projectCheck, description} = this.state;
    return (
      <Card style={{direction:'rtl'}}>
        <Container>
          <Card style={{textAlign:'center'}}>
            <Row>
              <Col xl="4"></Col>
              <Col xl="1">
                <select className='combobox' value={day}
                onChange={(e) => this.handleDayChange(e)}>
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
                <select className='combobox' value={month}
                onChange={this.handleMonthChange()}>
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
                <select className='combobox' value={year}
                onChange={(e) => this.handleYearChange(e)}>
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
              <Col xl="3"></Col>
              <Col xl="2">
                <select value={company} className='combobox-long' onChange={(e) => this.setState({ company: Number(e.target.value)} )}>
                  {this.props.companys ? this.props.companys.map((company) => 
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ) : ''}
                </select>
              </Col>
              <Col xl="2">
                <select value={department} className='combobox-long' disabled={projectCheck}
                  // onChange={this.handleDepartmentEdit(this.state.guestMealsDay && this.state.guestMealsDay.length > 0 ? Number(this.state.guestMealsDay[0]['id']) : 0)}
                  onChange={(e) => this.setState({ department: Number(e.target.value)} )}>
                  {this.props.departments ? this.props.departments.filter(department => department.company === company).map((department) => 
                    <option key={department.id} value={department.id}>{department.name}</option>
                  ) : ''}
                </select>
              </Col>
              <Col xl="2">
                <label>
                  <input 
                    type="checkbox"
                    name="project_check"
                    checked={projectCheck}
                    onChange={() => this.setState({projectCheck: !this.state.projectCheck})}
                  />
                  <span>   </span>
                </label>
                <select value={project ? project : ""} className='combobox-long' disabled={!projectCheck}
                  onChange={(e) => this.setState({project: Number(e.target.value)} )}>
                  {this.props.projects ? this.props.projects.filter(project => project.company === company).map((project) => 
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ) : ''}
                </select>
              </Col>              
              <Col xl="2"></Col>
            </Row>
            <Row>
              <Col xl="12" style={{testAlign:'center'}}>
                <Button color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} onClick={() => this.showMealsDay(day, month, year, department, project)} >جستجو</Button>
              </Col>
            </Row>
          </Card>
          <Card>
          {this.state.mealsDay && this.state.mealsDay.length > 0 ? 
            (
              this.state.mealsDay.filter(mealDay => mealDay.resturaunt_meal__name !== 'عدم انتخاب' && 
                                         mealDay.resturaunt_meal__name !== 'عدم حضور').map((mealDay, index) =>
              <Row key={index}>
                <Col xl="8">
                  {/* {console.log('*** mealDay.resturaunt_meal__name: ', mealDay.resturaunt_meal__name)} */}
                  <Label>{mealDay.resturaunt_meal__name}</Label>
                </Col>
                <Col style={{textAlign:'right'}} xl="4">    
                  <span>
                  <label> 
                  <input 
                      // color="primary" 
                      style={{width: '30px'}}
                      type="text"
                      onChange={this.onChangeHandeling(mealDay)}
                      //this.setState({mealsNo: [...this.state.mealsNo, {resturaunt_day_meal_id:mealDay.id, qty:e.target.value}]})
                      value={mealDay.ResturauntDayMeal_ResturauntGuestDayMealJunction__qty ? mealDay.ResturauntDayMeal_ResturauntGuestDayMealJunction__qty : ''}
                      //{this.getMealNoValue(mealDay.id)}
                      
                      // placeholderIsMinWidth    resturaunt_meal__name
                  /> تعداد 
                  </label>  
                  </span>                                                          
                </Col>
              </Row>)
            )
          : ''}
          {this.state.mealsDay && this.state.mealsDay.length > 0 ?
            <Row>
              <Col x="12">
                <textarea 
                    style={{width:'50%', height:'100px', textAlign:'right', fontSize:'1em', backgroundColor: "whitesmoke"}}  
                    value={description} 
                    //this.state.guestMealsDay && this.state.guestMealsDay.length > 0 ? this.state.guestMealsDay[0]['description'] : ''
                    onChange={this.handleDescriptionEdit()}
                    //this.state.guestMealsDay && this.state.guestMealsDay.length > 0 ? Number(this.state.guestMealsDay[0]['id']) : 0
                    >
                </textarea>
              </Col>
            </Row>
          : ''}
          </Card>
          <Card>
          {this.state.mealsDay && this.state.mealsDay.length > 0 ?
            <Row>
              <Col xl="12" style={{testAlign:'center'}}>
                <Button color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} onClick={() => this.saveGuestMeals()} >تائید</Button>
              </Col>
          </Row>            
          : ''}            
          </Card>
        </Container>      
      </Card>
    )
  }
};

const mapStateToProps = store => {
  return {
    companys: store.companies.companies,
    departments: store.departments.departments,
    projects: store.projects.projects,
    mealsDay: store.mealsDays.MealsDay,
    guestMealsDay: store.guestMealsDays.guestMealsDay,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDepartmentMealsDayList: (date, departmentId) => {
      dispatch(GetDepartmentMealsDayList(date, departmentId))}, 
    getProjectMealsDayList: (date, projectId) => {
      dispatch(GetProjectMealsDayList(date, projectId))},       
       
    getGuestMealsDayList: (date, departmentId) => {
      dispatch(GetGuestMealsDayList(date, departmentId))}, 

    getDepartmentGuestMealDayList: (date, departmentId) => {
      dispatch(GetDepartmentGuestMealDayList(date, departmentId))},  
    getProjectGuestMealDayList: (date, projectId) => {
      dispatch(GetProjectGuestMealDayList(date, projectId))},     

    editGuestMealDayJunction: (model) => {
      dispatch(EditGuestMealDayJunction(model))}, 
      
    editGuestMealDay: (model) => {
      dispatch(EditGuestMealDay(model))},

    saveGuestsMeals: (object) => {
      dispatch(SaveGuestsMealsDay(object))},
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GuestMealDayList);
