import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { createStoreHook } from "react-redux"
import reducerProducts from "./Products/index"

const config =  configureStore({
    reducer : {
        products: reducerProducts
    }
})

export type AppDispatch = ReturnType<typeof config.dispatch>
export type RootState = ReturnType<typeof config.getState>

export default config
