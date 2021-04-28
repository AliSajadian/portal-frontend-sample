import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import GroupPermissionsList from "../groupPermissions/groupPermissions/groupPermissions";
import { GetPermissionsList, GetContentTypeList, GetGroupPermissionsList } from "../../../../redux/actions/permissionsActions";
import { GetGroupsList } from "../../../../redux/actions/groupsActions";



const Index = (props) => {
  useEffect(() => {
    props.getGroups();
    props.getPermissions();
    props.getContentTypes();
    props.getGroupPermissions();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">مجوز های گروه کاربری</h1> */}

      <Row>
        <Col>
          <GroupPermissionsList></GroupPermissionsList>
        </Col>
      </Row>
      
      {/* <GroupGroupModal></GroupGroupModal> */}
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(GetGroupsList()),
    getGroupPermissions: () => dispatch(GetGroupPermissionsList()),
    getPermissions: () => dispatch(GetPermissionsList()),
    getContentTypes: () => dispatch(GetContentTypeList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
