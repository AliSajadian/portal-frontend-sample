import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";

export const AddPitchPreviewOnMap = (pitch) => {
    var suitableMapZoom = pitch.suitableMapZoom;
    let widthInPx = 0;
    let lengthInPx = 0;
    switch (suitableMapZoom) {
        case 22:
            widthInPx = pitch.pitchInfo.width * 34;
            lengthInPx = pitch.pitchInfo.length * 34;
            break;
        case 21:
            widthInPx = pitch.pitchInfo.width * 17;
            lengthInPx = pitch.pitchInfo.length * 17;
            break;
        case 20:
            widthInPx = pitch.pitchInfo.width * 8;
            lengthInPx = pitch.pitchInfo.length * 8;
            break;
        case 19:
            widthInPx = pitch.pitchInfo.width * 4;
            lengthInPx = pitch.pitchInfo.length * 4;
            break;
        case 18:
            widthInPx = pitch.pitchInfo.width * 2;
            lengthInPx = pitch.pitchInfo.length * 2;
            break;
        case 17:
            widthInPx = pitch.pitchInfo.width * 1;
            lengthInPx = pitch.pitchInfo.length * 1;
        
        
            break;
        default:
            break;
    }
    var id = Math.floor(Math.random() * 100);
    pitch.pitchInfo.id = id;
    pitch.pitchInfo.width_pix = widthInPx;
    pitch.pitchInfo.length_pix = lengthInPx;
    pitch.pitchInfo.rotation_deg = 0;
    return {
        type: types.ADD_PITCH_PREVIEW_ON_THE_MAP,
        pitchInfo: pitch.pitchInfo
    }
}


export const HandleMapCenterAndZoom = (context) => {
    return {
        type: types.HANDLE_MAP_ZOOM_AND_CENTER,
        center: context.center,
        zoom: context.zoom
    }
}


export const HandlePitchCreateStep = (step) => {
    return {
        type: types.TOGGLE_PITCH_CREATOR_STEP,
        step: step
    }
}

export const RotatePitch = (direction, degree) => {
    return {
        type: types.ROTATE_PITCH,
        direction: direction,
        degree: degree
    }
}

