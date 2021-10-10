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
  RemoveEmployee,
  GetEmployeesModal,
  AddEmployeeModel
} from "../../../../../redux/actions/employeesActions";
import * as types from "../../../../../redux/constants";
import EmployeeShow from './employeeShow'
import '../index.css'
import '../../baseInfo.css'



class employeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_name: '',
      company: '',
    };
  }

  render = () => { 
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            پرسنلها
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th style={{ width: "2%" }}>#</th>
                <th style={{ width: "7%", textAlign:'center' }}>کد پرسنلی</th>
                <th style={{ width: "7%", textAlign:'center' }}>نام</th>
                <th style={{ width: "15%", textAlign:'center' }}>
                  <input style={{ width: "100pt", direction:'ltr'}}
                    id="lastName-filter"
                    type="text"
                    value={this.state.last_name}
                    onChange={(e) => this.setState({ last_name: String(e.target.value).toLowerCase() })}
                  />
                  <br/>
                  نام خانوادگی
                </th>
                <th style={{ width: "3%", textAlign:'center' }}>جنسیت</th>
                <th style={{ width: "8%", textAlign:'center' }}>
                  شرکت
                </th>
                <th style={{ width: "8%", textAlign:'center' }}>
                  <input style={{ width: "100pt", direction:'ltr'}}
                    id="company-filter"
                    type="text"
                    value={this.state.department}
                    onChange={(e) => this.setState({ department: String(e.target.value).toLowerCase(), project: '' })}
                  />
                  <br/>
                  دپارتمان
                </th>
                <th style={{ width: "8%", textAlign:'center' }}>عنوان شغلی</th>
                <th style={{ width: "8%", textAlign:'center' }}>
                  <input style={{ width: "100pt", direction:'ltr'}}
                    id="company-filter"
                    type="text"
                    value={this.state.project}
                    onChange={(e) => this.setState({ department: '', project: String(e.target.value).toLowerCase() })}
                  />
                  <br/>                  
                  پروژه
                </th>
                <th style={{ width: "14%", textAlign:'center' }}>عکس</th>
                <th style={{ width: "10%", textAlign:'center' }}>تلفن</th>
                <th style={{ width: "14%", textAlign:'center' }}>پست الکترونیکی</th>
                <th style={{ width: "6%" }}/>
                {/* <th style={{ width: "3%" }}/> */}
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.employees && this.props.employees.length > 0 ? 
              ( this.props.employees.filter(employee => employee.last_name ? 
                (this.state.last_name !== '' ? employee.last_name.toLowerCase().includes(String(this.state.last_name)) : true) : '').map(
                  (employee, index) => (
                    <EmployeeShow
                    index={index}
                    employee={employee}
                    departments={this.props.departments}
                    companies={this.props.companies} 
                    jobPositions={this.props.jobPositions} 
                    projects={this.props.projects}
                    getEmployeesModal={this.props.getEmployeesModal}
                    />
              )))
               : (<tr><td>not found</td></tr>)}
            </tbody>            <tfoot id="tf">
              <tr>
                <th style={{ width: "80%", textAlign:'center' }}> تعداد کارمندان: 
                  {this.props.employees && this.props.employees.length > 0 ? 
                    (
                      this.state.last_name === '' ? 
                      this.props.employees.length - 1 : 
                      this.props.employees.filter(user => user.last_name.toLowerCase().includes(this.state.last_name)).length
                    ) : ''
                  }
                </th>
              </tr>
            </tfoot>
          </Table>
          {/* <PlusCircle
              onClick={() => this.props.addEmployeeModel()}
              className="align-middle"
              size={18}
          /> */}
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    jobPositions: store.jobPositions.jobPositions,
    projects: store.projects.projects,
    companies: store.companies.companies,
    departments: store.departments.departments,
    employees: store.employees.employees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeEmployee: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveEmployee(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_EMPLOYEE_MODAL
      }),
    getEmployeesModal: id => {
      dispatch(GetEmployeesModal(id))}, 
    addEmployeeModel: () => {
      dispatch(AddEmployeeModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(employeesList);



  // getEmployeePic = (id) => {
  //   fetch(`http://portalapi.asft.co/api/auth/employeeimagedownload/${id}/`).then(
  //     response => {
  //       response.blob().then(blob => {
  //       const url = window.URL.createObjectURL(blob);

  //       // const base64 = btoa(
  //       //   new Uint8Array(response.data).reduce(
  //       //     (data, byte) => data + String.fromCharCode(byte),
  //       //     '',
  //       //   ),
  //       // );
  //       // const source = "data:;base64," + base64;
  //       // console.log('url ', id, ':', url)
  //       return url
  //     });
  //   })
  // }