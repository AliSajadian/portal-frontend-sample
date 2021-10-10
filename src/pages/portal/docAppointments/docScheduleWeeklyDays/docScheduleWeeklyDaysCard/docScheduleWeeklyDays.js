import React, { Component } from "react";
import {connect} from "react-redux";
import {
  Button,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Container
} from "reactstrap";
import {
  RemoveDocScheduleWeeklyDay,
  EditDocScheduleWeeklyDay,
  AddDocScheduleWeeklyDay
} from "../../../../../redux/actions/docScheduleWeeklyDaysActions";
import '../../docAppointment.css'



class docScheduleWeeklyDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week_day: 7,
      start_hour: "12:00",
      end_hour: "14:00",
      doctor: 0
    };
  }
  
  componentDidUpdate() {
    if(this.props.doctors && this.props.doctors.length > 0 && this.state.doctor === 0)
    {
      this.setState({
        doctor: this.props.doctors[0].id
      })
    }
  }

  setWeekDayState = weekdaystate => {
    this.setState({
      week_day: weekdaystate
    });
  };

  onChangeTime = event => {
    switch(event.target.name)
    {
      case 'start_hour':
        this.setState({
          start_hour: event.target.value
        });
        return;
      case 'end_hour':
        this.setState({
          end_hour: event.target.value
        });
        return;
      default:
        return;
    }
  };

  saveWeekDay = event => {
    const { week_day, start_hour, end_hour, doctor } = this.state;
    const selectedweekday = { week_day, start_hour, end_hour, doctor };
    this.props.addDocScheduleWeeklyDay(selectedweekday);
    this.setState({
      week_day: 7,
    });
  };

  render = () => {
    const { week_day, start_hour, end_hour, doctor } = this.state;
    return (
      <Card style={{direction:'rtl'}} className='card3D'>
        <CardHeader className='card-header'>
          <CardTitle tag="h5" className="mb-0">
          برنامه هفتگی
          </CardTitle>
        </CardHeader>
        <CardBody className='card-body'>
            <Card >
              <Row noGutters >
                <Col>
                  <select value={doctor} style={{width:'25%'}} className='select'
                    onChange={(e) => this.setState({ doctor: e.target.value })}>
                    {(this.props.doctors && this.props.doctors.length) > 0 ? (
                        this.props.doctors.map(doctor => 
                        <option key={doctor.id} value={doctor.id}>{
                          ((this.props.employees.filter(employee => employee.id === doctor.employee)) && 
                          (this.props.employees.filter(employee => employee.id === doctor.employee)).length>0 ? ' دکتر ' +
                          (this.props.employees.filter(employee => employee.id === doctor.employee))[0].first_name: '') + ' ' +
                          ((this.props.employees.filter(employee => employee.id === doctor.employee)) && 
                          (this.props.employees.filter(employee => employee.id === doctor.employee)).length>0 ?
                          (this.props.employees.filter(employee => employee.id === doctor.employee))[0].last_name: '')}</option>
                        )) : (
                          ""
                          )}                    
                  </select>
                </Col>
              </Row>
            </Card>
            <Card >
            <Container >
              <Row  >
                <Col  >
                  <Card >
                    <CardBody>
                      <CardTitle><div style={{textAlign:'right'}}><span style={{fontWeight:'bold'}}>شنبه</span></div></CardTitle> 
                      <Button variant="primary"
                          onClick={() =>
                            this.setWeekDayState(6)
                          }
                          color="info"
                          size={'18'}
                      ><span style={{fontSize:'1.1rem', fontWeight:'bold'}}>+</span></Button>
                    </CardBody>
                  </Card>
                </Col>
                {this.props.docScheduleWeeklyDays ?
                (this.props.docScheduleWeeklyDays.filter(docScheduleWeeklyDay => Number(docScheduleWeeklyDay.doctor) === Number(doctor) && 
                                                            Number(docScheduleWeeklyDay.week_day) === 6).map((scheduleWeeklyDay, index) => (
                  <Col key={index}  >
                    <Card className='con-calender'>
                      <Card className='con-calender-inner'>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت شروع</Label>
                          </Col>
                          <Col >
                            <Input 
                              type="time"
                              name="start_hour"
                              onChange={this.onChangeTime}
                              value={scheduleWeeklyDay.start_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت پایان</Label>
                          </Col>
                          <Col >
                            <Input 
                              id="time"
                              type="time"
                              onChange={this.onChangeTime}
                              name="end_hour"
                              value={scheduleWeeklyDay.end_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <Button variant="primary" style={{width:'5em'}}
                              onClick={() =>
                                this.props.removeDocScheduleWeeklyDay(scheduleWeeklyDay.id)
                              }
                              color="danger"
                              // className="align-middle"
                              size={'10'}
                          >حذف</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))): ""}
                {(week_day === 6) ? 
                <Col>
                  <Card className='con-calender'>
                    <Card className='con-calender-inner'>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت شروع</label>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت پایان</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <input
                          type="time"
                          name="start_hour"
                          onChange={this.onChangeTime}
                          value={start_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <input
                          id="time"
                          type="time"
                          onChange={this.onChangeTime}
                          name="end_hour"
                          value={end_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                    </Row>
                    </Card>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.saveWeekDay()
                            }
                            color="info"
                            size={'10'}
                        >تائید</Button>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.setWeekDayState(7)
                            }
                            color="danger"
                            size={'10'}
                        >انصراف</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                : ""}
              </Row>
              <Row  >
                <Col  >
                  <Card >
                    <CardBody>
                      <CardTitle><div style={{textAlign:'right'}}><span style={{fontWeight:'bold'}}>یکشنبه</span></div></CardTitle> 
                      <Button variant="primary"
                          onClick={() =>
                            this.setWeekDayState(0)
                          }
                          color="info"
                          size={'18'}
                      ><span style={{fontSize:'1.1rem', fontWeight:'bold'}}>+</span></Button>
                    </CardBody>
                  </Card>
                </Col>
                {this.props.docScheduleWeeklyDays ?
                (this.props.docScheduleWeeklyDays.filter(docScheduleWeeklyDay => Number(docScheduleWeeklyDay.doctor) === Number(doctor) && 
                                                            Number(docScheduleWeeklyDay.week_day) === 0).map((scheduleWeeklyDay, index) => (
                  <Col key={index}  >
                    <Card className='con-calender'>
                      <Card className='con-calender-inner'>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت شروع</Label>
                          </Col>
                          <Col >
                            <Input 
                              type="time"
                              name="start_hour"
                              onChange={this.onChangeTime}
                              value={scheduleWeeklyDay.start_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت پایان</Label>
                          </Col>
                          <Col >
                            <Input 
                              id="time"
                              type="time"
                              onChange={this.onChangeTime}
                              name="end_hour"
                              value={scheduleWeeklyDay.end_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <Button variant="primary" style={{width:'5em'}}
                              onClick={() =>
                                this.props.removeDocScheduleWeeklyDay(scheduleWeeklyDay.id)
                              }
                              color="danger"
                              // className="align-middle"
                              size={'10'}
                          >حذف</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))): ""}
                {(week_day === 0) ? 
                <Col>
                  <Card className='con-calender'>
                    <Card className='con-calender-inner'>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت شروع</label>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت پایان</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <input
                          type="time"
                          name="start_hour"
                          onChange={this.onChangeTime}
                          value={start_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <input
                          id="time"
                          type="time"
                          onChange={this.onChangeTime}
                          name="end_hour"
                          value={end_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                    </Row>
                    </Card>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.saveWeekDay()
                            }
                            color="info"
                            size={'10'}
                        >تائید</Button>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.setWeekDayState(7)
                            }
                            color="danger"
                            size={'10'}
                        >انصراف</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                : ""}
              </Row>
              <Row  >
                <Col  >
                  <Card >
                    <CardBody>
                      <CardTitle><div style={{textAlign:'right'}}><span style={{fontWeight:'bold'}}>دوشنبه</span></div></CardTitle> 
                      <Button variant="primary"
                          onClick={() =>
                            this.setWeekDayState(1)
                          }
                          color="info"
                          size={'18'}
                      ><span style={{fontSize:'1.1rem', fontWeight:'bold'}}>+</span></Button>
                    </CardBody>
                  </Card>
                </Col>
                {this.props.docScheduleWeeklyDays ?
                (this.props.docScheduleWeeklyDays.filter(docScheduleWeeklyDay => Number(docScheduleWeeklyDay.doctor) === Number(doctor) && 
                                                            Number(docScheduleWeeklyDay.week_day) === 1).map((scheduleWeeklyDay, index) => (
                  <Col key={index}  >
                    <Card className='con-calender'>
                      <Card className='con-calender-inner'>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت شروع</Label>
                          </Col>
                          <Col >
                            <Input 
                              type="time"
                              name="start_hour"
                              onChange={this.onChangeTime}
                              value={scheduleWeeklyDay.start_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت پایان</Label>
                          </Col>
                          <Col >
                            <Input 
                              id="time"
                              type="time"
                              onChange={this.onChangeTime}
                              name="end_hour"
                              value={scheduleWeeklyDay.end_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <Button variant="primary" style={{width:'5em'}}
                              onClick={() =>
                                this.props.removeDocScheduleWeeklyDay(scheduleWeeklyDay.id)
                              }
                              color="danger"
                              // className="align-middle"
                              size={'10'}
                          >حذف</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))): ""}
                {(week_day === 1) ? 
                <Col>
                  <Card className='con-calender'>
                    <Card className='con-calender-inner'>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت شروع</label>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت پایان</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <input
                          type="time"
                          name="start_hour"
                          onChange={this.onChangeTime}
                          value={start_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <input
                          id="time"
                          type="time"
                          onChange={this.onChangeTime}
                          name="end_hour"
                          value={end_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                    </Row>
                    </Card>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.saveWeekDay()
                            }
                            color="info"
                            size={'10'}
                        >تائید</Button>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.setWeekDayState(7)
                            }
                            color="danger"
                            size={'10'}
                        >انصراف</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                : ""}
              </Row>
              <Row  >
                <Col  >
                  <Card >
                    <CardBody>
                      <CardTitle><div style={{textAlign:'right'}}><span style={{fontWeight:'bold'}}>سه شنبه</span></div></CardTitle> 
                      <Button variant="primary"
                          onClick={() =>
                            this.setWeekDayState(2)
                          }
                          color="info"
                          size={'18'}
                      ><span style={{fontSize:'1.1rem', fontWeight:'bold'}}>+</span></Button>
                    </CardBody>
                  </Card>
                </Col>
                {this.props.docScheduleWeeklyDays ?
                (this.props.docScheduleWeeklyDays.filter(docScheduleWeeklyDay => Number(docScheduleWeeklyDay.doctor) === Number(doctor) && 
                                                            Number(docScheduleWeeklyDay.week_day) === 2).map((scheduleWeeklyDay, index) => (
                  <Col key={index}  >
                    <Card className='con-calender'>
                      <Card className='con-calender-inner'>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت شروع</Label>
                          </Col>
                          <Col >
                            <Input 
                              type="time"
                              name="start_hour"
                              onChange={this.onChangeTime}
                              value={scheduleWeeklyDay.start_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت پایان</Label>
                          </Col>
                          <Col >
                            <Input 
                              id="time"
                              type="time"
                              onChange={this.onChangeTime}
                              name="end_hour"
                              value={scheduleWeeklyDay.end_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <Button variant="primary" style={{width:'5em'}}
                              onClick={() =>
                                this.props.removeDocScheduleWeeklyDay(scheduleWeeklyDay.id)
                              }
                              color="danger"
                              // className="align-middle"
                              size={'10'}
                          >حذف</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))): ""}
                {(week_day === 2) ? 
                <Col>
                  <Card className='con-calender'>
                    <Card className='con-calender-inner'>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت شروع</label>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت پایان</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <input
                          type="time"
                          name="start_hour"
                          onChange={this.onChangeTime}
                          value={start_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <input
                          id="time"
                          type="time"
                          onChange={this.onChangeTime}
                          name="end_hour"
                          value={end_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                    </Row>
                    </Card>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.saveWeekDay()
                            }
                            color="info"
                            size={'10'}
                        >تائید</Button>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.setWeekDayState(7)
                            }
                            color="danger"
                            size={'10'}
                        >انصراف</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                : ""}
              </Row>
              <Row  >
                <Col  >
                  <Card >
                    <CardBody>
                      <CardTitle><div style={{textAlign:'right'}}><span style={{fontWeight:'bold'}}>چهارشنبه</span></div></CardTitle> 
                      <Button variant="primary"
                          onClick={() =>
                            this.setWeekDayState(3)
                          }
                          color="info"
                          size={'18'}
                      ><span style={{fontSize:'1.1rem', fontWeight:'bold'}}>+</span></Button>
                    </CardBody>
                  </Card>
                </Col>
                {this.props.docScheduleWeeklyDays ?
                (this.props.docScheduleWeeklyDays.filter(docScheduleWeeklyDay => Number(docScheduleWeeklyDay.doctor) === Number(doctor) && 
                                                            Number(docScheduleWeeklyDay.week_day) === 3).map((scheduleWeeklyDay, index) => (
                  <Col key={index}  >
                    <Card className='con-calender'>
                      <Card className='con-calender-inner'>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت شروع</Label>
                          </Col>
                          <Col >
                            <Input 
                              type="time"
                              name="start_hour"
                              onChange={this.onChangeTime}
                              value={scheduleWeeklyDay.start_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت پایان</Label>
                          </Col>
                          <Col >
                            <Input 
                              id="time"
                              type="time"
                              onChange={this.onChangeTime}
                              name="end_hour"
                              value={scheduleWeeklyDay.end_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <Button variant="primary" style={{width:'5em'}}
                              onClick={() =>
                                this.props.removeDocScheduleWeeklyDay(scheduleWeeklyDay.id)
                              }
                              color="danger"
                              // className="align-middle"
                              size={'10'}
                          >حذف</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))): ""}
                {(week_day === 3) ? 
                <Col>
                  <Card className='con-calender'>
                    <Card className='con-calender-inner'>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت شروع</label>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت پایان</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <input
                          type="time"
                          name="start_hour"
                          onChange={this.onChangeTime}
                          value={start_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <input
                          id="time"
                          type="time"
                          onChange={this.onChangeTime}
                          name="end_hour"
                          value={end_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                    </Row>
                    </Card>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.saveWeekDay()
                            }
                            color="info"
                            size={'10'}
                        >تائید</Button>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.setWeekDayState(7)
                            }
                            color="danger"
                            size={'10'}
                        >انصراف</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                : ""}
              </Row>
              <Row  >
                <Col  >
                  <Card >
                    <CardBody>
                      <CardTitle><div style={{textAlign:'right'}}><span style={{fontWeight:'bold'}}>پنجشنبه</span></div></CardTitle> 
                      <Button variant="primary"
                          onClick={() =>
                            this.setWeekDayState(4)
                          }
                          color="info"
                          size={'18'}
                      ><span style={{fontSize:'1.1rem', fontWeight:'bold'}}>+</span></Button>
                    </CardBody>
                  </Card>
                </Col>
                {this.props.docScheduleWeeklyDays ?
                (this.props.docScheduleWeeklyDays.filter(docScheduleWeeklyDay => Number(docScheduleWeeklyDay.doctor) === Number(doctor) && 
                                                            Number(docScheduleWeeklyDay.week_day) === 4).map((scheduleWeeklyDay, index) => (
                  <Col key={index}  >
                    <Card className='con-calender'>
                      <Card className='con-calender-inner'>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت شروع</Label>
                          </Col>
                          <Col >
                            <Input 
                              type="time"
                              name="start_hour"
                              onChange={this.onChangeTime}
                              value={scheduleWeeklyDay.start_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت پایان</Label>
                          </Col>
                          <Col >
                            <Input 
                              id="time"
                              type="time"
                              onChange={this.onChangeTime}
                              name="end_hour"
                              value={scheduleWeeklyDay.end_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <Button variant="primary" style={{width:'5em'}}
                              onClick={() =>
                                this.props.removeDocScheduleWeeklyDay(scheduleWeeklyDay.id)
                              }
                              color="danger"
                              // className="align-middle"
                              size={'10'}
                          >حذف</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))): ""}
                {(week_day === 4) ? 
                <Col>
                  <Card className='con-calender'>
                    <Card className='con-calender-inner'>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت شروع</label>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت پایان</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <input
                          type="time"
                          name="start_hour"
                          onChange={this.onChangeTime}
                          value={start_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <input
                          id="time"
                          type="time"
                          onChange={this.onChangeTime}
                          name="end_hour"
                          value={end_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                    </Row>
                    </Card>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.saveWeekDay()
                            }
                            color="info"
                            size={'10'}
                        >تائید</Button>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.setWeekDayState(7)
                            }
                            color="danger"
                            size={'10'}
                        >انصراف</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                : ""}
              </Row>
              <Row  >
                <Col  >
                  <Card >
                    <CardBody>
                      <CardTitle><div style={{textAlign:'right'}}><span style={{fontWeight:'bold'}}>جمعه</span></div></CardTitle> 
                      <Button variant="primary"
                          onClick={() =>
                            this.setWeekDayState(5)
                          }
                          color="info"
                          size={'18'}
                      ><span style={{fontSize:'1.1rem', fontWeight:'bold'}}>+</span></Button>
                    </CardBody>
                  </Card>
                </Col>
                {this.props.docScheduleWeeklyDays ?
                (this.props.docScheduleWeeklyDays.filter(docScheduleWeeklyDay => Number(docScheduleWeeklyDay.doctor) === Number(doctor) && 
                                                            Number(docScheduleWeeklyDay.week_day) === 5).map((scheduleWeeklyDay, index) => (
                  <Col key={index}  >
                    <Card className='con-calender'>
                      <Card className='con-calender-inner'>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت شروع</Label>
                          </Col>
                          <Col >
                            <Input 
                              type="time"
                              name="start_hour"
                              onChange={this.onChangeTime}
                              value={scheduleWeeklyDay.start_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col >
                            <Label style={{fontWeight:'bold'}}>ساعت پایان</Label>
                          </Col>
                          <Col >
                            <Input 
                              id="time"
                              type="time"
                              onChange={this.onChangeTime}
                              name="end_hour"
                              value={scheduleWeeklyDay.end_hour}
                              inputlabelprops={{
                                shrink: true,
                              }}
                              inputprops={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                      <Row>
                        <Col style={{textAlign:'center'}}>
                          <Button variant="primary" style={{width:'5em'}}
                              onClick={() =>
                                this.props.removeDocScheduleWeeklyDay(scheduleWeeklyDay.id)
                              }
                              color="danger"
                              // className="align-middle"
                              size={'10'}
                          >حذف</Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))): ""}
                {(week_day === 5) ? 
                <Col>
                  <Card className='con-calender'>
                    <Card className='con-calender-inner'>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت شروع</label>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <label style={{fontWeight:'bold'}}>ساعت پایان</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <input
                          type="time"
                          name="start_hour"
                          onChange={this.onChangeTime}
                          value={start_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <input
                          id="time"
                          type="time"
                          onChange={this.onChangeTime}
                          name="end_hour"
                          value={end_hour}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          inputprops={{
                            step: 300, // 5 min
                          }}
                        />
                      </Col>
                    </Row>
                    </Card>
                    <Row>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.saveWeekDay()
                            }
                            color="info"
                            size={'10'}
                        >تائید</Button>
                      </Col>
                      <Col style={{textAlign:'center'}}>
                        <Button variant="primary" style={{width:'5em'}}
                            onClick={() =>
                              this.setWeekDayState(7)
                            }
                            color="danger"
                            size={'10'}
                        >انصراف</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                : ""}
              </Row>
            </Container>
          </Card>
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    employees: store.employees.employees,
    doctors: store.doctors.doctors,
    docScheduleWeeklyDays: store.docScheduleWeeklyDays.docScheduleWeeklyDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDocScheduleWeeklyDay: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
        dispatch(RemoveDocScheduleWeeklyDay(id));
      }
    },
    editDocScheduleWeeklyDay: model => {
      dispatch(EditDocScheduleWeeklyDay(model))}, 
    addDocScheduleWeeklyDay: model => {
      dispatch(AddDocScheduleWeeklyDay(model))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(docScheduleWeeklyDay);
