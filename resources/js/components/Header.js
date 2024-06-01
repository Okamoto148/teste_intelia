import React from 'react';
import Image from '../../images/logo.png'

export default function Header(){
    // const logoUrl = require('../images/logo.png');

    return(
        <>
            <img
                src={Image}
                alt=""
                className='header__image'
            />
            <header className="d-flex align-items-center header" >
                <div className='header__bottom'>
                    Cadastro
                </div>
            </header>
            
        </>
    )
}