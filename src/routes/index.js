import async from "../components/Async";

import {
  Sliders as SlidersIcon,
  Home as homeIcon,
  Info as baseinfoIcon,
  Edit as surveyIcon,
  Clock as docappointmentIcon,
  Clipboard as patientrecordIcon,
  Shield as securityIcon,
  CheckSquare as restaurantIcon,
} from "react-feather";

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

// MealRoutes
const Meals = async(() => import("../pages/portal/resturant/mealList/index"));
// MealDayRoutes
const MealsDay = async(() => import("../pages/portal/resturant/mealsDay/index"));
// ServedMealsRoutes
// const ServedMeals = async(() => import("../pages/portal/resturant/serveMeals/index"));
// MealFishRoutes
// const MealFish = async(() => import("../pages/portal/resturant/mealFish/index"));
// PersonelMealsDayRoutes 
const PersonelMealsDay = async(() => import("../pages/portal/resturant/personelMealDay/index"));
// ModifyPersonelMealsDayRoutes 
const ModifyPersonelMealsDay = async(() => import("../pages/portal/resturant/modifyPersonelMealsDay/index"));
// AsftTodayMealsStatisticsRoutes
const AsftDayMealsStatistics = async(() => import("../pages/portal/resturant/asftDayMealsStatistics/index"));
// CompanysTodayMealsStatisticsRoutes
const CompanysDayMealsStatistics = async(() => import("../pages/portal/resturant/companysDayMealsStatistics/index"))
//PersonelWhoDidnotSelectNextMonthMeals
const PersonelWhoDidnotSelectNextMonthMeals = async(() => import('../pages/portal/resturant/personelWhoDidnotSelectNextMonthMeals/index'))
// ContractorMonthlyMealsStatistics
const ContractorMonthlyMealsStatistics = async(() => import("../pages/portal/resturant/contractorMonthlyMealsStatistics/index"))
// ContractorDailySectionsMealsStatistics
const ContractorDailySectionsMealsStatistics = async(() => import("../pages/portal/resturant/contractorDailySectionsMealsStatistics/index"))
// CurrentMonthSelectedMealsRoutes
const CurrentMonthSelectedMeals = async(() => import("../pages/portal/resturant/currentMonthSelectedMeals/index"));
// MealsDailyListRoutes
const MealsDailyList = async(() => import("../pages/portal/resturant/mealsDailyList/index"));
// SectionsMealsDailyListRoutes
const SectionsMealsDailyList = async(() => import("../pages/portal/resturant/sectionMealsDailyList/index"));

// const mealSelectedMonthlyList = async(() => import("../pages/portal/resturant/"));
// GuestMealsDayRoutes
const GuestMealsDay = async(() => import("../pages/portal/resturant/guestMealDay/index"));

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

const HomeRoutes = {
    path: "/",
    name: "????????",
    icon: homeIcon,
    component: Home
  };
//*******************************************************/
  const BaseInfoRoutes = {
    path: "/admin/baseInfo",
    name: "?????????????? ????????",
    icon: baseinfoIcon,
    children: [
      {
        path: "/admin/baseInfo/companies",
        name: "????????",
        icon: SlidersIcon,
        component: Companies
      },
      {
        path: "/admin/baseInfo/projects",
        name: "??????????",
        icon: SlidersIcon,
        component: CompanyProjects
      },
      {
        path: "/admin/baseInfo/departments",
        name: "????????????????",
        icon: SlidersIcon,
        component: Departments
      },
      {
        path: "/admin/baseInfo/jobPositions",
        name: "?????????? ????????",
        icon: SlidersIcon,
        component: JobPositions
      },
      {
        path: "/admin/baseInfo/employees",
        name: "??????????",
        icon: SlidersIcon,
        component: Employees
      },
      {
        path: "/admin/baseInfo/surveyTypes",
        name: "?????? ??????????????",
        icon: SlidersIcon,
        component: SurveyTypes
      },
      {
        path: "/admin/baseInfo/doctorTypes",
        name: "?????? ????????",
        icon: SlidersIcon,
        component: DoctorTypes
      },
      {
        path: "/admin/baseInfo/doctors",
        name: "?????? ????????",
        icon: SlidersIcon,
        component: Doctors
      }
    ]
  };
