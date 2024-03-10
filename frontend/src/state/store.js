import { configureStore } from "@reduxjs/toolkit"
import itemsReducer from './itemsSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'


const persistConfig = {
    key: 'root',
    storage
  }

const persistedReducer = persistReducer(persistConfig, itemsReducer)

// export const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: [thunk]
//   })

//const persistedState = sessionStorage.getItem('reduxState')
//const preloadedState = persistedState ? JSON.parse(persistedState) : {}

export const store = configureStore({
    reducer:
        {
            items: persistedReducer
        },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

store.subscribe(() => {
    const state = store.getState()
    sessionStorage.setItem('reduxState', JSON.stringify(state))
})

//export default store
export const persistor = persistStore(store)
