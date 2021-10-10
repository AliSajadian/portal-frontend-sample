import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { PlusCircle } from "react-feather";
import { connect } from "react-redux";
import {
  RemoveJobPosition,
  GetJobPositionsModal,
  AddJobPositionModel
} from "../../../../../redux/actions/jobPositionsActions";
import * as types from "../../../../../redux/constants";
import { BaseTable } from "../../../../../components/tables/BaseTable";
import '../../baseInfo.css'

 

const columnList = [
  {
      Header: 'عنوان شغلی',
      accessor: 'name',
      maxWidth: '90%',
      minWidth: '80%',
      width: '85%',
  },
]
const jobPositionsList = (props) => {
  return (
    <Card className="card3D">
      <CardHeader>
        <CardTitle tag="h5">
          عناوین شغلی
        </CardTitle>
      </CardHeader>
      <CardBody>
        <BaseTable
          dataRecords={props.jobPositions}
          columnList={columnList}
          editRecord={props.getJobPositionsModal}
          removeRecord={props.removeJobPosition}
        />
        <PlusCircle
            onClick={() =>
              props.addJobPositionModel()
            }
            className="align-middle"
            size={18}
        />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = store => {
  return {
    jobPositions: store.jobPositions.jobPositions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeJobPosition: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
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
