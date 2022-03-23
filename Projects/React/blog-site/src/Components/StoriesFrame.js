import React from 'react'
import PropTypes from 'prop-types'
import './StoriesFrame.scss'
function StoriesFrame({ title, children, className = '' }) {
    return (
        <fieldset className={`container ${className}`}>
            <legend>{title}</legend>
            {children}
        </fieldset>
    )
};
StoriesFrame.propTypes = {
    className: PropTypes.string,
};
export default StoriesFrame