import * as types from "../constants";

const initialState = {
  personelMealDay: [],
  personelMealDays: [],
  mealsDailyList: [],
  servedMeals: [],
  currentMonthSelectedMeals: [],
  asftDayMealsStatistics: [],
  companysDayMealsStatistics: [],
  sectionDayMealsStatistics: null,
  departmentDayMealsStatistics: null,
  projectDayMealsStatistics: null,
  contractorMonthlyMealsStatistics: [],
  contractorSectionsDailyMealsStatistics: [],
  todayMealsNames: [],
  todayMealsTotalNo: [],
  datesList: [],
  personelWhoDidnotSelectNextMonthMeals: [],
  sectionNames: [],
  sectionName: '',
  personelMealDayInfo: null,
  isModalOpen: false,
  personelMealDayInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_PERSONELMEALONEDAYS_LIST:
      return {
        ...state,
        personelMealDays: actions.payload
      };    
    case types.GET_MEALSSTATISTICSDATESLIST_LIST:
      return {
        ...state,
        datesList: actions.payload
      }; 
    case types.GET_SECTION_NAME:
      return {
        ...state,
        sectionName: actions.payload
      }
    case types.GET_MEALSDAILY_LIST:
      return {
        ...state,
        mealsDailyList: actions.payload
      };       
    case types.GET_PERSONELMEALDAYSEx_LIST:
      return {
        ...state,
        personelMealDays: actions.payload
      };
    case types.GET_PERSONELMEALDAYS_LIST:
      return {
        ...state,
        personelMealDay: actions.personelMealDay
      };
    case types.GET_SERVEDMEALS_LIST:
      return {
        ...state,
        servedMeals: actions.payload
      };      
    case types.GET_CURRENTMONTHSELECTEDMEALS_LIST:
      return {
        ...state,
        currentMonthSelectedMeals: actions.payload
      }
    case types.GET_ASFTDAYMEALSSTATISTICS_LIST:
      return {
        ...state,
        asftDayMealsStatistics: actions.payload
      }
    case types.GET_COMPANYSDAYMEALSSTATISTICS_LIST:
      return{
        ...state,
        companysDayMealsStatistics: actions.payload
      }
    case types.GET_SECTIONDAYMEALSSTATISTICS_LIST:
      return {
        ...state,
        sectionDayMealsStatistics: actions.payload
      }    
    case types.GET_DEPARTMENTDAYMEALSSTATISTICS_LIST:
      return {
        ...state,
        departmentDayMealsStatistics: actions.payload
      };
    case types.GET_PROJECTDAYMEALSSTATISTICS_LIST:
      return {
        ...state,
        projectDayMealsStatistics: actions.payload
      } ;             

    case types.GET_CONTRACTORMONTHLYMEALSSTATISTICS_LIST:
      return {
        ...state,
        contractorMonthlyMealsStatistics: actions.payload
      }
    case types.GET_SECTION_NAMES:
      return {
        ...state,
        sectionNames: actions.payload
      }
    case types.GET_CONTRACTORSECTIONSDAILYMEALSSTATISTICS_LIST:
      return {
        ...state,
        contractorSectionsDailyMealsStatistics: actions.payload
      }
    case types.GET_TODAYMEALSNAMES_LIST:
      return {
        ...state,
        todayMealsNames: actions.payload
      }
    case types.GET_PERSONELWHODIDNOTSELECTNEXTMONTHMEALS_LIST:
      return {
        ...state,
        personelWhoDidnotSelectNextMonthMeals: actions.payload
      }      
    case types.GET_TODAYMEALSTOTALNO_LIST:
      return {
        ...state,
        todayMealsTotalNo: actions.payload
      }      
    case types.LOAD_RELATED_PERSONELMEALDAY_INFO_CARD:
      return {
        ...state,
        personelMealDayInfo: actions.personelMealDayInfo
      };
    case types.START_PERSONELMEALDAY_MODAL:
      return {
        ...state,
        personelMealDayInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_PERSONELMEALDAY:
      return {
        ...state,
        personelMealDay: state.personelMealDay
          .filter(personelMealDay => personelMealDay.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_PERSONELMEALDAY:
      return{
        ...state,
        // personelMealDay: actions.personelMealDay,
        personelMealDayInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_PERSONELMEALDAY:
      return {
        ...state,
        personelMealDay: [...state.personelMealDay, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_PERSONELMEALDAY:
      return {
        ...state,
        personelMealDay: state.personelMealDay
          .filter(personelMealDay => personelMealDay.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_PERSONELMEALDAY_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_PERSONELMEALDAYS:
      return {
        ...state,
        personelMealDay: []
      };
    default:
      return state;
  }
};

export default reducer;
