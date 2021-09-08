import React from 'react'
import { MinusCircle, PlusCircle } from "react-feather";
import {
    Card,
    Container,
    Row,
    Col, 
    Label
} from "reactstrap";


export default function WeeklyMealsDay(props) {
    // console.log('props: ', props)
    const {weekNo, isActive, currentMonthDates, mealsDays, meals, addMealDay, 
        editMealDay, deleteMealDay, getPersianMonthWeekNo, getPersianMonth} = props
    return (
        <Card className='card-res-week'>
        {currentMonthDates && currentMonthDates.length > 0 ? (
            currentMonthDates.filter(currentMonthDate => (Number(getPersianMonthWeekNo(currentMonthDate.date)) === weekNo))
                                  .map((currentMonthDate, index) => (                
            <Card key={index} className='card-res-day'>
              <Row>
                <Col>
                    <span disabled >
                    <PlusCircle 
                        style={{marginLeft:'.5rem'}}
                        onClick={addMealDay(currentMonthDate.date)}
                        className="align-middle"
                        size={18}
                    />                        
                    <label >
                        {getPersianMonth(currentMonthDate.date)}
                    </label>
                    </span><br/>                
                </Col>
                <Col xl="10">
                    <Container>
                    {mealsDays && mealsDays.length > 0 && 
                        mealsDays.filter(mealDay => (mealDay.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                    )) ? 
                    mealsDays.filter(mealDay => (mealDay.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
                    )).map((mealDay, index) => (
                        !isActive ? (
                        <Card key={index} >
                        <Row>
                            <Col style={{textAlign:'ltr'}} xl="7">
                            <select value={mealDay.resturaunt_meal} style={{width:'50%'}} className='select'//disabled={this.state.questions.length > 0} 
                                onChange={editMealDay(mealDay.id, mealDay.date, mealDay.totalNo)}
                                disabled
                            >
                                {(meals && meals.length) > 0 ? (
                                    meals.map(meal => <option key={meal.id} value={meal.id}>{meal.name.substring(0, 100)}</option>
                                    )) : (
                                    ''
                                    )}     
                            </select>
                            <MinusCircle 
                                disabled
                                onClick={deleteMealDay(mealDay.id)}
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
                            {/* <span>
                            <label> 
                            <AutosizeInput  
                                type="text"
                                onChange={inputChangeHandler(mealDay)}
                                value={mealDay.totalNo}
                                // placeholder="سوال را وارد کنید"
                                placeholderIsMinWidth
                            /> تعداد نهایی
                            </label>  
                            </span>                                                           */}
                            </Col>
                        </Row>
                        </Card>
                        ) :
                        (
                        <Card key={index} >
                            <Row>
                                <Col style={{textAlign:'ltr'}} xl="7">
                                <select value={mealDay.resturaunt_meal} style={{width:'50%'}} className='select'//disabled={this.state.questions.length > 0} 
                                    onChange={editMealDay(mealDay.id, mealDay.date, mealDay.totalNo)}
                                >
                                    {(meals && meals.length) > 0 ? (
                                        meals.map(meal => <option key={meal.id} value={meal.id}>{meal.name.substring(0, 100)}</option>
                                        )) : (
                                        ''
                                        )}     
                                </select>
                                <MinusCircle 
                                    onClick={deleteMealDay(mealDay.id)}
                                    className="align-middle"
                                    size={18}
                                />
                                </Col>
                                <Col xl="3">
                                <Label style={{textAlign:'right'}}>
                                جمع تعداد انتخاب شده                                
                                <input className="text-box" style={{width:'2.2em'}}
                                    // bsSize="sm"
                                    type="text"
                                    name="selectedNo"
                                    value={mealDay.selectedNo}
                                />
                                </Label>
                                </Col>
                                <Col style={{textAlign:'right'}} xl="2">    
                                {/* <span>
                                <label> 
                                <AutosizeInput  
                                    type="text"
                                    onChange={inputChangeHandler(mealDay)}
                                    value={mealDay.totalNo}
                                    placeholderIsMinWidth
                                /> تعداد نهایی
                                </label>  
                                </span>                                                           */}
                                </Col>
                            </Row>
                        </Card>
                        )
                    )) : ""}
                    </Container>
                </Col> 
                </Row>
            </Card>
            ))) : ''}
        </Card>
    )
}
