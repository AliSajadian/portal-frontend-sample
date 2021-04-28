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
} from "reactstrap";
import { connect } from "react-redux";
import {
  EditPersonelMealDay,
  AddPersonelMealDay
} from "../../../../redux/actions/personelMealDayActions";
import '../restaurant.css'



class PrsonelMealDayList extends Component {
  constructor(props){
    super(props)

    this.state = {
      isSaved: false,
      flag: true,
      selectedMealDays: [{
        employee: 0,
        resturant_day_meal: 0,
        resturant_meal: 0,
        date: ''
      }],
    };
  }

  componentDidUpdate() {
    let selectedMealDays = [];

    if(!this.state.isSaved && this.props.personelMealDay && this.props.personelMealDay.length > 0)
    {
      // && 
      // this.props.personelMealDay.filter(pmd => Number(pmd.resturant_day_meal.id) === Number(md.id)) &&
      // this.props.personelMealDay.filter(pmd => Number(pmd.resturant_day_meal.id) === Number(md.id)).length > 0

      this.setState({
        isSaved: true
      })
    }
    else if(!this.state.isSaved && this.state.flag && this.props.currentMonthDates && this.props.currentMonthDates.length > 0 && 
      this.props.mealsDays && this.props.mealsDays.length > 0 &&
      this.state.selectedMealDays && this.state.selectedMealDays.length <= this.props.currentMonthDates.length){
      this.props.currentMonthDates.map(cmd => (
        (this.props.mealsDays.filter(md => (md.date === cmd.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
        //   (String(cmd.date.getFullYear()) + '-' + 
        // (String(cmd.date.getMonth()+1).length < 2 ? ('0' + String(cmd.date.getMonth()+1)) : 
        // String(cmd.date.getMonth()+1)) + '-' + (String(cmd.date.getDate()).length < 2 ? 
        // ('0' + String(cmd.date.getDate())) : String(cmd.date.getDate())))
        )) ? (
          this.props.mealsDays.filter(md => (md.date === cmd.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
          //   (String(cmd.date.getFullYear()) + '-' + 
          // (String(cmd.date.getMonth()+1).length < 2 ? ('0' + String(cmd.date.getMonth()+1)) : 
          // String(cmd.date.getMonth()+1)) + '-' + (String(cmd.date.getDate()).length < 2 ? 
          // ('0' + String(cmd.date.getDate())) : String(cmd.date.getDate())))
          )).map((md, index) => (index === 0) ? (
            selectedMealDays.push({
              employee: sessionStorage.getItem('employeeid'),
              resturant_day_meal: md.id,
              resturant_meal: md.resturant_meal,
              date: md.date
            })
            // ,console.log("this.props.mealsDays.filter: ", md)
          ) : "")
        ) : "")
      ));
      // if(!this.state.isSaved){
        this.setState({
          selectedMealDays: selectedMealDays,
          flag: false
        })        
      }
    // }
    // console.log('DIDUPDATE ***this.state.isSaved: ', this.state.isSaved)
  }


