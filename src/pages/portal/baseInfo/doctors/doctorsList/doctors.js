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
  RemoveDoctor,
  GetDoctorsModal,
  AddDoctorModel
} from "../../../../../redux/actions/doctorsActions";
import * as types from "../../../../../redux/constants";
import '../../baseInfo.css'

 

class doctorsList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            پزشکان
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "50%", textAlign:'center' }}>نوع</th>
                <th style={{ width: "45%", textAlign:'center' }}>نام</th>
                <th style={{ width: "3%" }}/>
                <th style={{ width: "3%" }}/>
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.doctors.length > 0 ? (
                this.props.doctors.map((doctor, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index + 1}</td>
                      <td style={{ width: "45%", textAlign:'center' }}>{doctor.doctorType && this.props.doctorTypes && (this.props.doctorTypes.length) > 0 ? (
                                            this.props.doctorTypes.filter(doctorType => doctorType.id === doctor.doctorType)[0]["name"]) : ''}</td>
                      <td style={{ width: "45%", textAlign:'center' }}>{doctor.employee && this.props.employees && (this.props.employees.length) > 0 ? (
                                            (this.props.employees.filter(employee => employee.id === doctor.employee) && this.props.employees.filter(employee => employee.id === doctor.employee).length > 0)?
                                            (this.props.employees.filter(employee => employee.id === doctor.employee)[0]["first_name"] + ' ' + 
                                            this.props.employees.filter(employee => employee.id === doctor.employee)[0]["last_name"]) : '') : ''}</td>                                            
                      <td style={{ width: "3%" }} className='table-action'>
                        <Edit2
                          onClick={() =>
                            this.props.getDoctorsModal(doctor.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeDoctor(doctor.id)
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
                this.props.addDoctorModel()
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
    employees: store.employees.employees,
    doctorTypes: store.doctorTypes.doctorTypes,
    doctors: store.doctors.doctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDoctor: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveDoctor(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_DOCTOR_MODAL
      }),
    getDoctorsModal: id => {
      dispatch(GetDoctorsModal(id))}, 
    addDoctorModel: () => {
      dispatch(AddDoctorModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(doctorsList);
