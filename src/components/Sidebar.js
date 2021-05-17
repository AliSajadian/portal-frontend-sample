import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Badge, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { LogOut } from "react-feather";
// import { Box } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import routes from "../routes/index";
// import avatar from "../assets/img/avatars/avatar.jpg";
//import logo from "../assets/img/logo.svg";
import logo from "../assets/img/logos/logo.png";
// import Icon from 'react-icons-kit';
// import { ic_restaurant } from 'react-icons-kit/md/ic_restaurant';
// import { userMd } from 'react-icons-kit/fa/userMd';
import { Log_Out} from "../redux/actions/authActions";



const SidebarCategory = withRouter(
  ({
    name,
    badgeColor,
    badgeText,
    icon: IconEx,
    isOpen,
    children,
    onClick,
    location,
    to,
  }) => {
    const getSidebarItemClass = (path) => {
      return location.pathname.indexOf(path) !== -1 ||
        (location.pathname === "/" && path === "/dashboard")
        ? "active"
        : "";
    };

    return ( 
      <li className={"sidebar-item " + getSidebarItemClass(to)} >
        <span
          data-toggle="collapse"
          className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
          onClick={onClick}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="align-middle" style={{fontSize:'.92rem', fontWeight:'bold'}}>{name}</span>
          {/* {(name === 'رستوران') ? <Icon size={18} style={{color:'white'}} icon={ic_restaurant} className="align-middle mr-3 ml-0"/> : (name === 'نوبت دهی پزشک') ? <Icon size={18} color={'light'} icon={userMd} className="align-middle mr-3 ml-0"/> : IconEx ? <IconEx size={18} className="align-middle mr-3" /> : null} */}
          {IconEx ? <IconEx size={18} className="align-middle mr-3" /> : null}
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </span>
        <Collapse isOpen={isOpen}>
          <ul id="item" className={"sidebar-dropdown list-unstyled"}>
            {children}
          </ul>
        </Collapse>
      </li>
    );
  }
);

