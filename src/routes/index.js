import async from "../components/Async";

import {
  // BookOpen as BookOpenIcon,
  // CheckSquare as CheckSquareIcon,
  // Grid as GridIcon,
  // Heart as HeartIcon,
  // Layout as LayoutIcon,
  // List as ListIcon,
  // MapPin as MapPinIcon,
  // Monitor as MonitorIcon,
  // PieChart as PieChartIcon,
  // Calendar as CalendarIcon,
  // Users as UsersIcon,
  Sliders as SlidersIcon,
  Home as homeIcon,
  Info as baseinfoIcon,
  Edit as surveyIcon,
  Clock as docappointmentIcon,
  Clipboard as patientrecordIcon,
  Shield as securityIcon,
  CheckSquare as restaurantIcon,
} from "react-feather";

// import { Icon } from 'react-icons-kit'
// const IconHome () => <Icon icon={home} />
// import home from "../assets/img/icons/home.png";

// // Landing
// import Landing from "../pages/landing/Landing";

// // Auth
// import SignIn from "../pages/auth/SignIn";
// import SignUp from "../pages/auth/SignUp";
// import ResetPassword from "../pages/auth/ResetPassword";
// import Page404 from "../pages/auth/Page404";
// import Page500 from "../pages/auth/Page500";


// //Layouts
// import Boxed from "../pages/layouts/Boxed";
// import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
// import SidebarSticky from "../pages/layouts/SidebarSticky";
// import ThemeClassic from "../pages/layouts/ThemeClassic";
// import ThemeCorporate from "../pages/layouts/ThemeCorporate";
// import ThemeModern from "../pages/layouts/ThemeModern";

// // Misc
// import Blank from "../pages/misc/Blank";

// // UI Elements
// import Alerts from "../pages/ui-elements/Alerts";
// import Buttons from "../pages/ui-elements/Buttons";
// import Cards from "../pages/ui-elements/Cards";
// import General from "../pages/ui-elements/General";
// import Grid from "../pages/ui-elements/Grid";
// import Modals from "../pages/ui-elements/Modals";
// import Notifications from "../pages/ui-elements/Notifications";
// import Tabs from "../pages/ui-elements/Tabs";
// import Typography from "../pages/ui-elements/Typography";

// // // Pages
// import Profile from "../pages/pages/Profile";
// import Settings from "../pages/pages/Settings";
// import Clients from "../pages/pages/Clients";
// import Projects from "../pages/pages/Projects";
// import Invoice from "../pages/pages/Invoice";
// import Pricing from "../pages/pages/Pricing";
// import Tasks from "../pages/pages/Tasks";

// // // Documentation
// import Introduction from "../pages/docs/Introduction";
// import Installation from "../pages/docs/Installation";
// import Plugins from "../pages/docs/Plugins";
// import Changelog from "../pages/docs/Changelog";

// // // Dashboards
// const Default = async(() => import("../pages/dashboards/Default"));
// const Analytics = async(() => import("../pages/dashboards/Analytics"));
// const Ecommerce = async(() => import("../pages/dashboards/Ecommerce"));
// const Crypto = async(() => import("../pages/dashboards/Crypto"));
// const Social = async(() => import("../pages/dashboards/Social"));

// // // Forms
// const Layouts = async(() => import("../pages/forms/Layouts"));
// const BasicElements = async(() => import("../pages/forms/BasicElements"));
// const AdvancedElements = async(() => import("../pages/forms/AdvancedElements"));
// const InputGroups = async(() => import("../pages/forms/InputGroups"));
// const Editors = async(() => import("../pages/forms/Editors"));
// const Validation = async(() => import("../pages/forms/Validation"));
// const Wizard = async(() => import("../pages/forms/Wizard"));

// // // Tables
// const BootstrapTables = async(() => import("../pages/tables/Bootstrap"));
// const AdvancedTables = async(() => import("../pages/tables/Advanced"));

