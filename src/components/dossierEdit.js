import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { fetchCompetences, fetchLanguages, updateFolder } from "../services/folder";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isString, map } from "lodash";
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { createDiplome, fetchDiplome, updateDiplome } from "../services/diplome";
import activityReducer from "../hooks/Diplome";
import { createExperience, fetchExperience, updateExperience } from "../services/experience";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Presentation = ({first_name, last_name, diploma_level, birthday, setValue, register}) => {
    const [birthdayValue, setBirthdayValue] = React.useState(birthday);
    React.useEffect(()=>{
        if(!!birthdayValue && !isString(birthdayValue)) {
            setValue("birthday", birthdayValue.toISOString().split('T')[0]);
        }
            
    },[birthdayValue, setValue])

    return (
            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                    {...register('first_name')}
                    defaultValue={first_name}
                    label="Prénom"
                    type="text"
                    />
                </Grid>
                <Grid item>
                    <TextField
                    {...register('last_name')}
                    defaultValue={last_name}
                    label="Nom de famille"
                    type="text"
                    /> 
                </Grid>
                <Grid item>
                    <TextField
                    {...register('diploma_level')}
                    defaultValue={diploma_level}
                    label="Niveau de diplôme"
                    type="text"
                    />
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date de naissance"
                        value={birthdayValue}
                        onChange={(newValue) => {
                            setBirthdayValue(newValue);
                          }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </Grid>
                <Grid item md ={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Enregistrer
                    </Button>
                </Grid>
            </Grid>

    )
}

const Competence = ({data, setValue}) => {
    const [options, setOptions] = React.useState([]);
    const fetchOption = React.useCallback(()=> {
        fetchCompetences(setOptions)
    }, []);

    React.useEffect(()=>{
        fetchOption();
    }, [fetchOption])
    const setItems = (event, value) => {
        setValue('competences', map(value, 'id') )
    }
    return (
        <Grid container spacing={2}>

            <Grid item md={12}>
                {!!options.data && (
                    <Autocomplete
                    multiple
                    options={options.data}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    onChange={setItems}
                    defaultValue={data}
                    isOptionEqualToValue={(option, value) => (option.id === value.id)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.label}
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField  {...params} label="Competences" placeholder="Competences..." />
                    )}
                    />
                )}
                
            </Grid>
            <Grid item md ={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Enregistrer
                </Button>
            </Grid>
        </Grid>
    )
}

const Diplome = ({folderId, id, setValue, register}) => {
    const [diplome, dispatchDiplome] = React.useReducer(activityReducer,
        {data: {
            begin_date:null,
            end_date:null,
            institut: '',
            description: ''
        }, isLoading: false, isError: false, isSuccess: false});
        
    const [beginDate, setBeginDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    React.useEffect(()=>{

        if(!!beginDate && !isString(beginDate)) {
            console.log(beginDate)
            setValue("begin_date", beginDate.toISOString().split('T')[0]);
        }
        if(!!endDate && !isString(endDate)) {
            setValue("end_date", endDate.toISOString().split('T')[0]);
        }
            
    },[beginDate, endDate, setValue]);

    const fetchDiploma = React.useCallback(()=>{
        if(!!id){
            fetchDiplome(dispatchDiplome, id);
        }
        else{
            dispatchDiplome({type : 'UPLOAD_SUCCESS'});
            setValue('folder', folderId);
        }
    },[id, folderId, setValue]);
    React.useEffect(()=>{
        fetchDiploma();
    },[fetchDiploma]);

    React.useEffect(()=>{
        setBeginDate(diplome.data.begin_date);
    },[diplome.data.begin_date]);
    React.useEffect(()=>{
        setEndDate(diplome.data.end_date);
    },[diplome.data.end_date]);
    
    return (
        <>
        {diplome.isSuccess && (
            <Grid container spacing={2}>
            <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date de debut"
                        value={beginDate} 
                        onChange={(newValue) => {
                            setBeginDate(newValue);
                          }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date de fin"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item>
                <TextField
                    defaultValue={diplome.data.institut}
                    label="Institut"
                    multiline
                    maxRows={30}
                    {...register('institut')}
                />
            </Grid>
            <Grid item>
                <TextField
                    defaultValue={diplome.data.description}
                    label="Description"
                    multiline
                    maxRows={30}
                    {...register('description')}
                />
            </Grid>
            <Grid item md ={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Enregistrer
                </Button>
            </Grid>
        </Grid>
        )}
        </>
        
    );
}

const Experience = ({folderId, id, setValue, register}) => {
    const [experience, dispatchExperience] = React.useReducer(activityReducer,
        {data: {
            title:'',
            competences:[],
            begin_date:null,
            end_date:null,
            institut: '',
            description: ''
        }, isLoading: false, isError: false, isSuccess: false});
        
    const [beginDate, setBeginDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    React.useEffect(()=>{

        if(!!beginDate && !isString(beginDate)) {
            console.log(beginDate)
            setValue("begin_date", beginDate.toISOString().split('T')[0]);
        }
        if(!!endDate && !isString(endDate)) {
            setValue("end_date", endDate.toISOString().split('T')[0]);
        }
            
    },[beginDate, endDate, setValue]);

    const fetchExperiences = React.useCallback(()=>{
        if(!!id){
            fetchExperience(dispatchExperience, id);
        }
        else{
            dispatchExperience({type : 'UPLOAD_SUCCESS'});
            setValue('folder', folderId);
        }
    },[id, folderId, setValue]);

    React.useEffect(()=>{
        fetchExperiences();
    },[fetchExperiences]);

    React.useEffect(()=>{
        setBeginDate(experience.data.begin_date);
    },[experience.data.begin_date]);

    React.useEffect(()=>{
        setEndDate(experience.data.end_date);
    },[experience.data.end_date]);
    
    return (
        <>
        {experience.isSuccess && (
            <Grid container spacing={2}>
            <Grid item>
                <TextField
                        defaultValue={experience.data.title}
                        label="Titre"
                        {...register('title')}
                    />
            </Grid>
            <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date de debut"
                        value={beginDate} 
                        onChange={(newValue) => {
                            setBeginDate(newValue);
                          }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date de fin"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item>
                <TextField
                    defaultValue={experience.data.institut}
                    label="Institut"
                    multiline
                    maxRows={30}
                    {...register('institut')}
                />
            </Grid>
            <Grid item>
                <TextField
                    defaultValue={experience.data.description}
                    label="Description"
                    multiline
                    maxRows={30}
                    {...register('description')}
                />
            </Grid>
            <Grid item>
                <Competence data={experience.data.competences} setValue={setValue}/>
            </Grid>

        </Grid>
        )}
        </>
        
    );
}


const Language = ({data, setValue}) => {
    const [options, setOptions] = React.useState([]);
    const fetchOption = React.useCallback(()=> {
        fetchLanguages(setOptions)
    }, []);

    React.useEffect(()=>{
        fetchOption();
    }, [fetchOption])
    const setItems = (event, value) => {
        setValue('languages', map(value, 'id') )
    }
    return (
        <Grid container spacing={2}>

            <Grid item md={12}>
                {!!options.data && (
                    <Autocomplete
                    multiple
                    options={options.data}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    onChange={setItems}
                    defaultValue={data}
                    isOptionEqualToValue={(option, value) => (option.id === value.id)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.label}
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField  {...params} label="Languages" placeholder="Languages..." />
                    )}
                    />
                )}
                
            </Grid>
            <Grid item md ={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Enregistrer
                </Button>
            </Grid>
        </Grid>
    )
}

const EditView = ({edit, folder, dispatchEditFolder, url}) =>{
    const {register, handleSubmit, setValue } = useForm();

    const onSubmit = (currentData, event) => {
        for (const key in currentData) {
            if (currentData[key] === '') {
              delete currentData[key];
            }
          }
        updateFolder(
            dispatchEditFolder,
            url,
            currentData)
    };

  const onSubmitDiplome = (currentData, event) => {
        for (const key in currentData) {
            if (currentData[key] === '') {
              delete currentData[key];
            }
          }
        if (!edit.id){
            createDiplome(
                dispatchEditFolder,
                currentData
                )
        }
        else {
            updateDiplome(
                dispatchEditFolder,
                currentData,
                edit.id)
        }
        
    }
    React.useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    const onSubmitExperience = (currentData, event) => {
        for (const key in currentData) {
            if (currentData[key] === '') {
              delete currentData[key];
            }
          }
        if (!edit.id){
            createExperience(
                dispatchEditFolder,
                currentData
                )
        }
        else {
            updateExperience(
                dispatchEditFolder,
                currentData,
                edit.id)
        }
        
    }
    React.useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                {edit.isPresentation && (<Presentation setValue={setValue} register={register} {...(folder.data)}/>)}
                {edit.isCompetence && (<Competence setValue={setValue} data={folder.data.competences} />) }
                {edit.isLanguage && (<Language setValue={setValue} data={folder.data.languages} />) }
            </Box>
            <Box component="form" onSubmit={handleSubmit(onSubmitDiplome)} noValidate>
                {edit.isDiplome && (<Diplome folderId={folder.data.id} id={edit.id} setValue={setValue} register={register}/>)}
            </Box>
            <Box component="form" onSubmit={handleSubmit(onSubmitExperience)} noValidate>
                {edit.isExperience && (<Experience folderId={folder.data.id} id={edit.id} setValue={setValue} register={register}/>)}
            </Box>
        </>
        
        
       
    )
}
export default EditView