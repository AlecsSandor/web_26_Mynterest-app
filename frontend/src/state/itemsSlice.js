import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
    name: 'loadedItems',
    initialState: {
        items: [],
        visitingItem: [],
        savedItems: []
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        setVisitingItem: (state, action) => {
            state.visitingItem.push(action.payload)
        },
        setSavedItems: (state, action) => {
            state.savedItems = action.payload
            console.log(state.savedItems)
        },
        updateSavedItems: (state, action) => {
            state.savedItems.push(action.payload)
        }
    }
})

export const { setItems, setVisitingItem, setSavedItems, updateSavedItems } = itemsSlice.actions
export default itemsSlice.reducer