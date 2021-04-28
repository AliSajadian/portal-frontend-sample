import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import UserPermissionsList from "../userPermissions/userPermissions/userPermissions";
import { GetPermissionsList, GetContentTypeList, GetUserPermissionsList } from "../../../../redux/actions/permissionsActions";
import { GetUsersList } from "../../../../redux/actions/usersActions";



const Index = (props) => {
  useEffect(() => {
    props.getUsers();
    props.getPermissions();
    props.getContentTypes();
    props.getUserPermissions();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">مجوز های کاربری</h1> */}

      <Row>
        <Col>
          <UserPermissionsList></UserPermissionsList>
        </Col>
      </Row>
      
      {/* <UserGroupModal></UserGroupModal> */}
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(GetUsersList()),
    getUserPermissions: () => dispatch(GetUserPermissionsList()),
    getPermissions: () => dispatch(GetPermissionsList()),
    getContentTypes: () => dispatch(GetContentTypeList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
