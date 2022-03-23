import React, { useState, useRef, useEffect } from 'react'
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaYoutubeSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BlogTitleImage from '../static/images/BlogTitleImage.png'
import BlogImage1 from '../static/images/BlogImage1.png'
import clap from '../static/Icons/clap.png'
import clap2x from '../static/Icons/clap2x.png'
import face2x from '../static/Icons/face2x.png'
import share2x from '../static/Icons/share2x.png'
import './Blog.scss'
import StoriesFrame from './StoriesFrame'
import House from '../static/images/House.jpg'
import CatchyStory from './CatchyStory'
const breakPoint = {
    mobile: 768
};
const Blog = () => {
    const data = {
        writerName: 'Dmitry Nozhenko',
        writerImage: face2x,
        info: 'Jan 28, 2019 · 10 min read',
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#',
        blogTitle: '5 Ways to animate a React app.',
        tags: ['React', 'Javascript', 'Animation'],
        claps: '9.3K',
        blogLink: '#',
        content: [
            { type: 'image', src: BlogTitleImage, alt: 'Title Image' },
            { type: 'text', text: `Animation in ReactJs app is a popular topic and there are many ways to create different types of animations.Many developers create animation exclusively using css and adding classes to HTML tags. This is a great way and you should use it. If you want to create complex animations you can pay attention to GreenSock. GreenSock is the most powerful animation platform. There are also a lot of libraries, components for creating animation in React.` },
            { type: 'text', text: 'Let’s talk about them' },
            { type: 'image', src: BlogImage1, alt: 'React code' }
        ],
        moreBlogs: [
            {
                image: House,
                title: 'Joshua Tree Overnight Adventure',
                articleLink: '#',
            },
            {
                image: House,
                title: 'Joshua Tree Overnight Adventure',
                articleLink: '#',
            },
            {
                image: House,
                title: 'Joshua Tree Overnight Adventure',
                articleLink: '#',
            }
        ]
    };
    //state and refference for view mode
    const [view, setView] = useState({ isMobile: document.body.offsetWidth < breakPoint.mobile });
    const isMobile = useRef(undefined);
    isMobile.current = view.isMobile;
    //inilization and remove eventlistener
    useEffect(() => {
        //resize handler
        const resizeEvent = (() => {
            let windowResizeBuffer = undefined;
            //lowering number of state change or re-render
            //canceling previous resize event call requested within 1 second
            return () => {
                clearTimeout(windowResizeBuffer);
                if ((document.body.offsetWidth >= breakPoint.mobile && isMobile.current !== false) ||
                    (document.body.offsetWidth < breakPoint.mobile && isMobile.current !== true))
                    windowResizeBuffer = setTimeout(() => {
                        setView({ isMobile: document.body.offsetWidth < breakPoint.mobile });
                    }, 1000);
            }
        })();
        window.addEventListener('resize', resizeEvent);
        //remove animation and window listener on unmount 
        return () => {
            window.removeEventListener('resize', resizeEvent);
        }
    }, [])
    return (
        <>
            <div className='blog'>
                {!view.isMobile && <div className='blog__panel blog__panel--left'>
                    <p className='blog__action blog__action--clap'><span><img src={clap2x} alt="claps" /></span><span>{data.claps} Claps</span></p>
                    <p className='blog__action blog__action--share'><span><img src={share2x} alt="share" /></span><span>Sahre this <article></article></span></p>
                </div>}
                <article className='blog__main'>
                    <h1 className='blog__main__title'>{data.blogTitle}</h1>
                    <section className='blog__main__details'>
                        <div className='blog__main__details--user'>
                            <div className='blog__main__details__profilePic'><img src={data.writerImage} alt="writer profile pic" /></div>
                            <div className='blog__main__details__text'><p>{data.writerName}</p><p>{data.info}</p></div>
                        </div>
                        <div className='blog__main__details__connect'>
                            {'facebook' in data && <Link to={data.facebook}><FaFacebookSquare /></Link>}
                            {'instagram' in data && <Link to={data.twitter}><FaTwitterSquare /></Link>}
                            {'twitter' in data && <Link to={data.instagram}><FaInstagramSquare /></Link>}
                            {'youtube' in data && <Link to={data.youtube}><FaYoutubeSquare /></Link>}
                        </div>
                    </section>
                    <main className='blog__main__content'>
                        {data.content.map((content, index) => {
                            if (content.type === 'text')
                                return <p key={index} className='blog__main__content--text'>{content.text}</p>
                            if (content.type === 'image')
                                return <div className='blog__main__content--image'><img src={content.src} alt={content.alt} /></div>
                            return false;
                        })}
                    </main>
                    <section className='blog__main__details--blog'>
                        <p className='blog__main__details__tags'>{data.tags.map(tag => (<span key={tag}>{tag}</span>))}</p>
                        <p className='blog__action blog__action--clap'><span><img src={clap} alt="claps" /></span><span>{data.claps}</span></p>
                    </section>
                    <hr />
                    <section className='blog__main__details--user' >
                        <div className='blog__main__details__profilePic'><img src={data.writerImage} alt="writer profile pic" /></div>
                        <div className='blog__main__details__text'><p>WRITTEN BY</p><p>{data.writerName}</p><p>{data.info}</p></div>
                    </section>
                    <hr />
                </article>
            </div>
            <StoriesFrame title='More From The Siren' className='container--expandable'>
                {data.moreBlogs.map((blog, index) => (<CatchyStory {...blog} key={index}>
                    <section className='blog__main__details'>
                        <div className='blog__main__details--user'>
                            <div className='blog__main__details__profilePic'><img src={data.writerImage} alt="writer profile pic" /></div>
                            <div className='blog__main__details__text'><p>{data.writerName}</p><p>{data.info}</p></div>
                        </div>
                    </section>
                </CatchyStory>))}
            </StoriesFrame>
        </>
    )
}

export default Blog