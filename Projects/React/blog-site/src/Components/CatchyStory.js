import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './CatchyStory.scss'

function CatchyStory({ image = null, title, brief, section = null, date = null, sectionLink = '#', articleLink = '#', children }) {
    const navigate = useNavigate();
    const handelClick = (event, navigateTo) => {
        event.stopPropagation();
        navigate(navigateTo);
    };
    return (
        <article onClick={event => handelClick(event, articleLink)} className="article">
            {image !== null && <section className='article__image'>
                <img src={image} alt={title} />
            </section>}
            <section className='article__main'>
                <h3 className='article__main__heading'>{title}</h3>
                {typeof brief === 'string' && <p className='article__main__breif'>{brief}</p>}
                <div className='article__main__info'>
                    {section !== null && <Link to={sectionLink} className='article__main__info__section'>{section}</Link>}
                    {date !== null && <span className='article__main__info__date'>{date}</span>}
                    {children}
                </div>
            </section>
        </article>
    )
}

export default CatchyStory