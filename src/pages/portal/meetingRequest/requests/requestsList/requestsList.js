import React, { Component } from "react";
import {
  Container,
  Card,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Edit2, PlusCircle } from "react-feather";
import { connect } from "react-redux";

import {
  EditRequestCaterType
} from "../../../../../redux/actions/meetingCaterTypesActions";
import {
  GetDateRequestsList,
  GetDateRequestCaterTypesList,
  AddRequest,
  EditRequest,
} from "../../../../../redux/actions/meetingRequestsActions";
import {
  GetRoomFixEquipmentsList,
} from "../../../../../redux/actions/meetingRoomsActions";
import "../../meetingRequest.css"


class RequestList extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      company: 1,
      department: 1,
      day: 1,
      month: 1,
      year: 1400,
      requestId: 0,
      roomType: 1,
      room: 1,
      startHour: 7,
      endHour: 8,
      requestCaterTypes: null,
      requestEquipments: null,
      description: '',
      editMood: 0,
    };
  }

  requestCaterTypesChanged = () => e => {
  }
  requestCaterTypesChanged1 = () => e => {
    let requestCaterType = {
      id: null,
      caterTypes: [] 
    }

    let requestCaterTypes = null

    if(!this.state.requestCaterTypes){
      requestCaterType = { 
        id: this.state.requestID,
        caterTypes: [] 
      };
      requestCaterTypes = { 
        id: this.state.requestID,
        caterTypes: [] 
      };
    }
    else{
      let caterTypes = []
      if(this.state.requestCaterTypes.caterTypes){
        this.state.requestCaterTypes.caterTypes.forEach(caterType => caterTypes.push(caterType.id))
      }
      
      requestCaterType = {
        id: this.state.requestCaterTypes.id,
        caterTypes: caterTypes
      }

      requestCaterTypes = this.state.requestCaterTypes
    }

    e.target.checked = !e.target.checked 

    if(requestCaterTypes && requestCaterTypes.cateTypes &&
      requestCaterTypes.cateTypes.filter(caterType => Number(caterType.id) === Number(e.target.value)).length > 0){
      requestCaterTypes.caterTypes.pop({id: Number(e.target.value)})
      requestCaterType.caterTypes.pop(Number(e.target.value))
    }
    else{
      requestCaterTypes.caterTypes.push({id: Number(e.target.value)})
      requestCaterType.caterTypes.push(Number(e.target.value))
    }

    // this.props.editRequestCaterType(requestCaterType)

    this.setState({
      requestCaterTypes
    });
  }

  requestEquipmentsChanged = () => {
  }

  getGregorianDateEx = (year, month, day) => {
    let g_year = String(month < 10 ? year + 621 : (month === 10 && day < 11 ? year + 621 : year + 622))
    let g_month = ''
    let g_day = ''
    switch(month){
        case 1:
            if(day < 12){
              g_month = '03';
              g_day = String(Number(day) + 20)
            }
            else{
              g_month = '04'
              g_day = String(day - 11)
            }
            break
        case 2:
            if(day < 11){
                g_month = '04';
                g_day = String(Number(day) + 20)
              }
            else{
                g_month = '05';
                g_day = String(day - 10)
              }
            break
        case 3:
            if(day < 11){
              g_month = '05';
              g_day = String(Number(day) + 21)
            }
            else{
              g_month = '06';
              g_day = String(day - 10)
            }
            break
        case 4:
            if(day < 10){
              g_month = '06';
              g_day = String(Number(day) + 21)
            }
            else{
              g_month = '07';
              g_day = String(day - 9)          
            }
            break
        case 5:
            if(day < 10){
              g_month = '07';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '08';
              g_day = String(day - 9)       
            }
            break
        case 6:
            if(day < 10){
              g_month = '08';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '09';
              g_day = String(day - 9)           
            }
            break
        case 7:
            if(day < 9){
              g_month = '09';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '10';
              g_day = String(day - 8)         
            }
            break
        case 8:
            if(day < 10){
              g_month = '10';
              g_day = String(Number(day) + 22)
            }
            else{
              g_month = '11';
              g_day = String(day - 9)          
            }
            break
        case 9:
            if(day < 10){
              g_month = '11';
              g_day = String(Number(day) + 21)
            }
            else{
              g_month = '12';
              g_day = String(day - 9)
            }
            break
        case 10:
            if(day < 11){
              g_month = 12;
              g_day = String(Number(day) + 21)         
            }
            else{
              g_month = '01';
              g_day = String(day - 10)
            }
            break
        case 11:
            if(day < 12){
              g_month = '01';
              g_day = String(Number(day) + 20)
            }
            else{
              g_month = '02';
              g_day = String(day - 11)
            }
            break
        case 12:
            if(day < 10){
              g_month = '02';
              g_day = String(Number(day) + 19)
            }
            else{
              g_month = '03';
              g_day = String(day - 9)
            }
            break
        default:
    }
    return g_year + '-' + g_month + (g_day<10 ? '-0' + g_day: '-' + g_day)
  }

  handleDayChange = (e) => {
    let day = e.target.value
    this.setState({day})
  }  
  handleMonthChange = () => e => {
    let month = Number(e.target.value)
    let day31 = document.getElementById('day31')
    let day30 = document.getElementById('day30')
    if(month > 6){
      day31.hidden = true;
      if(month === 12 && this.state.year % 4 !== 3)
        day30.hidden = true
      else
        day30.hidden = false
    }
    else{
      day30.hidden = false;
      day31.hidden = false;
    }

    this.setState({month})
  }
  handleYearChange = (e) => {
    let year = Number(e.target.value)
    if(year % 4 === 3){
      if(this.state.month === 12){
        let day30 = document.getElementById('day30')
        day30.hidden = true;
      }
      else{
        let day30 = document.getElementById('day30')
        day30.hidden = false;        
      }
    }
    else{
      let day30 = document.getElementById('day30')
      day30.hidden = false;     
    }
    this.setState({year})
  }

  handleStartHourChange = (e) => {
    let startHour = e.target.value
    this.setState({startHour})
  }  
  handleEndHourChange = (e) => {
    let endHour = e.target.value
    this.setState({endHour})
  }  

  showMeetingDateRequests = (day, month, year) => {
    let date = this.getGregorianDateEx(year, month, day)
    console.log('date: ', date)
    this.props.getDateRequestsList(date)
    this.props.getDateRequestCaterTypesList(date)

    this.setState({ 
      requests: this.props.dateRequests,
    })
    // console.log('**************************Button***************************')
    // console.log('***state requests***: ', this.props.departments)
    // console.log('***********************************************************')
  }

  setEditRequest = (requestId) => e =>  {
    e.preventDefault()

    
  }

  handleRoomChange = (e) => {
    this.props.getRoomFixEquipmentsList(Number(e.target.value))
    this.setState({ room: Number(e.target.value)} )
  }

  render = () => {     
    console.log('***props roomEquipments***: ', this.props.roomEquipments)
    const {companys, departments, roomTypes, rooms, roomEquipments, dateRequests, caterTypes, requestCaterTypes, equipments} = this.props
    const {company, department, year, month, day, requestID, room, roomType, startHour, endHour, editMood, description} = this.state
    return (
      <Card style={{direction:'rtl'}}>
        <Container>
          <Card style={{textAlign:'center', marginTop:".3em", marginBottom:".3em"}}>
            <Row>
              <Col xl="4" >واحد:</Col>
              <Col xl="2" style={{ textAlign:'center' }}>
                <select value={company} style={{backgroundColor: "whitesmoke"}} 
                  onChange={(e) => this.setState({ company: Number(e.target.value)} )}>
                  {companys ? companys.map((company) => 
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ) : ''}
                </select>
              </Col>
              <Col xl="2" style={{ textAlign:'center' }}>
                <select value={department} style={{backgroundColor: "whitesmoke"}}
                  onChange={(e) => this.setState({ department: Number(e.target.value)} )}>
                  {departments ? departments.filter(department => Number(department.company) === Number(company)).map((department) => 
                    <option key={department.id} value={department.id}>{department.name}</option>
                  ) : ''}
                </select>
              </Col>
              <Col xl="4"></Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col xl="4" style={{ textAlign:'center' }}>نوع سالن:</Col>
              <Col xl="8">
                <select value={roomType} style={{backgroundColor: "whitesmoke"}} 
                  onChange={(e) => this.setState({ roomType: Number(e.target.value)} )}>
                  {roomTypes ? roomTypes.map((roomType) => 
                    <option key={roomType.id} value={roomType.id}>{roomType.name}</option>
                  ) : ''}
                </select>
              </Col>
            </Row>
          </Card>
          <Card>
          {/* {console.log('=======================================================================')}
          {rooms ? rooms.map(room => console.log('room.room_type_id:', Number(room.room_type), ', roomType:', Number(roomType))) :''}
          {console.log('=======================================================================')} */}
            <Row>
              <Col xl="4" style={{ textAlign:'center' }}>سالن:</Col>
              <Col xl="4">
                <select value={room} style={{backgroundColor: "whitesmoke"}} 
                  onChange={(e) => this.handleRoomChange(e)}>
                  {rooms ? rooms.filter(room => Number(room.room_type) === Number(roomType)).map((room) => 
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ) : ''}
                </select>
              </Col>
              <Col xl="4">
              {rooms && rooms.filter(room => Number(room.id) === Number(room)) && 
                      rooms.filter(room => Number(room.id) === Number(room)).length > 0 ? (
                <Card>
                  <Row>
                    <Col xl="4">ظرفیت: </Col>
                    <Col xl="8">{rooms.filter(room => Number(room.id) === Number(room))[0].capacity}
                    </Col>
                  </Row>
                  {roomEquipments && roomEquipments.length > 0 ?
                  roomEquipments.map((equipment, index) => (
                    <Row key={index}>
                      <Col xl="4">تجهیزات: </Col>
                      <Col xl="8">{equipment.equipment__name}</Col>
                    </Row>
                  )) :''}
                </Card>
              ): ''}
              </Col>
            </Row>
          </Card>
          <Card style={{textAlign:'center', marginTop:".3em", marginBottom:".3em"}}>
            <Row >
              <Col xl="4">تاریخ:</Col>
              <Col xl="4">
                <Row>
                  <Col xl="4">
                    <select style={{width:'6em', backgroundColor: "whitesmoke"}} value={day}
                    onChange={(e) => this.handleDayChange(e)}>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                      <option value={13}>13</option>
                      <option value={14}>14</option>
                      <option value={15}>15</option>
                      <option value={16}>16</option>
                      <option value={17}>17</option>
                      <option value={18}>18</option>
                      <option value={19}>19</option>
                      <option value={20}>20</option>
                      <option value={21}>21</option>
                      <option value={22}>22</option>
                      <option value={23}>23</option>
                      <option value={24}>24</option>
                      <option value={25}>25</option>
                      <option value={26}>26</option>
                      <option value={27}>27</option>
                      <option value={28}>28</option>
                      <option value={29}>29</option>
                      <option id='day30' value={30}>30</option>        
                      <option id='day31' value={31}>31</option>                
                    </select>
                  </Col>
                  <Col xl="4">
                    <select style={{width:'6em', backgroundColor: "whitesmoke"}} value={month}
                    onChange={this.handleMonthChange()}>
                      <option value={1}>فروردین</option>
                      <option value={2}>اردیبهشت</option>
                      <option value={3}>خرداد</option>
                      <option value={4}>تیر</option>
                      <option value={5}>مرداد</option>
                      <option value={6}>شهریور</option>
                      <option value={7}>مهر</option>
                      <option value={8}>آبان</option>
                      <option value={9}>آذر</option>
                      <option value={10}>دی</option>
                      <option value={11}>بهمن</option>
                      <option value={12}>اسفند</option>
                    </select>
                  </Col>
                  <Col xl="4">
                    <select style={{width:'6em', backgroundColor: "whitesmoke"}} value={year}
                    onChange={(e) => this.handleYearChange(e)}>
                      <option value={1400}>1400</option>
                      <option value={1401}>1401</option>
                      <option value={1402}>1402</option>
                      <option value={1403}>1403</option>
                      <option value={1404}>1404</option>
                      <option value={1405}>1405</option>
                      <option value={1406}>1406</option>
                      <option value={1407}>1407</option>
                      <option value={1408}>1408</option>
                      <option value={1409}>1409</option>                
                    </select>
                  </Col>
                </Row>
              </Col>
              <Col xl="4"></Col>
            </Row>
            <Row>
              <Col xl="12" style={{testAlign:'center'}}>
                <Button 
                    color="primary" 
                    style={{margin:"1em auto 1em auto", width:'100px'}} 
                    onClick={() => this.showMeetingDateRequests(day, month, year)} 
                >تائید</Button>
              </Col>
            </Row>
          </Card>
          <Card style={{textAlign:'center', marginTop:".3em", marginBottom:".3em"}}>
            <Row>
              <Col xl="3">لیست درخواستها:</Col>
              <Col xl="6">
                <Card>
                  <CardBody>
                    <Table style={{direction:'rtl'}} hover striped responsive>
                      <thead id="th">
                        <tr id="tr">
                          <th style={{ width: "3%"}}>#</th>
                          <th style={{ width: "20%", textAlign:'center' }}> شرکت</th>
                          <th style={{ width: "25%", textAlign:'center' }}> واحد</th>
                          <th style={{ width: "20%", textAlign:'center' }}> سالن کنفرانس</th>
                          <th style={{ width: "16%", textAlign:'center' }}> ساعت شروع</th>
                          <th style={{ width: "16%", textAlign:'center' }}> ساعت پایان</th>
                          <td style={{ width: "3%"}}></td>
                        </tr>
                      </thead>
                      <tbody id="tb">
                      {dateRequests && dateRequests.length > 0 ? (
                        dateRequests.map((request, index) => {
                            return ( 
                              <tr key={index}>
                                <td style={{ width: "3%"}}>{index + 1}</td>
                                <td style={{ width: "20%", textAlign:'center'}}>{request.department__company__name}</td>
                                <td style={{ width: "25%", textAlign:'center'}}>{request.department__name}</td>
                                <td style={{ width: "20%", textAlign:'center'}}>{request.meeting_room__name}</td>
                                <td style={{ width: "16%", textAlign:'center' }}>{request.start_hour}</td>
                                <td style={{ width: "16%", textAlign:'center'}} className="table-action">{request.end_hour}</td>
                                <td style={{ width: "3%"}} className="table-action">
                                  {Number(sessionStorage.getItem('employeeid')) === Number(request.requester) ? (
                                  <Edit2 
                                    onClick={() => this.setState({ editMood: 1, requestID: request.id})}
                                    className="align-middle mr-1"
                                    size={18}
                                  />
                                  ) : ''}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr><td></td></tr>
                        )}         
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter style={{textAlign:'left'}}>
                    <PlusCircle
                        onClick={() => this.setState({ editMood: 1})}
                        className="align-middle"
                        size={18}
                      />
                  </CardFooter>
                </Card>
              </Col>
              <Col xl="3"></Col>
            </Row>
          </Card>        
          {editMood !== 0 ? (
          <Card style={{textAlign:'center', marginTop:".6em", marginBottom:".6em"}}>
            <Card style={{textAlign:'center', marginTop:".1em", marginBottom:".1em"}}>
              <Row>
                <Col xl="4"></Col>
                <Col xl="2">
                  <select value={room} style={{backgroundColor: "whitesmoke"}} onChange={(e) => this.setState({ room: Number(e.target.value)} )}>
                    {rooms ? rooms.map((room) => 
                      <option key={room.id} value={room.id}>{room.name}</option>
                    ) : ''}
                  </select>
                </Col>
                <Col xl="1">
                  <select style={{width:'6em', backgroundColor: "whitesmoke"}} value={startHour}
                  onChange={(e) => this.handleStartHourChange(e)}>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    <option value={17}>17</option>
                    <option value={18}>18</option>
                    <option value={19}>19</option>
                    <option value={20}>20</option>
                  </select>
                </Col>
                <Col xl="1">
                  <select style={{width:'6em', backgroundColor: "whitesmoke"}} value={endHour}
                  onChange={(e) => this.handleEndHourChange(e)}>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    <option value={17}>17</option>
                    <option value={18}>18</option>
                    <option value={19}>19</option>
                    <option value={20}>20</option>
                  </select>
                </Col>
                <Col xl="4"></Col>
              </Row>            
            </Card>
            <Card style={{textAlign:'center', marginTop:".1em", marginBottom:".1em"}}>
              <Row>
                <Col xl='2'></Col>
                <Col xl='4'>
                  <Table style={{direction:'rtl'}} hover striped responsive>
                    <thead id="th">
                      <tr id="tr">
                        <th style={{ width: "5%", textAlign:'center'}}>#</th>
                        <th style={{ width: "90%", textAlign:'center' }}> نام سرویس پذیرائی</th>
                        <th style={{ width: "5%", textAlign:'center'}}/>
                      </tr>
                    </thead>
                    <tbody id="tb">
                      {caterTypes && caterTypes.length > 0 ? (
                        caterTypes.map((caterType, index) => {
                          return ( 
                            <tr key={index}>
                              <td style={{ width: "5%", textAlign:'center'}}>{index+1}</td>
                              <td style={{ width: "90%", textAlign:'center' }}>{caterType.name}</td>
                              <td style={{ width: "5%", textAlign:'center'}} className="table-action">
                                <input 
                                    type="checkbox"
                                    value={caterType.id}
                                    checked={
                                      (requestCaterTypes &&  
                                      requestCaterTypes.filter(rct => Number(rct.id) === Number(requestID) && Number(rct.cater_types__id) === Number(caterType.id)) &&
                                      requestCaterTypes.filter(rct => Number(rct.id) === Number(requestID) && Number(rct.cater_types__id) === Number(caterType.id)).length > 0)}
                                    onChange={this.requestCaterTypesChanged()}
                                  />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr><td>not found</td></tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
                <Col xl='4'>
                  <Table style={{direction:'rtl'}} hover striped responsive>
                    <thead id="th">
                      <tr id="tr">
                        <th style={{ width: "5%", textAlign:'center' }}>#</th>
                        <th style={{ width: "90%", textAlign:'center' }}>نام تجهیز</th>
                        <th style={{ width: "5%", textAlign:'center' }}/>
                      </tr>
                    </thead>
                    <tbody id="tb">
                      {equipments && equipments.length > 0 ? (
                        equipments.map((equipment, index) => {
                          return ( 
                            <tr key={index}>
                              <td style={{ width: "5%", textAlign:'center'}}>{index+1}</td>
                              <td style={{ width: "90%", textAlign:'center' }}>{equipment.name}</td>
                              <td style={{ width: "5%", textAlign:'center'}} className="table-action">
                              <input 
                                    type="checkbox"
                                    value={equipment.id}
                                    checked={
                                      (roomEquipments && 
                                        roomEquipments.filter(re => Number(re.id) === Number(requestID) && Number(re.id) === Number(equipment.id)) &&
                                        roomEquipments.filter(re => Number(re.id) === Number(requestID) && Number(re.id) === Number(equipment.id)).length > 0)}
                                    onChange={this.requestEquipmentsChanged()}
                                  />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr><td>not found</td></tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
                <Col xl='2'></Col>
              </Row>
              <Row>
                <Col x="1"></Col>
                <Col x="10">
                  <textarea 
                      style={{width:'100%', height:'100px', textAlign:'right', fontSize:'1em', backgroundColor: "whitesmoke"}}  
                      value={description} 
                      onChange={(e) => this.setState({ description: String(e.target.value)})}
                      >
                  </textarea>
                </Col>
                <Col x="1"></Col>
              </Row>
              <Row>
                <Col xl="12" style={{testAlign:'center'}}>
                  <Button 
                      color="primary" 
                      style={{margin:"1em auto 1em auto", width:'100px'}} 
                      onClick={() => this.saveMeetingRequest(day, month, year)} 
                  >ذخیره درخواست</Button>
                </Col>
              </Row>              
            </Card>
          </Card>
          ) : ''}
        </Container>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    companys: store.companies.companies,
    departments: store.departments.departments,
    roomTypes: store.roomTypes.roomTypes,
    rooms: store.rooms.rooms,
    equipments: store.equipments.equipments,
    roomEquipments: store.rooms.roomEquipments,
    caterTypes: store.caterTypes.caterTypes,
    requests: store.requests.requests,
    requestCaterTypes: store.requests.requestCaterTypes,
    dateRequests: store.requests.dateRequests
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDateRequestsList: date => {
      dispatch(GetDateRequestsList(date))}, 
    getDateRequestCaterTypesList: date => {
      dispatch(GetDateRequestCaterTypesList(date))},
    getRoomFixEquipmentsList: id => {
      dispatch(GetRoomFixEquipmentsList(id))}, 
    addRequest: model => {
      dispatch(AddRequest(model))
    },
    editRequest: model => {
      dispatch(EditRequest(model))
    },            
    editRequestCaterType: model => {
      dispatch(EditRequestCaterType(model))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
