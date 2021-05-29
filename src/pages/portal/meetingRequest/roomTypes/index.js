import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import RoomTypesList from "./roomsList/roomsList";
import { GetRoomTypesList } from "../../../../redux/actions/meetingRoomTypesActions";
import RoomModal from "./roomsModal/roomsModal";


const Index = (props) => {

  useEffect(() => {
    props.getRoomTypesList();
  }, []);

  return (
    <Container>
      {/* <h1 className="h3 mb-3">شرکت</h1>  */}

      <Row>
        <Col >
          <RoomTypesList></RoomTypesList>
        </Col>
      </Row>
      
      <RoomModal></RoomModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomTypesList: () => dispatch(GetRoomTypesList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
