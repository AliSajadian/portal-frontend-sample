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
  DoctorTypeModalToggler,
  AddDoctorType,
  EditDoctorType
} from "../../../../../redux/actions/doctorTypesActions";



class DoctorTypeModal extends Component {
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
      if (this.props.DoctorTypeInEditStage){
        if(this.state.flag2 && this.props.DoctorTypeInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.DoctorTypeInEditStage.name,
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '',
          flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      name: event.target.value, 
      flag2: this.props.DoctorTypeInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const doctorType_Add = { name};

    if (!this.props.DoctorTypeInEditStage) {
      this.props.addDoctorType(doctorType_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.DoctorTypeInEditStage.id
      const doctorType_Edit = { id, name};

      this.props.editDoctorType(doctorType_Edit);
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
          ویرایش نوع پزشک
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
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
    isOpen: state.doctorTypes.isModalOpen,
    DoctorTypeInEditStage: state.doctorTypes.doctorTypeInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(DoctorTypeModalToggler()),
    addDoctorType: model => dispatch(AddDoctorType(model)),
    editDoctorType: model => dispatch(EditDoctorType(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorTypeModal);
