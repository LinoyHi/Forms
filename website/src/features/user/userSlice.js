import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { validate } from '../../common/validation';
import { checkUser } from '../../DAL/api';

const initialState = {
    user: null,
    expiredPasswordChange: null,
}

export const connectUser = createAsyncThunk("user/connect", async (allset, thunkAPI) => {
    const user = await checkUser(validate(allset.usernameOrEmail.value, { email: true }, "usernameOrEmail") ?
        { username: allset.usernameOrEmail.value, password: allset.password.value }
        : { email: allset.usernameOrEmail.value, password: allset.password.value }
    )
    if (user.ok === true) {
        const userData = await user.json()
        const date = new Date()
        date.setDate(date.getDate() + 30)
        return { name: userData.name, firstName: userData.firstName, manager: userData.manager, p: userData.password!=allset.password.value? userData.password : undefined , ConExpiration: date }
        //p is the permission to reconnect the user to the server in case the server falls
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser: (state, action) => {
            state.user ? state.user = { ...state.user, ...action.payload } : state.user = action.payload;
        },
        disconnect: (state) => {
            state.user = null
            fetch('http://localhost:4005/users/logout', { credentials: 'include' })
        },
        addChangePasswordExpiration(state, date) {
            state.expiredPasswordChange = date.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(connectUser.fulfilled,(state,action)=>{
            state.user = action.payload
        })
    }
})

export const { changeUser, disconnect, addChangePasswordExpiration } = userSlice.actions;

export default userSlice.reducer;