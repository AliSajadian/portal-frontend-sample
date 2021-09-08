import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Form,
  Input
} from "reactstrap";
import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  // MessageCircle,
  // PieChart,
  // User,
  Settings,
  UserPlus  
} from "react-feather";
// import usFlag from "../assets/img/flags/us.png";
// import irFlag from "../assets/img/flags/ir.png";
// import avatar1 from "../assets/img/avatars/avatar.jpg";
// import avatar3 from "../assets/img/avatars/avatar-3.jpg";
// import avatar4 from "../assets/img/avatars/avatar-4.jpg";
// import avatar5 from "../assets/img/avatars/avatar-5.jpg";

import { Log_Out} from "../redux/actions/authActions";
import "./component.css"
import AsftLinksModal from './AsftLinksModal'
import BahavandLinksModal from './BahavandLinksModal'
import EhdasLinksModal from './EhdasLinksModal'
import AstoLinksModal from './AstoLinksModal'
import FalatparsLinksModal from './FalatparsLinksModal'
import AvijesanatLinksModal from './AvijesanatLinksModal'
import Icon from 'react-icons-kit';
import { right } from 'react-icons-kit/iconic/right';
import {
  GetFilteredNotifications,
  EditNotification,
} from "../redux/actions/notificationsActions";



// const notifications = this.props.notifications;
// [
//   {
//     type: "important",
//     title: "Update completed",
//     description: "Restart server 12 to complete the update.",
//     time: "2h ago"
//   },
//   {
//     type: "default",
//     title: "Lorem ipsum",
//     description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
//     time: "6h ago"
//   },
//   {
//     type: "login",
//     title: "Login from 192.186.1.1",
//     description: "",
//     time: "6h ago"
//   },
//   {
//     type: "request",
//     title: "New connection",
//     description: "Anna accepted your request.",
//     time: "12h ago"
//   }
// ];

// const messages = [
//   {
//     name: "Ashley Briggs",
//     avatar: avatar5,
//     description: "Nam pretium turpis et arcu. Duis arcu tortor.",
//     time: "15m ago"
//   },
//   {
//     name: "Chris Wood",
//     avatar: avatar1,
//     description: "Curabitur ligula sapien euismod vitae.",
//     time: "2h ago"
//   },
//   {
//     name: "Stacie Hall",
//     avatar: avatar4,
//     description: "Pellentesque auctor neque nec urna.",
//     time: "4h ago"
//   },
//   {
//     name: "Bertha Martin",
//     avatar: avatar3,
//     description: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
//     time: "5h ago"
//   }
// ];

