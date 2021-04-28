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
  RemoveProject,
  GetProjectsModal,
  AddProjectModel
} from "../../../../../redux/actions/projectsActions";
import * as types from "../../../../../redux/constants";
import '../../baseInfo.css'

 

class projectsList extends Component {
  render = () => { 
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            پروژه ها
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "50%", textAlign:'center' }}>شرکت</th>
                <th style={{ width: "44%", textAlign:'center' }}>نام پروژه</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.projects.length > 0 ? (
                this.props.projects.map((project, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index+1}</td>
                      <td style={{ width: "45%", textAlign:'center' }}>{(this.props.companies && this.props.companies.length) > 0 ? (
                                            this.props.companies.filter(company => company.id === project.company)[0]["name"]) : ""}</td>                      
                      <td style={{ width: "45%", textAlign:'center' }}>{project.name}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getProjectsModal(project.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeProject(project.id)
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
                this.props.addProjectModel()
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
    companies: store.companies.companies,
    projects: store.projects.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeProject: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
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
