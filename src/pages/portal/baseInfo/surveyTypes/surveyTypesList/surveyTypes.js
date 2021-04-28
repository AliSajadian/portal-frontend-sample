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
  RemoveSurveyType,
  GetSurveyTypesModal,
  AddSurveyTypeModel
} from "../../../../../redux/actions/surveyTypesActions";
import * as types from "../../../../../redux/constants";
import '../../baseInfo.css'

 

class surveyTypesList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            انواع نظرسنجی
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center' }}>نوع نظرسنجی</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.surveyTypes.length > 0 ? (
                this.props.surveyTypes.map((surveyType, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index+1}</td>
                      <td style={{ width: "100%", textAlign:'center' }}>{surveyType.name}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getSurveyTypesModal(surveyType.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeSurveyType(surveyType.id)
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
                this.props.addSurveyTypeModel()
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
    surveyTypes: store.surveyTypes.surveyTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeSurveyType: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
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
