import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import PersonelWhoDidnotSelectNextMonthMeals from "./personelWhoDidnotSelectNextMonthMeals";
import { 
    GetSectionNames,
    GetPersonelWhoDidnotSelectNextMonthMeals,
 } from "../../../../redux/actions/personelMealDayActions";



const Index = (props) => {
  useEffect(() => {
    props.getSectionNames();
    props.getPersonelWhoDidnotSelectNextMonthMeals();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      <Row> 
        <Col >
          <PersonelWhoDidnotSelectNextMonthMeals/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSectionNames: () => dispatch(GetSectionNames()),
    getPersonelWhoDidnotSelectNextMonthMeals: () => dispatch(GetPersonelWhoDidnotSelectNextMonthMeals()),
  }
}

export default connect(null, mapDispatchToProps)(Index);

