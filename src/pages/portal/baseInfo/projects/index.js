import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import ProjectsList from "../projects/projectsList/projects";
import { GetProjectsList } from "../../../../redux/actions/projectsActions";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import ProjectModal from "../projects/projectsModal/projectsModal";


const Index = (props) => {

  useEffect(() => {
    props.getProjects();
    props.getCompanies();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">پروژه</h1> */}

      <Row>
        <Col>
          <ProjectsList></ProjectsList>
        </Col>
      </Row>
      
      <ProjectModal></ProjectModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => dispatch(GetProjectsList()),
    getCompanies: () => dispatch(GetCompaniesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
