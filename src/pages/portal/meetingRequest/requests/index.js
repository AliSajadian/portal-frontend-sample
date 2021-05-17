import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";

import RoomsList from "./requestsList/roomsList";
import { GetRoomsList } from "../../../../redux/actions/meetingRoomsActions";
import RoomModal from "./requestsModal/roomsModal";


const Index = (props) => {
  useEffect(() => {
    props.getRoomsList();
  }, []);

  return (
    <Container>
      {/* <h1 className="h3 mb-3">شرکت</h1>  */}

      <Row>
        <Col >
          <RoomsList></RoomsList>
        </Col>
      </Row>
      
      <RoomModal></RoomModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomsList: () => dispatch(GetRoomsList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
