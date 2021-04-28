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
  RemoveDepartment,
  GetDepartmentsModal,
  AddDepartmentModel
} from "../../../../../redux/actions/departmentsActions";
import * as types from "../../../../../redux/constants";
import '../../baseInfo.css'

 

class departmentsList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            دپارتمانها
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive reverse>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "50%", textAlign:'center' }}>شرکت</th>
                <th style={{ width: "44%", textAlign:'center' }}>دپارتمان</th>
                <th style={{ width: "3%" }}/>
                <th style={{ width: "3%" }}/>
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.departments && this.props.departments.length > 0 ? (
                this.props.departments.map((department, index) => {
                  return ( 
                    <tr key={index}> 
                      <td style={{ width: "4%" }}>{index+1}</td>
                      <td style={{ width: "45%", textAlign:'center' }}>{(this.props.companies && this.props.companies.length) > 0 ? (
                                            this.props.companies.filter(company => company.id === department.company)[0]["name"]) : ""}</td>                      
                      <td style={{ width: "45%", textAlign:'center' }}>{department.name}</td>
                      <td className="table-action" style={{ width: "3%" }}>
                        <Edit2
                          onClick={() =>
                            this.props.getDepartmentsModal(department.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td className="table-action" style={{ width: "3%" }}>
                        <Trash
                          onClick={() =>
                            this.props.removeDepartment(department.id)
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
                this.props.addDepartmentModel()
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
    departments: store.departments.departments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDepartment: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveDepartment(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_DEPARTMENT_MODAL
      }),
    getDepartmentsModal: id => {
      dispatch(GetDepartmentsModal(id))}, 
    addDepartmentModel: () => {
      dispatch(AddDepartmentModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(departmentsList);
