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
  RemoveUser,
  GetUsersModal,
  AddUserModel
} from "../../../../../redux/actions/usersActions";
// import {
//   RemoveEmployee
// } from "../../../../../redux/actions/employeesActions";
import * as types from "../../../../../redux/constants";
import '../index.css'
import '../../security.css'



class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }

  render = () => {
    return (
      <Card className='card3D'>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            کاربر ها
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table id="table" style={{direction:'rtl'}}hover striped responsive>
            <thead id="th">
              <tr>
                <th style={{ width: "4%" }}>#</th>
                <th style={{ width: "15%", textAlign:'center' }}>
                  <input style={{direction:'ltr'}}
                    id="user-filter"
                    type="text"
                    value={this.state.userName}
                    onChange={(e) => this.setState({ userName: e.target.value ? String(e.target.value).toLowerCase() : '' })}
                  />
                  <br/>
                  نام کاربری
                </th>
                {/* <th style={{ width: "20%", textAlign:'center' }}>نام کاربری</th> */}
                <th style={{ width: "10%", textAlign:'center' }}>نام</th>
                <th style={{ width: "10%", textAlign:'center' }}>نام خانوادگی</th>
                <th style={{ width: "22%", textAlign:'center' }}>پست الکترونیک</th>
                <th style={{ width: "4%", textAlign:'right' }}>فعال</th>
                <th style={{ width: "3%" }}/>
                <th style={{ width: "3%" }}/>
              </tr>
            </thead>
            <tbody id="tb">
                {this.props.users && this.props.users.length > 0 ? (this.state.userName === '' ?
                    this.props.users.map((user, index) => {
                      return ( (user.id !== 1 ?
                        <tr key={index} >
                          <td>{index+1}</td>
                          <td style={{ width: "20%", textAlign:'center' }}>{user.username}</td>
                          <td style={{ width: "15%", textAlign:'center' }}>{user.first_name}</td>
                          <td style={{ width: "15%", textAlign:'center' }}>{user.last_name}</td>
                          <td style={{ width: "32%", textAlign:'center' }}>{user.email}</td>
                          <td style={{ width: "6%", textAlign:'center' }}>{Boolean(user.is_active) ? 'بله' : 'خیر'}</td>
                          <td className="table-action" style={{ width: "3%", textAlign:'center' }}>
                            {(user.username && user.username.match(/[a-z|A-Z]+\_[a-z|A-Z|\s]+/g) !== null) ? (
                            <Edit2
                              onClick={() =>
                                this.props.getUsersModal(user.id)
                              }
                              className="align-middle mr-1"
                              size={18}
                            />):''}
                          </td>
                          <td className="table-action" style={{ width: "3%", textAlign:'center' }}>
                            {(user.username && user.username.match(/[a-z|A-Z]+\_[a-z|A-Z|\s]+/g) !== null) ? (
                            <Trash
                              onClick={() =>
                                this.props.removeUser(user.id)
                              }
                              className="align-middle "
                              size={18}
                              />):''}
                          </td>
                        </tr>
                        : '')
                      );
                    }) : 
                    this.props.users.filter(user => user.username ? user.username.toLowerCase().includes(String(this.state.userName)) : '').map((user, index) => {
                      return ( (user.id !== 1 ? 
                        <tr key={index} >
                          <td>{index+1}</td>
                          <td style={{ width: "20%", textAlign:'center' }}>{user.username}</td>
                          <td style={{ width: "15%", textAlign:'center' }}>{user.first_name}</td>
                          <td style={{ width: "15%", textAlign:'center' }}>{user.last_name}</td>
                          <td style={{ width: "32%", textAlign:'center' }}>{user.email}</td>
                          <td style={{ width: "6%", textAlign:'center' }}>{Boolean(user.is_active) ? 'بله' : 'خیر'}</td>
                          <td className="table-action" style={{ width: "3%", textAlign:'center' }}>
                            {(user.username && user.username.match(/[a-z|A-Z]+\_[a-z|A-Z|\s]+/g) !== null) ? (
                            <Edit2
                              onClick={() =>
                                this.props.getUsersModal(user.id)
                              }
                              className="align-middle mr-1"
                              size={18}
                              />):''}
                          </td>
                          <td className="table-action" style={{ width: "3%", textAlign:'center' }}>
                            {(user.username && user.username.match(/[a-z|A-Z]+\_[a-z|A-Z|\s]+/g) !== null) ? (
                            <Trash
                              onClick={() =>
                                this.props.removeUser(user.id)
                              }
                              className="align-middle"
                              size={18}
                              />):''}
                          </td>
                        </tr>
                        : '')
                      );
                    })
                  ) : (<tr><td>not found</td></tr>)}
            </tbody>
            <tfoot id="tf">
                  <tr>
                    <th style={{ width: "80%", textAlign:'center' }}> تعداد کابران: {this.props.users && this.props.users.length > 0 ? (this.state.userName === '' ? this.props.users.length - 1 : this.props.users.filter(user => user.username ? user.username.toLowerCase().includes(this.state.userName) : '').length) : ''}</th>
                  </tr>
                </tfoot>
          </Table>
          <PlusCircle
              onClick={() =>
                this.props.addUserModel()
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
    users : store.users.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveUser(id));
        // dispatch(RemoveEmployee(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_USER_MODAL
      }),
    getUsersModal: id => {
      dispatch(GetUsersModal(id))}, 
    addUserModel: () => {
      dispatch(AddUserModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
