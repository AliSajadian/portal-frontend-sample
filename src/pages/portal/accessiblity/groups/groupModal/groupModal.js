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
  GroupModalToggler,
  AddGroup,
  EditGroup
} from "../../../../../redux/actions/groupsActions";
import '../../security.css'



class GroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.GroupInEditStage){
        if(this.state.flag2 && this.props.GroupInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.GroupInEditStage.name, flag: false, flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '', flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      name: event.target.value,
      flag2: this.props.GroupInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const group_Add = { name};

    if (!this.props.GroupInEditStage) {
      this.props.addGroup(group_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.GroupInEditStage.id
      const group_Edit = { id, name};

      this.props.editGroup(group_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش گروه کاربری
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.InputChangeHandler}
                ></input>
                <Button
                  disabled={!this.state.isFormValid}
                  type="submit"
                  color="success"
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
    isOpen: state.groups.isModalOpen,
    GroupInEditStage: state.groups.groupInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(GroupModalToggler()),
    addGroup: model => dispatch(AddGroup(model)),
    editGroup: model => dispatch(EditGroup(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupModal);
