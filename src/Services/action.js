import axios, { post } from "axios";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const Apikey = "AIzaSyA3LbaJ_VNutrIawKAB0XnIhFN9ljE5bWk";
const loginUrl = `/accounts:signInWithPassword?key=${Apikey}`;

export const loginRequest = () => ({
  type: "LOGIN_REQUEST",
});

export const loginSuccess = (token) => ({
  type: "LOGIN_SUCCESS",
  payload: token,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const dashboardDatarequest = () => ({
  type: "DASHBOARD_DATA_REQUEST",
})

export const dashboardDataSucess = (data) => ({

  type: "DASHBOARD_DATA_SUCCESS ",
  payload: data,
})

export const dashboardDatafailure = () => ({
  type: "DASHBOARDDATA_FAILURE",
})

export const loginUser = (email, password, username, navigate) => {
  return (dispatch) => {
    dispatch(loginRequest());
    return axios
      .post(loginUrl, { email, password, username })
      .then((response) => {
        const token = response.data.idToken;
        dispatch(loginSuccess(token));
        if (response.status === 200) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.message || "An unknown error occurred";
        dispatch(loginFailure(errorMessage));
      });
  };
};


export const dashboardData = () => {
  return async (dispatch) => {
    dispatch(dashboardDatarequest());

    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      dispatch({ type: "DASHBOARD_DATA_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch(dashboardDatafailure());
      console.error("Error fetching data:", error);
    }
  };
};