// // Charts
// const Chartjs = async(() => import("../pages/charts/Chartjs"));
// const ApexCharts = async(() => import("../pages/charts/ApexCharts"));

// // Icons
// const FontAwesome = async(() => import("../pages/icons/FontAwesome"));
// const Feather = async(() => import("../pages/icons/Feather"));

// // Calendar
// const Calendar = async(() => import("../pages/calendar/Calendar"));

// // Maps
// const VectorMaps = async(() => import("../pages/maps/VectorMaps"));
// const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));

//*******************************************************/
//***********************Omitted*************************/
// //Pitch Designer 
// const PitchDesigner = async(() => import("../pages/pitchDesigner/index"))

// //Pitch Planner 
// const PitchPlanner = async(() => import("../pages/pitchPlanner/index"))
// const AssignTrader = async(() => import("../pages/pitchPlanner/assignTraderToPitchesStage/index"))
// const EditMarket = async(() => import("../pages/pitchPlanner/editMarket/index"));

// //Traders
// const Traders = async(() => import("../pages/traders/index"));
// const TraderProfile = async(() => import("../pages/traders/traderProfile/TraderProfile"));

// // PriceTypes
// const PriceTypes = async(() => import("../pages/priceTypes/index"));
//*******************************************************/
//*******************************************************/


//Home
const Home = async(() => import("../pages/home/index"));

//User
const Users = async(() => import("../pages/portal/accessiblity/users/index"));
// Group
const Groups = async(() => import("../pages/portal/accessiblity/groups/index"));
// Permission
const Permissions = async(() => import("../pages/portal/accessiblity/permissions/index"));
// User Group
const UserGroups = async(() => import("../pages/portal/accessiblity/userGroups/index"));
// Group
const GroupPermissions = async(() => import("../pages/portal/accessiblity/groupPermissions/index"));
// Permission
const UserPermissions = async(() => import("../pages/portal/accessiblity/userPermissions/index"));
// Change Password
const ChangePassword = async(() => import("../pages/auth/changePassword"));

// Companies
const Companies = async(() => import("../pages/portal/baseInfo/companies/index"));
// Projects
const CompanyProjects = async(() => import("../pages/portal/baseInfo/projects/index"));
// Departments
const Departments = async(() => import("../pages/portal/baseInfo/departments/index"));
// JobPositions
const JobPositions = async(() => import("../pages/portal/baseInfo/jobPositions/index"));
// Employee
const Employees = async(() => import("../pages/portal/baseInfo/employees/index"));
// SurveyTypes
const DoctorTypes = async(() => import("../pages/portal/baseInfo/doctorTypes/index"));
// Doctors
const Doctors = async(() => import("../pages/portal/baseInfo/doctors/index"));
// SurveyTypes
const SurveyTypes = async(() => import("../pages/portal/baseInfo/surveyTypes/index"));

// DocScheduleWeeklyDays
const DocScheduleWeeklyDays = async(() => import("../pages/portal/docAppointments/docScheduleWeeklyDays/index"));
// DocScheduleDays
const DocScheduleDays = async(() => import("../pages/portal/docAppointments/docScheduleDays/index"));
// DocAppointments
const DocAppointments = async(() => import("../pages/portal/docAppointments/docAppointments/index"));
// DocAppointmentConfirmation
const DocAppointmentConfirmation = async(() => import("../pages/portal/docAppointments/docAppointmentConfirmation/index"));
// Patients
const Patients = async(() => import("../pages/portal/docAppointments/patients/index"));

// RoomRoutes
const RoomTypes = async(() => import("../pages/portal/meetingRequest/roomTypes/index"));
// RoomRoutes
const Rooms = async(() => import("../pages/portal/meetingRequest/meetingRooms/index"));
// CaterTypeRoutes
const CaterTypes = async(() => import("../pages/portal/meetingRequest/caterTypes/index"));
// EquipmentRoutes
const Equipments = async(() => import("../pages/portal/meetingRequest/necessaryEquipments/index"));
// RequestRoutes
const Requests = async(() => import("../pages/portal/meetingRequest/requests/index"));

