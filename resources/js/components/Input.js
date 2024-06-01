import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Looks3Icon from '@mui/icons-material/Looks3';


export default function InputWithIcon({onChangeInput, onChangeInput2, onChangeInput3, onChangeInput4, onChangeInput5, value, value2, value3, value4, value5, activeStep, icon1, icon2, icon3, icon4, icon5, label,label2,label3,label4,label5}) {
    function handleInput(event){
        onChangeInput(event.currentTarget.value)
    }
    function handleInput2(event){
        onChangeInput2(event.currentTarget.value)
    }
	
	function handleInput3(event){
        onChangeInput3(event.currentTarget.value)
    }
	
	function handleInput4(event){
        onChangeInput4(event.currentTarget.value)
    }
	
	function handleInput5(event){
        onChangeInput5(event.currentTarget.value)
    }

  return (
    <Box sx={{ '& > :not(style)': { m: 1 }}} style={{width: '100%'}}>
      <FormControl variant="standard" style={{width: '100%'}}>
        <InputLabel htmlFor="input-with-icon-adornment" >
          {label}
        </InputLabel>
        {icon1&&<Input
          onChange={handleInput}
          value={value}
          id="input-with-icon-adornment"
          
        />}
		
        <InputLabel htmlFor="input-with-icon2-adornment" >
          {label2}
        </InputLabel>
        {icon2&&<Input
          onChange={handleInput2}
          value={value2}
          id="input-with-icon2-adornment"
     
        />}
		
		 <InputLabel htmlFor="input-with-icon-adornment" >
          {label3}
        </InputLabel>
        {icon3&&<Input
          onChange={handleInput3}
          value={value3}
          id="input-with-icon-adornment"
         
        />}
		
		 <InputLabel htmlFor="input-with-icon-adornment" >
          {label4}
        </InputLabel>
        {icon4&&<Input
          onChange={handleInput4}
          value={value4}
          id="input-with-icon-adornment"
     
          
        />}
		
		 <InputLabel htmlFor="input-with-icon-adornment" >
          {label5}
        </InputLabel>
        {icon5&&<Input
          onChange={handleInput5}
          value={value5}
          id="input-with-icon-adornment"
   
        />}
      </FormControl>
      
      
    </Box>
  );
}