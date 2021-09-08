
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetProjectsList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/projects/')
        .then((response) => {
            dispatch({
                type : types.GET_PROJECTS_LIST , 
                projects : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedProjectInfoCard = (projectId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/projects/${projectId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_PROJECT_INFO_CARD , 
                projectInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveProject = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/projects/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_PROJECT ,
                    id: id
                })
                toastr.success("Project Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddProjectModel = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/projects/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_PROJECT , 
    //             projects : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_PROJECT
    }

}

// ADD Project
export const AddProject = project => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/projects/", project)
            .then(res => {
                dispatch({
                type: types.ADD_PROJECT,
                payload: res.data
                });
                toastr.success("Project Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET Project MODAL
 export const GetProjectsModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/projects/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_PROJECT_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT Project
export const EditProject = project => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/projects/${project.id}/`, project)
            .then(resonse => {
                dispatch({
                type: types.EDIT_PROJECT,
                payload: resonse.data
                });
                toastr.success("Project Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const ProjectModalToggler = () => {
    return {
        type: types.TOGGLE_PROJECT_MODAL
    }
}


