import React  
// ,{useEffect} 
from "react";
import { 
  // BrowserRouter as Router, 
  Route, Switch, Redirect } from "react-router-dom";
import {
  // landing as landingRoutes,
  dashboard as dashboardRoutes,
  // page as pageRoutes,

} from "./index";
import DashboardLayout from "../layouts/Dashboard";
// import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import { connect } from "react-redux";
import ScrollToTop from "../components/ScrollToTop";
import SignIn from "../pages/auth/SignIn";
// import {CheckAuthState} from "../redux/actions/authActions"
import {
  Col,
  Row,
} from "reactstrap";
import AlertModal from "../components/Alert";



const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout >
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
        // Route item without children
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout >
              <Component {...props} />
            </Layout>
          )}
        />
      )
  );

const Routes = (props) => {
  // console.log('Routes render()')
  return (
    <ScrollToTop >
      <Switch >
        {props.isAuthenticated ? childRoutes(DashboardLayout, dashboardRoutes) :
         <Switch>
            <Route path="/auth/sign-in" {...props} render={(props) => {
            return (
            <AuthLayout >
                <Row >
                  <Col >
                  <SignIn {...props} />
                  </Col>
                </Row>
                <AlertModal></AlertModal>
            </AuthLayout>
            )
          }} />
          <AuthLayout>
            <Redirect to="/auth/sign-in"></Redirect>
          </AuthLayout>
         </Switch>
        }
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authToken !== ""
  }
}


export default connect(mapStateToProps)(Routes);