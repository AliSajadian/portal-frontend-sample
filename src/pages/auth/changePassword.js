import React, { Component } from 'react';
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
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { ChangeUsernamePassword } from "../../redux/actions/authActions";


class changePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usename: "",
      currentpassword: "",
      newpassword: "",
      newpassword1: "",
      isFormValid: true,
      flag: false
    };
  }

  OnChangeHandler = event => {
    switch(event.target.name)
    {
      case 'username':
        this.setState({
          username: event.target.value
        });
        return;
      case 'currentpassword':
        this.setState({
          currentpassword: event.target.value
        });
        return;
      case 'newpassword':
        this.setState({
          newpassword: event.target.value
        });
        return;
      case 'newpassword1':
        this.setState({
          newpassword1: event.target.value
        });
        return;
      default:
        return;
    }
  };

  SubmitFormHandler = event => {
    event.preventDefault();
    const userid = Number(sessionStorage.getItem('userid'))
    const { username, currentpassword, newpassword, newpassword1 } = this.state;
    if(currentpassword === newpassword){
      alert("کلمه عبور جدید با کلمه عبور قبلی نمی توانند یکسان باشند");
      return;
    }
    if(newpassword.length < 4){
      alert("طول کلمه عبور نمی تواند از 4 حرف کمتر باشد");
      return;
    }
    if(username === newpassword){
      alert("کلمه عبور و نام کاربری نمی توانند یکسان باشند");
      return;
    }
    if(newpassword !== newpassword1){
      alert("کلمه عبور جدید تائید نشد");
      return;
    }
    // console.log('body1: ', userid, username, currentpassword, newpassword)

    this.props.changeUsernamePassword(userid, username, currentpassword, newpassword);
    this.setState({
      username: "",
      currentpassword: "",
      newpassword: "",
      newpassword1: ""
    });
  };

  onCancelHandler = () => {
    this.setState({
      username: "",
      currentpassword: "",
      newpassword: "",
      newpassword1: ""
    });
  };


  render = () => {
    const { username, currentpassword, newpassword, newpassword1, isFormValid } = this.state;
    return (
      <React.Fragment>
      <div style={{padding:'auto'}}>
      <Card className='card3D_'>
        <CardHeader>
          <CardTitle tag="h5">
            تغییر کلمه عبور
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div >
            <Form onSubmit={this.SubmitFormHandler}>              
              <FormGroup>
                <Card className='card-inner-body'>
                  <Label>نام کابری</Label>
                  <Input style={{direction:'rtl'}} className="text-box" 
                    bsSize="sm"
                    type="text"
                    name="username"
                    placeholder="نام کابری را وارد کنید"
                    value={username}
                    onChange={this.OnChangeHandler}
                  />
                  <Label>کلمه عبور</Label>
                  <Input style={{direction:'rtl'}} className="text-box" 
                    bsSize="sm"
                    type="password"
                    name="currentpassword"
                    placeholder="کلمه عبور را وارد کنید"
                    value={currentpassword}
                    onChange={this.OnChangeHandler}
                  />
                  <br/>
              </Card>
                <Card className='card-inner-body'>
                  <Label>کلمه عبور جدید</Label>
                    <Input style={{direction:'rtl'}} className="text-box"
                      bsSize="sm"
                      type="password"
                      name="newpassword"
                      placeholder="کلمه عبور جدید را وارد کنید"
                      value={newpassword}
                      onChange={this.OnChangeHandler}
                    />
                    <Label>تائید کلمه عبور جدید</Label>
                    <Input style={{direction:'rtl'}} className="text-box"
                      bsSize="sm"
                      type="password"
                      name="newpassword1"
                      placeholder="کلمه عبور را مجددا وارد کنید"
                      value={newpassword1}
                      onChange={this.OnChangeHandler}
                    />            
                    <br/>
                </Card>
              </FormGroup>
              <div >
                <div >
                    <Button className="button-change-password"                 
                      // disabled={!isFormValid}
                      type="button"
                      color="danger" size="sm"
                      onClick={this.onCancelHandler}>
                      انصراف
                    </Button>
                    <Button className="button-change-password" style={{marginLeft:'.5em'}}
                      disabled={!isFormValid}
                      type="submit"
                      color="primary" size="sm">
                      تائید
                    </Button>
                </div>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
      </div>
    </React.Fragment>
    )}
    }

    const mapDispatchToProps = dispatch => {
      return {
        changeUsernamePassword: (userid, username, currentpassword, newpassword) => {
          dispatch(ChangeUsernamePassword(userid, username, currentpassword, newpassword))}
      };
    };
    export default connect(null, mapDispatchToProps)(changePassword);


