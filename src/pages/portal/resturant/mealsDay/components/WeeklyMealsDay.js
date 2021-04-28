import React from 'react'
import { MinusCircle, PlusCircle } from "react-feather";
import {
    Card,
    Container,
    Row,
    Col, 
    Label
} from "reactstrap";
import AutosizeInput from 'react-input-autosize';


export default function WeeklyMealsDay(props) {
    console.log('props: ', props)
    return (
        <Card className='card-res-week'>
        {props.currentMonthDates && props.currentMonthDates.length > 0 ? (
            props.currentMonthDates.filter(currentMonthDate => (Number(props.getPersianMonthWeekNo(currentMonthDate.date)) === props.weekNo))
                                  .map((currentMonthDate, index) => (                
            <Card key={index} className='card-res-day'>
              <Row>
                <Col >
                    <span  >
                    <PlusCircle style={{marginLeft:'.5rem'}}
                        onClick={props.addMealDay(currentMonthDate.date)}
                        className="align-middle"
                        size={18}
                    />                        
                    <label >
                        {props.getPersianMonth(currentMonthDate.date)}
                    </label>
                    </span><br/>                
                </Col>
                <Col xl="10">
                    <Container>
                    {props.mealsDays && props.mealsDays.length > 0 && 
                        props.mealsDays.filter(mealDay => (mealDay.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                    )) ? 
                    props.mealsDays.filter(mealDay => (mealDay.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                    )).map((mealDay, index) => (
                        <Card key={index} >
                        <Row>
                            <Col style={{textAlign:'ltr'}} xl="7">
                            <select value={mealDay.resturant_meal} style={{width:'50%'}} className='select'//disabled={this.state.questions.length > 0} 
                                onChange={props.editMealDay(mealDay.id, mealDay.date, mealDay.totalNo)}>
                                {(props.meals && props.meals.length) > 0 ? (
                                    props.meals.map(meal => <option key={meal.id} value={meal.id}>{meal.name.substring(0, 100)}</option>
                                    )) : (
                                    <div>not found</div>
                                    )}                    
                            </select>
                            <MinusCircle 
                                onClick={props.deleteMealDay(mealDay.id)}
                                className="align-middle"
                                size={18}
                            />
                            </Col>
                            <Col xl="3">
                            <Label style={{textAlign:'right'}}>
                            جمع تعداد انتخاب شده                                
                            <input className="text-box" style={{width:'2.2em'}}
                                // bsSize="sm"
                                disabled 
                                type="text"
                                name="selectedNo"
                                value={mealDay.selectedNo}
                            />
                            </Label>
                            </Col>
                            <Col style={{textAlign:'right'}} xl="2">    
                            <span>
                            <label> 
                            <AutosizeInput  
                                type="text"
                                onChange={props.inputChangeHandler(mealDay)}
                                value={mealDay.totalNo}
                                // placeholder="سوال را وارد کنید"
                                placeholderIsMinWidth
                            /> تعداد نهایی
                            </label>  
                            </span>                                                          
                            </Col>
                        </Row>
                        </Card>
                    )) : ""}
                    </Container>
                </Col> 
                </Row>
            </Card>
            ))) : ''}
        </Card>
    )
}
