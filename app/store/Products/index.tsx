import { addListener, createSelector, createSlice, createAsyncThunk, ThunkDispatch, AnyAction, Action, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { Product, state, StateProduct } from "./state_init"
import { apolloClient } from "../api/graphql"
import { FETCH_PRODUCTS_LIST } from "./graphql"


export const sliceProducts = createSlice({
    name: "products",
    initialState: state,
    reducers : {
        requestProducts: state => {
            state
        },
        likeProduct: (state,action: { type: any, payload: { id: Number, index: number } }) => {

            const { type, payload } = action

            const productIndex = state.list?.findIndex((item,index) => index == payload.index)
            if (productIndex != undefined){

                const productItem = state.list![productIndex]
                if (productItem != undefined) {
                    state.list![productIndex].like = !productItem.like
                }
            }
           
        },
        addQuantiyProduct: (state,action: { type: any, payload: { id: Number, operator: "plus" | "minus", quantity: number } }) => {
            
            const { payload } = action

            const productIndex = state.list?.findIndex((item,index) => item.id == payload.id)
            
            if (productIndex != undefined) {
                var product = state.list![productIndex]
                if (payload.operator == "plus"){
                    state.list![productIndex].quantity = product.quantity + 1
                }
                if (payload.operator == "minus" && product.quantity >= 1){
                    state.list![productIndex].quantity = product.quantity - 1
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductThunk.pending,(state,action)=>{
            state.status = "loading"
        }).addCase(fetchProductThunk.fulfilled,(state,action: {  type : any, payload: { products: Array<Product> }})=>{
            const { type, payload } = action
            state.status = "succeeded"
            state.list = payload.products
        }).addCase(fetchProductThunk.rejected,(state,action)=>{
            const { type, payload } = action
            state.status = "failed"
            state.error = action.error.message!
        })
    }
})

// Selector

const selectorProducts = (state: {products: StateProduct<Array<Product>> }) => state.products


export const selectProducts = createSelector([selectorProducts],(products)=> products.list)

export const selectProductsResult = createSelector(
    [selectorProducts],
    (products) => {
        return products.list != undefined ? products.list.length : 0
    }
)

export const selectLikesOfProducts = createSelector([selectProducts],(products) => 
                    products!.reduce((accumulator,itemCurrent) => accumulator += itemCurrent.like ? 1 : 0,0))


export const selectListLikesProducts = createSelector([selectProducts],(products) => 
                    products!.filter((product) => product.like))

export const selectStatusServerProductsList = createSelector([selectorProducts],(products) => products.status)

export const selectPricesTotalProducts = createSelector([selectProducts], (products) => {
    return products!.reduce((accumulator,itemCurrent)=> accumulator += itemCurrent.like ? itemCurrent.price * (itemCurrent.quantity + 1) : 0,0)
})

// Fetch 
export const fetchProductThunk = createAsyncThunk('products/FetchProducts', async ()=> {
    try {
        const response = await apolloClient.query({
            query: FETCH_PRODUCTS_LIST
        })

        console.group("Fetch products")
        if(response.data){
            console.log(response.data)
        }
        console.groupEnd()

        return response.data
        
    } catch (error){
        console.error(error)
        throw error
    }
})

export const { requestProducts, likeProduct, addQuantiyProduct } = sliceProducts.actions
export default sliceProducts.reducer