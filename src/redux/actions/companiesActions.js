
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetCompaniesList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/companies/')
        .then((response) => {
            dispatch({
                type : types.GET_COMPANIES_LIST , 
                companies : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedCompanyInfoCard = (companyId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/companies/${companyId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_COMPANY_INFO_CARD , 
                companyInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveCompany = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/companies/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_COMPANY ,
                    id: id
                })
                toastr.success("Company Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddCompanyModel = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/companies/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_COMPANY , 
    //             companies : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_COMPANY
    }

}

// ADD Company
export const AddCompany = company => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/companies/", company)
            .then(res => {
                dispatch({
                type: types.ADD_COMPANY,
                payload: res.data
                });
                toastr.success("Company Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET Company MODAL
 export const GetCompaniesModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/companies/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_COMPANY_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT Company
export const EditCompany = company => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/companies/${company.id}/`, company)
            .then(resonse => {
                dispatch({
                type: types.EDIT_COMPANY,
                payload: resonse.data
                });
                toastr.success("Company Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const CompanyModalToggler = () => {
    return {
        type: types.TOGGLE_COMPANY_MODAL
    }
}


