import React, { useState, useEffect } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { LoremIpsum } from 'react-lorem-ipsum';
import { FaRegPlayCircle } from "react-icons/fa";
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import bgImg from "../../assets/bg.jpg"
import { useDispatch } from 'react-redux';
import { isMovieDetail } from '../../redux/slice/user.slice';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    const fetchData = async (page = currentPage) => {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=2a4ca479bed36652a4f3cf8be2f8e110&language=en-US&page=' + page)
        setMovies(response.data.results)
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className='container-fluid' style={{ height: 'auto', color: 'white', background: '#000000' }}>
                <div className='d-flex flex-column text-center mb-5' style={{ backgroundImage: `url(${bgImg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 400px' }}>
                    <div className='mt-5'>
                        <h6 className='mt-5 mb-0' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Welcome To Our Movies Site</h6>
                        <span style={{ fontSize: '4rem', fontWeight: '650' }} className='text'>OUR SPECIAL</span>
                        <span style={{ fontSize: '4rem', fontWeight: '650', color: '#cf000f' }} > MOVIES</span>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'></div>
                        <div className='col-md-4'>
                            <div style={{ textAlign: 'center' }}>
                                <LoremIpsum avgWordsPerSentence={4} />
                            </div>
                        </div>
                        <div className='col-md-4'></div>
                    </div>
                    <div className='mb-5'>
                        <Button style={{ backgroundColor: '#cf000f', border: 'none' }} className='rounded-pill' >Read More</Button>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        {
                            movies.map((movie, index) => {
                                return (
                                    <Col md="4" lg='3' sm='6' className="mb-4 " key={index}>
                                        <Card
                                            style={{ width: '16rem', height: '380px' }}
                                            className='bg-dark text-white'>
                                            <Card.Img
                                                height="270px"
                                                variant="top"
                                                src={'https://image.tmdb.org/t/p/original/' + movie.poster_path}
                                            />
                                            <Card.Body
                                                className='d-flex justify-content-between align-center border-top'>
                                                <Card.Text as='div'>
                                                    <Card.Title
                                                        onClick={() => {
                                                            dispatch(isMovieDetail(movie));
                                                            return navigate('/details')
                                                        }}
                                                        style={{ fontSize: '16px', cursor: 'pointer' }} >
                                                        {movie.title}
                                                    </Card.Title>
                                                    <Rating size={20} initialValue={movie.vote_average / 2} />
                                                </Card.Text>
                                                <FaRegPlayCircle style={{ height: '60px', width: '40px', color: 'aqua' }} />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </div>
                    <div className="row mt-5">
                        <div className='col-md-4'></div>
                        <div className='col-md-4 text-white text-center mb-5'>
                            <button className="btn btn-sm btn-info mx-2" onClick={() => {
                                const nextPage = currentPage - 1;
                                if (nextPage > 0) {
                                    setCurrentPage(nextPage)
                                    fetchData(nextPage)
                                }
                            }}>Prev</button>
                            . . . {currentPage} . . .
                            <button className='btn btn-sm btn-info  mx-2' onClick={() => {
                                const nextPage = currentPage + 1;
                                setCurrentPage(nextPage)
                                fetchData(nextPage)
                            }}>Next</button>
                        </div>
                        <div className='col-md-4'></div>
                    </div>
                </div>
            </div>
        </>
    )
}
