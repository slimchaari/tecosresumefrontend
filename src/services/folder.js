import axios from "axios";

const fetchFolder = async(dispatch, url) => {
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
const generateFolder = async (dispatch, id, navigate) => {
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    dispatch({type: 'INIT'});
    try {
        await axios.get(process.env.REACT_APP_API_DOMAIN+'/api/v1/generate/'+id);
        dispatch({type: 'FETCH_SUCCESS'});
        navigate("/dossiers")
    }
    catch {
        dispatch({type: 'FETCH_FAILED'});
    }

}
const updateFolder = async(dispatch, url, data) => {
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    dispatch({type: 'INIT'});
    try {
        await axios.patch(url+'/update', data);
        dispatch({type: 'FETCH_UPDATE_SUCCESS'});
    }
    catch {
        dispatch({type: 'FETCH_UPDATE_FAILED'});
    }
}

const fetchCompetences = async(setOption) =>{
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    try {
        const result = await axios.get(process.env.REACT_APP_API_DOMAIN+'/api/v1/competences');
        setOption(result)
    }
    catch {
    
    }

}

const fetchLanguages = async(setOption) =>{
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('token')}`;
    try {
        const result = await axios.get(process.env.REACT_APP_API_DOMAIN+'/api/v1/languages');
        setOption(result)
    }
    catch {
    
    }

}
export {fetchFolder, fetchCompetences, updateFolder, generateFolder, fetchLanguages}