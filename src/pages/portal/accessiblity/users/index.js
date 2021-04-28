import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import UsersList from "../users/usersList/users";
import { GetUsersList } from "../../../../redux/actions/usersActions";
import UsersModal from "../users/usersModal/usersModal";


const Index = (props) => {

  useEffect(() => {
    props.getUsersList();
  }, []);

  return (
    <Container className="p-0">
      {/* <h1 className="h3 mb-3">کاربرها</h1> */}

      <Row>
        <Col>
          <UsersList></UsersList>
        </Col>
      </Row>
      
      <UsersModal></UsersModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersList: () => dispatch(GetUsersList()),
  }
}


export default connect(null, mapDispatchToProps)(Index);
