import { createSlice } from "@reduxjs/toolkit";

// Initialize state from sessionStorage
const initialState = {
  Loggedin: sessionStorage.getItem("Loggedin") === "true",
  username: sessionStorage.getItem("username") || "Guest",
  usertype: sessionStorage.getItem("usertype") || "",
  firstname: sessionStorage.getItem("firstname") || "",
  userid: sessionStorage.getItem("userid") || "",
};

const userslice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.Loggedin = true;
      state.firstname = action.payload.fname;
      state.username = action.payload.username;
      state.usertype = action.payload.utype;
      state.userid = action.payload.userid;

      // Persist to sessionStorage
      sessionStorage.setItem("Loggedin", "true");
      sessionStorage.setItem("firstname", action.payload.fname);
      sessionStorage.setItem("username", action.payload.username);
      sessionStorage.setItem("usertype", action.payload.utype);
      sessionStorage.setItem("userid", action.payload.userid);
    },

    Logout: (state) => {
      state.Loggedin = false;
      state.firstname = "";
      state.username = "Guest";
      state.usertype = "";
      state.userid = "";

      // Clear sessionStorage
      sessionStorage.removeItem("Loggedin");
      sessionStorage.removeItem("firstname");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("usertype");
      sessionStorage.removeItem("userid");
    },
  },
});

export const { Login, Logout } = userslice.actions;
export default userslice.reducer;
