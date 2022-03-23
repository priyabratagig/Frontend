import React from 'react'

const Advertisemtn = ({ children = 'Advertisemetn' }) => {
    const style = {
        height: '100%',
        width: '100%',
        border: '.2rem dashed black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
        margin: '7rem 0'
    }
    return (<div style={style}>{children}</div>)
}

export default Advertisemtn