// ResturantRoutes
const Meals = async(() => import("../pages/portal/resturant/mealList/index"));
// ResturantRoutes ServedMeals
const MealsDay = async(() => import("../pages/portal/resturant/mealsDay/index"));
// ServedMeals
const ServedMeals = async(() => import("../pages/portal/resturant/serveMeals/index"));
// MealFish
const MealFish = async(() => import("../pages/portal/resturant/mealFish/index"));
// PersonelMealsDayRoutes
const PersonelMealsDay = async(() => import("../pages/portal/resturant/personelMealDay/index"));
// GuestMealsDayRoutes
const GuestMealsDay = async(() => import("../pages/portal/resturant/guestMealDay/index"));

// Surveys
const Surveys = async(() => import("../pages/portal/surveys/surveys/index"));
// OptionalQuestions
const OptionalQuestions = async(() => import("../pages/portal/surveys/optionalQuestions/index"));
// UserAnswers
const UserSurvey = async(() => import("../pages/portal/surveys/userSurvey/index"));
// surveyReport
const SurveyReport = async(() => import("../pages/portal/surveys/surveyReport/index"));

// companyLinks
const AsftLinks = async(() => import("../pages/portal/systemLinks/asftLinks/index"));
// companyLinks
const BahavandbaradLinks = async(() => import("../pages/portal/systemLinks/bahavandLinks/index"));
// companyLinks
const EhdasLinks = async(() => import("../pages/portal/systemLinks/ehdasLinks/index"));
// companyLinks
const AstoLinks = async(() => import("../pages/portal/systemLinks/astoLinks/index"));
// companyLinks
const FalatparsLinks = async(() => import("../pages/portal/systemLinks/falatparsLinks/index"));
// companyLinks
const JivarsanatLinks = async(() => import("../pages/portal/systemLinks/jivarsanatLinks/index"));

//****************************************************
//*******************Framwork items*******************
//****************************************************

// // Routes
// const landingRoutes = {
//   path: "/landing",
//   name: "Landing Page",
//   component: Landing,
//   children: null
// };

// const dashboardRoutes = {
//   path: "/dashboard",
//   name: "Dashboard",
//   header: "Main",
//   icon: SlidersIcon,
//   containsHome: true,
//   children: [
//     {
//       path: "/",
//       name: "Default",
//       component: Default
//     },
//     {
//       path: "/dashboard/analytics",
//       name: "Analytics",
//       component: Analytics
//     },
//     {
//       path: "/dashboard/e-commerce",
//       name: "E-commerce",
//       component: Ecommerce
//     },
//     {
//       path: "/dashboard/social",
//       name: "Social",
//       component: Social
//     },
//     {
//       path: "/dashboard/crypto",
//       name: "Crypto",
//       component: Crypto,
//       badgeColor: "primary",
//       badgeText: "New"
//     }
//   ]
// };

// const pageRoutes = {
//   path: "/pages",
//   name: "Pages",
//   icon: LayoutIcon,
//   children: [
//     {
//       path: "/pages/profile",
//       name: "Profile",
//       component: Profile
//     },
//     {
//       path: "/pages/settings",
//       name: "Settings",
//       component: Settings
//     },
//     {
//       path: "/pages/clients",
//       name: "Clients",
//       component: Clients
//     },
//     {
//       path: "/pages/projects",
//       name: "Projects",
//       component: Projects,
//       badgeColor: "primary",
//       badgeText: "New"
//     },
//     {
//       path: "/pages/invoice",
//       name: "Invoice",
//       component: Invoice
//     },
//     {
//       path: "/pages/pricing",
//       name: "Pricing",
//       component: Pricing
//     },
//     {
//       path: "/pages/tasks",
//       name: "Tasks",
//       component: Tasks,
//       badgeColor: "primary",
//       badgeText: "New"
//     },
//     {
//       path: "/pages/blank",
//       name: "Blank Page",
//       component: Blank
//     }
//   ]
// };

