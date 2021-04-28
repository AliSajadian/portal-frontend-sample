import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import ServedMeals from "./serveMeals/serveMeals";
import { GetPersonelMealOneDayList } from "../../../../redux/actions/personelMealDayActions";
import { GetEmployeeCodesList } from "../../../../redux/actions/employeesActions";
import { GetServedMealsList } from "../../../../redux/actions/personelMealDayActions";


const Index = (props) => {
  useEffect(() => {
    // const date = Date.now;
    // const currentDate = date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
    // console.log('currentDate: ', currentDate)

    props.getPersonelMealDaysList();
    props.getEmployeesList();
    props.getServedMealsList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3"> انتخاب ماهیانه غذا </h1> */}
      <Row>
        <Col>
          <ServedMeals/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonelMealDaysList: () => dispatch(GetPersonelMealOneDayList()),
    getServedMealsList: () => dispatch(GetServedMealsList()),
    getEmployeesList: () => dispatch(GetEmployeeCodesList()),
  }
}

export default connect(null, mapDispatchToProps)(Index);

