import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ImageTile.scss';

function ImageTile({ image, heading, section, date, linkTo, sectionLink }) {
    const navigate = useNavigate();
    const handelClick = (event, navigateTo) => {
        event.stopPropagation();
        navigate(navigateTo);
    };
    return (
        <div className='imageTile' onClick={(event) => handelClick(event, linkTo)}>
            <img className='imageTile__image' src={image} alt={heading[0]} />
            <div className='imageTile__text'>
                <div className='imageTile__text__heading' to={linkTo}>
                    {heading.map((text, index) => (<p key={index}>{text}</p>))}
                </div>
                <span className='imageTile__text__info'>
                    <Link to={sectionLink} className='imageTile__text__info__section'>{section}</Link>
                    <span className='imageTile__text__info__date'>{date}</span>
                </span>
            </div>
        </div>
    )
}
ImageTile.propTypes = {
    heading: PropTypes.array,
}
export default ImageTile