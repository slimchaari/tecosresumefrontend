
const foldersReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
                isUploadSuccess: false,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload
            };
        case 'FETCH_FAILED':
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false
            };
        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                isUploadSuccess: true,
                isSuccess: true
            };

        default:
            throw new Error();
    }
  };

export {foldersReducer};