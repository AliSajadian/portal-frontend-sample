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
  RemoveGroup,
  GetGroupsModal,
  AddGroupModel
} from "../../../../../redux/actions/groupsActions";
import * as types from "../../../../../redux/constants";
import '../../security.css'



class groupsList extends Component {
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5" >
            گروه های کاربری
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id='th1'>
              <tr id='tr'>
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center' }}>گروه کاربری</th>
                <th />
                <th/>
              </tr>
            </thead>
            <tbody id='tb'>
              {this.props.groups.length > 0 ? (
                this.props.groups.filter(group => group.id !== 1).sort((a, b) => a.id - b.id).map((group, index) => {
                  return ( 
                    (group.id !== 2 || (group.id === 2 && sessionStorage.getItem('userid') === '1')) ? (
                    <tr key={index} style={{ width: "4%" }}>
                      <td>{index+1}</td>
                      <td style={{ width: "90%", textAlign:'center' }}>{group.name}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getGroupsModal(group.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeGroup(group.id)
                          }
                          className="align-middle "
                          size={18}
                        />
                      </td>
                    </tr>): <tr><td>not found</td></tr>
                  );
                  
                })
              ) : (
                <tr><td>not found</td></tr>
              )}
            </tbody>
          </Table>
          <PlusCircle
              onClick={() =>
                this.props.addGroupModel()
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
    groups: store.groups.groups
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeGroup: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveGroup(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_GROUP_MODAL
      }),
    getGroupsModal: id => {
      dispatch(GetGroupsModal(id))}, 
    addGroupModel: () => {
      dispatch(AddGroupModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(groupsList);
