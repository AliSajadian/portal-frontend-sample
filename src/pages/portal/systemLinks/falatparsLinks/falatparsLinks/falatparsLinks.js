import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { connect } from "react-redux";



class FalatParsLinks extends Component {
  render = () => {
    return (
      <Card style={{backgroundColor:"#eef3f8"}} dir="rtl">
        <CardHeader style={{backgroundColor:"#acccee"}}>
            <CardTitle tag="h5" className="mb-0" style={{fontWeight: "bold", textAlign:"center"}}>
            فلات پارس
          </CardTitle>
        </CardHeader>
        <CardBody></CardBody>
        </Card>
    )}
}

const mapStateToProps = store => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FalatParsLinks);