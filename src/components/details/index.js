import React from 'react';
import { useSelector } from 'react-redux';

export default function Details() {
    const movie = useSelector(state => state.user.movieDetail);

    return (
        <div style={{ height: '90vh' }} className='bg-dark'>
            <div className='container-fluid'>
                {
                    movie.map((m, index) => {
                        return (
                            <div className='row' key={index}>
                                <div className=' col-sm-12 col-xs-12 col-md-6 p-5 text-white'>
                                    <div className='d-flex flex-column  mx-5 justify-content-center'>
                                        <h3 className='mt-5'>{m.title}</h3>
                                        <span className='mt-5 '>{"Rating : " + m.vote_average + ' /10'}</span>
                                        <p className='mt-4'>{m.overview}</p>
                                        <h5 className='mt-4'>{"Release Date : " + m.release_date}</h5>
                                        <h5 className='mt-4'>{"Original Language : " + m.original_language}</h5>
                                    </div>
                                </div>
                                <div className=' col-sm-12 col-xs-12 col-md-6 p-5 bg-dark '>
                                    <img src={'https://image.tmdb.org/t/p/original/' + m.poster_path}
                                        alt=''
                                        style={{ width: '20rem', height: '450px' }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
