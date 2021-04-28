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
import { EditGroupPermission } from "../../../../../redux/actions/permissionsActions";

class GroupPermissionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPermissions: null,
      groupName: ''
    };
  }

  groupPermissionChanged = () => e => {
    let groupPermission = {
      id: null,
      permissions: [] 
    }

    let groupPermissions = null

    if(!this.state.groupPermissions){
      groupPermission = { 
        id: this.state.groupID,
        permissions: [] 
      };
      groupPermissions = { 
        id: this.state.groupID,
        permissions: [] 
      };
    }
    else{
      let permissions = []
      if(this.state.groupPermissions.permissions){
        this.state.groupPermissions.permissions.forEach(permission => permissions.push(permission.id))
      }
      
      groupPermission = {
        id: this.state.groupPermissions.id,
        permissions: permissions
      }

      groupPermissions = this.state.groupPermissions
    }

    e.target.checked = !e.target.checked 

    if(groupPermissions.permissions.filter(permission => Number(permission.id) === Number(e.target.value)).length > 0){
      groupPermissions.permissions.pop({id: Number(e.target.value)})
      groupPermission.permissions.pop(Number(e.target.value))
    }
    else{
      groupPermissions.permissions.push({id: Number(e.target.value)})
      groupPermission.permissions.push(Number(e.target.value))
    }

    this.props.editGroupPermission(groupPermission)

    this.setState({
      groupPermissions
    });
  }

  render = () => { 
    console.log('Permissions props: ', this.props.permissions)
    console.log('groupPermissions props: ', this.props.groupPermissions)
    return (
      <Card id="card-main">
        <Container id="container" style={{direction:'rtl'}}>
          <Card id="card1">
            <CardHeader id="card-header1">
              <CardTitle tag="h5" className="mb-0">
              گروه  کاربری
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="table" id="table" style={{direction:'rtl'}} hover striped responsive>
                <thead id="th1">
                  <tr>
                    <th style={{ width: "2%" }}>#
                    <br/></th>
                    <th style={{ width: "98%", textAlign:'center' }}>
                      <input style={{direction:'ltr'}}
                        id="group-filter"
                        type="text"
                        value={this.state.groupName}
                        onChange={(e) => this.setState({ groupName: String(e.target.value).toLowerCase() })}
                      />
                      <br/>
                      گروه کاربری
                    </th>
                  </tr>
                </thead>
                <tbody id="tb1" className="tbody">
                  {this.props.groups && this.props.groups.length > 0 ? (this.state.groupName === '' ?
                    this.props.groups.filter(group => group.id !== 1).sort((a, b) => a.id - b.id).map((group, index) => {
                      return ( 
                        (group.id !== 2 || (group.id === 2 && sessionStorage.getItem('userid') === '1')) ? (
                        <tr key={index} onClick={() => this.setState({ groupID: group.id, groupPermissions : (this.props.groupPermissions && this.props.groupPermissions.filter(groupPermission => groupPermission.id === group.id)) ? this.props.groupPermissions.filter(groupPermission => groupPermission.id === group.id)[0] : null })}>
                          <td>{index+1}</td>
                          <td style={{ width: "98%", textAlign:'center' }}>{group.name}</td>
                        </tr>) : ''
                      );
                    }) : 
                    this.props.groups.filter(group => group.id !== 1 && group.name.toLowerCase().includes(String(this.state.groupName))).map((group, index) => {
                      return ( 
                        (group.id !== 2 || (group.id === 2 && sessionStorage.getItem('userid') === '1')) ? (
                          <tr key={index} onClick={() => this.setState({ groupID: group.id, groupPermissions : (this.props.groupPermissions && this.props.groupPermissions.filter(groupPermission => groupPermission.id === group.id)) ?this.props.groupPermissions.filter(groupPermission => groupPermission.id === group.id)[0] : null })}>
                          <td>{index+1}</td>
                          <td style={{ width: "98%", textAlign:'center' }}>{group.name}</td>
                        </tr>):''
                      );
                    })
                  ) : (
                    <tr><td>not found</td></tr>
                  )}
                </tbody>
                <tfoot id="tf1">
                  <tr>
                    <th style={{ width: "80%", textAlign:'center' }}> تعداد کابران: {this.props.groups && this.props.groups.length > 0 ? (this.state.groupName === '' ? this.props.groups.length : this.props.groups.filter(group => group.name.toLowerCase().includes(this.state.groupName)).length) : ''}</th>
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
              <Table className="table" id="table" style={{direction:'rtl'}}hover striped responsive>
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
                                  (this.state.groupPermissions && this.state.groupPermissions.permissions && 
                                    this.state.groupPermissions.permissions.filter(p => Number(p.id) === Number(permission.id)) &&
                                    this.state.groupPermissions.permissions.filter(p => Number(p.id) === Number(permission.id)).length > 0)}
                               onChange={this.groupPermissionChanged()}
                              />
                          </td>
                          <td style={{ width: "90%", textAlign:'center' }}>{permission.name}</td>
                          {/* <td style={{ width: "20%", textAlign:'center' }}>{permission.content_type && this.props.contentTypes && (this.props.contentTypes.length) > 0 ? (
                                                    String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["app_label"]) + '.' +
                                                    String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["model"])
                                                    ) : ""}</td> */}
                          {/* <td style={{ width: "20%", textAlign:'center' }}>{permission.codename}</td> */}
                        </tr>):''
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
    groups: store.groups.groups,
    permissions: store.permissions.permissions,
    contentTypes: store.contentTypes.contentTypes,
    groupPermissions: store.groupPermissions.groupPermissions, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editGroupPermission: (model) => dispatch(EditGroupPermission(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPermissionsList);
