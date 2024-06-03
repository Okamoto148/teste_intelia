import React from 'react';
import Stepper from './Stepper'; // Importando o componente Stepper
import Header from './Header'; // Importando o componente Header

export default function App(){
    return(
        <>     
            {/* Renderizando o componente Header */}
            <Header />
            {/* Div para envolver o componente Stepper com uma classe 'stepper' */}
            <div className='stepper'>
                {/* Renderizando o componente Stepper */}
                <Stepper/>
            </div>
        </>)
}
