import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import { Edit2, Trash, PlusCircle } from "react-feather";
import { connect } from "react-redux";
import {
  RemoveJobPosition,
  GetJobPositionsModal,
  AddJobPositionModel
} from "../../../../../redux/actions/jobPositionsActions";
import * as types from "../../../../../redux/constants";
import '../../baseInfo.css'

 

class jobPositionsList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            عناوین شغلی
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center' }}>عنوان شغلی</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.jobPositions.length > 0 ? (
                this.props.jobPositions.map((jobPosition, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index+1}</td>
                      <td style={{ width: "100%", textAlign:'center' }}>{jobPosition.name}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getJobPositionsModal(jobPosition.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeJobPosition(jobPosition.id)
                          }
                          className="align-middle "
                          size={18}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td>not found</td></tr>
              )}
            </tbody>
          </Table>
          <PlusCircle
              onClick={() =>
                this.props.addJobPositionModel()
              }
              className="align-middle"
              size={18}
          />
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    jobPositions: store.jobPositions.jobPositions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeJobPosition: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveJobPosition(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_JOBPOSITION_MODAL
      }),
    getJobPositionsModal: id => {
      dispatch(GetJobPositionsModal(id))}, 
    addJobPositionModel: () => {
      dispatch(AddJobPositionModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(jobPositionsList);
