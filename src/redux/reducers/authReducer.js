const initialState = {
    user: null,
    loading: false,
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return { ...state, loading: true, error: null }
        case 'FETCH_USER_SUCCESS':
            return { ...state, loading: false, user: action.payload }
        case 'FETCH_USER_FAILURE':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default authReducer
