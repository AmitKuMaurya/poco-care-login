// import { loadData, saveData } from "../../components/utility/SetCookie";
import * as types from "./user.action.types";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.USER_LOGIN_LOADING:
    case types.USER_REGISTER_LOADING:
      return { loading: true, isAuth: false };

    case types.USER_LOGIN_SUCCESS:
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
      };

    case types.USER_LOGIN_FAILED:
    case types.USER_REGISTER_FAILED:
      return {
        loading: false,
        isAuth: false,
        user : null,
        error: action.payload,
      };

    // case types.USER_PERSIST_FAILED:
    //   return {
    //     loading: false,
    //     isAuth: false,
    //     user : null,
    //     error: action.payload,
    //   };

    case types.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuth: false,
      };

      case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_PROFILE_REQUEST:
    case types.UPDATE_PASSWORD_REQUEST:
    case types.UPDATE_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPDATE_PASSWORD_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case types.UPDATE_PROFILE_FAIL:
    case types.UPDATE_PASSWORD_FAIL:
    case types.UPDATE_USER_FAIL:
    case types.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.UPDATE_PROFILE_RESET:
    case types.UPDATE_PASSWORD_RESET:
    case types.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case types.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case types.FORGOT_PASSWORD_FAIL:
    case types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case types.ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case types.ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case types.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    default:
      return state;
  }
};