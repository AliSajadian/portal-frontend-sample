import * as types from "../constants";


const initialState = {
    browserHistory: null,
    initialPitch: null,
    suitableMapZoom: 19,
    mapCenter: null,
    mapCurrentZoom: 0,
    createPitchStepNumber: 1,
    savedPitches: [],
    lastPitchRotateDeg: 0,
    savedLayoutOnServer: [],
    checkLayoutNameConflictResult: null,
    isInEditMode: false,
    layoutInEditStage: null
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.ADD_PITCH_PREVIEW_ON_THE_MAP:
            return {
                ...state,
                initialPitch: {
                    ...actions.pitchInfo,
                    rotation_deg: state.lastPitchRotateDeg
                },
                createPitchStepNumber: 2
            }



        case types.HANDLE_MAP_ZOOM_AND_CENTER:

            let updatedSavedPitch = [...state.savedPitches];

            if (updatedSavedPitch.length > 0) {
                for (let index = 0; index < updatedSavedPitch.length; index++) {
                    const element = updatedSavedPitch[index];
                    switch (actions.zoom) {
                        case 22:
                            element.width_pix = element.width * 34;
                            element.length_pix = element.length * 34;
                            break;
                        case 21:
                            element.width_pix = element.width * 16;
                            element.length_pix = element.length * 16;
                            break;
                        case 20:
                            element.width_pix = element.width * 8;
                            element.length_pix = element.length * 8;
                            break;
                        case 19:

                            element.width_pix = element.width * 4;
                            element.length_pix = element.length * 4;
                            break;
                        case 18:
                            element.width_pix = element.width * 2;
                            element.length_pix = element.length * 2;
                            break;
                        case 17:
                            element.width_pix = element.width * 1;
                            element.length_pix = element.length * 1;
                            break;
                        case 16:
                            element.width_pix = element.width * 0.5;
                            element.length_pix = element.length * 0.5;
                            break;
                        case 15:
                                element.width_pix = element.width * 0.25;
                                element.length_pix = element.length * 0.25;
                                break;
                        case 14:
                                    element.width_pix = element.width * 0.125;
                                    element.length_pix = element.length * 0.125;
                                    break;
                        default:
                            break;
                    }
                }
            }
            return {
                ...state,
                mapCurrentZoom: actions.zoom,
                mapCenter: actions.center,
                suitableMapZoom: actions.zoom,
                savedPitches: updatedSavedPitch
            }



        case types.TOGGLE_PITCH_CREATOR_STEP:
            return {
                ...state,
                createPitchStepNumber: actions.step
            }
        case types.ROTATE_PITCH:
            if (!actions.degree) {
                if (actions.direction == "inc") {
                    return {
                        ...state,
                        initialPitch: {
                            ...state.initialPitch,
                            rotation_deg: state.initialPitch.rotation_deg + 1
                        }
                    }
                }
                else if (actions.direction == "dec") {
                    return {
                        ...state,
                        initialPitch: {
                            ...state.initialPitch,
                            rotation_deg: state.initialPitch.rotation_deg - 1
                        }
                    }
                } else {
                    return {
                        ...state,
                        initialPitch: {
                            ...state.initialPitch,
                            rotation_deg: 0
                        }
                    }
                }
            }
            else {
                return {
                    ...state,
                    initialPitch: {
                        ...state.initialPitch,
                        rotation_deg: actions.degree
                    }
                }
            }
        case types.SUBMIT_ROTATE_STAGE:
            
            return {
                ...state,
                createPitchStepNumber: 3,
                initialPitch: null,
                lastPitchRotateDeg: state.initialPitch.rotation_deg,
                savedPitches: state.savedPitches.concat(
                    {
                        ...state.initialPitch,
                        latitude: state.mapCenter.lat,
                        longitude: state.mapCenter.lng
                    }),
            }
        case types.ADD_MORE_PITCH:
            return {
                ...state,
                createPitchStepNumber: 1
            }

        case types.REMOVE_PITCH:
            if (actions.step == "initial") {
                return {
                    ...state,
                    initialPitch: null,
                    createPitchStepNumber: 1
                }
            } else if (actions.step == "final" && actions.pitchId) {
                return {
                    ...state,
                    savedPitches: state.savedPitches.filter(q => q.id != actions.pitchId)
                }
            }
        case types.GET_LAYOUT_NAME_AND_MARKET_NAME_FROM_SERVER:
            return {
                ...state,
                savedLayoutOnServer: actions.data
            }
        case types.CHECK_LAYOUT_NAME_CONFLICT:

            if (state.savedLayoutOnServer.length > 0) {
                var res = state.savedLayoutOnServer.every((q) => q.layout_name !== actions.layoutName)

                return {
                    ...state,
                    checkLayoutNameConflictResult: res
                }
            } else {
                return {
                    ...state,
                    checkLayoutNameConflictResult: true
                }
            }
        case types.DELETE_LAYOUT_SUCCESS:
            return {
                ...state,
                savedLayoutOnServer: state.savedLayoutOnServer.filter(q => q.id != actions.id)
            }
        case types.START_EDIT_LAYOUT:
            return {
                ...state,
                savedPitches: actions.layout.pitchs,
                isInEditMode: true,
                layoutInEditStage: actions.layout,
                suitableMapZoom: actions.layout.zoom,
                lastPitchRotateDeg: actions.layout.pitchs[0].rotation_deg
            }
        case types.DELETE_PITCH:
            return {
                ...state,
                savedPitches: state.savedPitches.filter(q => q.id != actions.pitchId)
            }
        case types.SAVE_PITCH_ASYNC:
            return {
                ...state,
                savedPitches: state.savedPitches.concat(actions.addedPitch),
                initialPitch: null,
                createPitchStepNumber: 3
            }
        case types.SAVE_LAYOUT:
            
            return {
                ...state , 
                savedPitches : [...Array(0)]
                
            }
        default:
            return state;
    }
}

export default reducer;