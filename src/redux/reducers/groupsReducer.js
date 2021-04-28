import * as types from "../constants";

const initialState = {
  groups: [],
  userGroups: [],
  groupInfo: null,
  isModalOpen: false,
  groupInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_GROUPS_LIST:
      return {
        ...state,
        groups: actions.groups
      };
    case types.GET_USERGROUPS_LIST:
      return {
        ...state,
        userGroups: actions.userGroups
      };
    case types.LOAD_RELATED_GROUP_INFO_CARD:
      return {
        ...state,
        groupInfo: actions.groupInfo
      };
    case types.START_GROUP_MODAL:
      return {
        ...state,
        groupInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_GROUP:
      return {
        ...state,
        groups: state.groups
          .filter(group => group.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.EDIT_USERGROUP:
      let userGroup = state.userGroups.filter(userGroup => userGroup.id === actions.payload.id)
      userGroup.groups = actions.payload.groups
      return {
        ...state,
        userGroups: state.userGroups
          .filter(userGroup => userGroup.id !== actions.payload.id)
          .concat(userGroup),
      };
    case types.START_ADD_GROUP:
      return{
        ...state,
        // groups: actions.groups,
        groupInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_GROUP:
      return {
        ...state,
        groups: state.groups
          .filter(group => group.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_GROUP_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_GROUPS:
      return {
        ...state,
        groups: []
      };
    default:
      return state;
  }
};

export default reducer;
