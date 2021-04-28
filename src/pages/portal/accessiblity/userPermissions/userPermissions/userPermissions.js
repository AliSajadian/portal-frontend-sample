import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import '../index.css'
import { EditUserPermission } from "../../../../../redux/actions/permissionsActions";

class UserPermissionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPermissions: null,
      userName: ''
    };
  }

  userPermissionChanged = () => e => {
    let userPermission = {
      id: null,
      user_permissions: [] 
    }

    let userPermissions = null

    if(!this.state.userPermissions){
      userPermission = { 
        id: this.state.userID,
        user_permissions: [] 
      };
      userPermissions = { 
        id: this.state.userID,
        user_permissions: [] 
      };
    }
    else{
      let user_permissions = []
      if(this.state.userPermissions.user_permissions){
        this.state.userPermissions.user_permissions.forEach(permission => user_permissions.push(permission.id))
      }
      
      userPermission = {
        id: this.state.userPermissions.id,
        user_permissions: user_permissions
      }

      userPermissions = this.state.userPermissions
    }

    e.target.checked = !e.target.checked 

    if(userPermissions.user_permissions.filter(permission => Number(permission.id) === Number(e.target.value)).length > 0){
      userPermissions.user_permissions.pop({id: Number(e.target.value)})
      userPermission.user_permissions.pop(Number(e.target.value))
    }
    else{
      userPermissions.user_permissions.push({id: Number(e.target.value)})
      userPermission.user_permissions.push(Number(e.target.value))
    }

    this.props.editUserPermission(userPermission)

    this.setState({
      userPermissions
    });
  }

  render = () => { 
    // console.log('Permissions props: ', this.props.permissions)
    // console.log('userPermissions props: ', this.props.userPermissions)
    return (
      <Card id="card-main">
        <Container id="container" style={{direction:'rtl'}}>
          <Card id="card1">
            <CardHeader id="card-header1">
              <CardTitle tag="h5" className="mb-0">
                  کاربر ها 
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table id="table" className="table" style={{direction:'rtl'}} hover striped responsive>
                <thead id="th1">
                  <tr>
                    <th style={{ width: "2%" }}>#
                    <br/></th>
                    <th style={{ width: "50%", textAlign:'center' }}>
                      <input style={{direction:'ltr'}}
                        id="user-filter"
                        type="text"
                        value={this.state.userName}
                        onChange={(e) => this.setState({ userName: String(e.target.value).toLowerCase() })}
                      />
                      <br/>
                      نام کاربری
                    </th>
                    <th style={{ width: "20%", textAlign:'center' }}>نام
                    <br/></th>
                    <th style={{ width: "30%", textAlign:'center' }}>نام خانوادگی
                    <br/></th>
                  </tr>
                </thead>
                <tbody id="tb1" className="tbody">
                  {this.props.users && this.props.users.length > 0 ? (this.state.userName === '' ?
                    this.props.users.map((user, index) => {
                      return ( user.id !== 1 ? (
                        <tr key={index} onClick={() => this.setState({ userID: user.id, userPermissions : (this.props.userPermissions && this.props.userPermissions.filter(userPermission => userPermission.id === user.id)) ?this.props.userPermissions.filter(userPermission => userPermission.id === user.id)[0] : null })}>
                          <td>{index+1}</td>
                          <td style={{ width: "50%", textAlign:'center' }}>{user.username}</td>
                          <td style={{ width: "20%", textAlign:'center' }}>{user.first_name}</td>
                          <td style={{ width: "30%", textAlign:'center' }}>{user.last_name}</td>
                        </tr>): ''
                      );
                    }) : 
                    this.props.users.filter(user => user.username.toLowerCase().includes(String(this.state.userName))).map((user, index) => {
                      return ( user.id !== 1 ? (
                        <tr key={index} onClick={() => this.setState({ userID: user.id, userPermissions : (this.props.userPermissions && this.props.userPermissions.filter(userPermission => userPermission.id === user.id)) ?this.props.userPermissions.filter(userPermission => userPermission.id === user.id)[0] : null })}>
                          <td>{index+1}</td>
                          <td style={{ width: "50%", textAlign:'center' }}>{user.username}</td>
                          <td style={{ width: "20%", textAlign:'center' }}>{user.first_name}</td>
                          <td style={{ width: "30%", textAlign:'center' }}>{user.last_name}</td>
                        </tr>):''
                      );
                    })
                  ) : (
                    <tr><td>not found</td></tr>
                  )}
                </tbody>
                <tfoot id="tf1">
                  <tr>
                    <th style={{ width: "80%", textAlign:'center' }}> تعداد کابران: {this.props.users && this.props.users.length > 0 ? (this.state.userName === '' ? this.props.users.length : this.props.users.filter(user => user.username.toLowerCase().includes(this.state.userName)).length) : ''}</th>
                  </tr>
                </tfoot>
              </Table>
            </CardBody>
          </Card>
          <Card id="card2">
            <CardHeader id="card-header2">
              <CardTitle tag="h5" className="mb-0">
                  مجوزهای کاربری
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table id="table" className="table" style={{direction:'rtl'}}hover striped responsive >
                <thead id="th2">
                  <tr>
                    <th style={{ width: "3%" }}>#</th>
                    <th style={{ width: "7%" }}></th>
                    <th style={{ width: "90%", textAlign:'center' }}>مجوز کاربری</th>
                    {/* <th style={{ width: "20%", textAlign:'center' }}>نوع محتویات</th>                 */}
                    {/* <th style={{ width: "20%", textAlign:'center' }}>کد مجوز</th>     */}
                  </tr>
                </thead>
                <tbody id="tb2" className="tbody">
                  {this.props.permissions && this.props.permissions.length > 0 ? (
                    this.props.permissions.map((permission, index) => {
                      return ( 
                        (!(permission.id > 0 && permission.id < 9) && !(permission.id > 16 && permission.id < 25) && !(permission.id > 112 && permission.id < 121)) ? (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td >
                            <input 
                                type="checkbox"
                                value={permission.id}
                                checked={
                                  (this.state.userPermissions && this.state.userPermissions.user_permissions && 
                                    this.state.userPermissions.user_permissions.filter(p => Number(p.id) === Number(permission.id)) &&
                                    this.state.userPermissions.user_permissions.filter(p => Number(p.id) === Number(permission.id)).length > 0)}
                               onChange={this.userPermissionChanged()}
                              />
                          </td>
                          <td style={{ width: "90%", textAlign:'center' }}>{permission.name}</td>
                          {/* <td style={{ width: "20%", textAlign:'center' }}>{permission.content_type && this.props.contentTypes && (this.props.contentTypes.length) > 0 ? (
                                                    String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["app_label"]) + '.' +
                                                    String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["model"])
                                                    ) : ""}</td> */}
                          {/* <td style={{ width: "20%", textAlign:'center' }}>{permission.codename}</td> */}
                        </tr>) : ''
                      );
                    })
                  ) : (
                    <tr><td>not found</td></tr>
                  )}
                </tbody>
                {/* <tfoot id="tf2">
                  <tr>
                    <th style={{ width: "80%", textAlign:'center' }}> تعداد مجوزهای کاربری: {this.props.permissions && this.props.permissions.length > 0 ? (this.props.permissions.length) : ''}</th>
                  </tr>
                </tfoot> */}
              </Table>
            </CardBody>
          </Card>
        </Container>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    users: store.users.users,
    permissions: store.permissions.permissions,
    contentTypes: store.contentTypes.contentTypes,
    userPermissions: store.userPermissions.userPermissions, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUserPermission: (model) => dispatch(EditUserPermission(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPermissionsList);