export const SubmitRotateStage = (initialPitch, savedPitches, mapCenter, zoom) => {
   
    if (savedPitches.length > 0) {
        const lng_19_unit = 0.000002816319465637;
        const lng_18_unit = 0.000005364418029785;
        const lng_20_unit = 0.00000130757689475;
        const lat_19_unit = 0.0000015861940512;
        const lat_18_unit = 0.0000031724021625;
        const lat_20_unit = 0.000000834836711125;
        return dispatch => {
            let flag = true;
            for (let i = 0; i < savedPitches.length; i++) {
                const pitch = savedPitches[i];
                switch (zoom) {
                    case 20:
                        if ((mapCenter.lng >= pitch.longitude && mapCenter.lng <= (pitch.longitude + (lng_20_unit * (pitch.width_pix / 2) + ((initialPitch.width_pix / 2) * lng_20_unit)))) || (mapCenter.lng <= pitch.longitude && mapCenter.lng >= (pitch.longitude - (lng_20_unit * (pitch.width_pix / 2)) - ((initialPitch.width_pix / 2) * lng_20_unit)))) {
                            if ((mapCenter.lat >= pitch.latitude && mapCenter.lat <= (pitch.latitude + (lat_20_unit * (pitch.length_pix / 2) + ((initialPitch.length_pix / 2) * lat_20_unit)))) || (mapCenter.lat <= pitch.latitude && mapCenter.lat >= (pitch.latitude - (lat_20_unit * (pitch.length_pix / 2)) - ((initialPitch.length_pix / 2) * lat_20_unit)))) {
                                alert("Pitches Can't Have OverLap!")
                                flag = false;
                            }
                        }
                        break;
                    case 19:
                        if ((mapCenter.lng >= pitch.longitude && mapCenter.lng <= (pitch.longitude + (lng_19_unit * (pitch.width_pix / 2) + ((initialPitch.width_pix / 2) * lng_19_unit)))) || (mapCenter.lng <= pitch.longitude && mapCenter.lng >= (pitch.longitude - (lng_19_unit * (pitch.width_pix / 2)) - ((initialPitch.width_pix / 2) * lng_19_unit)))) {
                            if ((mapCenter.lat >= pitch.latitude && mapCenter.lat <= (pitch.latitude + (lat_19_unit * (pitch.length_pix / 2) + ((initialPitch.length_pix / 2) * lat_19_unit)))) || (mapCenter.lat <= pitch.latitude && mapCenter.lat >= (pitch.latitude - (lat_19_unit * (pitch.length_pix / 2)) - ((initialPitch.length_pix / 2) * lat_19_unit)))) {
                                alert("Pitches Can't Have OverLap!")
                                flag = false;
                            }
                        }
                        break;
                    case 18:
                        if ((mapCenter.lng >= pitch.longitude && mapCenter.lng <= (pitch.longitude + (lng_18_unit * (pitch.width_pix / 2) + ((initialPitch.width_pix / 2) * lng_18_unit)))) || (mapCenter.lng <= pitch.longitude && mapCenter.lng >= (pitch.longitude - (lng_18_unit * (pitch.width_pix / 2)) - ((initialPitch.width_pix / 2) * lng_18_unit)))) {
                            if ((mapCenter.lat >= pitch.latitude && mapCenter.lat <= (pitch.latitude + (lat_18_unit * (pitch.length_pix / 2) + ((initialPitch.length_pix / 2) * lat_18_unit)))) || (mapCenter.lat <= pitch.latitude && mapCenter.lat >= (pitch.latitude - (lat_18_unit * (pitch.length_pix / 2)) - ((initialPitch.length_pix / 2) * lat_18_unit)))) {
                                alert("Pitches Can't Have OverLap!")
                                flag = false;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            if (flag) {
                dispatch({
                    type: types.SUBMIT_ROTATE_STAGE
                })
            }
        }
    }
    else {
        return {
            type: types.SUBMIT_ROTATE_STAGE,
        }
    }
}



export const AddMorePitch = () => {
    return {
        type: types.ADD_MORE_PITCH,

    }
}

export const RemovePitch = (step, id) => {

    return {
        type: types.REMOVE_PITCH,
        pitchId: id,
        step: step
    }
}

export const SaveLayout = () => {

    return {
        type: types.SAVE_LAYOUT,

    }
}

export const SaveLayoutAsync = (savedPitches, layoutName, zoom, history) => {
    const layout = {
        pitchs: [],
        layout_name: layoutName,
        market_name: "lowermarsh",
        latitude: savedPitches[0].latitude,
        longitude: savedPitches[0].longitude,
        zoom: zoom,

    }
    savedPitches.forEach((q) => {
        var pitch = {
            width: q.width,
            length: q.length,
            width_pix: q.width_pix,
            length_pix: q.length_pix,
            rotation_deg: q.rotation_deg,
            latitude: q.latitude,
            longitude: q.longitude,
            background: q.background,
        }
        layout.pitchs.push(pitch);
    })

    return dispatch => {
        axios.post("https://www.yourmarkethub.io/api/layout-pitch/", layout)
            .then((response) => {
                dispatch({
                    type: types.SAVE_LAYOUT
                })
                toastr.success("Layout Saved Successfuly!");
                history.push("/pitchPlanner")
            })
            .catch((error) => toastr.error("Fail!"))
    }
}



export const GetLayputNameAndMarketNameFromServerAsync = () => {
    return (dispatch) => {
        axios.get("https://www.yourmarkethub.io/api/layout-pitch/")
            .then((response) => {
                dispatch({
                    type: types.GET_LAYOUT_NAME_AND_MARKET_NAME_FROM_SERVER,
                    data: response.data
                })
            }).catch((error) => {
                toastr.error("Failed Connect To Server !")
            })
    }
}

export const CheckLayoutNameConflict = (name) => {
    return {
        type: types.CHECK_LAYOUT_NAME_CONFLICT,
        layoutName: name
    }
}


export const DeleteLayout = (id, name) => {
    return (dispatch) => {
        axios.delete(`https://www.yourmarkethub.io/api/layout-pitch/${id}`)
            .then((response) => {
                toastr.success(`${name} Removed Successfuly.`)
                dispatch({
                    type: types.DELETE_LAYOUT_SUCCESS,
                    id: id
                })
            })
            .catch(() => {
                toastr.error("Fail!")
            })
    }
}

export const StartEditLayout = (id, history) => {
    return (dispatch) => {
        axios.get(`https://www.yourmarkethub.io/api/layout-pitch/${id}`)
            .then((response) => {
                dispatch({
                    type: types.START_EDIT_LAYOUT,
                    layout: response.data,
                    history: history
                })
                history.push(`pitchDesigner?layoutId=${id}`)
            }).catch(() => {
                toastr.error("Fail  Connect To The Server.")
            })
    }
}


export const EditLayout = (savedPitches, layoutName, zoom, prevLayout, history) => {

    return (dispatch) => {

        let updatedLayout = { ...prevLayout };
        updatedLayout.pitchs = savedPitches;
        updatedLayout.layout_name = layoutName;
        updatedLayout.zoom = zoom;


        axios.put(`https://www.yourmarkethub.io/api/layout-pitch/${prevLayout.id}/`, updatedLayout)
            .then(() => {
                toastr.success("Layout Edited Successfuly");
                history.push("/pitchPlanner")
            }).catch(() => {
                toastr.error("Fail.");
            })
    }
}

export const DeletePitch = (pitchId) => {
    return (dispatch) => {
        axios.delete(`https://www.yourmarkethub.io/api/pitchs/${pitchId}/`)
            .then(() => {
                dispatch({
                    type: types.DELETE_PITCH,
                    pitchId: pitchId
                })
                toastr.success("Pitch Successfuly Removed!")
            })
            .catch(() => {
                toastr.error("Fail!")
            })
    }
}


export const SavePitchAsync = (initialPitch, layoutId, mapCenter) => {
    let pitch = { ...initialPitch };
    pitch.layout = layoutId;
    pitch.latitude = mapCenter.lat;
    pitch.longitude = mapCenter.lng
    return (dispatch) => {
        axios.post("https://www.yourmarkethub.io/api/pitchs/", pitch)
            .then((response) => {
                dispatch({
                    type: types.SAVE_PITCH_ASYNC,
                    addedPitch: response.data
                })
                toastr.success("Pitch Successfuly Saved!")
            }).catch(() => {
                toastr.error("Fail.")
            })
    }
}