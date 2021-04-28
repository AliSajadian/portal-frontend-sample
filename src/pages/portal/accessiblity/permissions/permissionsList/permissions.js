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
  RemovePermission,
  GetPermissionsModal,
  AddPermissionModel
} from "../../../../../redux/actions/permissionsActions";
import * as types from "../../../../../redux/constants";
import '../../security.css'



class permissionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionName: ''
    };
  }

  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            مجوزهای کاربری
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "33%", textAlign:'center' }}>
                  <input style={{direction:'ltr'}}
                    id="permission-filter"
                    type="text"
                    value={this.state.permissionName}
                    onChange={(e) => this.setState({ permissionName: String(e.target.value).toLowerCase() })}
                  />
                  <br/>
                  مجوز کاربری
                </th>
                <th style={{ width: "33%", textAlign:'center' }}>نوع محتویات</th>                
                <th style={{ width: "33%", textAlign:'center' }}>کد مجوز</th>                
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.permissions.length > 0 ? (this.state.permissionName === '' ?
                this.props.permissions.map((permission, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index+1}</td>
                      <td style={{ width: "30%", textAlign:'center' }}>{permission.name}</td>
                      {/* <td style={{ textAlign:'center' }}>{permission.content_type}</td> */}
                      <td style={{ width: "30%", textAlign:'center' }}>{permission.content_type && this.props.contentTypes && (this.props.contentTypes.length) > 0 ? (
                                            String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["app_label"]) + '.' +
                                            String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["model"])
                                            ) : ""}</td>
                      <td style={{ width: "30%", textAlign:'center' }}>{permission.codename}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getPermissionsModal(permission.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removePermission(permission.id)
                          }
                          className="align-middle "
                          size={18}
                        />
                      </td>
                    </tr>
                  );
                }) :

                this.props.permissions.filter(permission => permission.name.toLowerCase().includes(String(this.state.permissionName))).map((permission, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index+1}</td>
                      <td style={{ width: "30%", textAlign:'center' }}>{permission.name}</td>
                      {/* <td style={{ textAlign:'center' }}>{permission.content_type}</td> */}
                      <td style={{ width: "30%", textAlign:'center' }}>{permission.content_type && this.props.contentTypes && (this.props.contentTypes.length) > 0 ? (
                                            String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["app_label"]) + '.' +
                                            String(this.props.contentTypes.filter(contentType => contentType.id === permission.content_type)[0]["model"])
                                            ) : ""}</td>
                      <td style={{ width: "30%", textAlign:'center' }}>{permission.codename}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getPermissionsModal(permission.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removePermission(permission.id)
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
            <tfoot id="tf">
              <tr>
                <th style={{ width: "80%", textAlign:'center' }}> تعداد کابران: {this.props.permissions && this.props.permissions.length > 0 ? (this.state.permissionName === '' ? this.props.permissions.length : this.props.permissions.filter(permission => permission.name.toLowerCase().includes(this.state.permissionName)).length) : ''}</th>
              </tr>
            </tfoot>
          </Table>
          <PlusCircle
              onClick={() =>
                this.props.addPermissionModel()
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
    permissions: store.permissions.permissions,
    contentTypes: store.contentTypes.contentTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removePermission: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemovePermission(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_PERMISSION_MODAL
      }),
    getPermissionsModal: id => {
      dispatch(GetPermissionsModal(id))}, 
    addPermissionModel: () => {
      dispatch(AddPermissionModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(permissionsList);