//*******************************************************/
  const ResturantRoutes = {
    path: "/restaurant",
    name: "??????????????",
    icon: restaurantIcon,
    children: [
      {
        path: "/restaurant/meals",
        name: "???????? ??????",
        icon: SlidersIcon,
        component: Meals
      },
      {
        path: "/restaurant/mealsday",
        name: "???????????? ??????????????",
        icon: SlidersIcon,
        component: MealsDay
      },
      // {
      //   path: "/restaurant/servedmeals",
      //   name: "???????? ??????????",
      //   icon: SlidersIcon,
      //   component: ServedMeals
      // },    
      // {
      //   path: "/restaurant/mealFish",
      //   name: "???????? ?????? ??????",
      //   icon: SlidersIcon,
      //   component: MealFish
      // },   
      {
        path: "/restaurant/guestmealsday",
        name: "???????????? ???????? ??????????",
        icon: SlidersIcon,
        component: GuestMealsDay
      },
      {
        path: "/restaurant/mealsdailyList",
        name: "?????????????? ???????????? ????????????",
        icon: SlidersIcon,
        component: MealsDailyList
      },        
      {
        path: "/restaurant/sectionmealsdailyList",
        name: "???????? ???????????? ????????????",
        icon: SlidersIcon,
        component: SectionsMealsDailyList
      },        
      {
        path: "/restaurant/asfttodaymealsstatistics",
        name: "???????? ???????? ???????????? ???????????? ??????",
        icon: SlidersIcon,
        component: AsftDayMealsStatistics
      }, 
      {
        path: "/restaurant/companystodaymealsstatistics",
        name: "???????? ???????? ???????????? ????????????",
        icon: SlidersIcon,
        component: CompanysDayMealsStatistics
      }, 
      {
        path: "/restaurant/personelwhodidnotselectnextmonthmeals",
        name: "?????????? ???? ?????? ???????????? ?????????? ??????",
        icon: SlidersIcon,
        component: PersonelWhoDidnotSelectNextMonthMeals
      }, 
      {
        path: "/restaurant/contractormonthlymealsstatistics",
        name: "???????? ?????? ???????????? ????????????",
        icon: SlidersIcon,
        component: ContractorMonthlyMealsStatistics,
      },
      {
        path: "/restaurant/contractordailysectionmealsstatistics",
        name: "???????? ???????????? ???????????? ??????????",
        icon: SlidersIcon,
        component: ContractorDailySectionsMealsStatistics,
      },
      {
        path: "/restaurant/currentmonthselectedmeals",
        name: "???????????? ???????????? ??????????????",
        icon: SlidersIcon,
        component: CurrentMonthSelectedMeals
      }, 
      {
        path: "/restaurant/modifypersonelmealsday",
        name: "?????????? ???????????? ?????? ????????",
        icon: SlidersIcon,
        component: ModifyPersonelMealsDay
      },   
      {
        path: "/restaurant/personelmealsday",
        name: "???????????? ???????????? ?????? ??????",
        icon: SlidersIcon,
        component: PersonelMealsDay
      },   
    ]
  };
//*******************************************************/
  const SecurityRoutes = {
    path: "/security",
    name: "??????????",
    icon: securityIcon,
    children: [
      {
        path: "/security/users",
        name: "??????????",
        icon: SlidersIcon,
        component: Users
      },
      {
        path: "/security/group",
        name: "???????? ????????????",
        icon: SlidersIcon,
        component: Groups
      },
      {
        path: "/security/permission",
        name: "???????? ?????? ????????????",
        icon: SlidersIcon,
        component: Permissions
      },
      {
        path: "/security/usergroup",
        name: "?????????? ?? ?????????????? ????????????",
        icon: SlidersIcon,
        component: UserGroups
      },
      {
        path: "/security/grouppermission",
        name: "???????? ?? ?????????????? ????????",
        icon: SlidersIcon,
        component: GroupPermissions
      },
      {
        path: "/security/userpermission",
        name: "?????????? ?? ?????????????? ????????????",
        icon: SlidersIcon,
        component: UserPermissions
      },
      {
        path: "/security/changePassword",
        name: "?????????? ???????? ????????",
        icon: SlidersIcon,
        component: ChangePassword
      }
    ]
  };
//*******************************************************/  
  const SystemLinks = {
  path: "/systemLink",
  name: "???????? ???????????? ????",
  icon: SlidersIcon,
  children: [
    {
      path: "/systemLink/asftLinks",
      name: "???????? ???????????? ??????",
      icon: SlidersIcon,
      component: AsftLinks
    },
    {
      path: "/systemLink/bahavandbaradLinks",
      name: "???????? ???????????? ??????????",
      icon: SlidersIcon,
      component: BahavandbaradLinks
    },
    {
      path: "/systemLink/ehdasLinks",
      name: "???????? ??????????",
      icon: SlidersIcon,
      component: EhdasLinks
    },
    {
      path: "/systemLink/astoLinks",
      name: "???????? ????????",
      icon: SlidersIcon,
      component: AstoLinks
    },
    {
      path: "/systemLink/falatparsLinks",
      name: "???????? ???????? ????????",
      icon: SlidersIcon,
      component: FalatparsLinks
    },
    {
      path: "/systemLink/jivarsanatLinks",
      name: "???????? ?????????? ????????",
      icon: SlidersIcon,
      component: JivarsanatLinks
    }
  ]
  };
//*******************************************************/
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
