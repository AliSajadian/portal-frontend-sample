import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import home from "./homeReducer";
import common from "./commonReducer";
// import planner from "./pitchDesignerReducer";
// import pitchPlanner from "./pitchPlannerReducer";
// import traders from "./tradersReducer";
// import priceTypes from "./priceTypesReducer";
import alert from "./alertReducer";
import companies from "./companiesReducer";
import projects from "./projectsReducer";
import departments from "./departmentsReducer";
import jobPositions from "./jobPositionsReducer";
import employees from "./employeesReducer";
// import employeeCodes from "./employeesReducer";
import users from "./usersReducer";
import groups from "./groupsReducer";
import userGroups from "./groupsReducer";
import permissions from "./permissionsReducer";
import userPermissions from "./permissionsReducer";
import groupPermissions from "./permissionsReducer";
import contentTypes from "./permissionsReducer";
import surveyTypes from "./surveyTypesReducer";
import doctors from "./doctorsReducer";
import doctorTypes from "./doctorTypesReducer";
import notifications from "./notificationsReducer";
import docScheduleWeeklyDays from "./docScheduleWeeklyDaysReducer";
import docScheduleDays from "./docScheduleDaysReducer";
import docAppointments from "./docAppointmentsReducer";
import docAppointmentTimes from "./docAppointmentsReducer";
import patientsFiles from "./patientsReducer";
import meals from "./mealsReducer";
import mealsDays from "./mealsDayReducer";
import personelMealDay from "./personelMealDayReducer";
import personelMealDays from "./personelMealDayReducer";
import servedMeals from "./personelMealDayReducer";
import guestMealsDays from "./guestMealDayReducer";
import currentMonthDates from "./mealsDayReducer";
import surveys from "./surveysReducer";
import surveyDepartments from "./surveyDepartmentReducer";
import optionalQuestions from "./optionalQuestionsReducer";
import optionalQuestion from "./optionalQuestionsReducer";
import optionalQuestionsAnswer from "./optionalQuestionsReducer";
import optionalQuestionAnswer from "./optionalQuestionsReducer";
import surveyReport from "./optionalQuestionsReducer";
import userAnswers from "./userSurveyReducer";
import usedSurveys from "./surveysReducer";
import unusedSurveys from "./surveysReducer";
import auth from "../reducers/authReducer";
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  common,
  // planner,
  // pitchPlanner,
  // traders,
  // priceTypes,
  home,
  auth,
  alert,
  companies,
  projects,
  departments,
  jobPositions,
  employees,
  // employeeCodes,
  users,
  groups,
  userGroups,
  permissions,
  contentTypes,
  userPermissions,
  groupPermissions,
  doctorTypes,
  doctors,
  notifications,
  docScheduleWeeklyDays,
  docScheduleDays,
  docAppointments,
  docAppointmentTimes,
  patientsFiles,
  meals,
  mealsDays,
  personelMealDay,
  personelMealDays,
  servedMeals,
  currentMonthDates,
  guestMealsDays,
  surveyTypes,
  surveys,
  surveyDepartments,
  optionalQuestions,
  optionalQuestion,
  optionalQuestionsAnswer,
  optionalQuestionAnswer,
  userAnswers,
  surveyReport,
  usedSurveys,
  unusedSurveys
});