// const authRoutes = {
//   path: "/auth",
//   name: "Auth",
//   icon: UsersIcon,
//   badgeColor: "secondary",
//   badgeText: "12/24",
//   children: [
//     {
//       path: "/auth/sign-in",
//       name: "Sign In",
//       component: SignIn
//     },
//     {
//       path: "/auth/sign-up",
//       name: "Sign Up",
//       component: SignUp
//     },
//     {
//       path: "/auth/change-password",
//       name: "Change Password",
//       component: ChangePassword
//     },
//     {
//       path: "/auth/reset-password",
//       name: "Reset Password",
//       component: ResetPassword
//     },
//     {
//       path: "/auth/404",
//       name: "404 Page",
//       component: Page404
//     },
//     {
//       path: "/auth/500",
//       name: "500 Page",
//       component: Page500
//     }
//   ]
// };

// const layoutRoutes = {
//   path: "/layouts",
//   name: "Layouts",
//   icon: MonitorIcon,
//   children: [
//     {
//       path: "/layouts/sidebar-sticky",
//       name: "Sticky Sidebar",
//       component: SidebarSticky
//     },
//     {
//       path: "/layouts/sidebar-collapsed",
//       name: "Sidebar Collapsed",
//       component: SidebarCollapsed
//     },
//     {
//       path: "/layouts/boxed",
//       name: "Boxed Layout",
//       component: Boxed
//     },
//     {
//       path: "/layouts/theme-classic",
//       name: "Classic Theme",
//       component: ThemeClassic
//     },
//     {
//       path: "/layouts/theme-corporate",
//       name: "Corporate Theme",
//       component: ThemeCorporate,
//       badgeColor: "primary",
//       badgeText: "New"
//     },
//     {
//       path: "/layouts/theme-modern",
//       name: "Modern Theme",
//       component: ThemeModern,
//       badgeColor: "primary",
//       badgeText: "New"
//     }
//   ]
// };

// const documentationRoutes = {
//   path: "/docs",
//   name: "Documentation",
//   icon: BookOpenIcon,
//   children: [
//     {
//       path: "/docs/introduction",
//       name: "Introduction",
//       component: Introduction
//     },
//     {
//       path: "/docs/installation",
//       name: "Getting Started",
//       component: Installation
//     },
//     {
//       path: "/docs/plugins",
//       name: "Plugins",
//       component: Plugins
//     },
//     {
//       path: "/docs/changelog",
//       name: "Changelog",
//       component: Changelog
//     }
//   ]
// };

// const uiRoutes = {
//   path: "/ui",
//   name: "UI Elements",
//   header: "Components",
//   icon: GridIcon,
//   children: [
//     {
//       path: "/ui/alerts",
//       name: "Alerts",
//       component: Alerts
//     },
//     {
//       path: "/ui/buttons",
//       name: "Buttons",
//       component: Buttons
//     },
//     {
//       path: "/ui/cards",
//       name: "Cards",
//       component: Cards
//     },
//     {
//       path: "/ui/general",
//       name: "General",
//       component: General
//     },
//     {
//       path: "/ui/grid",
//       name: "Grid",
//       component: Grid
//     },
//     {
//       path: "/ui/modals",
//       name: "Modals",
//       component: Modals
//     },
//     {
//       path: "/ui/notifications",
//       name: "Notifications",
//       component: Notifications
//     },
//     {
//       path: "/ui/tabs",
//       name: "Tabs",
//       component: Tabs
//     },
//     {
//       path: "/ui/typography",
//       name: "Typography",
//       component: Typography
//     }
//   ]
// };

