import React from 'react';
import Stepper from './Stepper';
import Header from './Header';

export default function App(){
    return(
	<>     
		<Header />
		<div className='stepper'>
		  <Stepper/>
		</div>
    </>)
}


