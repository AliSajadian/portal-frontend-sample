import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import ContractorSectionsDailyMealsStatistics from "./contractorDailySectionsMealsStatistics";
import { 
  GetContractorSectionsDailyMealsStatistics, 
  GetTodayMealsNames,
  GetTodayMealsTotalNo,
} from "../../../../redux/actions/personelMealDayActions";


const Index = (props) => {
  useEffect(() => {
    props.getContractorSectionsDailyMealsStatistics();
    props.getTodayMealsNames();
    props.getTodayMealsTotalNo();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3"> انتخاب ماهیانه غذا </h1> */}
      <Row>
        <Col >
          <ContractorSectionsDailyMealsStatistics/>
        </Col>
      </Row>
    </Container>
  )
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContractorSectionsDailyMealsStatistics: () => dispatch(GetContractorSectionsDailyMealsStatistics()),
    getTodayMealsNames: () => dispatch(GetTodayMealsNames()),
    getTodayMealsTotalNo: () => dispatch(GetTodayMealsTotalNo()),
  }
}

export default connect(null, mapDispatchToProps)(Index);

