import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import RoomsList from "./roomsList/roomsList";
import { GetRoomTypesList } from "../../../../redux/actions/meetingRoomTypesAction";
import { GetRoomsList } from "../../../../redux/actions/meetingRoomsActions";
import RoomModal from "./roomsModal/roomsModal";


const Index = (props) => {

  useEffect(() => {
    props.getRoomsList();
    props.getRoomTypesList();
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
    getRoomsList: () => dispatch(GetRoomsList()),
    getRoomTypesList: () => dispatch(GetRoomTypesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
