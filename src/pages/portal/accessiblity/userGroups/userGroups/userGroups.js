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
import { EditUserGroup } from "../../../../../redux/actions/groupsActions";

class UserGroupsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroups: null,
      userName: ''
    };
  }

  componentDidUpdate() {
    // if(this.state.flag && !this.props.userGroups && this.props.userGroups.length !== this.state.UserGroups.length) { 

    //   this.setState({
    //     name: this.props.userGroups.name, flag: false
    //   });
    // }
  }


  userGroupChanged = () => e => {
    let userGroup = {
      id: null,
      groups: [] 
    }

    let userGroups = null

    if(!this.state.userGroups){
      userGroup = { 
        id: this.state.userID,
        groups: [] 
      };
      userGroups = { 
        id: this.state.userID,
        groups: [] 
      };
    }
    else{
      let groups = []
      if(this.state.userGroups.groups){
        this.state.userGroups.groups.forEach(group => groups.push(group.id))
      }
      
      userGroup = {
        id: this.state.userGroups.id,
        groups: groups
      }

      userGroups = this.state.userGroups
    }

    e.target.checked = !e.target.checked 

    if(userGroups.groups.filter(group => Number(group.id) === Number(e.target.value)).length > 0){
      userGroups.groups.pop({id: Number(e.target.value)})
      userGroup.groups.pop(Number(e.target.value))
    }
    else{
      userGroups.groups.push({id: Number(e.target.value)})
      userGroup.groups.push(Number(e.target.value))
    }

    this.props.editUserGroup(userGroup)

    this.setState({
      userGroups
    });
  }

  render = () => { 
    // console.log('userGroups state: ', this.state.userGroups)
    // console.log('userGroups props: ', this.props.userGroups)
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
              <Table className="table" style={{direction:'rtl'}} hover striped responsive>
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
                        <tr key={index} onClick={() => this.setState({ userID: user.id, userGroups : (this.props.userGroups && this.props.userGroups.filter(userGroup => userGroup.id === user.id)) ?this.props.userGroups.filter(userGroup => userGroup.id === user.id)[0] : null })}>
                          <td>{index+1}</td>
                          <td style={{ width: "50%", textAlign:'center' }}>{user.username}</td>
                          <td style={{ width: "20%", textAlign:'center' }}>{user.first_name}</td>
                          <td style={{ width: "30%", textAlign:'center' }}>{user.last_name}</td>
                        </tr> ):''
                      );
                    }) : 
                    this.props.users.filter(user => user.username.toLowerCase().includes(String(this.state.userName))).map((user, index) => {
                      return ( user.id !== 1 ? (
                        <tr key={index} onClick={() => this.setState({ userID: user.id, userGroups : (this.props.userGroups && this.props.userGroups.filter(userGroup => userGroup.id === user.id)) ?this.props.userGroups.filter(userGroup => userGroup.id === user.id)[0] : null })}>
                          <td>{index+1}</td>
                          <td style={{ width: "50%", textAlign:'center' }}>{user.username}</td>
                          <td style={{ width: "20%", textAlign:'center' }}>{user.first_name}</td>
                          <td style={{ width: "30%", textAlign:'center' }}>{user.last_name}</td>
                        </tr> ) : ''
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
                  گروههای کاربری
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table id="table" className="table" style={{direction:'rtl'}}hover striped responsive>
                <thead id="th2">
                  <tr>
                    <th style={{ width: "3%" }}>#</th>
                    <th style={{ width: "7%" }}></th>
                    <th style={{ width: "90%", textAlign:'center' }}>گروه کاربری</th>
                  </tr>
                </thead>
                <tbody id="tb2" className="tbody">
                  {this.props.groups && this.props.groups.length > 0 ? (
                    this.props.groups.filter(group => group.id !== 1).sort((a, b) => a.id - b.id).map((group, index) => {
                      return ( 
                        (group.id !== 2 || (group.id === 2 && (sessionStorage.getItem('userid') === '1' || sessionStorage.getItem('username') === 'a.sajadian'))) ? (
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>
                              <input 
                                  type="checkbox"
                                  value={group.id}
                                  checked={
                                    (this.state.userGroups && this.state.userGroups.groups && 
                                      this.state.userGroups.groups.filter(g => Number(g.id) === Number(group.id)) &&
                                      this.state.userGroups.groups.filter(g => Number(g.id) === Number(group.id)).length > 0)}
                                onChange={this.userGroupChanged()}
                                />
                            </td>
                            <td style={{ width: "90%", textAlign:'center' }}>{group.name}</td>
                          </tr>
                        ):''
                      );
                    })
                  ) : (
                    <tr><td>not found</td></tr>
                  )}
                </tbody>
                {/* <tfoot id="tf2">
                  <tr>
                    <th style={{ width: "80%", textAlign:'center' }}> تعداد گروهها: {this.props.groups && this.props.groups.length > 0 ? (this.props.groups.length) : ''}</th>
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
    groups: store.groups.groups,
    userGroups: store.userGroups.userGroups, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUserGroup: (model) => dispatch(EditUserGroup(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupsList);
