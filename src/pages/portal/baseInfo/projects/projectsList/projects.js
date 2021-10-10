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
  RemoveProject,
  GetProjectsModal,
  AddProjectModel
} from "../../../../../redux/actions/projectsActions";
import * as types from "../../../../../redux/constants";
import { CompanyChildBaseTable } from "../../../../../components/tables/CompanyChildBaseTable";
import '../../baseInfo.css'

 

const projectsList = (props) => {
  return (
    <Card className="card3D">
      <CardHeader>
        <CardTitle tag="h5">
          پروژه ها
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CompanyChildBaseTable
          parentRecords={props.companies}
          childRecords={props.projects}
          header={'پروژه'}
          editRecord={props.getProjectsModal}
          removeRecord={props.removeProject}
        />        
        <PlusCircle
            onClick={() =>
              props.addProjectModel()
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
    companies: store.companies.companies,
    projects: store.projects.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeProject: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveProject(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_PROJECT_MODAL
      }),
    getProjectsModal: id => {
      dispatch(GetProjectsModal(id))}, 
    addProjectModel: () => {
      dispatch(AddProjectModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(projectsList);
