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
  DepartmentModalToggler,
  AddDepartment,
  EditDepartment
} from "../../../../../redux/actions/departmentsActions";



class DepartmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: 1,
      isFormValid: true,
      flag: true,
      flag2: true
    };
  }

  componentDidUpdate() {
    if(this.props.isOpen){
      if(this.props.DepartmentInEditStage){
        if(this.state.flag2 && this.props.DepartmentInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.DepartmentInEditStage.name,
            company: this.props.DepartmentInEditStage.company,
            flag: false,
            flag2: true
          });
        }
      }
      else if(!this.state.flag && this.state.name !== ''){
        this.setState({
          name: '',
          company: 1,
          flag: true
        });        
      }
    }
  }

  InputChangeHandler = event => {
    this.setState({
      name: event.target.value, 
      flag2: this.props.DepartmentInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name, company } = this.state;
    const department_Add = { name, company};

    if (!this.props.DepartmentInEditStage) {
      this.props.addDepartment(department_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.DepartmentInEditStage.id
      const department_Edit = { id, name, company};

      this.props.editDepartment(department_Edit);
      this.setState({
        flag2: true
      });
    }
  };

  render = () => {
    const { company, name, isFormValid } = this.state;
    return (
      <Modal style={{direction:'rtl'}}
        size="sm"
        centered
        isOpen={this.props.isOpen}
        toggle={this.props.modalToggleHandler}
      >
        <ModalHeader style={{direction:'ltr'}} toggle={this.props.modalToggleHandler} className="card-header">
          ویرایش دپارتمان
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}  className="modal-body">
          <Card>
            <CardBody>
              <Form onSubmit={this.SubmitFormHandler}>
              <label>شرکت</label>
                <br/>
                <select value={company?company:(this.props.companies && this.props.companies.length > 0) ? this.props.companies[0].id: null} 
                onChange={(e) => this.setState({ company: e.target.value })}>
                {(this.props.companies && this.props.companies.length > 0) ? (
                    this.props.companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>
                    )) : (
                      <div>not found</div>
                    )}                    
                </select>
                <br/>
                <br/>
                <label>دپارتمان</label>
                <br/>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.InputChangeHandler}
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
    companies: state.companies.companies,
    isOpen: state.departments.isModalOpen,
    DepartmentInEditStage: state.departments.departmentInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(DepartmentModalToggler()),
    addDepartment: model => dispatch(AddDepartment(model)),
    editDepartment: model => dispatch(EditDepartment(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModal);
