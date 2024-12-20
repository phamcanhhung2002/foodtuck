import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice'
import userReducer from './user/user-slice';
import cartReducer from './cart/cart-slice';

export const storeReducer = {
  auth: authReducer,
  user: userReducer,
  cart: cartReducer
}

export const store = configureStore({
  reducer: storeReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch