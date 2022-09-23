import axios from "axios";

const fetchAllFolders = async(dispatch, url) => {
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    dispatch({type: 'INIT'});
    try {
        const result = await axios.get(url);
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
    }
    catch {
        dispatch({type: 'FETCH_FAILED'});
    }
}
const uploadFolder = async(dispatch, file) => {
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    dispatch({type: 'INIT'});
    try {
        let formData = new FormData();
        formData.append("original_file", file);
        await axios.post(process.env.REACT_APP_API_DOMAIN+'/api/v1/folders/file/', formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            }
        });
        dispatch({type: 'UPLOAD_SUCCESS'})
    }
    catch{
        dispatch({type: 'FETCH_FAILED'})
    }
}
export {fetchAllFolders, uploadFolder}