const NavbarDropdown = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon
}) => (
    <UncontrolledDropdown nav inNavbar className="mr-2" >
      <DropdownToggle nav className="nav-icon dropdown-toggle">
        {/* className="position-relative" */}
        <div >
          <Icon className="align-middle" size={18} />
          {showBadge ? <span className="indicator">{count}</span> : null}
        </div>
      </DropdownToggle>
      {/* className="dropdown-menu-lg py-0" */}
      <DropdownMenu right className="nav-menu">
      {/* className="dropdown-menu-header position-relative" */}
        <div className='header'>
          {count} {header}
        </div>
        <div className='nav-menu'>
        <ListGroup >{children}</ListGroup></div>
        {/* className="dropdown-menu-footer" */}
        <DropdownItem header className='footer'>
          {/* <span className="text-muted">{footer}</span> */}
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

const NavbarDropdownItem = ({ id, icon, title, description, created_date, expired_date, spacing, read_status, editNotification }) => (
  <ListGroupItem>
    {/* className="align-items-center" noGutters*/}
    <Row   className="nav-menu-content" >
      <Col xs={1}>{icon}</Col>
      {/* className={spacing ? "pl-2" : null} */}
      <Col xs={10} >
        <div className="text-dark" style={{textAlign:'center', margin:'0'}}>{title}</div>
        <div className="text-muted small mt-1" style={{textAlign:'center', margin:'0'}}>{description}</div>
        {/* <div className="text-muted small mt-1">{time}</div> */}
      </Col>
      <Col xs={1}>
      <input 
        type="checkbox"
        value={read_status}
        checked={read_status}
        onChange={() => editNotification({id:id, title:title, description:description, created_date:created_date, expired_date:expired_date, read_status:true})}
        />
      </Col>
    </Row>
  </ListGroupItem>
);
const NavbarComponent = ({ toggleSidebar, user, logOut , notifications, getFilteredNotifications, editNotification, isChanged}) => {
  
  if(isChanged){
      getFilteredNotifications(user.id);
  }
    //  console.log('user.id: ',user.id, ' isChanged: ', isChanged)

  // console.log('NavbarComponent notifications: ', notifications, ' ,isChanged: ', isChanged)
  return (
    <div className="flex-container">
    <Navbar  light expand className="navbar">
      <div>
      <Collapse navbar>
        <Nav className="ml-auto" navbar >
          {/* <UncontrolledDropdown  className="mr-2">     ///////color='white'
            <DropdownToggle nav caret className="nav-flag">
              <img src={irFlag} alt="Persian" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <img
                  src={irFlag}
                  alt="Persian"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">فارسی</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={usFlag}
                  alt="English"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">انکلیسی</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}

          {/* <UncontrolledDropdown >
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={16} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={'http://portalapi.asft.co/files/' + sessionStorage.getItem('pic')}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt={sessionStorage.getItem("username")}
                />
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              <DropdownItem>راهنمای سیستم</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={logOut}>خروج از سیستم</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}

          <div style={{width:'150px'}}></div>

          <NavbarDropdown 
            header="اعلانات جدید"
            footer="نمایش تمام اعلانات"
            icon={Bell}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === "important") {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === "login") {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === "request") {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  id={item.id}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  created_date={item.created_date}
                  expired_date={item.expired_date}
                  read_status={item.read_status}
                  editNotification={editNotification}
                />
              );
            })}
          </NavbarDropdown>

          <div style={{width:'30px'}}></div>

          {/* <NavbarDropdown
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={messages.length}
            showBadge
          >
            {messages.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                      className="avatar img-fluid rounded-circle"
                      src={item.avatar}
                      alt={item.name}
                    />
                  }
                  title={item.name}
                  description={item.description}
                  time={item.time}
                  spacing
                />
              );
            })}
          </NavbarDropdown> */}

          <div style={{marginTop:'.8em', marginRight:'.4em', cursor:'pointer'}}><AvijesanatLinksModal dialogClassName='dialogClassName'></AvijesanatLinksModal></div>
          <div style={{marginTop:'.8em', marginRight:'.4em', cursor:'pointer'}}><FalatparsLinksModal dialogClassName='dialogClassName'></FalatparsLinksModal></div>
          <div style={{marginTop:'.8em', marginRight:'.4em', cursor:'pointer'}}><AstoLinksModal dialogClassName='dialogClassName'></AstoLinksModal></div>
          <div style={{marginTop:'.8em', marginRight:'.4em', cursor:'pointer'}}><EhdasLinksModal dialogClassName='dialogClassName'></EhdasLinksModal></div>
          <div style={{marginTop:'.8em', marginRight:'.4em', cursor:'pointer'}}><BahavandLinksModal dialogClassName='dialogClassName'></BahavandLinksModal></div>
          <div style={{marginTop:'.5em', marginRight:'.4em', cursor:'pointer'}}><AsftLinksModal dialogClassName='dialogClassName'></AsftLinksModal></div>

        </Nav>
      </Collapse>
      </div>
      <div style={{marginLeft:'auto'}}>
        {/* <span 
          className="sidebar-toggle d-flex mr-2"
          onClick={toggleSidebar}
        >
          <i className="align-self-center" />
        </span> */}
        <Icon 
          className="sidebar-toggle d-flex mr-2"
          onClick={toggleSidebar}
          icon={right}
          size={26}
        />
      </div>
    </Navbar>
    </div>
  );
};

export default connect(store => ({
  app: store.app,
  user: store.auth.user,
  notifications: store.notifications.notifications,
  isChanged: store.notifications.isChanged,
}) , dispatch => {
  return {
    logOut : () => dispatch(Log_Out()) , 
    toggleSidebar : () => dispatch(toggleSidebar()),
    getFilteredNotifications : (id) => dispatch(GetFilteredNotifications(id)),
    editNotification : (model) => dispatch(EditNotification(model)),
  }
})(NavbarComponent);

// const mapStateToProps = store => {
//   return {
//     app: store.app,
//     user: store.auth.user,
//     notifications: store.notifications.notifications,
//     isChanged: store.notifications.isChanged,  };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     logOut : () => dispatch(LogOut()) , 
//     toggleSidebar : () => dispatch(toggleSidebar()),
//     getFilteredNotifications : (id) => dispatch(GetFilteredNotifications(id)),
//     // editNotification : (model) => dispatch(EditNotification(model)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);