// const chartRoutes = {
//   path: "/charts",
//   name: "Charts",
//   icon: PieChartIcon,
//   badgeColor: "primary",
//   badgeText: "New",
//   children: [
//     {
//       path: "/charts/chartjs",
//       name: "Chart.js",
//       component: Chartjs
//     },
//     {
//       path: "/charts/apexcharts",
//       name: "ApexCharts",
//       component: ApexCharts,
//       badgeColor: "primary",
//       badgeText: "New"
//     }
//   ]
// };

// const formRoutes = {
//   path: "/forms",
//   name: "Forms",
//   icon: CheckSquareIcon,
//   children: [
//     {
//       path: "/forms/layouts",
//       name: "Layouts",
//       component: Layouts
//     },
//     {
//       path: "/forms/basic-elements",
//       name: "Basic Elements",
//       component: BasicElements
//     },
//     {
//       path: "/forms/advanced-elements",
//       name: "Advanced Elements",
//       component: AdvancedElements
//     },
//     {
//       path: "/forms/input-groups",
//       name: "Input Groups",
//       component: InputGroups
//     },
//     {
//       path: "/forms/editors",
//       name: "Editors",
//       component: Editors
//     },
//     {
//       path: "/forms/validation",
//       name: "Validation",
//       component: Validation
//     },
//     {
//       path: "/forms/wizard",
//       name: "Wizard",
//       component: Wizard
//     }
//   ]
// };

// const tableRoutes = {
//   path: "/tables",
//   name: "Tables",
//   icon: ListIcon,
//   children: [
//     {
//       path: "/tables/bootstrap",
//       name: "Bootstrap",
//       component: BootstrapTables
//     },
//     {
//       path: "/tables/advanced-tables",
//       name: "Advanced",
//       component: AdvancedTables
//     }
//   ]
// };

// const iconRoutes = {
//   path: "/icons",
//   name: "Icons",
//   icon: HeartIcon,
//   badgeColor: "info",
//   badgeText: "Special",
//   children: [
//     {
//       path: "/icons/feather",
//       name: "Feather",
//       component: Feather
//     },
//     {
//       path: "/icons/font-awesome",
//       name: "Font Awesome",
//       component: FontAwesome
//     }
//   ]
// };

// const calendarRoutes = {
//   path: "/calendar",
//   name: "Calendar",
//   icon: CalendarIcon,
//   component: Calendar,
//   badgeColor: "primary",
//   badgeText: "New",
//   children: null
// };

// const mapRoutes = {
//   path: "/maps",
//   name: "Maps",
//   icon: MapPinIcon,
//   children: [
//     {
//       path: "/maps/google-maps",
//       name: "Google Maps",
//       component: GoogleMaps
//     },
//     {
//       path: "/maps/vector-maps",
//       name: "Vector Maps",
//       component: VectorMaps
//     }
//   ]
// };
const HomeRoutes = {
    path: "/",
    name: "خانه",
    icon: homeIcon,
    component: Home
  };
//*******************************************************/
  const BaseInfoRoutes = {
    path: "/admin/baseInfo",
    name: "اطلاعات پایه",
    icon: baseinfoIcon,
    children: [
      {
        path: "/admin/baseInfo/companies",
        name: "شرکت",
        icon: SlidersIcon,
        component: Companies
      },
      {
        path: "/admin/baseInfo/projects",
        name: "پروژه",
        icon: SlidersIcon,
        component: CompanyProjects
      },
      {
        path: "/admin/baseInfo/departments",
        name: "دپارتمان",
        icon: SlidersIcon,
        component: Departments
      },
      {
        path: "/admin/baseInfo/jobPositions",
        name: "عنوان شغلی",
        icon: SlidersIcon,
        component: JobPositions
      },
      {
        path: "/admin/baseInfo/employees",
        name: "پرسنل",
        icon: SlidersIcon,
        component: Employees
      },
      {
        path: "/admin/baseInfo/surveyTypes",
        name: "نوع نظرسنجی",
        icon: SlidersIcon,
        component: SurveyTypes
      },
      {
        path: "/admin/baseInfo/doctorTypes",
        name: "نوع پزشک",
        icon: SlidersIcon,
        component: DoctorTypes
      },
      {
        path: "/admin/baseInfo/doctors",
        name: "نام پزشک",
        icon: SlidersIcon,
        component: Doctors
      }
    ]
  };
