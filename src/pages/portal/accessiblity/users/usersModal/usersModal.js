import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Card,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import {
  UserModalToggler,
  AddUser,
  EditUser
} from "../../../../../redux/actions/usersActions";
// import {
//   AddEmployee,
// } from "../../../../../redux/actions/employeesActions";
import '../index.css'



class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      is_active: false,
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.userInEditStage){
        if(this.state.flag2 && this.props.userInEditStage.username !== this.state.username) { console.log('componentDidUpdate.is_active: ', this.props.userInEditStage.is_active)
          this.setState({
            username: this.props.userInEditStage.username,
            first_name: this.props.userInEditStage.first_name,
            last_name: this.props.userInEditStage.last_name,
            email: this.props.userInEditStage.email,
            is_active: this.props.userInEditStage.is_active,
            flag: false, flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          is_active: 0,
          flag: true
        });        
      }
    }
  }

  onChangeHandler = event => {
    switch(event.target.name)
    {
      case 'username':
        this.setState({
          username: event.target.value,
          flag2: this.props.userInEditStage ? false : true
        });
        return;
      case 'first_name':
        this.setState({
          first_name: event.target.value,
        });
        return;
      case 'last_name':
        this.setState({
          last_name: event.target.value,
        });
        return;
      case 'email':
        this.setState({
          email: event.target.value,
        });
        return;
      case 'is_active':
        this.setState({
          is_active: !this.state.is_active,
        });
        return;                         
      default:
        return;
    }    
  };

  InputChangeHandler = event => {
    this.setState({
      username: event.target.value,
      flag2: this.props.userInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();
    const password = 'pbkdf2_sha256$120000$Hd6Gc7ViBa9a$6FEGrzflAFpuO6SDYcWP5AxMTCooKoU24q/qMlhBOOc='
    const { username, first_name, last_name, email, is_active } = this.state;
    const user_Add = { password, username, first_name, last_name, email, is_active};

    if (!this.props.userInEditStage) {

      // const employee_add ={ first_name, last_name, phone=null, email, department=null, jobPosition=null, project=null, gender=1);

      // this.props.addEmployee(employee_add);
      console.log('user_Add: ', user_Add)
      this.props.addUser(user_Add);
      this.setState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        is_active: false
      });
    } else {
      const id = this.props.userInEditStage.id
      const user_Edit = { id, username, first_name, last_name, email, is_active};

      this.props.editUser(user_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    const { username, first_name, last_name, email, is_active, isFormValid } = this.state;
    return (
      <Modal style={{direction:'rtl'}} 
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader className="card-header" style={{direction:'ltr'}} toggle={this.props.modalToggleHandler}>
          ویرایش کاربر
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Card className="modal-card">
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <div className="grid-container">
                <label className="item1" > نام کاربری</label>
                <input className="item2" 
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.onChangeHandler}
                ></input>
                {/* <br/> */}
                
                <label className="item3" > نام </label>
                <input className="item4"
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={this.onChangeHandler}
                ></input>
                
                <label className="item5"> نام خانوادگی </label>
                <input className="item6" 
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={this.onChangeHandler}
                ></input>

                <label className="item7"> پست الکترونیک </label>
                <input className="item8" 
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onChangeHandler}
                ></input>

                <label className="item9"> کاربر فعال </label>
                <input className="item10" 
                  type="checkbox"
                  name="is_active"
                  value={is_active}
                  checked={is_active}
                  onChange={this.onChangeHandler}
                ></input>

                </div>
                <Button className='button'
                  // varient="secondary"
                  disabled={!isFormValid}
                  type="submit"
                  color="info"
                >
                  تائید
                </Button>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  };
}

const mapStateToProps = state => {
  return {
    isOpen: state.users.isModalOpen,
    userInEditStage: state.users.userInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(UserModalToggler()),
    addUser: model => dispatch(AddUser(model)),
    editUser: model => dispatch(EditUser(model)),
    // addEmployee: model => dispatch(AddEmployee(model)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
