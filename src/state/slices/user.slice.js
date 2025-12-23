import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    accessToken: null,
    refreshToken: null,
    user: null,
    companyId: null,
    hasCompany: false,
    twoFaAuthenticated: false,
    status: 'idle',
    error: null,
}

export const refreshUserDetails = createAsyncThunk(
    'user/refreshUserDetails',
    async (_, { getState, rejectWithValue }) => {
        try {
        const { user } = getState()
        const { accessToken } = user

        if (!accessToken) {
            return rejectWithValue('No access token found')
        }

        const response = await axios.get('/api/auth/refresh', {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })

        return response.data
        } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to refresh user details'
        )
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const payload = action.payload

            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.twoFaAuthenticated = payload.twoFaAuthenticated || false
            state.user = payload.data.user
            state.companyId = payload.data.companyId
            state.hasCompany = payload.data.hasCompany
            state.status = 'succeeded'
            state.error = null
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        createCompanySuccess: (state, action) => {
            const payload = action.payload

            state.accessToken = payload.accessToken
            state.error = null
        },
        createAdminSuccess: (state, action) => {
            const payload = action.payload

            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.twoFaAuthenticated = payload.twoFaAuthenticated || false
            state.user = payload.data.user
            state.companyId = payload.data.companyId
            state.hasCompany = payload.data.hasCompany
            state.status = 'succeeded'
            state.error = null
        },
        logout: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.user = null
            state.companyId = null
            state.hasCompany = false
            state.twoFaAuthenticated = false
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(refreshUserDetails.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(refreshUserDetails.fulfilled, (state, action) => {
            const data = action.payload
            if (data.accessToken) state.accessToken = data.accessToken
            if (data.refreshToken) state.refreshToken = data.refreshToken
            if (data.data?.user) state.user = data.data.user
            state.status = 'succeeded'
        })
        .addCase(refreshUserDetails.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    },
})

export const { loginSuccess, updateAccessToken, createCompanySuccess, createAdminSuccess, logout } = userSlice.actions
export default userSlice.reducer
