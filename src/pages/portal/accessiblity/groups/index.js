import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import GroupsList from "../groups/groupsList/groups";
import { GetGroupsList } from "../../../../redux/actions/groupsActions";
import GroupModal from "./groupModal/groupModal";


const Index = (props) => {

  useEffect(() => {
    props.getGroups();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">گروه های کاربری</h1> */}

      <Row>
        <Col>
          <GroupsList></GroupsList>
        </Col>
      </Row>
      
      <GroupModal></GroupModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(GetGroupsList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
