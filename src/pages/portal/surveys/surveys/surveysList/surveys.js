import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table
} from "reactstrap";
import { ChevronsDown, Edit2, Trash, PlusCircle } from "react-feather";
import { connect } from "react-redux";
import * as types from "../../../../../redux/constants";
import {
    RemoveSurvey,
    GetSurveysModal,
    AddSurveyModal
  } from "../../../../../redux/actions/surveysActions";
  import {
    RemoveSurveyDepartment,
    GetSurveyDepartmentsModal,
    AddSurveyDepartmentModal
 } from "../../../../../redux/actions/surveyDepartmentActions";
import '../../surveys.css'



class surveysList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          surveyID: 0,
          description: ''
        }
    }

    getDepartments = (id, description) => {
        this.setState({
            surveyID: id,
            description: description
        })
    }

    render = () => {
        const { surveyID, description } = this.state;
        return (
            <Card >
                <CardHeader className="card-header">

                    <CardTitle tag="h5" className="mb-0">
                    نظرسنجی ها
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Table style={{direction:'rtl'}} hover striped responsive className='table'>
                        <thead id="th">
                            <tr id="tr">
                                <th >#</th>
                                <th style={{ width: "20%", textAlign:'center' }}>نوع نظرسنجی</th>
                                <th style={{ width: "18%", textAlign:'center' }}>تاریخ ایجاد</th>
                                <th style={{ width: "19%", textAlign:'center' }}>تاریخ انقضا</th>
                                <th style={{ width: "18%", textAlign:'center' }}>توضیحات</th>
                                <th style={{ width: "18%", textAlign:'center' }}>دپارتمان</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody id="tb" className='tbody'>
                            {this.props.surveys.length > 0 ?
                                this.props.surveys.map((survey, index) => {
                                    return(
                                        <tr key={index} >
                                            <td style={{ width: "4%" }}>{index+1}</td>
                                            <td style={{ width: "18%", textAlign:'center' }}>{(this.props.surveyTypes && this.props.surveyTypes.length > 0 &&
                                                this.props.surveyTypes.filter(surveyType => surveyType.id === survey.surveyType).length > 0) ? (
                                            this.props.surveyTypes.filter(surveyType => surveyType.id === survey.surveyType)[0]["name"]) : ""}</td>
                                            <td style={{ width: "18%", textAlign:'center' }}>{survey.created_date}</td>
                                            <td style={{ width: "18%", textAlign:'center' }}>{survey.expired_date}</td>
                                            <td style={{ width: "18%", textAlign:'center' }}>{survey.description}</td>

                                            <td className="table-action"  style={{ width: "18%", textAlign:'center' }}>
                                                <ChevronsDown
                                                    onClick={() =>
                                                        this.getDepartments(survey.id, survey.description)
                                                    }
                                                    className="align-middle mr-1"
                                                    size={18}
                                                />
                                                {/* {(this.props.departments && this.props.departments.length > 0) ? (
                                            this.props.departments.filter(department => department.id === survey.departmentID)[0]["name"]) : ""} */}
                                            </td>

                                            <td style={{ width: "3%" }} className="table-action">
                                                <Edit2
                                                onClick={() =>
                                                    this.props.getSurveysModal(survey.id)
                                                }
                                                className="align-middle mr-1"
                                                size={18}
                                                />
                                            </td>
                                            <td style={{ width: "3%" }} className="table-action">
                                                <Trash
                                                onClick={() =>
                                                    this.props.removeSurvey(survey.id)
                                                }
                                                className="align-middle "
                                                size={18}
                                                />
                                            </td>
                                        </tr>)

                                }) : <tr><td>not found</td></tr>}
                        </tbody>
                    </Table>
                    <PlusCircle
                        onClick={() =>
                            this.props.addSurveyModal()
                        }
                        className="align-middle"
                        size={18}
                    />
                    {surveyID > 0 ? (
                    <Card>
                        <Table className="mb-0" hover striped responsive>
                            <thead id="th">
                                <tr id="tr">
                                    <th style={{ width: "50%", textAlign:'center' }}>نظرسنجی</th>
                                    <th style={{ width: "50%", textAlign:'center' }}>دپارتمان</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody id="tb">
                                {this.props.surveyDepartments && this.props.surveyDepartments.length > 0 ?
                                    this.props.surveyDepartments.map((surveyDepartment, index) => (surveyDepartment.survey === surveyID) ? (
                                        // return (
                                          <tr key={index} >
                                            <td style={{ width: "50%", textAlign:'center' }}>{description}</td>
                                            <td style={{ width: "50%", textAlign:'center' }}>{(this.props.departments && this.props.departments.length > 0 &&
                                                this.props.departments.filter(department => department.id === surveyDepartment.department)) ? (
                                                this.props.departments.filter(department => department.id === surveyDepartment.department) &&
                                                this.props.departments.filter(department => department.id === surveyDepartment.department).length > 0 ?
                                                this.props.departments.filter(department => department.id === surveyDepartment.department)[0]["name"] : "") : ""}</td>  
                                            <td className="table-action">
                                              <Trash
                                                onClick={() =>
                                                    this.props.removeSurveyDepartment(surveyDepartment.id)
                                                }
                                                className="align-middle "
                                                size={18}
                                              />
                                            </td>
                                          </tr>                                                                                          
                                        // )
                                        ) : <tr key={index}><td>not found</td></tr>) : <tr><td>not found</td></tr>}
                            </tbody>
                        </Table>
                        <PlusCircle
                            onClick={() =>
                                this.props.addSurveyDepartmentModal(surveyID)
                            }
                            className="align-middle"
                            size={18}
                        />
                    </Card>
                    ) : ''}
                </CardBody>
            </Card>
        );
    }
};

const mapStateToProps = store => {
    return {
        departments: store.departments.departments,
        surveyTypes: store.surveyTypes.surveyTypes,
        surveys: store.surveys.surveys,
        surveyDepartments: store.surveyDepartments.surveyDepartments
    };
};
const mapDispatchToProps = dispatch => {
    return {
        removeSurvey: id => {
            if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
                dispatch(RemoveSurvey(id));
            }
        },
        toggleModal: () =>
        dispatch({
            type: types.TOGGLE_SURVEY_MODAL
        }),
        getSurveysModal: id => {
        dispatch(GetSurveysModal(id))}, 
        addSurveyModal: () => {
        dispatch(AddSurveyModal())},

        removeSurveyDepartment: id => {
            if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
                dispatch(RemoveSurveyDepartment(id));
            }
        },
        getSurveyDepartmentsModal: id => {
        dispatch(GetSurveyDepartmentsModal(id))}, 
        addSurveyDepartmentModal: (surveyID) => {
            dispatch(AddSurveyDepartmentModal(surveyID))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(surveysList);