import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import EquipmentsList from "./equipmentsList/equipments";
import { GetEquipmentsList } from "../../../../redux/actions/meetingEquipmentsActions";
import EquipmentModal from "./equipmentsModal/equipmentsModal";


const Index = (props) => {

  useEffect(() => {
    props.getEquipmentsList();
  }, []);

  return (
    <Container>
      {/* <h1 className="h3 mb-3">شرکت</h1>  */}

      <Row>
        <Col >
          <EquipmentsList></EquipmentsList>
        </Col>
      </Row>
      
      <EquipmentModal></EquipmentModal>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEquipmentsList: () => dispatch(GetEquipmentsList())
  }
}


export default connect(null, mapDispatchToProps)(Index);
