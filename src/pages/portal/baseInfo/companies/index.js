import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import CompaniesList from "../companies/companiesList/companies";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import CompanyModal from "../companies/companiesModal/companiesModal";


const Index = (props) => {console.log('==CompaniesList Index==')

  useEffect(() => {
    props.getCompanies();
  }, []);

  return (
    <Container>
      {/* <h1 className="h3 mb-3">شرکت</h1>  */}

      <Row>
        <Col >
          <CompaniesList></CompaniesList>
        </Col>
      </Row>
      
      <CompanyModal></CompanyModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => dispatch(GetCompaniesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
