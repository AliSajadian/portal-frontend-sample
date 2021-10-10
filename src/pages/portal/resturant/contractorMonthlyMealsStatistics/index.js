import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import ContractorMonthlyMealsStatisticsList from "./contractorMonthlyMealsStatistics";
import { 
  GetMealsStatisticsDatesList,
  GetContractorMonthlyMealsStatistics
 } from "../../../../redux/actions/personelMealDayActions";



const Index = (props) => {
  useEffect(() => {
    props.getMealsStatisticsDatesList();
    props.getContractorMonthlyMealsStatistics();
  }, []);

// class Index extends Component {
//   render(){
  return (
    <Container className="p-0">
      <Row> 
        <Col >
          <ContractorMonthlyMealsStatisticsList/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealsStatisticsDatesList: () => dispatch(GetMealsStatisticsDatesList()),
    getContractorMonthlyMealsStatistics: () => dispatch(GetContractorMonthlyMealsStatistics()),
  }
}

export default connect(null, mapDispatchToProps)(Index);

