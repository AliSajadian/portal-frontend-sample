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

 

class SavedPrsonelMealDayList extends Component {
  constructor(props){
    super(props)

    this.state = {
      // isSaved: false,
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
    let selectedMealDays = []

    // console.log("this.props.personelMealDay: ", this.props.personelMealDay);

    if(!this.state.isSaved && this.state.flag && this.props.currentMonthDates && this.props.currentMonthDates.length > 0 && 
      this.props.mealsDays && this.props.mealsDays.length > 0 &&
      this.state.selectedMealDays && this.state.selectedMealDays.length <= this.props.currentMonthDates.length){
      this.props.currentMonthDates.map(cmd => (
        (this.props.mealsDays.filter(md => (md.date === cmd.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
        //   (String(cmd.date.getFullYear()) + '-' + 
        // (String(cmd.date.getUTCMonth()+1).length < 2 ? ('0' + String(cmd.date.getUTCMonth()+1)) : 
        // String(cmd.date.getUTCMonth()+1)) + '-' + (String(cmd.date.getUTCDate()+1).length < 2 ? 
        // ('0' + String(cmd.date.getUTCDate()+1)) : String(cmd.date.getUTCDate()+1)))
        )) ? (

          this.props.mealsDays.filter(md => (md.date === cmd.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
          // (String(cmd.date.getFullYear()) + '-' + 
          // (String(cmd.date.getUTCMonth()+1).length < 2 ? ('0' + String(cmd.date.getUTCMonth()+1)) : 
          // String(cmd.date.getUTCMonth()+1)) + '-' + (String(cmd.date.getUTCDate()+1).length < 2 ? 
          // ('0' + String(cmd.date.getUTCDate()+1)) : String(cmd.date.getUTCDate()+1)))
          )).map((md, index) => (index === 0) ? (
            selectedMealDays.push({
              employee: sessionStorage.getItem('employeeid'),
              resturant_day_meal: md.id,
              resturant_meal: md.resturant_meal,
              date: md.date
            })
            
            // ,((this.props.personelMealDay && this.props.personelMealDay.length > 0 && 
            //   this.props.personelMealDay.filter(pmd => pmd.resturant_day_meal === md.id) &&
            //   this.props.personelMealDay.filter(pmd => pmd.resturant_day_meal === md.id).length > 0) ? (
            //     this.setState({
            //       isSaved: true
            //     })
            //  ) : "")
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

  getPersianMonth = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate()+1;
    switch(month){
        case 1:
            if(day < 20){
                return 'دی' + (day + 11);
            }
            else{
                return 'بهمن' + (day - 19);
            }
        case 2:
            if(day < 19){
                return 'بهمن' + (day + 12);
            }
            else{
                return 'اسفند' + (day - 18);
            }
        case 3:
            if(day < 20){
                return 'اسفند' + (day + 10);
            }
            else{
                return 'فروردین' + (day - 19);
            }
        case 4:
            if(day < 20){
                return 'فروردین' + (day + 12);
            }
            else{
                return 'اردیبهشت' + (day - 19);
            }
        case 5:
            if(day < 21){
                return 'اردیبهشت' + (day + 11);
            }
            else{
                return 'خرداد' + (day - 20);
            }
        case 6:
            if(day < 21){
                return 'خرداد' + (day + 11);
            }
            else{
                return 'تیر' + (day - 20);
            }
        case 7:
            if(day < 22){
                return 'تیر' + (day + 10);
            }
            else{
                return 'مرداد' + (day - 21);
            }
        case 8:
            if(day < 22){
                return 'مرداد' + (day + 10);
            }
            else{
                return 'شهریور' + (day - 21);
            }
        case 9:
            if(day < 22){
                return 'شهریور' + (day + 10);
            }
            else{
                return 'مهر' + (day - 21);
            }
        case 10:
            if(day < 22){
                return 'مهر' + (day + 9);
            }
            else{
                return 'آبان' + (day - 21);
            }
        case 11:
            if(day < 21){
                return 'آبان' + (day + 10);
            }
            else{
                return 'آذر' + (day - 20);
            }
        case 12:
            if(day < 21){
                return 'آذر' + (day + 10);
            }
            else{
                return 'دی' + (day - 20);
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
      console.log('BEFORE ***this.state.selectedMealDays: ', this.state.selectedMealDays);
      let selectedMealDays = this.state.selectedMealDays
      .filter(smd => !(String(smd.date) === String(date)))
      .concat(selectedMealDay)

      this.setState({
        selectedMealDays
      })
      console.log('AFTER ***this.state.selectedMealDays: ', this.state.selectedMealDays)
    }
  }

  getSeletedMeal = (date) => {
    let mealID;
    console.log("***Select Value Changed***");
    this.props.mealsDays.filter(md => md.date === date).filter(md => 
      this.props.personelMealDay.map(pmd => (pmd.resturant_day_meal === md.id) ? (
        mealID = md.resturant_meal,
        console.log("personelMealDay.resturant_day_meal: ", md.id, " , mealID: ", md.resturant_meal)
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
      console.log('personelMealDays: ', personelMealDays)
      personelMealDays.map(pmd => 
        this.props.addPersonelMealDay(pmd)
      );

      window.alert("اطلاعات با موفقیت ذخیره شد.");
    }
  }
   // question.answers.map(function(answer) {
    //   newAnswer.answer = answer.answer
    //   newQuestion.answers.push(newAnswer)
    //   return 0
    // })

  render() {
                // console.log('RENDER ***this.state.isSaved: ', this.state.isSaved)
    return (
      <Card color="dark" >
        <CardHeader color="primary">
            <CardTitle tag="h5" className="mb-0">
                Personel Day Meal
            </CardTitle>
        </CardHeader>
        <CardBody>
          {this.props.currentMonthDates && this.props.currentMonthDates.length > 0 ? this.props.currentMonthDates.map((currentMonthDate, index) => (
            <Card key={index}>
              <Container>
                <Row>
                  <Col>
                    <span  >
                      <label >
                        { (index + 1) + ' - ' }
                        {this.getPersianMonth(currentMonthDate.date)}
                      </label>
                    </span><br/>                
                  </Col>
                  <Col>
                  {/* {console.log('select ***this.state.isSaved: ', this.state.isSaved)} */}
                    <select  
                      // value={() => this.getSeletedMeal((String(currentMonthDate.date.getFullYear()) + '-' + 
                      //   (String(currentMonthDate.date.getUTCMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getUTCMonth()+1)) : 
                      //   String(currentMonthDate.date.getUTCMonth()+1)) + '-' + (String(currentMonthDate.date.getUTCDate()+1).length < 2 ? 
                      //   ('0' + String(currentMonthDate.date.getUTCDate()+1)) : String(currentMonthDate.date.getUTCDate()+1))))}

                      //   disabled={!this.state.isSaved}

                        onChange={this.onChanged(currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                        //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                        // (String(currentMonthDate.date.getUTCMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getUTCMonth()+1)) : 
                        // String(currentMonthDate.date.getUTCMonth()+1)) + '-' + (String(currentMonthDate.date.getUTCDate()+1).length < 2 ? 
                        // ('0' + String(currentMonthDate.date.getUTCDate()+1)) : String(currentMonthDate.date.getUTCDate()+1)))
                        )
                        // onChange={(e) => {this.setState({ mealID: e.target.value })
                        }>
                            {this.props.mealsDays && this.props.mealsDays.length > 0 && 
                              this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                              //   (String(currentMonthDate.date.getFullYear()) + '-' + 
                              // (String(currentMonthDate.date.getUTCMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getUTCMonth()+1)) : 
                              // String(currentMonthDate.date.getUTCMonth()+1)) + '-' + (String(currentMonthDate.date.getUTCDate()+1).length < 2 ? 
                              // ('0' + String(currentMonthDate.date.getUTCDate()+1)) : String(currentMonthDate.date.getUTCDate()+1)))
                              )) ?

                            this.props.mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                              // (String(currentMonthDate.date.getFullYear()) + '-' + 
                              // (String(currentMonthDate.date.getUTCMonth()+1).length < 2 ? ('0' + String(currentMonthDate.date.getUTCMonth()+1)) : 
                              // String(currentMonthDate.date.getUTCMonth()+1)) + '-' + (String(currentMonthDate.date.getUTCDate()+1).length < 2 ? 
                              // ('0' + String(currentMonthDate.date.getUTCDate()+1)) : String(currentMonthDate.date.getUTCDate()+1)))
                              )).map((md, index) => (
                              <option key={md.resturant_meal} value={md.resturant_meal}>
                                {this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)) &&
                                this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal)).length === 1 ?
                                this.props.meals.filter(meal => Number(meal.id) === Number(md.resturant_meal))[0].name.substring(0, 100) : ""}</option>  
                              )) : ""}                 
                    </select>
                  </Col> 
                </Row>
              </Container>
            </Card>
          )) : ""}
          <Card>
            <Container>
              <Row>
                {/* {console.log('Button ***this.state.isSaved: ', this.state.isSaved)} disabled={!this.state.isSaved}*/}
                <Button onClick={() => this.save()} >ذخیره</Button>
              </Row>
            </Container>                        
          </Card>
        </CardBody>
      </Card>
    )
  }
};

const mapStateToProps = store => {
  return {
    meals: store.meals.meals,
    mealsDays: store.mealsDays.mealsDays,
    personelMealDay: store.personelMealDay.personelMealDay,
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedPrsonelMealDayList);
