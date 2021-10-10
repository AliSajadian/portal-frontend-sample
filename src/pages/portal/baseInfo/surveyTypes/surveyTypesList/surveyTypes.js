import React from "react";
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
  RemoveSurveyType,
  GetSurveyTypesModal,
  AddSurveyTypeModel
} from "../../../../../redux/actions/surveyTypesActions";
import * as types from "../../../../../redux/constants";
import { BaseTable } from "../../../../../components/tables/BaseTable";
import '../../baseInfo.css'

 

const columnList = [
  {
      Header: 'نوع پزشک',
      accessor: 'name',
      maxWidth: '90%',
      minWidth: '80%',
      width: '85%',
  },
]
const surveyTypesList = (props) => {
  return (
    <Card className="card3D">
      <CardHeader>
        <CardTitle tag="h5">
          انواع نظرسنجی
        </CardTitle>
      </CardHeader>
      <CardBody>
      <BaseTable
          dataRecords={props.surveyTypes}
          columnList={columnList}
          editRecord={props.getSurveyTypesModal}
          removeRecord={props.removeSurveyType}
          />
        <PlusCircle
            onClick={() =>
              props.addSurveyTypeModel()
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
    surveyTypes: store.surveyTypes.surveyTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeSurveyType: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveSurveyType(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_SURVEY_TYPE_MODAL
      }),
    getSurveyTypesModal: id => {
      dispatch(GetSurveyTypesModal(id))}, 
    addSurveyTypeModel: () => {
      dispatch(AddSurveyTypeModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(surveyTypesList);
