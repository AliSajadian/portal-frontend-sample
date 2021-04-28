import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import UserGroupsList from "../userGroups/userGroups/userGroups";
import { GetGroupsList } from "../../../../redux/actions/groupsActions";
import { GetUserGroupsList } from "../../../../redux/actions/groupsActions";
import { GetUsersList } from "../../../../redux/actions/usersActions";
// import GroupModal from "./groupModal/groupModal";



const Index = (props) => {
  useEffect(() => {
    props.getUsers();
    props.getGroups();
    props.getUserGroups();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">کاربر و گروه های کاربری</h1> */}

      <Row>
        <Col>
          <UserGroupsList></UserGroupsList>
        </Col>
      </Row>
      
      {/* <UserGroupModal></UserGroupModal> */}
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(GetUsersList()),
    getUserGroups: () => dispatch(GetUserGroupsList()),
    getGroups: () => dispatch(GetGroupsList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
