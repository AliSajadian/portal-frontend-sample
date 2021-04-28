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
  PermissionModalToggler,
  AddPermission,
  EditPermission
} from "../../../../../redux/actions/permissionsActions";
import '../../security.css'



class PermissionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content_type: 1,
      codename:'',
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.PermissionInEditStage){
        if(this.state.flag2 && this.props.PermissionInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.PermissionInEditStage.name, 
            content_type: this.props.PermissionInEditStage.content_type, 
            codename: this.props.PermissionInEditStage.codename, 
            flag: false, flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '', 
          content_type: 1,
          codename:'',
          flag: true
        });        
      }
    }
  }

  onChangeHandler = event => {
    switch(event.target.name)
    {
      case 'name':
        this.setState({
          name: event.target.value,
          flag2: this.props.PermissionInEditStage ? false : true
        });
        return;
      case 'codename':
        this.setState({
          codename: event.target.value,
        });
        return;
      default:
        return;
    }    
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name, content_type, codename } = this.state;
    const permission_Add = { name, content_type, codename };

    if (!this.props.PermissionInEditStage) {
      this.props.addPermission(permission_Add);
      this.setState({
        name: '',
        content_type: 1,
        codename: ''
      });
    } else {
      const id = this.props.PermissionInEditStage.id
      const permission_Edit = { id, name, content_type, codename};

      this.props.editPermission(permission_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    const { name, content_type, codename, isFormValid } = this.state;

    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش مجوز کاربری
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
                <label>مجوز کاربری</label>
                <br/>
                <input style={{ width: "50%" }}
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <label>نوع محتویات</label>
                <br/>
                <select value={content_type} style={{ width: "50%" }}
                onChange={(e) => this.setState({ content_type: e.target.value })}>
                {(this.props.contentTypes && this.props.contentTypes.length) > 0 ? (
                    this.props.contentTypes.map(contentType => <option key={contentType.id} value={contentType.id}>{contentType.app_label + '.' + contentType.model}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                
                <label>کد مجوز</label>
                <br/>
                <input style={{ width: "50%" }}
                  type="text"
                  name="codename"
                  value={codename}
                  onChange={this.onChangeHandler}
                ></input>
                <br/>
                <br/>
                <Button
                  disabled={!isFormValid}
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
    isOpen: state.permissions.isModalOpen,
    PermissionInEditStage: state.permissions.permissionInEditStage,
    contentTypes: state.contentTypes.contentTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(PermissionModalToggler()),
    addPermission: model => dispatch(AddPermission(model)),
    editPermission: model => dispatch(EditPermission(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionModal);
