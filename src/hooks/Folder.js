
const folderReducer = (state, action) => {
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

const folderEditReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return {

            }
        case 'EDIT_DIPLOME':
            return {
                isEdit: true,
                isDiplome: true,
                isUpdate: false,
                id: action.payload
            }
        case 'EDIT_PRESENTATION':
            return {
                isEdit: true, 
                isPresentation:true,
                isUpdate: false,
            }
        case 'EDIT_COMPETENCE':
            return {
                isEdit: true, 
                isCompetence:true,
                isUpdate: false,
            }
        case 'EDIT_LANGUAGE':
            return {
                isEdit: true, 
                isLanguage:true,
                isUpdate: false,
            }
        case 'EDIT_EXPERIENCE':
            return {
                isEdit: true, 
                isExperience:true,
                isUpdate: false,
                id: action.payload
            }
        case 'FETCH_UPDATE_SUCCESS':
            return {
                isEdit: false,
                isUpdate: true,
                id:null,
            }
        case 'FETCH_UPDATE_FAILED':
            return {
                isEdit: false,
                id:null,
            }
        case 'CLOSE_EDIT':
            return {
                isEdit: false,
                id:null,
            }
        default:
            throw new Error();
    }  
}
export {folderReducer, folderEditReducer};