import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  Button,
  Label,
  Input,
} from "reactstrap";
import {
  EditPersonelMealDay,
  // AddPersonelMealDay
} from "../../../../../redux/actions/personelMealDayActions";
import '../../restaurant.css'
import '../serveMeal.css'
 

class ServedMeals extends Component {
  constructor(props){
    super(props)

    this.state = {
      employee_code: 0,
    };
  }

  setServeMeal = () => {
    const filteredEmployees = this.props.employeeCodes.filter(emp => Number(emp.employee_code) === Number(this.state.employee_code))
    if(filteredEmployees.length === 1){
      const employee = filteredEmployees[0].id
      const filteredPersonelMealsDay = this.props.personelMealDays.filter(pmd => Number(pmd.employee) === Number(employee))
      if(filteredPersonelMealsDay === 1){
        const resturant_day_meal = filteredPersonelMealsDay[0].resturant_day_meal
        const personelMealDay = {employee: employee, resturant_day_meal: resturant_day_meal, served: true}
        this.props.editPersonelMealDay(personelMealDay)

        this.setState({
          employee_code: 0,
        })
      }
    }
  }

  onPrint = (divName) => {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    alert(printContents)
    window.print();

    document.body.innerHTML = originalContents;    
  }

  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
           آمار غذاها
          </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
          <Container>
          {this.props.servedMeals && this.props.servedMeals.map((servedMeal, index) => 
            <Card key={index} className='card-served-meals'>
              <CardHeader>
                <CardTitle>
                  <h5>{servedMeal.resturant_meal}</h5>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <Row className='row-ex'>
                    <Col xs="2" className='col-ex'>
                      {servedMeal.selectedNo}
                    </Col>
                    <Col xs="10" className='col-ex'>
                      <label>تعداد انتخاب شده</label>
                    </Col>
                  </Row >
                  <Row className='row-ex'>
                    <Col xs="2" className='col-ex'>
                      {servedMeal.totalNo}
                    </Col>
                    <Col xs="10" className='col-ex'>
                      <label>تعداد کل</label>
                    </Col>
                  </Row>
                  <Row className='row-ex'>
                    <Col xs="2" className='col-ex'>
                      {servedMeal.servedNo}
                    </Col>
                    <Col xs="10" className='col-ex'>
                      <label>تعداد سرو شده</label>
                    </Col>
                    </Row>                                    
                </Table>
              </CardBody>
            </Card>
          )}
          </Container>
        </CardBody>
        <CardFooter>
            <Row>
              <Col>
                <Label>کد پرسنلی
                  <Input type='text'/>
                </Label>
              </Col>
              <Col>
                <div id="printableArea" className="printableArea">
                  <span >{'1399/11/28 12:23 pm'}</span>
                  <br/>
                  {/* <span className='span' style={{fontSize:'14', fontWeight:'bold'}}>ساندویچ مرغ و گردو</span> className='h3' */}
                  <h3 >ساندویچ مرغ و گردو</h3>
                  <br/>
                  <span > علی فتحی</span><span > : 1145</span>
                  <br/>
                  <span >آسفالت طوس</span>
                  <br/>
                  {/* <img alt='logo' src={logo}/> */}
                </div>
                {/* <Button size="sm" color="info" onClick={() => this.setServeMeal()} style={{fontWeight: 'bold'}}>تائید</Button> , backgroundColor:'lightblue'*/}
                <Button size="sm" color="info" style={{fontWeight: 'bold'}} onClick={() => this.onPrint('printableArea')} d-print-none>تائید</Button>
              </Col>
            </Row>
        </CardFooter>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    meals: store.meals.meals,
    employeeCodes: store.employees.employeeCodes,
    personelMealDays: store.personelMealDays.personelMealDays,
    servedMeals: store.servedMeals.servedMeals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPersonelMealDay: (model) => {
      dispatch(EditPersonelMealDay(model))}, 
    // addPersonelMealDay: (model) => {
    //   dispatch(AddPersonelMealDay(model))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServedMeals);
