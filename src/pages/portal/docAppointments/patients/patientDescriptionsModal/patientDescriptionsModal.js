import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Card,
  CardBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import {
  CompanyModalToggler,
  AddCompany,
  EditCompany
} from "../../../../../redux/actions/companiesActions";



class CompanyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if (this.props.CompanyInEditStage){
        console.log('this.props.CompanyInEditStage.description: ', this.props.CompanyInEditStage.description)
        console.log('this.state.description: ', this.state.description)

        if(this.state.flag2 && this.props.CompanyInEditStage.description !== this.state.description) { 
          this.setState({
            description: this.props.CompanyInEditStage.description, 
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
      flag2: this.props.CompanyInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const company_Add = { name};

    if (!this.props.CompanyInEditStage) {
      this.props.addCompany(company_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.CompanyInEditStage.id
      const company_Edit = { id, name};

      this.props.editCompany(company_Edit);
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
        <ModalHeader  style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          توضیحات بیمار
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>

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
    isOpen: state.companies.isModalOpen,
    // PatientDescriptionInEditStage: state.patient.patientDescriptionInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(CompanyModalToggler()),
    addCompany: model => dispatch(AddCompany(model)),
    editCompany: model => dispatch(EditCompany(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyModal);
