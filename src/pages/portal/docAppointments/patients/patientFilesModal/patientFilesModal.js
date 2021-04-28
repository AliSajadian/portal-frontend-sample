import React, { Component } from "react";
// import { Link } from "react-router-dom";
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
  CompanyModalToggler,
  AddCompany,
  EditCompany
} from "../../../../../redux/actions/companiesActions";


class CompanyModal extends Component {
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
      if (this.props.CompanyInEditStage){
        console.log('this.props.CompanyInEditStage.name: ', this.props.CompanyInEditStage.name)
        console.log('this.state.name: ', this.state.name)

        if(this.state.flag2 && this.props.CompanyInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.CompanyInEditStage.name, 
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
          ویرایش شرکت
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
    isOpen: state.companies.isModalOpen,
    CompanyInEditStage: state.companies.companyInEditStage
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