const SidebarItem = withRouter(
  ({ name, badgeColor, badgeText, icon: Icon, location, to }) => {
    const getSidebarItemClass = (path) => {
      return location.pathname === path ? "active" : "";
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)} >
        <NavLink to={to} className="sidebar-link" activeClassName="active" >
          <span style={{fontSize:'.842rem', fontWeight:'bold'}}>{name}</span>
          {Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </NavLink>
      </li>
    );
  }
);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = (index) => {
    // Collapse all elements
    Object.keys(this.state).forEach(
      (item) =>
        this.state[index] ||
        this.setState(() => ({
          [item]: false,
        }))
    );

    // Toggle selected element
    this.setState((state) => ({
      [index]: !state[index],
    }));
  };

  componentWillMount() {
    /* Open collapse element that matches current url */
    const pathName = this.props.location.pathname;

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/" ? true : false;

      this.setState(() => ({
        [index]: isActive || isOpen || isHome,
      }));
    });
  }

  render() {
    const { sidebar, layout } = this.props;

    return (
      <nav
        className={
          "sidebar" +
          (!sidebar.isOpen ? " toggled" : "") +
          (sidebar.isSticky ? " sidebar-sticky" : "")
        }
      >
        <div className="sidebar-content"  >
          <PerfectScrollbar >
            <a className="sidebar-brand" href="/" style={{paddingTop:"0.22em", paddingBottom:"0.22em", marginBottom: "2em", backgroundColor:"#1c2638"}}>
              <span style={{fontSize:'1.35rem', fontWeight:'bold'}}>پرتال سازمانی</span>
              <img
                style={{ marginLeft: ".5em", width: "20%" }}
                className="main-logo"
                src={logo}
                alt=""
              ></img>
            </a>
            <ul className="sidebar-nav">
              {
                JSON.parse(sessionStorage.getItem('groups')).some(group => group === 1 ||  group === 2) ?
                // .includes(1) || sessionStorage.getItem('groups').includes(2)) ?
                routes.map((category, index) => {
                    // if(category.name === 'نوبت دهی پزشک' || category.name === "سوابق بیمار") { console.log('category: ', category, 'index: ', index) }
                    // console.log('sessionStorage.getItem(groups).some(group => group === 1): ', JSON.parse(sessionStorage.getItem('groups')).some(group => group === 1) )
                return (
                  <React.Fragment key={index}>
                    {category.header ? (
                      <li className="sidebar-header">{category.header}</li>
                    ) : null}
                    {category.children ? (
                      (
                        <SidebarCategory 
                        name={category.name}
                        badgeColor={category.badgeColor}
                        badgeText={category.badgeText}
                        icon={category.icon}
                        to={category.path}
                        isOpen={this.state[index]}
                        onClick={() => this.toggle(index)}
                      >
                        {category.children.map((route, index) => (
                          ((sessionStorage.getItem('groups').includes(1)) || (sessionStorage.getItem('groups').includes(2) && (route.name !== 'مجوز های کاربری' && route.name !== 'تغییر کلمه عبور'))) ?
                          (
                          // ((route.name === 'برنامه هفتگی' || route.name === "برنامه روزانه" || route.name === 'نوبت دهی' || route.name === "سوابق بیمار") ? 
                          // console.log('route: ', route, 'index: ', index) : console.log('')),
                          <SidebarItem 
                            key={index}
                            name={route.name}
                            to={route.path}
                            badgeColor={route.badgeColor}
                            badgeText={route.badgeText}
                          />) : ''
                        ))}
                        </SidebarCategory>
                      ))                                        
                       :
                    <SidebarItem
                    name={category.name}
                    to={category.path}
                    icon={category.icon}
                    badgeColor={category.badgeColor}
                    badgeText={category.badgeText}
                  />}
                  </React.Fragment>
                );
              }):
              routes.map((category, index) => {
                return (
                  <React.Fragment key={index}>
                    {category.header ? (
                      <li className="sidebar-header">{category.header}</li>
                    ) : null}
                    {category.children ? (
                      (category.name === 'اطلاعات پایه' || category.name === 'امنیت') && JSON.parse(sessionStorage.getItem('baseinfoAdmin')).some(permission => sessionStorage.getItem('permissions').includes(permission)) ? 
                      <SidebarCategory 
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={this.state[index]}
                      onClick={() => this.toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        (route.name !== 'مجوز های کاربری' && route.name !== 'گروه کاربری' && route.name !== 'گروه و مجوزهای گروه' && route.name !== 'کاربر و مجوزهای کاربری' && route.name !== 'تغییر کلمه عبور') ? (
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        /> ):''
                      ))}
                    </SidebarCategory>
                    : JSON.parse(sessionStorage.getItem('surveysAdmin')).some(permission => sessionStorage.getItem('permissions').includes(permission)) && category.name === 'نظرسنجی' ?
                      <SidebarCategory 
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={this.state[index]}
                      onClick={() => this.toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        /> 
                      ))}
                    </SidebarCategory>   
                    : JSON.parse(sessionStorage.getItem('docappointmentAdmin')).some(permission => sessionStorage.getItem('permissions').includes(permission)) && category.name === 'نوبت دهی پزشک' ?
                      <SidebarCategory 
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={this.state[index]}
                      onClick={() => this.toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        /> 
                      ))}
                    </SidebarCategory>
                    : JSON.parse(sessionStorage.getItem('restaurantAdmin')).some(permission => sessionStorage.getItem('permissions').includes(permission)) && category.name === 'رستوران' ?
                      <SidebarCategory 
                    name={category.name}
                    badgeColor={category.badgeColor}
                    badgeText={category.badgeText}
                    icon={category.icon}
                    to={category.path}
                    isOpen={this.state[index]}
                    onClick={() => this.toggle(index)}
                  >
                    {category.children.map((route, index) => (
                      <SidebarItem
                        key={index}
                        name={route.name}
                        to={route.path}
                        badgeColor={route.badgeColor}
                        badgeText={route.badgeText}
                      /> 
                    ))}
                  </SidebarCategory>
                    : JSON.parse(sessionStorage.getItem('surveysUser')).some(permission => sessionStorage.getItem('permissions').includes(permission)) && category.name === 'نظرسنجی' ?
                      <SidebarCategory 
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={this.state[index]}
                      onClick={() => this.toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        (route.name === 'نظرسنجی' || route.name === 'گزارش نظرسنجی') ?
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        /> : ''
                      ))}
                    </SidebarCategory>    
                    : JSON.parse(sessionStorage.getItem('docappointmentUser')).some(permission => sessionStorage.getItem('permissions').includes(permission)) && category.name === 'نوبت دهی پزشک' ?
                      <SidebarCategory 
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={this.state[index]}
                      onClick={() => this.toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        (route.name === 'نوبت دهی') ?
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        /> : ''
                      ))}
                    </SidebarCategory>
                    : JSON.parse(sessionStorage.getItem('doctor')).some(permission => sessionStorage.getItem('permissions').includes(permission)) && category.name === 'سوابق بیمار' ?
                    <SidebarCategory 
                    name={category.name}
                    badgeColor={category.badgeColor}
                    badgeText={category.badgeText}
                    icon={category.icon}
                    to={category.path}
                    isOpen={this.state[index]}
                    onClick={() => this.toggle(index)}
                  >
                    {category.children.map((route, index) => (
                      (route.name === 'سوابق بیمار') ?
                      <SidebarItem
                        key={index}
                        name={route.name}
                        to={route.path}
                        badgeColor={route.badgeColor}
                        badgeText={route.badgeText}
                      /> : ''
                    ))}
                  </SidebarCategory>
                    : JSON.parse(sessionStorage.getItem('restaurantUser')).some(permission => sessionStorage.getItem('permissions').includes(permission)) && category.name === 'رستوران' ?
                    <SidebarCategory 
                    name={category.name}
                    badgeColor={category.badgeColor}
                    badgeText={category.badgeText}
                    icon={category.icon}
                    to={category.path}
                    isOpen={this.state[index]}
                    onClick={() => this.toggle(index)}
                  >
                    {category.children.map((route, index) => (
                        (route.name === 'انتخاب ماهیانه غذاها') ?
                        <SidebarItem
                        key={index}
                        name={route.name}
                        to={route.path}
                        badgeColor={route.badgeColor}
                        badgeText={route.badgeText}
                      /> : ''
                    ))}
                  </SidebarCategory>      
                    : (category.name === 'امنیت' && sessionStorage.getItem('username').match(/[a-z|A-Z]+\_[a-z|A-Z|\s]+/g) !== null)  ?
                    <SidebarCategory 
                    name={category.name}
                    badgeColor={category.badgeColor}
                    badgeText={category.badgeText}
                    icon={category.icon}
                    to={category.path}
                    isOpen={this.state[index]}
                    onClick={() => this.toggle(index)}
                  >
                    {category.children.map((route, index) => (
                      (route.name === 'تغییر کلمه عبور') ? (
                        <SidebarItem
                        key={index}
                        name={route.name}
                        to={route.path}
                        badgeColor={route.badgeColor}
                        badgeText={route.badgeText}
                      />) : ''
                    ))}
                  </SidebarCategory>                                
                  : ''                  
                  )                                        
                       :
                    <SidebarItem
                    name={category.name}
                    to={category.path}
                    icon={category.icon}
                    badgeColor={category.badgeColor}
                    badgeText={category.badgeText}
                  />}
                  </React.Fragment>
                );              
              })
            }
            </ul>

            {/* {!layout.isBoxed && !sidebar.isSticky ? ( 
              
              */}
              <div className="sidebar-bottom" style={{marginBottom:'1em', backgroundColor:'#313233', height:'7.5vh'}}>
                <div className="media">
                  {/* <img
                    className="rounded-circle mr-3"
                    // src={avatar}
                    alt="Chris Wood"
                    width="40"    
                    height="40"  
                  /> */}
                <img
                  style={{ width: '3vw', height: '7vh' }}
                  src={'http://127.0.0.1:8000/files/' + sessionStorage.getItem('pic')}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt={sessionStorage.getItem("username")}
                />
                  <div className="media-body">
                    <h3 className="mb-1" style={{color:'white', marginRight:'1.4em', marginBottom:'.6em'}}>{sessionStorage.getItem('emp_first_name') + ' ' + sessionStorage.getItem('emp_last_name')}</h3>
                    {/* <div>     .substring(1, sessionStorage.getItem('emp_first_name').length - 1)
                      <FontAwesomeIcon     .substring(1, sessionStorage.getItem('emp_last_name').length - 1)
                        icon={faCircle}
                        className="text-success"
                      />{" "}
                      Online
                    </div> */}
                    <div>
                    <span style={{fontSize:'.9rem', marginRight:'.5em'}}>خروج از سیستم</span>
                    <LogOut style={{cursor:'pointer'}}
                        onClick={() =>
                          this.props.logOut()
                          // this.generateCode()
                        }
                        className="align-middle"
                        size={22}
                    />
                    </div>
                  </div>
                </div>
              </div>
            {/* ) : null} */}
          </PerfectScrollbar>
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect((store) => ({
    sidebar: store.sidebar,
    layout: store.layout,
  }), dispatch => {
    return {
      logOut : () => dispatch(Log_Out())
  }
  })(Sidebar)
);
