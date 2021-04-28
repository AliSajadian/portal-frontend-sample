import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import PermissionsList from "../permissions/permissionsList/permissions";
import { GetPermissionsList, GetContentTypeList } from "../../../../redux/actions/permissionsActions";
import PermissionModal from "../permissions/permissionModal/permissionModal";


const Index = (props) => {

  useEffect(() => {
    props.getPermissions();
    props.getContentTypeList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">مجوزهای کاربری</h1> */}

      <Row>
        <Col>
          <PermissionsList></PermissionsList>
        </Col>
      </Row>
      
      <PermissionModal></PermissionModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPermissions: () => dispatch(GetPermissionsList()),
    getContentTypeList: () => dispatch(GetContentTypeList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
