import React from "react";
import { Card, CardBody, Container } from "reactstrap";
// import {connect} from "react-redux";
import "./index.css"



// require("fullcalendar");
// const $ = require("jquery");

class Home extends React.Component {
  componentDidMount() {
  }
  
  componentDidUpdate() {
  }

  render() {
    return (
      <Container >
        <h1 className="h3">پرتال سازمانی</h1>
        <Card >
          <CardBody style={{backgroundColor: "#e0e8f7"}}>
            {/* <div ><h5>{sessionStorage.getItem('user')}</h5></div> */}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Home
//connect(mapStateToProps , mapDispatchToProps)(Home);
