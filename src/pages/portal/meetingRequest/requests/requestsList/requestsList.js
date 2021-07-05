import React, { Component } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardTitle,  
  CardBody,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Trash, Edit2, PlusCircle, ArrowLeft } from "react-feather";
import { connect } from "react-redux";

// import {
//   EditRequestCaterType
// } from "../../../../../redux/actions/meetingCaterTypesActions";
import {
  GetDateRequestsList,
  GetRequestCaterTypesList,
  GetRequestEquipmentsList,
  AddRequestCaterTypeModel,
  AddRequestEquipmentModel,
  EditRequestCaterTypeModel,
  EditRequestEquipmentModel,  
  RemoveRequest,
  SaveMeetingRequest,
  ClearDateRequests,
} from "../../../../../redux/actions/meetingRequestsActions";
import {
  GetRoomFixedEquipmentsList,
} from "../../../../../redux/actions/meetingRoomsActions";
import RequestCaterTypesModal from "../requestCaterTypesModal/requestCaterTypesModal"
import RoomEquipmentsModal from "../requestEquipmentsModal/requestEquipmentsModal"

import "../../meetingRequest.css"



class RequestList extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      requestId: 0,
      title: '',
      meeting_member_no: 1,
      day: 1,
      month: 1,
      year: 1400,
      startHour: '07',
      startMinute: '00',
      endHour: '08',
      endMinute: '00',
      description: '',
      confirm: false,
      company: 0,
      department: 0,
      roomType: 0,
      meeting_room: 0,
      requestCaterTypes: [],
      requestEquipments: [],
      editMood: 0,
      cater_type_id: 0,
      equipment_id: 0,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
    };
  }

  componentDidUpdate() {       
    if(this.state.flag1 && this.state.company === 0 && this.state.department === 0 && this.props.companys && 
      this.props.companys.length > 0 && this.props.departments && this.props.departments.length > 0){
      this.setState({ 
        company: (this.state.company === 0 && this.props.companys && this.props.companys.length > 0) ? 1 : this.state.company,
        department: (this.state.department === 0 && this.props.departments && this.props.departments.length > 0) ? 1 : this.state.department,
        flag1: false,
      })
    }
    if(this.state.flag2 === 0 && this.state.roomType === 0 && this.state.meeting_room === 0 && this.props.roomTypes && 
      this.props.roomTypes.length > 0 && this.props.rooms && this.props.rooms.length > 0){
      this.setState({ 
        roomType: (this.state.roomType === 0 && this.props.roomTypes && this.props.roomTypes.length > 0) ? 1 : this.state.roomType,
        meeting_room: (this.state.meeting_room === 0 && this.props.rooms && this.props.rooms.length > 0) ? 1 : this.state.meeting_room,
        flag2: false,
      })
    }
    if(this.state.flag3 && this.state.requestCaterTypes !== this.props.requestCaterTypes){
      this.setState({
        requestCaterTypes: this.props.requestCaterTypes,
        flag3: false,
      })
    }
    if(this.state.flag4 && this.state.requestEquipments !== this.props.requestEquipments){

      this.setState({
        requestEquipments: this.props.requestEquipments,
        flag4: false,
      })
    }
  }
  componentWillUnmount() {
    this.props.clearDateRequests()
  }

  validateMemberNo = (e) => {
    if (isNaN(e.target.value)) {
      return;
    }

    const value = (e.target.validity.valid) ? Number(e.target.value) : 1
    this.setState({ meeting_member_no: value})
  };    
  
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

  showMeetingDateRequests = (day, month, year) => {
    const date = this.getGregorianDateEx(year, month, day)
    const requester = Number(sessionStorage.getItem('employeeid'))
    const object = { requester, date }
    this.props.getDateRequestsList(object)

    this.setState({ 
      requests: this.props.dateRequests,
    })
    // console.log('**************************Button***************************')
    // console.log('***state requests***: ', this.props.departments)
    // console.log('***********************************************************')
  }

  editMeetingRequest = (request_id) => { 
    const requestId = request_id
    this.setState({ 
      editMood: 2,
      flag3: true,
      flag4: true,
    })
    this.props.getRequestCaterTypesList(requestId)
    this.props.getRequestEquipmentsList(requestId)
  }

  requestCaterTypeModelCloseHandling = (editMood) => {
    if(!editMood){
      let requestCaterTypes = this.state.requestCaterTypes
      const cater_type_id = this.state.cater_type_id

      if(requestCaterTypes && 
      requestCaterTypes.filter(rct => Number(rct.cater_type_id) === cater_type_id) &&
      requestCaterTypes.filter(rct => Number(rct.cater_type_id) === cater_type_id).length > 0)
      {
        requestCaterTypes = requestCaterTypes.filter(rct => Number(rct.cater_type_id) !== cater_type_id)
        this.setState({
          requestCaterTypes
        });
      }
    }
      // console.log('========================')
      // console.log('##requestCaterTypes: ', requestCaterTypes)
      // console.log('========================')
  }  
  requestCaterTypeModelSaveHandling = (editMood, description) => {
    const cater_type_id = this.state.cater_type_id
    let requestCaterTypes = this.state.requestCaterTypes
    if(!editMood){
      let addRequestCaterType = {
        request_id: this.state.requestId,
        cater_type_id: cater_type_id,
        description: description
      }
      requestCaterTypes = [...requestCaterTypes, addRequestCaterType]
      this.setState({
        requestCaterTypes
      });
    }
    else{
      const requestId = this.state.requestId
      if(requestCaterTypes && 
        requestCaterTypes.filter(rct => rct.request_id === requestId && rct.cater_type_id === cater_type_id) &&
        requestCaterTypes.filter(rct => rct.request_id === requestId && rct.cater_type_id === cater_type_id).length > 0){
          let editedRequestCaterType = requestCaterTypes.filter(rct => rct.request_id === requestId && rct.cater_type_id === cater_type_id)[0]
          editedRequestCaterType.description = description
          let filterdRequestCaterTypes = requestCaterTypes.filter(rct => !(rct.request_id === requestId && rct.cater_type_id === cater_type_id))

          this.setState({
            requestCaterTypes: [...filterdRequestCaterTypes, editedRequestCaterType]
          })
        }
    }
    // console.log('========================')
    // console.log('##requestCaterTypes: ', requestCaterTypes)
    // console.log('========================')
  } 
  requestCaterTypesChanged = () => e => { 
    let requestCaterTypes = []
    requestCaterTypes = this.state.requestCaterTypes
    
    if(e.target.checked){
      this.setState({ cater_type_id: Number(e.target.value) })
      this.props.addRequestCaterTypesModel()
    }
    else{
      if(window.confirm('آیا از حذف اطمینان دارید؟')){       
        if(requestCaterTypes && 
          requestCaterTypes.filter(rct => Number(rct.cater_type_id) === Number(e.target.value)) &&
          requestCaterTypes.filter(rct => Number(rct.cater_type_id) === Number(e.target.value)).length > 0){
          requestCaterTypes = requestCaterTypes.filter(rct => Number(rct.cater_type_id) !== Number(e.target.value))

          this.setState({
            requestCaterTypes
          });
        }
      }
      else{
        e.target.checked = true
      }
    }
    // console.log('========================')
    // console.log('@@requestCaterTypes: ', requestCaterTypes)
    // console.log('========================')
  }
  editRequestCaterType = (caterTypeId) => {
    const requestId = this.state.requestId
    let description = ''
    let requestCaterTypes = this.state.requestCaterTypes
    if(requestCaterTypes && 
      requestCaterTypes.filter(rct => rct.request_id === requestId && rct.cater_type_id === caterTypeId) &&
      requestCaterTypes.filter(rct => rct.request_id === requestId && rct.cater_type_id === caterTypeId).length > 0){
        description = String(requestCaterTypes.filter(rct => rct.request_id === requestId && rct.cater_type_id === caterTypeId)[0].description)
      }

    const requestCaterType = {
      request_id: this.state.requestId,
      cater_type_id: caterTypeId,
      description: description
    }
    this.setState({
      cater_type_id: caterTypeId
    })
    this.props.editRequestCaterTypeModel(requestCaterType)
  }

  requestEquipmentModelCloseHandling = (editMood) => {
    if(!editMood){
      let requestEquipments = this.state.requestEquipments
      const equipment_id = this.state.equipment_id

      if(requestEquipments && 
        requestEquipments.filter(re => Number(re.equipment_id) === equipment_id) &&
        requestEquipments.filter(re => Number(re.equipment_id) === equipment_id).length > 0)
      {
        requestEquipments = requestEquipments.filter(re => Number(re.equipment_id) !== equipment_id)
        this.setState({
          requestEquipments
        });
      }
    }
    // console.log('========================')
    // console.log('##requestEquipments: ', requestEquipments)
    // console.log('========================')
  }  
  requestEquipmentModelSaveHandling = (editMood, qty, description) => {
    let equipment_id = this.state.equipment_id
    let requestEquipments = this.state.requestEquipments
    if(!editMood){
      let addRequestEquipment = {
        request_id: this.state.requestId,
        equipment_id: equipment_id,
        qty: qty,
        description: description
      }
      requestEquipments = [...requestEquipments, addRequestEquipment]
      this.setState({
        requestEquipments
      });
    }
    else{
      const requestId = this.state.requestId
      if(requestEquipments && 
        requestEquipments.filter(re => re.request_id === requestId && re.equipment_id === equipment_id) &&
        requestEquipments.filter(re => re.request_id === requestId && re.equipment_id === equipment_id).length > 0){
          let editedRequestEquipment = requestEquipments.filter(re => re.request_id === requestId && re.equipment_id === equipment_id)[0]
          editedRequestEquipment.qty = qty
          editedRequestEquipment.description = description
          let filterdRequestEquipments = requestEquipments.filter(re => !(re.request_id === requestId && re.equipment_id === equipment_id))

          this.setState({
            requestEquipments: [...filterdRequestEquipments, editedRequestEquipment]
          })
        }
    }
      // console.log('========================')
    // console.log('##requestEquipments: ', requestEquipments)
    // console.log('========================')
  } 
  requestEquipmentsChanged = () => e => { 
    let requestEquipments = []
    requestEquipments = this.state.requestEquipments

    if(e.target.checked){
      this.setState({ equipment_id: Number(e.target.value) })
      this.props.addRequestEquipmentsModel()
    }
    else{        
      if(requestEquipments && 
        requestEquipments.filter(re => Number(re.equipment_id) === Number(e.target.value)) &&
        requestEquipments.filter(re => Number(re.equipment_id) === Number(e.target.value)).length > 0){
        requestEquipments = requestEquipments.filter(re => Number(re.equipment_id) !== Number(e.target.value))

        this.setState({
          requestEquipments
        });
      }
    }
    // console.log('========================')
    // console.log('@@requestEquipments: ', requestEquipments)
    // console.log('========================')
  }
  editRequestEquipment = (equipmentID) => {
    const requestId = this.state.requestId
    let qty = 1
    let description = ''
    let requestEquipments = this.state.requestEquipments
    if(requestEquipments && 
      requestEquipments.filter(re => re.request_id === requestId && re.equipment_id === equipmentID) &&
      requestEquipments.filter(re => re.request_id === requestId && re.equipment_id === equipmentID).length > 0){
        qty = requestEquipments.filter(re => re.request_id === requestId && re.equipment_id === equipmentID)[0].qty
        description = requestEquipments.filter(re => re.request_id === requestId && re.equipment_id === equipmentID)[0].description
      }

    const requestEquipment = {
      request_id: this.state.requestId,
      equipment_id: equipmentID,
      qty: qty,
      description: description
    }
    this.setState({
      equipment_id: equipmentID
    })
    this.props.editRequestEquipmentModel(requestEquipment)
  }

  addMeetingRequest = () => {
    if(this.state.title === '') {
      alert('لطفا ابتدا عنوان جلسه را وارد کنید.') 
      return
    }
    if(this.state.meeting_member_no === 0) {
      alert('لطفا ابتدا تعداد اعضای جلسه را وارد کنید.')
      return
    }
    if(this.state.department === 0) {
      alert('لطفا ابتدا واحد و شرکت مورد نظر را از لیست کشویی بالا انتخاب کنید.')
      return
    }
    if(this.state.meeting_room === 0) {
      alert('لطفا ابتدا سالن مورد نظر را از لیست کشویی بالا انتخاب کنید.')
      return
    }
    this.setState({ 
      editMood: 1,
      requestId: 0,
      startHour: '07',
      startMinute: '00', 
      endHour: '08',
      endMinute: '00',
      description: '',
      requestCaterTypes: [],
      requestEquipments: [],      
      flag3: true,
      flag4: true,
    })
  }

  handleRoomTypeChange = (e) =>{
    if(this.props.rooms && this.props.rooms.filter(room => Number(room.room_type) === Number(e.target.value)) &&
       this.props.rooms.filter(room => Number(room.room_type) === Number(e.target.value)).length > 0){

         let room_id = this.props.rooms.filter(room => Number(room.room_type) === Number(e.target.value))[0].id
         this.props.getRoomFixedEquipmentsList(room_id)

         this.setState({ 
           roomType: Number(e.target.value),
           meeting_room: room_id
         })
    }
    else{
      this.props.getRoomFixedEquipmentsList(0)

      this.setState({ 
        roomType: Number(e.target.value), 
        meeting_room: 0
      })
    }
  }
  handleRoomChange = (e) => {
    this.props.getRoomFixedEquipmentsList(Number(e.target.value))
    this.setState({ meeting_room: Number(e.target.value)} )
  }
  handleSelectedRequestChange = (request) => {
    if(Number(sessionStorage.getItem('employeeid')) === Number(request.requester_id)){
      if(this.props.rooms && this.props.rooms.filter(room => Number(room.room_type) === Number(request.meeting_room__room_type_id)) &&
      this.props.rooms.filter(room => Number(room.room_type) === Number(request.meeting_room__room_type_id)).length > 0){
        
        let room_id = this.props.rooms.filter(room => Number(room.room_type) === Number(request.meeting_room__room_type_id))[0].id
        this.props.getRoomFixedEquipmentsList(room_id)
      }

      this.setState({ requestId: request.id,title: request.title, date: request.date, 
        description: request.description, confirm: request.confirm, company: request.department__company__id, 
        department: request.department_id, roomType: request.meeting_room__room_type_id, 
        meeting_room: request.meeting_room_id, requester_id: request.requester_id, meeting_member_no: request.meeting_member_no,
        startHour: String(request.start_hour).substring(0, String(request.start_hour).indexOf(':')), 
        startMinute:String(request.start_hour).substring(String(request.start_hour).indexOf(':')+1, String(request.start_hour).lastIndexOf(':')), 
        endHour: String(request.end_hour).substring(0, String(request.end_hour).indexOf(':')), 
        endMinute:String(request.end_hour).substring(String(request.end_hour).indexOf(':')+1, String(request.end_hour).lastIndexOf(':')), 
        })
    }
  }

  saveMeetingRequest = () => {
    const {requestId, title, meeting_member_no, department, meeting_room, year, month, day, startHour, 
      startMinute, endHour, endMinute, requestCaterTypes, requestEquipments, description, editMood} = this.state
    const request_id = editMood === 2 ? requestId : null
    const requesterId = Number(sessionStorage.getItem('employeeid'))
    const date = this.getGregorianDateEx(year, month, day)
    const start_hour = startHour + ':' + startMinute
    const end_hour = endHour + ':' + endMinute
    const confirm = false
    const meetingRequest = {
      request_id,
      title, 
      date, 
      start_hour, 
      end_hour, 
      description, 
      confirm, 
      department, 
      meeting_room, 
      requesterId, 
      meeting_member_no, 
      requestCaterTypes, 
      requestEquipments,
      editMood,        
    }
    const prevRequests = this.props.dateRequests
    this.props.saveMeetingRequest(meetingRequest)
    const nextRequests = this.props.dateRequests

    if(prevRequests !== nextRequests || 
        this.state.requestCaterTypes !== this.props.requestCaterTypes || 
        this.state.requestEquipments !== this.props.requestEquipments){
      this.setState({ 
        editMood: 0, 
        requestId: 0,
        title: '',
        meeting_member_no: 1,
        company: this.props.companys && this.props.companys.length > 0 ? this.props.companys[0].id : 0,
        roomType: this.props.roomTypes && this.props.roomTypes.length > 0 ? this.props.roomTypes[0].id : 0,
        startHour: '07',
        startMinute: '00',
        endHour: '08',
        endMinute: '00',
        description: '',
        requestCaterTypes: [],
        requestEquipments: [],
        flag3: true,
        flag4: true,
      })
      this.showMeetingDateRequests(day, month, year)
    }
  }
  

  render = () => {     
    const {companys, departments, roomTypes, rooms, roomEquipments, dateRequests, caterTypes, equipments} = this.props
    const {requestId, title, meeting_member_no, company, department, year, month, day, meeting_room, roomType, startHour, 
      startMinute, endHour, endMinute, editMood, requestCaterTypes, requestEquipments, description} = this.state
    return (
      <React.Fragment>
        <Card style={{direction:'rtl'}}>
          <Container>
            <Card >
              <Row>
                <Col></Col>
                <Col>
                  <Row>
                    <Col xl='8'>
                      <label>عنوان جلسه :</label>
                      <input style={{backgroundColor:"whitesmoke", width:'12em'}}
                        type="text"
                        value={title}
                        onChange={(e) => this.setState({ title: String(e.target.value) })}
                      />
                    </Col>
                    <Col xl='4'>
                      <label>تعداد اعضا :</label>
                      <input style={{backgroundColor:"whitesmoke", width:'3em'}}
                        pattern="[0-9]*"
                        type="text"
                        value={meeting_member_no}
                        onChange={(e) => this.validateMemberNo(e)}
                      />                    
                    </Col>
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </Card>
            <Card >
              <Row>
                <Col></Col>
                <Col>
                  <Row>
                    <Col >
                      <label>شرکت :</label>
                      <select value={company} style={{backgroundColor: "whitesmoke", width:'8em'}} 
                        onChange={(e) => this.setState({ company: Number(e.target.value)} )}>
                        {companys ? companys.map((company) => 
                          <option key={company.id} value={company.id}>{company.name}</option>
                        ) : ''}
                      </select>
                    </Col>
                    <Col >
                      <label>واحد :</label>
                      <select value={department} style={{backgroundColor: "whitesmoke", width:'9em'}}
                        onChange={(e) => this.setState({ department: Number(e.target.value)} )}>
                        {departments ? departments.filter(department => Number(department.company) === Number(company)).map((department) => 
                          <option key={department.id} value={department.id}>{department.name}</option>
                        ) : ''}
                      </select>
                    </Col>
                  </Row>
                </Col>
                <Col></Col>
              </Row>
            </Card>            
            <Card >
              <Row>
                <Col></Col>
                <Col>
                  <Row>
                    <Col >
                      <label>نوع سالن : </label>
                      <select value={roomType} style={{backgroundColor:"whitesmoke", width:'7em'}} 
                        onChange={(e) => this.handleRoomTypeChange(e)}>
                        {roomTypes ? roomTypes.map((roomType) => 
                          <option key={roomType.id} value={roomType.id}>{roomType.name}</option>
                        ) : ''}
                      </select>
                    </Col>
                    <Col >
                      <label>سالن : </label>
                      <select value={meeting_room} style={{backgroundColor: "whitesmoke", width:'9em'}} 
                        onChange={(e) => this.handleRoomChange(e)}>
                        {rooms ? rooms.filter(room => Number(room.room_type) === Number(roomType)).map((room) => 
                          <option key={room.id} value={room.id}>{room.name}</option>
                        ) : ''}
                      </select>
                    </Col>
                  </Row>  
                </Col>      
                <Col > 
                {rooms && rooms.filter(room => Number(room.room_type) === Number(roomType)) && 
                  rooms.filter(room => Number(room.room_type) === Number(roomType)).length > 0 ? (
                  <Card style={{backgroundColor:'#eff3fa'}}>
                    <Row>
                      <Col style={{backgroundColor:'#94bdf1'}}>ظرفیت: </Col>
                      <Col >{rooms.filter(rm => Number(rm.id) === Number(meeting_room))[0].capacity}
                      </Col>
                      <Col></Col>
                    </Row>
                    {roomEquipments && roomEquipments.length > 0 ?
                    roomEquipments.map((equipment, index) => (
                      <Row key={index}>
                        <Col style={{backgroundColor:'#94bdf1'}}>تجهیزات: </Col>
                        <Col >{equipment.equipment__name}</Col>
                        <Col >{equipment.qty}</Col>
                      </Row>
                    )) :''}
                  </Card>
                ): ''}
                </Col>              
              </Row>
            </Card>
            <Card >
              <Row >
                <Col ></Col>
                <Col >
                  <Row>
                    <Col >
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
                    <Col >
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
                    <Col >
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
                <Col ></Col>
              </Row>
              <Row>
                <Col style={{textAlign:'center'}}>
                  <Button 
                      color="primary" 
                      style={{margin:"1em auto 2em auto"}} 
                      onClick={() => this.showMeetingDateRequests(day, month, year)} 
                  >جستجوی رزرو شده ها</Button>
                </Col>
              </Row>
            </Card>
            <Card >
              <Row>
                <Col xl='2'></Col>
                <Col xl='8'>
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h5">
                        لیست درخواست رزرو سالنها در این تاریخ
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table style={{direction:'rtl'}} hover striped responsive>
                        <thead id="th">
                          <tr id="tr">
                            <th style={{ width: "3%"}}></th>
                            <th style={{ width: "3%"}}></th>
                            <th style={{ width: "20%", textAlign:'center' }}> شرکت</th>
                            <th style={{ width: "20%", textAlign:'center' }}> واحد</th>
                            <th style={{ width: "16%", textAlign:'center' }}> سالن</th>
                            <th style={{ width: "16%", textAlign:'center' }}> شروع</th>
                            <th style={{ width: "16%", textAlign:'center' }}> پایان</th>
                            <td style={{ width: "3%"}}></td>
                            <td style={{ width: "3%"}}></td>
                          </tr>
                        </thead>
                        <tbody id="tb">
                        {dateRequests && dateRequests.length > 0 ? (
                          dateRequests.map((request, index) => {
                              return ( 
                                <tr key={index} onClick={() => this.handleSelectedRequestChange(request)}>
                                  <td style={{ width: "3%"}}>
                                    <ArrowLeft size={13} className={request.id === requestId && 
                                      Number(sessionStorage.getItem('employeeid')) === Number(request.requester_id) ? 'visible-selector' : 'invisible-selector'}/>
                                  </td>
                                  <td style={{ width: "3%"}}>{index + 1}</td>
                                  <td style={{ width: "20%", textAlign:'center'}}>{request.department__company__name}</td>
                                  <td style={{ width: "25%", textAlign:'center'}}>{request.department__name}</td>
                                  <td style={{ width: "20%", textAlign:'center'}}>{request.meeting_room__name}</td>
                                  <td style={{ width: "16%", textAlign:'center' }}>{request.start_hour}</td>
                                  <td style={{ width: "16%", textAlign:'center'}} className="table-action">{request.end_hour}</td>
                                  <td style={{ width: "3%"}} className="table-action">
                                    {Number(sessionStorage.getItem('employeeid')) === Number(request.requester_id) ? (
                                    <Edit2 
                                      onClick={() => this.editMeetingRequest(request.id)} 
                                      className="align-middle mr-1"
                                      size={18}
                                    />
                                    ) : ''}
                                  </td>
                                  <td style={{ width: "3%"}} className="table-action">
                                  {JSON.parse(sessionStorage.getItem('meetingRequestAdmin')).some(
                                    permission => sessionStorage.getItem('permissions').includes(permission)) ? (
                                    <Trash 
                                      onClick={() => this.props.removeRequest(request.id)} 
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
                          onClick={() => this.addMeetingRequest()}
                          className="align-middle"
                          size={18}
                        />
                    </CardFooter>
                  </Card>
                </Col>
                <Col xl='2'></Col>
              </Row>
            </Card>        
            {editMood > 0 ? (
            <Card >
              <Card >
                <Row>
                  <Col ></Col>
                  <Col>
                    <Row>
                      <Col >
                        <label>ساعت شروع : </label>
                        <select style={{width:'3em', backgroundColor: "whitesmoke"}} value={startMinute}
                        onChange={(e) => this.setState({startMinute: String(e.target.value)})}>
                          <option value={'00'}>00</option>
                          <option value={'01'}>01</option>
                          <option value={'02'}>02</option>
                          <option value={'03'}>03</option>
                          <option value={'04'}>04</option>
                          <option value={'05'}>05</option>
                          <option value={'06'}>06</option>
                          <option value={'07'}>07</option>
                          <option value={'08'}>08</option>
                          <option value={'09'}>09</option>
                          <option value={'10'}>10</option>
                          <option value={'11'}>11</option>
                          <option value={'12'}>12</option>
                          <option value={'13'}>13</option>
                          <option value={'14'}>14</option>
                          <option value={'15'}>15</option>
                          <option value={'16'}>16</option>
                          <option value={'17'}>17</option>
                          <option value={'18'}>18</option>
                          <option value={'19'}>19</option>
                          <option value={'20'}>20</option>
                          <option value={'21'}>21</option>
                          <option value={'22'}>22</option>
                          <option value={'23'}>23</option>
                          <option value={'24'}>24</option>
                          <option value={'25'}>25</option>
                          <option value={'26'}>26</option>
                          <option value={'27'}>27</option>
                          <option value={'28'}>28</option>
                          <option value={'29'}>29</option>
                          <option value={'30'}>30</option>
                          <option value={'31'}>31</option>
                          <option value={'32'}>32</option>
                          <option value={'33'}>33</option>
                          <option value={'34'}>34</option>
                          <option value={'35'}>35</option>
                          <option value={'36'}>36</option>
                          <option value={'37'}>37</option>
                          <option value={'38'}>38</option>
                          <option value={'39'}>39</option>
                          <option value={'40'}>40</option>
                          <option value={'41'}>41</option>
                          <option value={'42'}>42</option>
                          <option value={'43'}>43</option>
                          <option value={'44'}>44</option>
                          <option value={'45'}>45</option>
                          <option value={'46'}>46</option>
                          <option value={'47'}>47</option>
                          <option value={'48'}>48</option>
                          <option value={'49'}>49</option>
                          <option value={'50'}>50</option>
                          <option value={'51'}>51</option>
                          <option value={'52'}>52</option>
                          <option value={'53'}>53</option>
                          <option value={'54'}>54</option>
                          <option value={'55'}>55</option>
                          <option value={'56'}>56</option>
                          <option value={'57'}>57</option>
                          <option value={'58'}>58</option>
                          <option value={'59'}>59</option>
                          <option value={'60'}>60</option>
                        </select>
                        <select style={{width:'3em', backgroundColor: "whitesmoke"}} value={startHour}
                        onChange={(e) => this.setState({startHour: String(e.target.value)})}>
                          <option value={'07'}>07</option>
                          <option value={'08'}>08</option>
                          <option value={'09'}>09</option>
                          <option value={'10'}>10</option>
                          <option value={'11'}>11</option>
                          <option value={'12'}>12</option>
                          <option value={'13'}>13</option>
                          <option value={'14'}>14</option>
                          <option value={'15'}>15</option>
                          <option value={'16'}>16</option>
                          <option value={'17'}>17</option>
                          <option value={'18'}>18</option>
                          <option value={'19'}>19</option>
                          <option value={'20'}>20</option>
                        </select>
                      </Col>
                      <Col >
                        <label>ساعت پایان : </label>
                        <select style={{width:'3em', backgroundColor: "whitesmoke"}} value={endMinute}
                        onChange={(e) => this.setState({endMinute: String(e.target.value)})}>
                          <option value={'00'}>00</option>
                          <option value={'01'}>01</option>
                          <option value={'02'}>02</option>
                          <option value={'03'}>03</option>
                          <option value={'04'}>04</option>
                          <option value={'05'}>05</option>
                          <option value={'06'}>06</option>
                          <option value={'07'}>07</option>
                          <option value={'08'}>08</option>
                          <option value={'09'}>09</option>
                          <option value={'10'}>10</option>
                          <option value={'11'}>11</option>
                          <option value={'12'}>12</option>
                          <option value={'13'}>13</option>
                          <option value={'14'}>14</option>
                          <option value={'15'}>15</option>
                          <option value={'16'}>16</option>
                          <option value={'17'}>17</option>
                          <option value={'18'}>18</option>
                          <option value={'19'}>19</option>
                          <option value={'20'}>20</option>
                          <option value={'21'}>21</option>
                          <option value={'22'}>22</option>
                          <option value={'23'}>23</option>
                          <option value={'24'}>24</option>
                          <option value={'25'}>25</option>
                          <option value={'26'}>26</option>
                          <option value={'27'}>27</option>
                          <option value={'28'}>28</option>
                          <option value={'29'}>29</option>
                          <option value={'30'}>30</option>
                          <option value={'31'}>31</option>
                          <option value={'32'}>32</option>
                          <option value={'33'}>33</option>
                          <option value={'34'}>34</option>
                          <option value={'35'}>35</option>
                          <option value={'36'}>36</option>
                          <option value={'37'}>37</option>
                          <option value={'38'}>38</option>
                          <option value={'39'}>39</option>
                          <option value={'40'}>40</option>
                          <option value={'41'}>41</option>
                          <option value={'42'}>42</option>
                          <option value={'43'}>43</option>
                          <option value={'44'}>44</option>
                          <option value={'45'}>45</option>
                          <option value={'46'}>46</option>
                          <option value={'47'}>47</option>
                          <option value={'48'}>48</option>
                          <option value={'49'}>49</option>
                          <option value={'50'}>50</option>
                          <option value={'51'}>51</option>
                          <option value={'52'}>52</option>
                          <option value={'53'}>53</option>
                          <option value={'54'}>54</option>
                          <option value={'55'}>55</option>
                          <option value={'56'}>56</option>
                          <option value={'57'}>57</option>
                          <option value={'58'}>58</option>
                          <option value={'59'}>59</option>
                          <option value={'60'}>60</option>
                        </select>          
                        <select style={{width:'3em', backgroundColor: "whitesmoke"}} value={endHour}
                        onChange={(e) => this.setState({endHour: String(e.target.value)})}>
                          <option value={'07'}>07</option>
                          <option value={'08'}>08</option>
                          <option value={'09'}>09</option>
                          <option value={'10'}>10</option>
                          <option value={'11'}>11</option>
                          <option value={'12'}>12</option>
                          <option value={'13'}>13</option>
                          <option value={'14'}>14</option>
                          <option value={'15'}>15</option>
                          <option value={'16'}>16</option>
                          <option value={'17'}>17</option>
                          <option value={'18'}>18</option>
                          <option value={'19'}>19</option>
                          <option value={'20'}>20</option>
                        </select>
                      </Col>
                    </Row>
                  </Col>
                  <Col ></Col>
                </Row>            
              </Card>
              <Card >
                <Row>
                  <Col xl='2'></Col>
                  <Col xl='4'>
                    <Table style={{direction:'rtl'}} hover striped responsive>
                      <thead id="th">
                        <tr id="tr">
                          <th style={{ width: "3%", textAlign:'center'}}>#</th>
                          <th style={{ width: "90%", textAlign:'center' }}> سرویس پذیرائی</th>
                          <th style={{ width: "4%", textAlign:'center'}}/>
                          <th style={{ width: "3%", textAlign:'center'}}/>
                        </tr>
                      </thead>
                      <tbody id="tb">
                        {caterTypes && caterTypes.length > 0 ? (
                          caterTypes.map((caterType, index) => {
                            return ( 
                              <tr key={index}>
                                <td style={{ width: "3%", textAlign:'center'}}>{index+1}</td>
                                <td style={{ width: "90%", textAlign:'center' }}>{caterType.name}</td>
                                <td style={{ width: "4%", textAlign:'center'}} className="table-action">
                                  <input 
                                      type="checkbox"
                                      value={caterType.id}
                                      checked={(requestCaterTypes ? 
                                          editMood === 1 ? (
                                          requestCaterTypes.filter(rct => Number(rct.cater_type_id) === Number(caterType.id)) &&
                                          requestCaterTypes.filter(rct => Number(rct.cater_type_id) === Number(caterType.id)).length > 0)
                                          : editMood === 2 ? (
                                            requestCaterTypes.filter(rct => Number(rct.request_id) === Number(requestId) && Number(rct.cater_type_id) === Number(caterType.id)) &&
                                            requestCaterTypes.filter(rct => Number(rct.request_id) === Number(requestId) && Number(rct.cater_type_id) === Number(caterType.id)).length > 0)
                                          : false
                                        : false)}
                                      onChange={this.requestCaterTypesChanged()}
                                    />
                                </td>
                                <td style={{ width: "3%"}} className="table-action">
                                    <Edit2 
                                      className={(requestCaterTypes ? 
                                        editMood === 1 ? (
                                        requestCaterTypes.filter(rct => Number(rct.cater_type_id) === Number(caterType.id)) &&
                                        requestCaterTypes.filter(rct => Number(rct.cater_type_id) === Number(caterType.id)).length > 0)
                                        : editMood === 2 ? (
                                          requestCaterTypes.filter(rct => Number(rct.request_id) === Number(requestId) && Number(rct.cater_type_id) === Number(caterType.id)) &&
                                          requestCaterTypes.filter(rct => Number(rct.request_id) === Number(requestId) && Number(rct.cater_type_id) === Number(caterType.id)).length > 0)
                                        : false
                                      : false) ? "visible-edit" : "invisible-edit"}
                                      onClick={() => this.editRequestCaterType(caterType.id)} 
                                      size={18}
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
                          <th style={{ width: "90%", textAlign:'center' }}>تجهیز</th>
                          <th style={{ width: "5%", textAlign:'center' }}/>
                        </tr>
                      </thead>
                      <tbody id="tb">
                        {equipments && equipments.length > 0 ? (
                          equipments.filter(equipment => Boolean(equipment.fixed) === false).map((equipment, index) => {
                            return ( 
                              <tr key={index}>
                                <td style={{ width: "5%", textAlign:'center'}}>{index+1}</td>
                                <td style={{ width: "90%", textAlign:'center' }}>{equipment.name}</td>
                                <td style={{ width: "5%", textAlign:'center'}} className="table-action">
                                <input 
                                      type="checkbox"
                                      value={equipment.id}
                                      checked={
                                        (requestEquipments 
                                          ? 
                                          editMood === 1 ? (
                                          requestEquipments.filter(re => Number(re.equipment_id) === Number(equipment.id)) &&
                                          requestEquipments.filter(re => Number(re.equipment_id) === Number(equipment.id)).length > 0)
                                          : editMood === 2 ? (
                                            requestEquipments.filter(re => Number(re.request_id) === Number(requestId) && Number(re.equipment_id) === Number(equipment.id)) &&
                                            requestEquipments.filter(re => Number(re.request_id) === Number(requestId) && Number(re.equipment_id) === Number(equipment.id)).length > 0)
                                          : false
                                        : false)}
                                      onChange={this.requestEquipmentsChanged()}
                                    />
                                </td>
                                <td style={{ width: "3%"}} className="table-action">
                                    <Edit2 
                                      className={(requestEquipments ? 
                                        editMood === 1 ? (
                                        requestEquipments.filter(re => Number(re.equipment_id) === Number(equipment.id)) &&
                                        requestEquipments.filter(re => Number(re.equipment_id) === Number(equipment.id)).length > 0)
                                        : editMood === 2 ? (
                                          requestEquipments.filter(re => Number(re.request_id) === Number(requestId) && Number(re.equipment_id) === Number(equipment.id)) &&
                                          requestEquipments.filter(re => Number(re.request_id) === Number(requestId) && Number(re.equipment_id) === Number(equipment.id)).length > 0)
                                        : false
                                      : false) ? "visible-edit" : "invisible-edit"}
                                      onClick={() => this.editRequestEquipment(equipment.id)} 
                                      size={18}
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
                  <Col xl="1" style={{textAlign:'left'}}>
                    <span >
                    توضیحات :
                    </span>
                  </Col>
                  <Col xl="10">
                    <textarea 
                        style={{width:'100%', height:'100px', textAlign:'right', fontSize:'1em', backgroundColor: "whitesmoke"}}  
                        value={description} 
                        onChange={(e) => this.setState({ description: String(e.target.value)})}
                        >
                    </textarea>
                  </Col>
                  <Col xl="1"></Col>
                </Row>
                <Row>
                  <Col xl="4"></Col>
                  <Col xl="4" style={{textAlign:'center'}}>
                    <Row>
                      <Col>
                        <Button 
                            color="primary" 
                            style={{margin:"1em auto 2em auto"}} 
                            onClick={() => this.saveMeetingRequest(day, month, year)} 
                        >ذخیره درخواست</Button>
                      </Col>
                      <Col>
                        <Button 
                            color="danger" 
                            style={{margin:"1em auto 2em auto", width:"95px"}} 
                            onClick={() => this.setState({ 
                              editMood: 0, 
                              requestId: 0,
                              title: '',
                              meeting_member_no: 1,
                              company: this.props.companys && this.props.companys.length > 0 ? this.props.companys[0].id : 0,
                              roomType: this.props.roomTypes && this.props.roomTypes.length > 0 ? this.props.roomTypes[0].id : 0,
                              startHour: '07',
                              startMinute: '00',
                              endHour: '08',
                              endMinute: '00',
                              description: '',
                              requestCaterTypes: [],
                              requestEquipments: [],
                              flag3: true,
                              flag4: true,
                            })} 
                        >  انصراف </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl="4"></Col>
                </Row>              
              </Card>
            </Card>
            ) : ''}
          </Container>
        </Card>
        <RequestCaterTypesModal onSave={this.requestCaterTypeModelSaveHandling} onClose={this.requestCaterTypeModelCloseHandling}></RequestCaterTypesModal>
        <RoomEquipmentsModal onSave={this.requestEquipmentModelSaveHandling} onClose={this.requestEquipmentModelCloseHandling}></RoomEquipmentsModal>
      </React.Fragment>
    );
  };
}

const mapStateToProps = store => {
  return {
    companys: store.companies.companies,
    departments: store.departments.departments,

    roomTypes: store.roomTypes.roomTypes,
    rooms: store.rooms.rooms,
    roomEquipments: store.rooms.roomEquipments,
    equipments: store.equipments.equipments,
    caterTypes: store.caterTypes.caterTypes,
    requests: store.requests.requests,
    dateRequests: store.requests.dateRequests,

    requestCaterTypes: store.requests.requestCaterTypes,
    requestEquipments: store.requests.requestEquipments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDateRequestsList: object => {
      dispatch(GetDateRequestsList(object))
    }, 
    getRequestCaterTypesList: requestId => {
      dispatch(GetRequestCaterTypesList(requestId))
    },
    getRequestEquipmentsList: (requestId) => {
      dispatch(GetRequestEquipmentsList(requestId))
    },
    getRoomFixedEquipmentsList: id => {
      dispatch(GetRoomFixedEquipmentsList(id))
    }, 
    addRequestCaterTypesModel: () => {
      dispatch(AddRequestCaterTypeModel())
    },
    addRequestEquipmentsModel: () => {
      dispatch(AddRequestEquipmentModel())
    },
    editRequestCaterTypeModel: (model) => {
      dispatch(EditRequestCaterTypeModel(model))
    },
    editRequestEquipmentModel: (model) => {
      dispatch(EditRequestEquipmentModel(model))
    },
    saveMeetingRequest: (model) => {
      dispatch(SaveMeetingRequest(model))
    },
    removeRequest: (id) => {
      if(window.confirm('آیا از حذف اطمینان دارید؟')){
        dispatch(RemoveRequest(id))
      }
    },    
    clearDateRequests: () => {
      dispatch(ClearDateRequests())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
