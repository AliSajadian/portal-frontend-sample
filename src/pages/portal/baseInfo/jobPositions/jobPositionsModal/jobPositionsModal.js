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
  JobPositionModalToggler,
  AddJobPosition,
  EditJobPosition
} from "../../../../../redux/actions/jobPositionsActions";



class JobPositionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isFormValid: true,
      flag1: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.JobPositionInEditStage){
        if(this.state.flag2 && this.props.JobPositionInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.JobPositionInEditStage.name, 
            flag1: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag1 && this.state.name !== ''){
        this.setState({
          name: '',
          flag1: true,
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      name: event.target.value, 
      flag2: this.props.JobPositionInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const jobPosition_Add = { name};

    if (!this.props.JobPositionInEditStage) {
      this.props.addJobPosition(jobPosition_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.JobPositionInEditStage.id
      const jobPosition_Edit = { id, name};

      this.props.editJobPosition(jobPosition_Edit);

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
          ویرایش عنوان شغلی
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
    isOpen: state.jobPositions.isModalOpen,
    JobPositionInEditStage: state.jobPositions.jobPositionInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(JobPositionModalToggler()),
    addJobPosition: model => dispatch(AddJobPosition(model)),
    editJobPosition: model => dispatch(EditJobPosition(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPositionModal);
