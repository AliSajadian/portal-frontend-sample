import React, { useState } from "react";
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
import '../index.css'
import '../../baseInfo.css'

 

const employeesList = (props) => {
  const [last_name, setLast_name] = useState('')
    
  // const getEmployeePic = (id) => {
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

  const InputChangeHandler = (event) => {
    setLast_name(String(event.target.value).toLowerCase())
  };

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
                  id="user-filter"
                  type="text"
                  value={last_name}
                  onChange={InputChangeHandler}
                />
                <br/>
                نام خانوادگی
              </th>
              <th style={{ width: "3%", textAlign:'center' }}>جنسیت</th>
              <th style={{ width: "8%", textAlign:'center' }}>شرکت</th>
              <th style={{ width: "8%", textAlign:'center' }}>دپارتمان</th>
              <th style={{ width: "8%", textAlign:'center' }}>عنوان شغلی</th>
              <th style={{ width: "8%", textAlign:'center' }}>پروژه</th>
              <th style={{ width: "14%", textAlign:'center' }}>عکس</th>
              <th style={{ width: "10%", textAlign:'center' }}>تلفن</th>
              <th style={{ width: "14%", textAlign:'center' }}>پست الکترونیکی</th>
              <th style={{ width: "6%" }}/>
              {/* <th style={{ width: "3%" }}/> */}
            </tr>
          </thead>
          <tbody id="tb">
            {props.employees && props.employees.length > 0 ? ( 
              (last_name === '') ?
              props.employees.map((employee, index) => {
                return ( 
                  (!(employee.id === 1) ? (
                  <tr key={index}>
                    <td style={{ width: "2%" }}>{index + 1}</td>
                    <td style={{ width: "6%", textAlign:'center' }}>{employee.personel_code}</td>
                    <td style={{ width: "10%", textAlign:'center' }}>{employee.first_name}</td>
                    <td style={{ width: "10%", textAlign:'center' }}>{employee.last_name}</td>
                    <td style={{ width: "4%", textAlign:'center' }}>
                      {employee.gender ? 'خانم' : 'آقا'}
                    </td>
                    <td style={{ width: "12%", textAlign:'center' }}>{(
                      employee.department && props.departments && props.departments.length > 0 &&
                      props.departments.filter(department => department.id === employee.department) && 
                      props.departments.filter(department => department.id === employee.department).length > 0 &&
                      props.companies && props.companies.length > 0) ? (
                                          props.companies.filter(company => 
                                            Number(company.id) === Number(props.departments.filter(department => 
                                              department.id === employee.department)[0]["company"]))[0]["name"])
                      : ""}
                    </td>
                    <td style={{ width: "12%", textAlign:'center' }}>{(employee.department && props.departments && props.departments.length > 0) ? (
                                          props.departments.filter(department => department.id === employee.department)[0]["name"]) : ""}</td>
                    <td style={{ width: "10%", textAlign:'center' }}>{(employee.jobPosition && props.jobPositions && props.jobPositions.length > 0) ? (
                                          props.jobPositions.filter(jobPosition => jobPosition.id === employee.jobPosition)[0]["name"]) : ""}</td>
                    <td style={{ width: "12%", textAlign:'center' }}>{(employee.project && props.projects && props.projects.length > 0) ? (
                                          props.projects.filter(project => project.id === employee.project)[0]["name"]) : ""}</td>
                    <td style={{ width: "14%", textAlign:'center' }}>
                    {/* {console.log('url: ', employee.picture)} */}
                    <img src={employee.picture}
                    //{getEmployeePic(employee.id)} 
                      alt={employee.first_name + ' ' + employee.last_name} width='60' height='70'></img>
                    </td>
                    <td style={{ width: "6%", textAlign:'center' }}>{employee.phone}</td>
                    <td style={{ width: "15%", textAlign:'center' }}>{employee.email}</td>
                    <td className="table-action" style={{ width: "3%"}}> 
                      <Edit2 
                        onClick={() => props.getEmployeesModal(employee.id)}
                        className="align-middle mr-1"
                        size={18}
                      />
                    </td>
                    {/* <td className="table-action">
                      <Trash
                        onClick={() =>
                          props.removeEmployee(employee.id)
                        }
                        className="align-middle "
                        size={18}
                      />
                    </td> */}
                  </tr>) : '')
                );
              })
              :
              props.employees.filter(employee => employee.last_name ? employee.last_name.toLowerCase().includes(String(last_name)) : '').map(
                (employee, index) => {
                return ( 
                  (!(employee.id === 1) ? (
                  <tr key={index}>
                    <td style={{ width: "2%" }}>{index + 1}</td>
                    <td style={{ width: "6%", textAlign:'center' }}>{employee.personel_code}</td>
                    <td style={{ width: "10%", textAlign:'center' }}>{employee.first_name}</td>
                    <td style={{ width: "10%", textAlign:'center' }}>{employee.last_name}</td>
                    <td style={{ width: "4%", textAlign:'center' }}>
                      {employee.gender ? 'خانم' : 'آقا'}
                    </td>
                    <td style={{ width: "10%", textAlign:'center' }}>{(
                      employee.department && props.departments && props.departments.length > 0 &&
                      props.departments.filter(department => department.id === employee.department) && 
                      props.departments.filter(department => department.id === employee.department).length > 0 &&
                      props.companies && props.companies.length > 0) ? (
                                          props.companies.filter(company => 
                                            Number(company.id) === Number(props.departments.filter(department => 
                                              department.id === employee.department)[0]["company"]))[0]["name"])
                      : ""}
                    </td>                      
                    <td style={{ width: "12%", textAlign:'center' }}>{(employee.department && props.departments && props.departments.length > 0) ? (
                                          props.departments.filter(department => department.id === employee.department)[0]["name"]) : ""}</td>
                    <td style={{ width: "12%", textAlign:'center' }}>{(employee.jobPosition && props.jobPositions && props.jobPositions.length > 0) ? (
                                          props.jobPositions.filter(jobPosition => jobPosition.id === employee.jobPosition)[0]["name"]) : ""}</td>
                    <td style={{ width: "12%", textAlign:'center' }}>{(employee.project && props.projects && props.projects.length > 0) ? (
                                          props.projects.filter(project => project.id === employee.project)[0]["name"]) : ""}</td>
                    <td style={{ width: "14%", textAlign:'center' }}>
                      {/* {console.log('url: ', employee.picture)} */}
                      <img src={employee.picture}
                      //{getEmployeePic(employee.id)} 
                      alt={employee.first_name + ' ' + employee.last_name} width='60' height='70'></img>
                    </td>
                    <td style={{ width: "6%", textAlign:'center' }}>{employee.phone}</td>
                    <td style={{ width: "15%", textAlign:'center' }}>{employee.email}</td>
                    <td className="table-action" style={{ width: "3%"}}> 
                      <Edit2 
                        onClick={() => props.getEmployeesModal(employee.id)}
                        className="align-middle mr-1"
                        size={18}
                      />
                    </td>
                    {/* <td className="table-action">
                      <Trash
                        onClick={() =>
                          props.removeEmployee(employee.id)
                        }
                        className="align-middle "
                        size={18}
                      />
                    </td> */}
                  </tr>) : '')
                );
              }))
              : (<tr><td>not found</td></tr>)}
          </tbody>
          <tfoot id="tf">
            <tr>
              <th style={{ width: "80%", textAlign:'center' }}> تعداد کارمندان: {props.employees && props.employees.length > 0 ? 
              (last_name === '' ? props.employees.length - 1 : props.employees.filter(user => user.last_name.toLowerCase().includes(last_name)).length) : ''}</th>
            </tr>
          </tfoot>
        </Table>
        {/* <PlusCircle
            onClick={() => props.addEmployeeModel()}
            className="align-middle"
            size={18}
        /> */}
      </CardBody>
    </Card>
  );
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
