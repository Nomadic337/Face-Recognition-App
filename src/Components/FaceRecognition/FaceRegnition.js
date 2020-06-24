import React from 'react';

const FacialRecognition = ({ imageUrl }) => {
    return (
        <div className='center'>
            <img src={ imageUrl} alt=""/>
        </div>
    )

}

export default FacialRecognition;