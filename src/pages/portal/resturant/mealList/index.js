import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import Meals from "../mealList/mealList/mealList";
import { GetMealsList } from "../../../../redux/actions/mealsActions";
import MealModal from "../mealList/mealModal/mealModal";



const Index = (props) => {
  useEffect(() => {
    props.getMealsList();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">غذا</h1> */}
      <Row>
        <Col >
          <Meals></Meals>
        </Col>
      </Row>
      <MealModal></MealModal>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealsList: () => dispatch(GetMealsList())
  }
}

export default connect(null, mapDispatchToProps)(Index);