//*******************************************************/
  const AdminSurveyRoutes = {
    path: "/admin/survey",
    name: "نظرسنجی",
    icon: surveyIcon,
    children: [
      {
        path: "/admin/survey/surveys",
        name: "اطلاعات نظرسنجی",
        icon: SlidersIcon,
        component: Surveys
      },
      {
        path: "/admin/survey/OptionalQuestions",
        name: "سوالات",
        icon: SlidersIcon,
        component: OptionalQuestions
      },
      {
        path: "/admin/survey/userAnswers",
        name: "نظرسنجی",
        icon: SlidersIcon,
        component: UserSurvey
      },
      {
        path: "/admin/survey/surveyReport",
        name: "گزارش نظرسنجی",
        icon: SlidersIcon,
        component: SurveyReport
      }
    ]
  };

//*******************************************************/
  const DoctorAppointmentRoutes = {
    path: "/doctorAppointment",
    name: "نوبت دهی پزشک",
    icon: docappointmentIcon,
    children: [
      {
        path: "/doctorAppointment/scheduleweekdays",
        name: "برنامه هفتگی ",
        icon: SlidersIcon,
        component: DocScheduleWeeklyDays
      },
      {
        path: "/doctorAppointment/scheduledays",
        name: "برنامه روزانه ",
        icon: SlidersIcon,
        component: DocScheduleDays
      },
      {
        path: "/doctorAppointment/appointments",
        name: "نوبت دهی",
        icon: SlidersIcon,
        component: DocAppointments
      },
      {
        path: "/doctorAppointment/appointmentconfirmation",
        name: "تائید نوبت دهی",
        icon: SlidersIcon,
        component: DocAppointmentConfirmation
      }
    ]
  };
//*******************************************************/
  const DoctorRoutes = {
    path: "/doctor",
    name: "سوابق بیمار",
    icon: patientrecordIcon,
    children: [
      {
        path: "/doctor/patients",
        name: "سوابق بیمار",
        icon: SlidersIcon,
        component: Patients
      }
    ]
  };
//*******************************************************/
  const ResturantRoutes = {
    path: "/restaurant",
    name: "رستوران",
    icon: restaurantIcon,
    children: [
      {
        path: "/restaurant/meals",
        name: "لیست غذا",
        icon: SlidersIcon,
        component: Meals
      },
      {
        path: "/restaurant/mealsday",
        name: "غذاهای ماهیانه",
        icon: SlidersIcon,
        component: MealsDay
      },
      // {
      //   path: "/restaurant/servedmeals",
      //   name: "آمار غذاها",
      //   icon: SlidersIcon,
      //   component: ServedMeals
      // },    
      // {
      //   path: "/restaurant/mealFish",
      //   name: "صدور فیش غذا",
      //   icon: SlidersIcon,
      //   component: MealFish
      // },   
      {
        path: "/restaurant/personelmealsday",
        name: "انتخاب ماهیانه غذاها",
        icon: SlidersIcon,
        component: PersonelMealsDay
      },   
      {
        path: "/restaurant/guestmealsday",
        name: "انتخاب غذای مهمان",
        icon: SlidersIcon,
        component: GuestMealsDay
      }
    ]
  };
