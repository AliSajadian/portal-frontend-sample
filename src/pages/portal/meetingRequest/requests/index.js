import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Col,
  Container,
  Row,
} from "reactstrap";

import RequestsList from "./requestsList/requestsList";
import { GetCompaniesList } from "../../../../redux/actions/companiesActions";
import { GetDepartmentsList } from "../../../../redux/actions/departmentsActions";
import { GetRoomTypesList } from "../../../../redux/actions/meetingRoomTypesAction";
import { GetRoomsList } from "../../../../redux/actions/meetingRoomsActions";
import { GetCaterTypesList } from "../../../../redux/actions/meetingCaterTypesActions";
import { GetEquipmentsList } from "../../../../redux/actions/meetingEquipmentsActions";


const Index = (props) => {
  useEffect(() => {
    props.getCompanies();
    props.getDepartments();
    props.getRoomTypesList();
    props.getRooms();
    props.getCaterTypes();
    props.getEquipments();
  }, []);

  return (
    <Container>
      {/* <h1 className="h3 mb-3">شرکت</h1>  */}

      <Row>
        <Col >
          <RequestsList></RequestsList>
        </Col>
      </Row>
      
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => dispatch(GetCompaniesList()),
    getDepartments: () => dispatch(GetDepartmentsList()),
    getRoomTypesList: () => dispatch(GetRoomTypesList()),
    getRooms: () => dispatch(GetRoomsList()),
    getCaterTypes: () => dispatch(GetCaterTypesList()),
    getEquipments: () => dispatch(GetEquipmentsList()),
  }
}


export default connect(null, mapDispatchToProps)(Index);
