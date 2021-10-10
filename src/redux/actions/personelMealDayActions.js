
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetPersonelMealDaysCurrentMonthList = (employee_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/personelmealdayscurrentmonth/${employee_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELMEALDAYSEx_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetPersonelMealDaysNextMonthList = (employee_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/personelmealdaysnextmonth/${employee_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELMEALDAYSEx_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetDepartmentsMealsDailyList = (department_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/departmentsmealsdailylist/${department_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_MEALSDAILY_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetProjectsMealsDailyList = (project_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/projectsmealsdailylist/${project_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_MEALSDAILY_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}
export const GetSectionName = (employee_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/sectionname/${employee_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_SECTION_NAME , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetSectionsMealsDailyList = (employee_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/sectionsmealsdailylist/${employee_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_MEALSDAILY_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetDepartmentDayMealsStatistics = (department_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/departmentdaymealsstatistics/${department_id}`)        
        .then((response) => {
            dispatch({
                type : types.GET_DEPARTMENTDAYMEALSSTATISTICS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetProjectDayMealsStatistics = (project_id) => {
  return dispatch => {
      axios.get(`http://portalapi.asft.co/api/projectdaymealsstatistics/${project_id}`)        
      .then((response) => {
          dispatch({
              type : types.GET_PROJECTDAYMEALSSTATISTICS_LIST , 
              payload : response.data
          })
      })
      .catch(() => {
          toastr.error('Fail!');
      })
  }
}

export const GetPersonelMealOneDayList  = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/personelmealsoneday/`)
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELMEALONEDAYS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetPersonelMealDaysList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/personelmealdays/')
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELMEALDAYS_LIST , 
                personelMealDay : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetServedMealsList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/servedmeals/')
        .then((response) => {
            dispatch({
                type : types.GET_SERVEDMEALS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetCurrentMonthSelectedMealsList = (employee_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/currentmonthselectedmeals/${employee_id}`)        
        .then((response) => {
            dispatch({
                type : types.GET_CURRENTMONTHSELECTEDMEALS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetAsftDayMealsStatistics = (date) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/asftdaymealsstatistics/${date}`)        
        .then((response) => {
            dispatch({
                type : types.GET_ASFTDAYMEALSSTATISTICS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetCompanysDayMealsStatistics = (date) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/companysdaymealsstatistics/${date}`)        
        .then((response) => {
            dispatch({
                type : types.GET_COMPANYSDAYMEALSSTATISTICS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetSectionDayMealsStatistics = (employee_id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/sectiondaymealsstatistics/${employee_id}`)        
        .then((response) => {
            dispatch({
                type : types.GET_SECTIONDAYMEALSSTATISTICS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetMealsStatisticsDatesList = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/mealsstatisticsdateslist/`)        
        .then((response) => {
            dispatch({
                type : types.GET_MEALSSTATISTICSDATESLIST_LIST, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetContractorMonthlyMealsStatistics = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/contractormonthlymealsstatistics/`)        
        .then((response) => {
            dispatch({
                type : types.GET_CONTRACTORMONTHLYMEALSSTATISTICS_LIST, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetContractorSectionsDailyMealsStatistics = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/contractorsectionsdailymealsstatistics/`)        
        .then((response) => {
            dispatch({
                type : types.GET_CONTRACTORSECTIONSDAILYMEALSSTATISTICS_LIST, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetTodayMealsNames = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/todaymealsnames/`)        
        .then((response) => {
            dispatch({
                type : types.GET_TODAYMEALSNAMES_LIST, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetTodayMealsTotalNo = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/todaymealstotalno/`)        
        .then((response) => {
            dispatch({
                type : types.GET_TODAYMEALSTOTALNO_LIST, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetPersonelWhoDidnotSelectNextMonthMeals = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/personelwhodidnotselectnextmonthmeals/`)        
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELWHODIDNOTSELECTNEXTMONTHMEALS_LIST, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetSectionNames = () => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/sectionnames/`)        
        .then((response) => {
            dispatch({
                type : types.GET_SECTION_NAMES, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedPersonelMealDayInfoCard = (personelMealDayId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/personelmealdays/${personelMealDayId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_PERSONELMEALDAY_INFO_CARD , 
                personelMealDayInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const RemovePersonelMealDay = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/personelmealdays/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_PERSONELMEALDAY ,
                    id: id
                })
                toastr.success("Personel Meal Day removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD PERSONELMEALDAY
export const AddPersonelMealDay = personelMealDay => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/personelmealdays/", personelMealDay)
            .then(res => {
                dispatch({
                type: types.ADD_PERSONELMEALDAY,
                payload: res.data
                });
                // toastr.success("Personel Meal Day add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

  // Bulk ADD PERSONELMEALDAY
  export const BulkCurrentMonthAddPersonelMealDays = personelMealDays => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const editMood = true;
    const body = JSON.stringify({
        personelMealDays,
        editMood
    })
    // console.log('&&& body: ', body)

    return dispatch => {
        axios.post(`http://portalapi.asft.co/api/savebulkcurrentmonthpersonelmealdays`, body, config)
            .then(response => {
                dispatch({
                type: types.GET_PERSONELMEALDAYSEx_LIST,
                payload: response.data
                });
                console.log(response.data)

                toastr.success("اطلاعات با موفقیت ذخیره گردید")
            })
            .catch((error) => {
                console.log(error);
                toastr.error('ذخیره اطلاعات ناموفق بود!');
            });
    }
  };

  export const BulkNextMonthAddPersonelMealDays = personelMealDays => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const editMood = true;
    const body = JSON.stringify({
        personelMealDays,
        editMood
    })
    // console.log('&&& body: ', body)

    return dispatch => {
        axios.post(`http://portalapi.asft.co/api/savebulknextmonthpersonelmealdays`, body, config)
            .then(resonse => {
                dispatch({
                type: types.GET_PERSONELMEALDAYSEx_LIST,
                payload: resonse.data
                });
                toastr.success("اطلاعات با موفقیت ذخیره گردید")
            })
            .catch((error) => {
                console.log(error);
                toastr.error('ذخیره اطلاعات ناموفق بود!');
            });
    }
  };

// EDIT PERSONELMEALDAY
export const EditPersonelMealDay = personelMealDay => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/personelmealdays/${personelMealDay.id}/`, personelMealDay)
            .then(resonse => {
                dispatch({
                type: types.EDIT_PERSONELMEALDAY,
                payload: resonse.data
                });
                toastr.success("Personel Meal Day Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

  // Bulk EDIT PERSONELMEALDAY
  export const BulkCurrentMonthEditPersonelMealDays = personelMealDays => { 
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const editMood = false;
    const body = JSON.stringify({
        personelMealDays,
        editMood
    })

    // const data = {
    //     'personelMealDays':personelMealDays,
    //     'editMood':editMood,
    // };

    // console.log('&&& body: ', body)
    return dispatch => {
        axios.post(`http://portalapi.asft.co/api/savebulkcurrentmonthpersonelmealdays`, body, config)
            .then(response => {
                dispatch({
                type: types.GET_PERSONELMEALDAYSEx_LIST,
                payload: response.data
                });
                toastr.success("اطلاعات با موفقیت ذخیره گردید")
            })
            .catch((error) => {
                console.log(error);
                toastr.error('ذخیره اطلاعات ناموفق بود!');
            });
    }
  };

  export const BulkNextMonthEditPersonelMealDays = personelMealDays => { 
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const editMood = false;
    const body = JSON.stringify({
        personelMealDays,
        editMood
    })

    // const data = {
    //     'personelMealDays':personelMealDays,
    //     'editMood':editMood,
    // };

    // console.log('&&& body: ', body)
    return dispatch => {
        axios.post(`http://portalapi.asft.co/api/savebulknextmonthpersonelmealdays`, body, config)
            .then(resonse => {
                dispatch({
                type: types.GET_PERSONELMEALDAYSEx_LIST,
                payload: resonse.data
                });
                toastr.success("اطلاعات با موفقیت ذخیره گردید")
            })
            .catch((error) => {
                console.log(error);
                toastr.error('ذخیره اطلاعات ناموفق بود!');
            });
    }
  };