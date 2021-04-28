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
  MealModalToggler,
  AddMeal,
  EditMeal
} from "../../../../../redux/actions/mealsActions";
import '../../restaurant.css'



class MealModal extends Component {
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
      if (this.props.MealInEditStage){
        if(this.state.flag2 && this.props.MealInEditStage.name !== this.state.name) { 
          this.setState({
            name: this.props.MealInEditStage.name, flag: false, flag2: true
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
      flag2: this.props.MealInEditStage ? false : true
    });
  };

  SubmitFormHandler = event => {
    event.preventDefault();

    const { name } = this.state;
    const meal_Add = { name};

    if (!this.props.MealInEditStage) {
      this.props.addMeal(meal_Add);
      this.setState({
        name: ""
      });
    } else {
      const id = this.props.MealInEditStage.id
      const meal_Edit = { id, name};

      this.props.editMeal(meal_Edit);
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
          ویرایش غذا
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
    isOpen: state.meals.isModalOpen,
    MealInEditStage: state.meals.mealInEditStage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggleHandler: () => dispatch(MealModalToggler()),
    addMeal: model => dispatch(AddMeal(model)),
    editMeal: model => dispatch(EditMeal(model))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealModal);
