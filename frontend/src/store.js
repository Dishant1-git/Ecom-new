import { configureStore } from "@reduxjs/toolkit";
import userslice from "./reducer/userslice"
const storage=configureStore({
    reducer:{
        userslice:userslice
    }
})
export default storage