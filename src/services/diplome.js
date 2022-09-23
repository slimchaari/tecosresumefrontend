import axios from "axios";

const fetchDiplome = async(dispatch, id) => {
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    dispatch({type: 'INIT'});
    try {
        const result = await axios.get(process.env.REACT_APP_API_DOMAIN+'/api/v1/diploma/'+id);
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
    }
    catch {
        dispatch({type: 'FETCH_FAILED'});
    }
}
const createDiplome = async(dispatch, data) => {
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    dispatch({type: 'INIT'});
    try {
        await axios.post(process.env.REACT_APP_API_DOMAIN+'/api/v1/diploma/', data);
        dispatch({type: 'FETCH_UPDATE_SUCCESS'});
    }
    catch {
        dispatch({type: 'FETCH_UPDATE_FAILED'});
    }
}
const updateDiplome = async(dispatch, data, id) => {
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    dispatch({type: 'INIT'});
    try {
        await axios.patch(process.env.REACT_APP_API_DOMAIN+'/api/v1/diploma/'+id, data);
        dispatch({type: 'FETCH_UPDATE_SUCCESS'});
    }
    catch {
        dispatch({type: 'FETCH_UPDATE_FAILED'});
    }
}

export {fetchDiplome, createDiplome, updateDiplome}