  getPersianMonthWeekNo = date => {
    const day = this.getPersianDay(date)
    const weekDay = date.getDay()
    
    switch(weekDay)
    {
      case 0:
        if(day < 3)
          return 1
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
      case 1:
        if(day < 4)
          return 1
        else if(day >= 4 && day < 11)
          return 2
        else if(day >= 11 && day < 18)
          return 3
        else if(day >= 18 && day < 25)
          return 4
        else 
          return 5
      case 2:
        if(day < 5)
          return 1
        else if(day >= 5 && day < 12)
          return 2
        else if(day >= 12 && day < 19)
          return 3
        else if(day >= 19 && day < 26)
          return 4
        else 
          return 5
      case 3:
        if(day < 6)
          return 1
        else if(day >= 6 && day < 13)
          return 2
        else if(day >= 13 && day < 20)
          return 3
        else if(day >= 20 && day < 27)
          return 4
        else 
          return 5
      case 4:
        if(day < 7)
          return 1
        else if(day >= 7 && day < 14)
          return 2
        else if(day >= 14 && day < 21)
          return 3
        else if(day >= 21 && day < 28)
          return 4
        else 
          return 5
      case 5:
        if(day < 8)
          return 1
        else if(day >= 8 && day < 15)
          return 2
        else if(day >= 15 && day < 22)
          return 3
        else if(day >= 22 && day < 29)
          return 4
        else 
          return 5
      case 6:
        if(day < 2)
          return 1
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

  getPersianWeekDay = date => {
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

  getPersianDay = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    switch(month){
        case 1:
            if(day < 20){
                return (day + 11);
            }
            else{
                return  (day - 19);
            }
        case 2:
            if(day < 19){
                return (day + 12);
            }
            else{
                return (day - 18);
            }
        case 3:
            if(day < 20){
                return (day + 10);
            }
            else{
                return (day - 19);
            }
        case 4:
            if(day < 20){
                return (day + 12);
            }
            else{
                return (day - 19);
            }
        case 5:
            if(day < 21){
                return (day + 11);
            }
            else{
                return (day - 20);
            }
        case 6:
            if(day < 21){
                return (day + 11);
            }
            else{
                return (day - 20);
            }
        case 7:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 8:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 9:
            if(day < 22){
                return (day + 10);
            }
            else{
                return (day - 21);
            }
        case 10:
            if(day < 22){
                return (day + 9);
            }
            else{
                return (day - 21);
            }
        case 11:
            if(day < 21){
                return (day + 10);
            }
            else{
                return (day - 20);
            }
        case 12:
            if(day < 21){
                return (day + 10);
            }
            else{
                return (day - 20);
            }
        default:
    }
  };

  getPersianMonth = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    const weekDay = this.getPersianWeekDay(date)
    switch(month){
        case 1:
            if(day < 20){
                return weekDay + ' ' + (day + 11) + ' دی ';
            }
            else{
                return  weekDay + ' ' + (day - 19) + ' بهمن ';
            }
        case 2:
            if(day < 19){
                return weekDay + ' ' + (day + 12) + ' بهمن ';
            }
            else{
                return weekDay + ' ' + (day - 18) + ' اسفند ';
            }
        case 3:
            if(day < 20){
                return weekDay + ' ' + (day + 10) + ' اسفند ';
            }
            else{
                return weekDay + ' ' + (day - 19) + ' فروردین ';
            }
        case 4:
            if(day < 20){
                return weekDay + ' ' + (day + 12) + ' فروردین ';
            }
            else{
                return weekDay + ' ' + (day - 19) + ' اردیبهشت ';
            }
        case 5:
            if(day < 21){
                return weekDay + ' ' + (day + 11) + ' اردیبهشت ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' خرداد ';
            }
        case 6:
            if(day < 21){
                return weekDay + ' ' + (day + 11) + ' خرداد ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' تیر ';
            }
        case 7:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + ' تیر ';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' مرداد ';
            }
        case 8:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + ' مرداد ';
            }
            else{
                return weekDay + ' ' + (day - 21) + 'شهریور';
            }
        case 9:
            if(day < 22){
                return weekDay + ' ' + (day + 10) + 'شهریور';
            }
            else{
                return weekDay + ' ' + (day - 21) + ' مهر ';
            }
        case 10:
            if(day < 22){
                return weekDay + ' ' + (day + 9) + ' مهر ';
            }
            else{
                return weekDay + ' ' + (day - 21) + 'آبان';
            }
        case 11:
            if(day < 21){
                return weekDay + ' ' + (day + 10) + ' آبان ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' آذر ';
            }
        case 12:
            if(day < 21){
                return weekDay + ' ' + (day + 10) + ' آذر ';
            }
            else{
                return weekDay + ' ' + (day - 20) + ' دی ';
            }
        default:
    }
  };

  onChanged = (date) => e => {
    console.log('mealID: ', e.target.value, '   date: ', date)
    if(this.props.mealsDays.filter(md => Number(md.resturant_meal) === Number(e.target.value) && String(md.date) === String(date)) &&
      this.props.mealsDays.filter(md => Number(md.resturant_meal) === Number(e.target.value) && String(md.date) === String(date)).length > 0){
      const resturant_day_meal = this.props.mealsDays.filter(md => Number(md.resturant_meal) === Number(e.target.value) && String(md.date) === String(date))[0].id

      let selectedMealDay = {
        employee: sessionStorage.getItem('employeeid'),
        resturant_day_meal: resturant_day_meal,
        resturant_meal: Number(e.target.value),
        date: date
      };
      // console.log('BEFORE ***this.state.selectedMealDays: ', this.state.selectedMealDays);
      let selectedMealDays = this.state.selectedMealDays
      .filter(smd => !(String(smd.date) === String(date)))
      .concat(selectedMealDay)

      this.setState({
        selectedMealDays
      })
      // console.log('AFTER ***this.state.selectedMealDays: ', this.state.selectedMealDays)
    }
  }

  getSeletedMeal = (date) => {
    let mealID;
    this.props.mealsDays.filter(md => md.date === date).filter(md => 
      this.props.personelMealDay.map(pmd => (pmd.resturant_day_meal.id === md.id) ? (
        mealID = md.resturant_meal
        ) : ""))

    //  console.log('$mealID:$ ', mealID)
    return mealID;
  }

  save = () => {
    if (window.confirm("بعد از ذخیره، اطلاعات قابل تغییر نمیباشد. آیا از ذخیره اطلاعات اطمینان دارید؟")) {
      let personelMealDays = []

      this.state.selectedMealDays.map(smd =>
        personelMealDays.push({
          employee: smd.employee,
          resturant_day_meal: smd.resturant_day_meal
        })
      );
      // console.log('personelMealDays: ', personelMealDays)
      personelMealDays.map(pmd => 
        this.props.addPersonelMealDay(pmd)
      );

      this.setState({
        isSaved: true
      })
      window.alert("اطلاعات با موفقیت ذخیره شد.");
      // Response.redirect("~/src/pages/resturant/savedPersonelMealDay/index.js")
    }
  }

  render() {
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader>
            <CardTitle tag="h5">
               انتخاب ماهیانه غذا  
            </CardTitle>
        </CardHeader>
        <CardBody>
        <Container>
          <Card className="card-res-week">
          {this.props.currentMonthDates && this.props.currentMonthDates.length > 0 ? 
          this.props.currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 1))
                                      .map((currentMonthDate, index) => (
            <Card key={index} className="card-inner-color"> 
              <Container>
                <Row>
                  <Col xl="4" className="col">
                    <span  >
                      <label >
                        {/* { (index + 1) + ' - ' } */}
                        {this.getPersianMonth(currentMonthDate.date)}
                      </label>
                    </span><br/>                
                  </Col>
                  <Col xl="8">
                  {!this.state.isSaved ? (
                    <select className="select-enable-style" 
                      onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                      //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                      // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                      // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                      // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                      )
                      }>
                          {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                            this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )) ?

                          this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            // (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )).map((md, index) => (
                            <option key={md.resturant_meal} value={md.resturant_meal}>
                              {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                            )) : ""}                 
                  </select>)
                : (
                  this.props.personelMealDay && this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                    currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )) &&
                  this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )).length === 1 ? 

                  this.props.personelMealDay.map((pmd, index) =>  pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  // (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                   ?
                <select  key={index} className="select-disable-style"
                value={pmd.resturant_day_meal.resturant_meal}


                  onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )
                  } disabled>
                      {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                        this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )) ?

                      this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        // (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )).map((md, index) => (
                        <option key={md.resturant_meal} value={md.resturant_meal}>
                          {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                        )) : ""}                 
              </select>
              : "") : "")
            }
                  </Col> 
                </Row>
              </Container>
            </Card>
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {this.props.currentMonthDates && this.props.currentMonthDates.length > 0 ? 
          this.props.currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 2))
                                      .map((currentMonthDate, index) => (
            <Card key={index} className="card-inner-color"> 
              <Container>
                <Row>
                  <Col xl="4" className="col">
                    <span  >
                      <label >
                        {/* { (index + 1) + ' - ' } */}
                        {this.getPersianMonth(currentMonthDate.date)}
                      </label>
                    </span><br/>                
                  </Col>
                  <Col xl="8">
                  {!this.state.isSaved ? (
                    <select className="select-enable-style" 
                      onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                      //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                      // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                      // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                      // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                      )
                      }>
                          {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                            this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )) ?

                          this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            // (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )).map((md, index) => (
                            <option key={md.resturant_meal} value={md.resturant_meal}>
                              {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                            )) : ""}                 
                  </select>)
                : (
                  this.props.personelMealDay && this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )) &&
                  this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )).length === 1 ? 

                  this.props.personelMealDay.map((pmd, index) =>  pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  // (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                   ?
                <select  key={index} className="select-disable-style"
                value={pmd.resturant_day_meal.resturant_meal}


                  onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )
                  } disabled>
                      {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                        this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )) ?

                      this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        // (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )).map((md, index) => (
                        <option key={md.resturant_meal} value={md.resturant_meal}>
                          {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                        )) : ""}                 
              </select>
              : "") : "")
            }
                  </Col> 
                </Row>
              </Container>
            </Card>
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {this.props.currentMonthDates && this.props.currentMonthDates.length > 0 ? 
          this.props.currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 3))
                                      .map((currentMonthDate, index) => (
            <Card key={index} className="card-inner-color"> 
              <Container>
                <Row>
                  <Col xl="4" className="col">
                    <span  >
                      <label >
                        {/* { (index + 1) + ' - ' } */}
                        {this.getPersianMonth(currentMonthDate.date)}
                      </label>
                    </span><br/>                
                  </Col>
                  <Col xl="8">
                  {!this.state.isSaved ? (
                    <select className="select-enable-style" 
                      onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                      //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                      // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                      // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                      // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                      )
                      }>
                          {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                            this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )) ?

                          this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            // (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )).map((md, index) => (
                            <option key={md.resturant_meal} value={md.resturant_meal}>
                              {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                            )) : ""}                 
                  </select>)
                : (
                  this.props.personelMealDay && this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )) &&
                  this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                    currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )).length === 1 ? 

                  this.props.personelMealDay.map((pmd, index) =>  pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  // (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                   ?
                <select  key={index} className="select-disable-style"
                value={pmd.resturant_day_meal.resturant_meal}


                  onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )
                  } disabled>
                      {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                        this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )) ?

                      this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        // (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )).map((md, index) => (
                        <option key={md.resturant_meal} value={md.resturant_meal}>
                          {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                        )) : ""}                 
              </select>
              : "") : "")
            }
                  </Col> 
                </Row>
              </Container>
            </Card>
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {this.props.currentMonthDates && this.props.currentMonthDates.length > 0 ? 
          this.props.currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 4))
                                      .map((currentMonthDate, index) => (
            <Card key={index} className="card-inner-color"> 
              <Container>
                <Row>
                  <Col xl="4" className="col">
                    <span  >
                      <label >
                        {/* { (index + 1) + ' - ' } */}
                        {this.getPersianMonth(currentMonthDate.date)}
                      </label>
                    </span><br/>                
                  </Col>
                  <Col xl="8">
                  {!this.state.isSaved ? (
                    <select className="select-enable-style" 
                      onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                      //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                      // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                      // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                      // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                      )
                      }>
                          {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                            this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )) ?

                          this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            // (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )).map((md, index) => (
                            <option key={md.resturant_meal} value={md.resturant_meal}>
                              {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                            )) : ""}                 
                  </select>)
                : (
                  this.props.personelMealDay && this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )) &&
                  this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                          currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )).length === 1 ? 

                  this.props.personelMealDay.map((pmd, index) =>  pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  // (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                   ?
                <select  key={index} className="select-disable-style"
                value={pmd.resturant_day_meal.resturant_meal}


                  onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )
                  } disabled>
                      {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                        this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )) ?

                      this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        // (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )).map((md, index) => (
                        <option key={md.resturant_meal} value={md.resturant_meal}>
                          {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                        )) : ""}                 
              </select>
              : "") : "")
            }
                  </Col> 
                </Row>
              </Container>
            </Card>
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {this.props.currentMonthDates && this.props.currentMonthDates.length > 0 ? 
          this.props.currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 5))
                                      .map((currentMonthDate, index) => (
            <Card key={index} className="card-inner-color"> 
              <Container>
                <Row>
                  <Col xl="4" className="col">
                    <span  >
                      <label >
                        {/* { (index + 1) + ' - ' } */}
                        {this.getPersianMonth(currentMonthDate.date)}
                      </label>
                    </span><br/>                
                  </Col>
                  <Col xl="8">
                  {!this.state.isSaved ? (
                    <select className="select-enable-style" 
                      onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                      //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                      // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                      // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                      // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                      )
                      }>
                          {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                            this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )) ?

                          this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            // (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )).map((md, index) => (
                            <option key={md.resturant_meal} value={md.resturant_meal}>
                              {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                            )) : ""}                 
                  </select>)
                : (
                  this.props.personelMealDay && this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                    currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )) &&
                  this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                    currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )).length === 1 ? 

                  this.props.personelMealDay.map((pmd, index) =>  pmd.resturant_day_meal.date === 
                          currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  // (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                   ?
                <select  key={index} className="select-disable-style"
                value={pmd.resturant_day_meal.resturant_meal}


                  onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )
                  } disabled>
                      {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                        this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )) ?

                      this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        // (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )).map((md, index) => (
                        <option key={md.resturant_meal} value={md.resturant_meal}>
                          {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                        )) : ""}                 
              </select>
              : "") : "")
            }
                  </Col> 
                </Row>
              </Container>
            </Card>
          )) : ""}
          </Card>
          <Card className="card-res-week">
          {this.props.currentMonthDates && this.props.currentMonthDates.length > 0 ? 
          this.props.currentMonthDates.filter(currentMonthDate => (Number(this.getPersianMonthWeekNo(currentMonthDate.date)) === 6))
                                      .map((currentMonthDate, index) => (
            <Card key={index} className="card-inner-color"> 
              <Container>
                <Row>
                  <Col xl="4" className="col">
                    <span  >
                      <label >
                        {/* { (index + 1) + ' - ' } */}
                        {this.getPersianMonth(currentMonthDate.date)}
                      </label>
                    </span><br/>                
                  </Col>
                  <Col xl="8">
                  {!this.state.isSaved ? (
                    <select className="select-enable-style" 
                      onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                      //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                      // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                      // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                      // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                      )
                      }>
                          {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                            this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )) ?

                          this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                            // (String(currentMonthDate.date.getFullYear()) + '-' + 
                            // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                            // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                            // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                            )).map((md, index) => (
                            <option key={md.resturant_meal} value={md.resturant_meal}>
                              {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                              this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                            )) : ""}                 
                  </select>)
                : (
                  this.props.personelMealDay && this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )) &&
                  this.props.personelMealDay.filter(pmd => ( pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )).length === 1 ? 

                  this.props.personelMealDay.map((pmd, index) =>  pmd.resturant_day_meal.date === 
                        currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  // (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                   ?
                <select  key={index} className="select-disable-style"
                value={pmd.resturant_day_meal.resturant_meal}


                  onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                  //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                  // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                  // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                  // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                  )
                  } disabled>
                      {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                        this.props.mealsDays.filter(md => (md.date === 
                              currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )) ?

                      this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        // (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getMonth()+1)) : 
                        // String(currentMonthDate.date.getMonth()+1)) + '-' + (String(currentMonthDate.date.getDate()).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getDate())) : String(currentMonthDate.date.getDate())))
                        )).map((md, index) => (
                        <option key={md.resturant_meal} value={md.resturant_meal}>
                          {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                          this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                        )) : ""}                 
              </select>
              : "") : "")
            }
                  </Col> 
                </Row>
              </Container>
            </Card>
          )) : ""}
          </Card>
          <Card className="card-res-bottom">
              <Row>
                <Col style={{textAlign:'center', width:'150px'}}>
                  {!this.state.isSaved ?
                    <Button color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} onClick={() => this.save()} >ذخیره</Button>
                   :
                    <Button color="primary" style={{margin:"1em auto 1em auto", width:'100px'}} onClick={() => this.save()} disabled >ذخیره</Button>
                  }
                </Col>
              </Row>
          </Card>
          </Container>
        </CardBody>
      </Card>
    )
  }
};

const mapStateToProps = store => {
  return {
    meals: store.meals.meals,
    mealsDays: store.mealsDays.mealsDays,
    personelMealDay: store.personelMealDays.personelMealDays,
    currentMonthDates: store.currentMonthDates.currentMonthDates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPersonelMealDay: (model) => {
      dispatch(EditPersonelMealDay(model))}, 
    addPersonelMealDay: (model) => {
      dispatch(AddPersonelMealDay(model))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrsonelMealDayList);
