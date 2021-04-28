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
  ProjectModalToggler,
  AddProject,
  EditProject
} from "../../../../../redux/actions/projectsActions";



class ProjectModal extends Component {
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
      if (this.props.ProjectInEditStage){
        if(this.state.flag2 && this.props.ProjectInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.ProjectInEditStage.name,
            company: this.props.ProjectInEditStage.company,
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
      flag2: this.props.ProjectInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name, company } = this.state;
    const project_Add = { name, company};

    if (!this.props.ProjectInEditStage) {
      this.props.addProject(project_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.ProjectInEditStage.id
      const project_Edit = { id, name, company};

      this.props.editProject(project_Edit);
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
          ویرایش پروژه
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }} className="modal-body">
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
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.InputChangeHandler}
                ></input>
                <br/>
                <br/>                                
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
    companies: state.companies.companies,
    isOpen: state.projects.isModalOpen,
    ProjectInEditStage: state.projects.projectInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(ProjectModalToggler()),
    addProject: model => dispatch(AddProject(model)),
    editProject: model => dispatch(EditProject(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal);
