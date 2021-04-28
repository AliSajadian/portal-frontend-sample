import React from "react";
import { Col, Container, Row } from "reactstrap";
import Main from "../components/Main";
import Settings from "../components/Settings";
import "./layout.css"
import logo from "../assets/img/portal_login.png";


const Auth = ({ children }) => (
  // <React.Fragment>
  //   <Main  className="d-flex w-100">
  //     <Container className="d-flex flex-column">
  //       <Row className="h-100">
  //         <Col sm="10" md="8" lg="6" className="mx-auto d-table h-100">
  //           <div className="d-table-cell align-middle">{children}</div>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </Main>
  //   {/* <Settings />         */}
  // </React.Fragment>                      className="layout-main-container"            <img alt="" src={logo} ></img>

    <div className="layout-main-background">
      {/* <img alt="" src={logo} ></img> */}
      <div className="grid-container" >
        <div className="item1" ></div>
        <div className="item2" ></div>
        <div className="item3" >
          {/* <div className="text">
            <span >پرتال سازمانی</span>
          </div> */}
        </div>

        <div className="item4" ></div>
        {/* style={{background:logo}} */}
        <div className="item5" >
        {/* style={{height:'400px', backgroundImage:logo}} */}
        </div>
        <div className="item6">
          <div className="layout-main">
            {/* <div className="line"></div> */}
            <div className="layout-main-box">
              {children}
            </div>
          </div>
        </div>
      </div>
      </div>
);

export default Auth;
