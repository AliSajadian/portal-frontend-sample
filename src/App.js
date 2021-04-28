import React , {Component} from "react";
// import { Provider } from "react-redux";
import {withRouter} from "react-router-dom";
import ReduxToastr from "react-redux-toastr";
import {CheckAuthState} from "../src/redux/actions/authActions"
// import store from "./redux/store/index";
import Routes from "./routes/Routes";
import {connect} from "react-redux";
// import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  componentDidMount(){  
    this.props.checkAuthState(this.props.history);
  }
  render = () => {
    return (
    <React.Fragment>
      <div  style={{ textAlign:'right', overflow:'hidden'}}>
      <Routes />
      <ReduxToastr
        timeOut={5000}
        newestOnTop={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      /></div>
    </React.Fragment>
    )
  }
};
   
const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthState : (history) => dispatch(CheckAuthState(history))
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
