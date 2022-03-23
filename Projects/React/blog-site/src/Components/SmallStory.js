import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SmallStory.scss';
function SmallStory({ image = null, title, brief, section, date, sectionLink = '#', articleLink = '#' }) {
    const navigate = useNavigate();
    const handelClick = (event, navigateTo) => {
        navigate(navigateTo);
        event.stopPropagation();
    };
    return (
        <article onClick={event => handelClick(event, articleLink)} className="article article--small">
            {image !== null && <section className='article__image'>
                <img src={image} alt={title} />
            </section>}
            <section className='article__main'>
                <h3 className='article__main__heading'>{title}</h3>
                {typeof brief === 'string' && <p className='article__main__breif'>{brief}</p>}
                <div className='article__main__info'>
                    <Link to={sectionLink} className='article__main__info__section'>{section}</Link>
                    <span className='article__main__info__date'>{date}</span>
                </div>
            </section>
        </article>
    )
}

export default SmallStory