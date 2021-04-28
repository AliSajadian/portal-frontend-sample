import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
} from "reactstrap";
import {
  EditPersonelMealDay,
  // AddPersonelMealDay
} from "../../../../redux/actions/personelMealDayActions";
// import '../restaurant.css'
import './mealFish.css'
 

class MealFish extends Component {
  constructor(props){
    super(props)

    this.state = {
      employee_code: 0,
    };
  }

  onPrint = (divName) => {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    // var w1 = document.body.style.width
    // var h1 = document.body.style.height

    document.body.innerHTML = printContents;

    // var w2 = document.body.style.width
    // var h2 = document.body.style.height 
    // alert('first: ', String(w1), ', ', String(h1), ' second: ', String(w2), ', ', String(h2))

    document.body.style.textAlign = 'center'
    document.body.style.margin = '0 auto'
    // document.body.style.display = 'block'
    // document.width = '80mm'
    // document.height = '80mm'

    alert(printContents)
    window.print();

    document.body.innerHTML = originalContents;    
  }

  render = () => {
    return (
        <div id='main'>
            <div id="printableArea" className="printableArea">
                <span >{'1399/11/28 12:23 pm'}</span>
                <br/>
                {/* <span className='span' style={{fontSize:'14', fontWeight:'bold'}}>ساندویچ مرغ و گردو</span> className='h3' d-print-none*/}
                <h3 >ساندویچ مرغ و گردو</h3>
                <h5 >غذای شماره 2</h5>
                {/* <br/> */}
                <span > علی فتحی</span><span > : 1145</span>
                <br/>
                <span id='compayName'>آسفالت طوس</span>
                <hr style={{borderWidth:'2px',color:'black', backgroundColor:'black'}}/>
                <hr style={{borderWidth:'2px',width:'66%', color:'black', backgroundColor:'black'}}/>
                <hr style={{borderWidth:'2px',width:'33%', color:'black', backgroundColor:'black'}}/>
            </div>
            <div id="unprintableArea">
                <Button size="sm" color="info" style={{fontWeight: 'bold'}} onClick={() => this.onPrint('printableArea')} >تائید</Button>
            </div>
        </div>
    );
  };
}

const mapStateToProps = store => {
  return {
    // meals: store.meals.meals,
    // employeeCodes: store.employees.employeeCodes,
    // personelMealDays: store.personelMealDays.personelMealDays,
    // servedMeals: store.servedMeals.servedMeals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPersonelMealDay: (model) => {
      dispatch(EditPersonelMealDay(model))}, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealFish);
