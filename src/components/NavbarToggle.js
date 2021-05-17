import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";

// import { Route } from "react-router-dom";
// import AuthLayout from "../layouts/Auth";
// import ChangePassword from "../pages/auth/changePassword";

import {
  // Row,
  // Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // ListGroup,
  // ListGroupItem,
  // Form,
  // Input
} from "reactstrap";

import {
  AlignRight,
  // AlertCircle,
  // Bell,
  // BellOff,
  // Home,
  // MessageCircle,
  PieChart,
  Settings,
  User,
  // UserPlus
} from "react-feather";

import usFlag from "../assets/img/flags/us.png";
import irFlag from "../assets/img/flags/ir.png";
// import avatar1 from "../assets/img/avatars/avatar.jpg";
// import avatar3 from "../assets/img/avatars/avatar-3.jpg";
// import avatar4 from "../assets/img/avatars/avatar-4.jpg";
// import avatar5 from "../assets/img/avatars/avatar-5.jpg";
import { Log_Out} from "../redux/actions/authActions";

// const notifications = [
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

// const NavbarDropdown = ({
//   children,
//   count,
//   showBadge,
//   header,
//   footer,
//   icon: Icon
// }) => (
//     <UncontrolledDropdown nav inNavbar className="mr-2">
//       <DropdownToggle nav className="nav-icon dropdown-toggle">
//         <div className="position-relative">
//           <Icon className="align-middle" size={18} />
//           {showBadge ? <span className="indicator">{count}</span> : null}
//         </div>
//       </DropdownToggle>
//       <DropdownMenu right className="dropdown-menu-lg py-0">
//         <div className="dropdown-menu-header position-relative">
//           {count} {header}
//         </div>
//         <ListGroup>{children}</ListGroup>
//         <DropdownItem header className="dropdown-menu-footer">
//           <span className="text-muted">{footer}</span>
//         </DropdownItem>
//       </DropdownMenu>
//     </UncontrolledDropdown>
//   );

// const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
//   <ListGroupItem>
//     <Row noGutters className="align-items-center">
//       <Col xs={2}>{icon}</Col>
//       <Col xs={10} className={spacing ? "pl-2" : null}>
//         <div className="text-dark">{title}</div>
//         <div className="text-muted small mt-1">{description}</div>
//         <div className="text-muted small mt-1">{time}</div>
//       </Col>
//     </Row>
//   </ListGroupItem>
// );

const NavbarComponent1 = ({ toggleSidebar, user, logOut }) => {
  return (
    <Navbar color='white' light expand >
      <div className="push-navbar-items">
        <span 
          className="sidebar-toggle d-flex mr-2"
          onClick={toggleSidebar}
        >
          <i className="hamburger align-self-center" />
        </span>
      </div>
      {/* <Form inline>
        <Input
          type="text"
          placeholder="Search projects..."
          aria-label="Search"
          className="form-control-no-border mr-sm-2"
        />
      </Form> */}

      <Collapse navbar>
        <Nav className="ml-auto" navbar>
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

          {/* <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
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
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}  nav inNavbar
          </NavbarDropdown> */}

          <UncontrolledDropdown  className="mr-2">
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
                <span className="align-middle">Persian</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={usFlag}
                  alt="English"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">English</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown >
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={'http://127.0.0.1:8000/files/' + sessionStorage.getItem('pic')}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt="Chris Wood"
                />
                {/* <span className="text-dark">{`${user.first_name} ${user.last_name}`}</span> */}
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              {/* <DropdownItem>
                <User size={18} className="align-middle mr-2" />
                Profile
              </DropdownItem>
              <DropdownItem>
                <PieChart size={18} className="align-middle mr-2" />
                Analytics
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Settings & Privacy</DropdownItem> */}
              <DropdownItem>Help</DropdownItem>
              <DropdownItem divider />
              {/* <DropdownItem onClick={GotoChangePassword}>
                <Route
                  path={"/auth/changePassword"}
                  render={() => (
                    <AuthLayout>
                      <ChangePassword/>
                    </AuthLayout>
                  )}
                /> 
                Security
                 <Link to="/auth/changePassword">Security</Link> 
              </DropdownItem> */}
              <DropdownItem onClick={logOut}>Sign out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default connect(store => ({
  app: store.app,
  user: store.auth.user
}) , dispatch => {
  return {
    // changeUsernamePassword : (userid, username, newpassword) => dispatch(ChangeUsernamePassword(userid, username, newpassword)) , 
    logOut : () => dispatch(Log_Out()) , 
    toggleSidebar : () => dispatch(toggleSidebar())
  }
})(NavbarComponent1);
