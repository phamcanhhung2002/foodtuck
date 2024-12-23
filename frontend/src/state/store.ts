import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice'
import userReducer from './user/user-slice';
import cartReducer from './cart/cart-slice';
import foodsReducer from './foods/foods-slice';
import foodReducer from './food/food-slice'

export const storeReducer = {
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  foods: foodsReducer,
  food: foodReducer
}

export const store = configureStore({
  reducer: storeReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch