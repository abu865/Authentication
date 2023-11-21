// authReducer.js
const initialState = {
  loading: false,
  token: null,
  error: "",
  carddata: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: "",
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        token: null,
        error: action.payload,
      };

    case "DASHBOARD_DATA_SUCCESS":
      return {
        ...state,
        carddata: action.payload,
      }

    case "DASHBOARD_DATA_REQUEST":
      return {
        ...state,
        carddata: action.payload,
      }

    case "DASHBOARDDATA_FAILURE":
      return {
        ...state,
        carddata: '',
      }
    default:
      return state;
  }
};

export default authReducer;
