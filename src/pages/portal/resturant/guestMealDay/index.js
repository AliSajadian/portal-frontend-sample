import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import GuestMealDayList from "../guestMealDay/guestMealDay";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetProjectsList } from "../../../../redux/actions/projectsActions";
// import { GetGuestMealDaysList } from "../../../../redux/actions/guestMealDayActions";
// import { GetGuestMealDayList } from "../../../../redux/actions/mealsDayActions";
// import { GetMealsList } from "../../../../redux/actions/mealsActions";
// import { GetCurrentMonthDates } from "../../../../redux/actions/mealsDayActions";

const Index = (props) => {
  useEffect(() => {
    props.getCompanysList();
    props.getDepartmentsList();
    props.getProjectsList();
    // props.getGuestMealDaysExList();
    // props.getCurrentMonthDates();
    // props.getGuestMealDayList();
    // props.getMealsList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3"> انتخاب ماهیانه غذا </h1> */}
      <Row>
        <Col >
          <GuestMealDayList/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanysList: () => dispatch(GetCompaniesList()),
    getDepartmentsList: () => dispatch(GetDepartmentsList()),
    getProjectsList: () => dispatch(GetProjectsList()),
    // getGuestMealDaysExList: () => dispatch(GetGuestMealDaysList()),
    // getMealsList: () => dispatch(GetMealsList()),
    // getGuestMealDayList: () => dispatch(GetGuestMealDayList()),
    // getCurrentMonthDates: () => dispatch(GetCurrentMonthDates())    
  }
}

export default connect(null, mapDispatchToProps)(Index);