//*******************************************************/
  const SecurityRoutes = {
    path: "/security",
    name: "امنیت",
    icon: securityIcon,
    children: [
      {
        path: "/security/users",
        name: "کاربر",
        icon: SlidersIcon,
        component: Users
      },
      {
        path: "/security/group",
        name: "گروه کاربری",
        icon: SlidersIcon,
        component: Groups
      },
      {
        path: "/security/permission",
        name: "مجوز های کاربری",
        icon: SlidersIcon,
        component: Permissions
      },
      {
        path: "/security/usergroup",
        name: "کاربر و گروههای کاربری",
        icon: SlidersIcon,
        component: UserGroups
      },
      {
        path: "/security/grouppermission",
        name: "گروه و مجوزهای گروه",
        icon: SlidersIcon,
        component: GroupPermissions
      },
      {
        path: "/security/userpermission",
        name: "کاربر و مجوزهای کاربری",
        icon: SlidersIcon,
        component: UserPermissions
      },
      {
        path: "/security/changePassword",
        name: "تغییر کلمه عبور",
        icon: SlidersIcon,
        component: ChangePassword
      }
    ]
  };
//*******************************************************/
  const MeetingRequestRoutes = {
    path: "/meetingRequest",
    name: "درخواست کنفرانس",
    icon: docappointmentIcon,
    children: [
      {
        path: "/meetingRequest/roomTypes",
        name: "نوع سالن",
        icon: SlidersIcon,
        component: RoomTypes
      },      {
        path: "/meetingRequest/rooms",
        name: "اطاق کنفرانس",
        icon: SlidersIcon,
        component: Rooms
      },
      {
        path: "/meetingRequest/caterTypes",
        name: "خدمات پذیرائی",
        icon: SlidersIcon,
        component: CaterTypes
      },
      {
        path: "/meetingRequest/equipments",
        name: "تجهیزات لازم",
        icon: SlidersIcon,
        component: Equipments
      },
      {
        path: "/meetingRequest/requests",
        name: "درخواست اطاق کنفرانس",
        icon: SlidersIcon,
        component: Requests
      }
    ]
  };
//*******************************************************/  
  const SystemLinks = {
  path: "/systemLink",
  name: "لینک سامانه ها",
  icon: SlidersIcon,
  children: [
    {
      path: "/systemLink/asftLinks",
      name: "شرکت آسفالت طوس",
      icon: SlidersIcon,
      component: AsftLinks
    },
    {
      path: "/systemLink/bahavandbaradLinks",
      name: "شرکت بهاوند باراد",
      icon: SlidersIcon,
      component: BahavandbaradLinks
    },
    {
      path: "/systemLink/ehdasLinks",
      name: "شرکت احداث",
      icon: SlidersIcon,
      component: EhdasLinks
    },
    {
      path: "/systemLink/astoLinks",
      name: "شرکت آستو",
      icon: SlidersIcon,
      component: AstoLinks
    },
    {
      path: "/systemLink/falatparsLinks",
      name: "شرکت فلات پارس",
      icon: SlidersIcon,
      component: FalatparsLinks
    },
    {
      path: "/systemLink/jivarsanatLinks",
      name: "شرکت ژیوار صنعت",
      icon: SlidersIcon,
      component: JivarsanatLinks
    }
  ]
  };
//*******************************************************/
//     // dashboardRoutes,
//     // pageRoutes,
//     // layoutRoutes,
//     // documentationRoutes,
//     // uiRoutes,
//     // chartRoutes,
//     // formRoutes,
//     // tableRoutes,
//     // iconRoutes,
//     // calendarRoutes,
//     // mapRoutes,


  export const dashboard = [  
    HomeRoutes,
    BaseInfoRoutes,
    AdminSurveyRoutes,
    DoctorAppointmentRoutes,
    DoctorRoutes,
    ResturantRoutes,
    MeetingRequestRoutes,
    // SystemLinks,
    SecurityRoutes];
  
  // Landing specific routes
  // export const landing = [landingRoutes];
  
  // Auth specific routes
  //export const page = [authRoutes];
  
  // All routes
  export default [  
    HomeRoutes,
    BaseInfoRoutes,
    AdminSurveyRoutes,
    DoctorAppointmentRoutes,
    DoctorRoutes,
    ResturantRoutes,
    MeetingRequestRoutes,
    // SystemLinks,
    SecurityRoutes];
