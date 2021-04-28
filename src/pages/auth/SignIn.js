import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  // Spinner,
} from "reactstrap";
// import logo from "../../assets/img/asft_login.png";
import { AuthStart } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { Validator } from "../../services/inputValidator";
import SecurityCode from "../../components/SecurityCode" 
import "./auth.css"
// import { LogIn } from "react-feather";
import {
  AlertOpenModel
} from "../../redux/actions/alertActions";
import * as types from "../../redux/constants";
import refresh from "../../assets/img/icons/refresh2_1.jpg";
 


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //email: "",
      username: "",
      password: "",
      username_format_error: false,
      securityCode: '',
      loginTrialNo: 0,
      securityCodeRefresh: true,
      forceRefresh: false,
      // rtl: true,
    }
  }

  inputHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
      securityCodeRefresh: false,
    })

    if (name === "email") {
      let isValidEmail;
      isValidEmail = Validator({
        isEmail: true,
      }, value)
      if (!isValidEmail) {
        event.target.setAttribute("style", "border-color : #e1a6a6 ; box-shadow : 0 0 0 0.2rem rgba(193, 71, 71, 0.25)")
      }
      else {
        event.target.setAttribute("style", "border-color : #7fc63f ; box-shadow : 0 0 0 0.2rem rgba(71, 193, 80, 0.25)")
      }
      this.setState({
        isValidEmail: isValidEmail
      })
    }
  }

  refreshSecurityCode = () => {
    this.setState({
      forceRefresh: !this.state.forceRefresh,
    })
  }

  login = () => {
    if(this.state.username.match(/[a-z|A-Z]+\.[a-z|A-Z|\s]+/g) === null && this.state.username.match(/[a-z|A-Z]+\_[a-z|A-Z|\s]+/g) === null) {
      this.props.alertOpenModel('لطفا فرمت نام کاربری را رعایت کنید')
      return
    }

    if(Number(this.state.loginTrialNo) < 2){
      this.props.authStart(this.state.username, this.state.password, this.props.history) 
    }
    else{
      if(this.state.securityCode === ""){
        this.props.alertOpenModel('لطفا کد امنیتی را وارد کنید')
        return
      }
      if(String(this.state.securityCode).toLowerCase() === String(sessionStorage.getItem('securityCode')).toLowerCase()){
        this.props.authStart(this.state.username, this.state.password, this.props.history) 
      } 
      else {
        this.props.alertOpenModel('کد امنیتی اشتباه است')
        return
      }
    }

    this.setState({
      loginTrialNo: this.state.loginTrialNo + 1,
      securityCodeRefresh: true,
    })
  }

  render = () => {
    const{ loginTrialNo, securityCode, username, password, securityCodeRefresh, forceRefresh} = this.state

    var divVisiblity = {
      position: 'absolute',
      left: this.props.error && Number(loginTrialNo) >= 2  ? "2.85em" : "-9999px"
    }
    return (
      <div style={{overflow:'hidden'}}>
        {/* <div  >
          <div className="logo">
            <img
              src={logo}
              alt="ASFT"
              className="img-fluid rounded-circle"
              width="43"
              height="43"
            />
          </div>
          <div className="text">
            <span >پرتال سازمانی</span>
          </div>//     'اطلاعات پرسنلی ناقص میباشد، لطفا با راهبر سامانه تماس بگیرید!'
        </div> */}
        
        <br/>
        <br/>
        {/* {console.log('this.props.error: ', this.props.error)} */}
        {this.props.error ? (
          <div><span className="error" >
            {this.props.error.message === 'Info is not complited' ? 
              'اطلاعات پرسنلی ناقص میباشد، لطفا با راهبر سامانه تماس بگیرید.' :
              '!نام کاربری یا کلمه عبور مورد تائید نمی باشد ' }
          </span></div>) : ''
        }
        <div className="m-sm-4">
          <Form onKeyPress={event => {
              if (event.key === 'Enter'){
                this.login()
              }
            }
          }>

        <div style={{textAlign:'right'}}>
          <Input autoFocus
            className="text-box" 
            onChange={this.inputHandler}
            bsSize="sm"
            type="text"
            name="username"
            placeholder="نام کاربری را وارد کنید"
            // onFocus={() => this.username_focus()}
            //{}
          />
        </div>
<br/>
        <div style={{textAlign:'right'}}> 
          <Input className="text-box" 
            onChange={this.inputHandler}
            bsSize="sm"
            type="password"
            name="password"
            placeholder="کلمه عبور را وارد کنید"
            // onFocus={() => this.password_focus()}
          />
        </div>
<br/><br/>
        <div style={divVisiblity}>
          <div style={{textAlign:'right'}}>
                <Input className="text-box-code" style={{direction:'rtl'}}
                  onChange={this.inputHandler}
                  bsSize="sm"
                  type="text"
                  name="securityCode"
                  placeholder="کد امنیتی"
                  autoComplete="off"
                />
          </div>              
<br/>
          <div className="canvas-container">
            <img alt='' src={refresh} onClick={this.refreshSecurityCode} style={{width:'1.2em', height:'1.2em'}} className='refresh'/>
            <SecurityCode refresh={securityCodeRefresh} forceRefresh={forceRefresh} className="canvas"/>
          </div>
        </div>
        <div >
        <Button className="button" 
            disabled={(Number(loginTrialNo) > 1 && securityCode === "") || username === "" || password === "" || ((username.match(/[a-z|A-Z]+\.[a-z|A-Z|\s]+/g) === null) && (username.match(/[a-z|A-Z]+\_[a-z|A-Z|\s]+/g) === null))}
            onClick={() => this.login()}
            color="danger"
            size="sm"
            >
            <span >ورود به سامانه</span>
        </Button>
        <br/>
      </div>
      </Form>
      </div>
    </div>);
  }
};

const mapStateToProps = (store) => {
  return {
    isShowSpinner: store.auth.isShowSpinner,
    error: store.auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authStart: (username, password, history) => dispatch(AuthStart(username, password, history)),
    alertToggleModal: () =>
    dispatch({
      type: types.TOGGLE_ALERT_MODAL
    }),
    alertOpenModel: (message) => {
      dispatch(AlertOpenModel(message))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
