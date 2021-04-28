import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Row,
  Col
} from "reactstrap";
import logo from "../../assets/img/asft_login.png";
import { AuthStart } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { Validator } from "../../services/inputValidator";
import ScurityCode from "../../components/ScurityCode" 
import "./auth.css"
import { LogIn } from "react-feather";

class SignIn extends Component {
  constructor(props) {
    super(props);
    // this.login = this.login.bind(this);
    this.state = {
      //email: "",
      username: "",
      password: "",
      username_format_error: false,
      securityCode: '',
      loginTrialNo: 0,
      // reg_expression: /[a-z|A-Z]+\\.[a-z|A-Z|\\s]+/
    }
  }

  inputHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
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

  login = () => {console.log("login run")
    if(this.state.username === ""){
      alert('لطفا نام کاربری را وارد کنید')
      return
    }
    if(this.state.password === ""){
      alert('لطفا کلمه عبور را وارد کنید')
      return
    }
    if(this.state.username.match(/[a-z|A-Z]+\.[a-z|A-Z|\s]+/g) === null) {
      alert('لطفا فرمت نام کاربری را زعایت کنید')

      this.setState({
        loginTrialNo: this.state.loginTrialNo + 1
      })
      return
    }

    if(Number(this.state.loginTrialNo) <= 2){
      this.props.authStart(this.state.username, this.state.password, this.props.history) 
    }
    else{
      if(this.state.securityCode === ""){
        alert('لطفا کد امنیتی را وارد کنید')
        return
      }
      if(String(this.state.securityCode).toLowerCase() === String(sessionStorage.getItem('securityCode')).toLowerCase()){
        this.props.authStart(this.state.username, this.state.password, this.props.history)
      } 
      else alert('کد امنیتی اشتباه است!')
    }

    this.setState({
      loginTrialNo: this.state.loginTrialNo + 1
    })
  }

  render = () => {
    // var divVisiblity = {
    //   display: Number(this.state.loginTrialNo) > 1 ? "block" : "none"
    // }visibility:hidden 
    // var divVisiblity = {
    //   visibility: Number(this.state.loginTrialNo) > 1 ? "visible" : "hidden"
    // }
    var divVisiblity = {
      position: 'absolute',
      left: Number(this.state.loginTrialNo) > 1 ? "47px" : "-9999px"
    }
    return (
    <React.Fragment>
      <Card>
        <div className="text-center " >
          <div className="text-center">
            <img
              src={logo}
              alt="ASFT"
              className="img-fluid rounded-circle"
              width="132"
              height="132"
            />
          </div>
              <h2 className="mt-3">پرتال شرکت آسفالت طوس</h2>
        </div>


        {this.props.error && <CardHeader className="text-center position-absolute w-100" >
          <CardTitle className="m-0 text-danger">
            نام کاربری یا کلمه عبور مورد تائید نمی باشد !
          </CardTitle>
        </CardHeader>}
        {this.state.username_format_error ?
          <CardHeader className="text-center position-absolute w-100" >
            <CardTitle className="m-0 text-danger">
              نام کاربری یا کلمه عبور مورد تائید نمی باشد !
            </CardTitle>
          </CardHeader>
        : ''}
        <CardBody>
          <div className="m-sm-4">
            <Form onKeyPress={event => {
                if (event.key === 'Enter'){
                  this.login()
                }
              }
            }>
              <FormGroup>
                {/* <Label>Email Address</Label>
                <Input
                  onChange={this.InputHandler}
                  bsSize="lg"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                /> */}
                <Row>
                  <Col style={{textAlign:'right'}}>
                    <Label >نام کاربری</Label>
                    <Input style={{direction:'rtl'}}
                      onChange={this.inputHandler}
                      bsSize="lg"
                      type="text"
                      name="username"
                      placeholder="نام کاربری را وارد کنید"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col style={{textAlign:'right'}}>
                    <Label style={{direction:'rtl'}}>کلمه عبور</Label>
                    <Input style={{direction:'rtl'}}
                      onChange={this.inputHandler}
                      bsSize="lg"
                      type="password"
                      name="password"
                      placeholder="کلمه عبور را وارد کنید"
                    />
                    {/* <small>
                      <Link to="/auth/reset-password">کلمه عبور را فراموش کرده اید؟</Link>
                    </small> */}
                  </Col>
                </Row>
              </FormGroup>
              {/* {this.state.loginTrialNo > 2 ? ( */}
                <div style={divVisiblity}>
              <div style={{textAlign:'right'}}>
                    <Label >کد امنیتی</Label>
                    <Input style={{direction:'rtl'}}
                      onChange={this.inputHandler}
                      bsSize="lg"
                      type="text"
                      name="securityCode"
                      placeholder="کد امنیتی"
                    />
              </div>              
                <br/>
                <div>
                  <div className="canvas-border">
                    <ScurityCode/>
                  </div>
                </div>
                <br/>
              </div>
               {/* ):''} */}
              <div >
              <br/>
              <Button
                  disabled={(Number(this.state.loginTrialNo) > 1 && this.state.securityCode === "") || this.state.username === "" || this.state.password === "" || (this.state.username.match(/[a-z|A-Z]+\.[a-z|A-Z|\s]+/g) === null)}
                  onClick={() => this.login()}
                  color="primary" size="lg"
                  >
                    ورود به سیستم
                  </Button>

<br/>
<br/>
                {/* {!this.props.isShowSpinner ? (console.log('this.props.isShowSpinner: ', this.props.isShowSpinner),
                <div>
                  <Button
                    // disabled={this.state.securityCode === "" || this.state.username === "" || this.state.password === "" || (this.state.username.match(/[a-z|A-Z]+\.[a-z|A-Z|\s]+/g) === null)}
                    onClick={() => this.login}
                    color="primary" size="lg">
                    ورود به سیستم
                  </Button>
                </div>
                ) : <Spinner />} */}


              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>);
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
