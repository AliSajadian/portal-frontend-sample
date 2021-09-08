import React from 'react'
import {
    Card,
    Container,
    Row,
    Col,
} from "reactstrap";



export default function WeeklyMealsDay(props) {
    const {currentMonthDate, index, persianMonth, next3DaysDate, meals, mealsDays, personelMealDays, selectedMealDays, onChanged} = props;
    return (
        <Card key={index} className="card-inner-color"> 
            <Container>
                <Row>
                    <Col xl="4" className="col">
                        <span  >
                            <label >
                            {persianMonth}
                            </label>
                        </span><br/>                
                    </Col>
                    <Col xl="8">
                      {(next3DaysDate < currentMonthDate.date) ? (
                        (meals.length > 0 && mealsDays.length > 0 &&
                            mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))) &&
                            mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).length > 0 ) 
                        ? (
                            (personelMealDays.length > 0 && selectedMealDays.length > 0) ? (
                                ///////////////////////////////////////Editable Edit//////////////////////////////////////////
                                <select 
                                    className="select-style" 
                                    style={{backgroundColor:"aliceblue"}}
                                    value={mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).filter(
                                        dm => selectedMealDays.filter(pmd => dm.id === pmd.resturaunt_day_meal).length === 1) &&
                                        mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).filter(
                                            dm => selectedMealDays.filter(pmd => dm.id === pmd.resturaunt_day_meal).length === 1).length > 0 ?
                                        mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).filter(
                                        dm => selectedMealDays.filter(pmd => dm.id === pmd.resturaunt_day_meal).length === 1)[0].resturaunt_meal : 0
                                    }
                                    onChange={(e) => onChanged(e, currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}
                                >
                                    {mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).map((md) => (
                                        <option key={md.resturaunt_meal} value={md.resturaunt_meal}>
                                            {meals.filter(meal => Number(meal.id) === Number(md.resturaunt_meal))[0].name.substring(0, 100)}</option> 
                                    ))}   
                                </select>
                            ) : (
                                ///////////////////////////////////////Editable Add//////////////////////////////////////////
                                <select 
                                    className="select-style" 
                                    style={{backgroundColor:"aliceblue"}}
                                    onChange={(e) => onChanged(e, currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}
                                >
                                    {mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).map((md) => (
                                        <option key={md.resturaunt_meal} value={md.resturaunt_meal}>
                                            {meals.filter(meal => Number(meal.id) === Number(md.resturaunt_meal))[0].name.substring(0, 100)}</option> 
                                    ))}   
                                </select>                                
                            )
                          )
                        : (
                            <select 
                                className="select-style" 
                                style={{backgroundColor:"#ffd2d2"}}
                            >
                                <option></option> 
                            </select>
                          ))
                    : (
                        (meals && meals.length > 0 && mealsDays && mealsDays.length > 0 ) 
                        ? (
                            (personelMealDays && personelMealDays.length > 0) ? (
                                ///////////////////////////////////////Disable Edit//////////////////////////////////////////
                                <select 
                                    className="select-style" 
                                    style={{backgroundColor:"aliceblue"}}
                                    value={mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).filter(
                                        dm => selectedMealDays.filter(pmd => dm.id === pmd.resturaunt_day_meal).length === 1) &&
                                        mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).filter(
                                            dm => selectedMealDays.filter(pmd => dm.id === pmd.resturaunt_day_meal).length === 1).length > 0 ?
                                        mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).filter(
                                        dm => selectedMealDays.filter(pmd => dm.id === pmd.resturaunt_day_meal).length === 1)[0].resturaunt_meal : 0
                                    }
                                    disabled
                                >
                                    {mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).map((md) => (
                                        <option key={md.resturaunt_meal} value={md.resturaunt_meal}>
                                            {meals.filter(meal => Number(meal.id) === Number(md.resturaunt_meal))[0].name.substring(0, 100)}</option> 
                                    ))}   
                                </select>
                            ) : (
                                ///////////////////////////////////////Disable Add///////////////////////////////////////////
                                <select 
                                    className="select-style" 
                                    style={{backgroundColor:"aliceblue"}}
                                    disabled
                                >
                                    {mealsDays.filter(md => (md.date === currentMonthDate.date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))).map((md) => (
                                        <option key={md.resturaunt_meal} value={md.resturaunt_meal}>
                                            {meals.filter(meal => Number(meal.id) === Number(md.resturaunt_meal))[0].name.substring(0, 100)}</option> 
                                    ))}   
                                </select>                                
                            )
                            )
                        : (
                            <select 
                                className="select-style" 
                                style={{backgroundColor:"#ffd2d2"}}
                                disabled
                            >
                                <option></option> 
                            </select>
                            )
                        )}                 
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

