import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : null,
    expiredPasswordChange: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser: (state, action) => {
            state.user? state.user = {...state.user, ...action.payload}:state.user = action.payload;
        },
        disconnect: (state) => {
            state.user = null
            fetch('http://localhost:4005/users/logout', { credentials: 'include' })
        },
        addChangePasswordExpiration(state, date){
            state.expiredPasswordChange = date.payload
        }
    }
})

export const {changeUser, disconnect, addChangePasswordExpiration} = userSlice.actions;

export default userSlice.reducer;