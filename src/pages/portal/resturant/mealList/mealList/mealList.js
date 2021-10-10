import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import { Edit2, Trash, PlusCircle } from "react-feather";
import { connect } from "react-redux";
import {
  RemoveMeal,
  GetMealsModal,
  AddMealModel
} from "../../../../../redux/actions/mealsActions";
import * as types from "../../../../../redux/constants";
import '../../restaurant.css'


class mealsList extends Component {
  render = () => {
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader >
            <CardTitle tag="h5">
            لیست غذاها
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table  hover striped responsive >
            <thead id='th'>
              <tr id='tr'>
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center'  }}>نام غذا</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id='tb'>
              {this.props.meals &&
              // this.props.meals.length > 1 ? (
              //   this.props.meals.filter(meal => (meal.id > 1)).map((meal, index) => {
                
                  this.props.meals.map((meal, index) => {                  
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%" }}>{index + 1}</td>
                      <td style={{ width: "90%", textAlign:'center'  }}>{meal.name}</td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getMealsModal(meal.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%" }} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeMeal(meal.id)
                          }
                          className="align-middle "
                          size={18}
                        />
                      </td>
                    </tr>
                  );
                })
              // ) : (
              //   <tr><td>not found</td></tr>
              // )
            }
            </tbody>
            <tfoot id="tf">
                  <tr>
                    <th style={{ width: "80%", textAlign:'center' }}> تعداد غذا: {this.props.meals && this.props.meals.length > 0 ? this.props.meals.length : ''}</th>
                  </tr>
                </tfoot>
          </Table>
          <PlusCircle
              onClick={() =>
                this.props.addMealModel()
              }
              className="align-middle"
              size={18}
          />
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    meals: store.meals.meals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMeal: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveMeal(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_MEAL_MODAL
      }),
    getMealsModal: id => {
      dispatch(GetMealsModal(id))}, 
    addMealModel: () => {
      dispatch(AddMealModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mealsList);
