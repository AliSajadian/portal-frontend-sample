import * as types from "../constants";

const initialState = {
  permissions: [],
  contentTypes: [],
  userPermissions: [],
  groupPermissions: [],
  permissionInfo: null,
  isModalOpen: false,
  permissionInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_PERMISSIONS_LIST:
      return {
        ...state,
        permissions: actions.permissions
      };
    case types.GET_CONTENTTYPES_LIST:
      return {
        ...state,
        contentTypes: actions.contentTypes
      };
    case types.GET_USERPERMISSIONS_LIST:
      return {
        ...state,
        userPermissions: actions.userPermissions
      };
    case types.GET_GROUPPERMISSIONS_LIST:
      return {
        ...state,
        groupPermissions: actions.groupPermissions
      };
    case types.LOAD_RELATED_PERMISSION_INFO_CARD:
      return {
        ...state,
        permissionInfo: actions.permissionInfo
      };
    case types.START_PERMISSION_MODAL:
      return {
        ...state,
        permissionInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_PERMISSION:
      return {
        ...state,
        permissions: state.permissions
          .filter(permission => permission.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.EDIT_USERPERMISSION:
      let userPermission = state.userPermissions.filter(userPermission => userPermission.id === actions.payload.id)
      userPermission.permissions = actions.payload.permissions
      return {
        ...state,
        userPermissions: state.userPermissions
          .filter(userPermission => userPermission.id !== actions.payload.id)
          .concat(userPermission),
      };
    case types.EDIT_GROUPPERMISSION:
      let groupPermission = state.groupPermissions.filter(groupPermission => groupPermission.id === actions.payload.id)
      groupPermission.permissions = actions.payload.permissions
      return {
        ...state,
        groupPermissions: state.groupPermissions
          .filter(groupPermission => groupPermission.id !== actions.payload.id)
          .concat(groupPermission),
      };               
    case types.START_ADD_PERMISSION:
      return{
        ...state,
        // permissions: actions.permissions,
        permissionInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_PERMISSION:
      return {
        ...state,
        permissions: [...state.permissions, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_PERMISSION:
      return {
        ...state,
        permissions: state.permissions
          .filter(permission => permission.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_PERMISSION_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_PERMISSIONS:
      return {
        ...state,
        permissions: []
      };
    default:
      return state;
  }
};

export default reducer;
