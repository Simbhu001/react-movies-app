import React from 'react'
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Cinema from '../../assets/c.png';
import { logIn } from '../../redux/slice/user.slice';
import { Link } from 'react-router-dom'

export default function NavBar() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.user.user.logIn);
    return (
        <div>
            <Navbar style={{ backgroundColor: '#043b5c' }} expand="lg" >
                <Navbar.Brand href="home" className='mx-5'>
                    <img src={Cinema} alt='' style={{ height: '70%', width: '4rem' }} />
                </Navbar.Brand>
                {
                    isLogged ? (
                        <>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto justify-content-end">
                                    <Form className='d-flex '>
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                        <Button style={{ backgroundColor: '#ff4c30', border: 'none' }} className="rounded-right">
                                            <AiOutlineSearch size={'30px'} />
                                        </Button>
                                    </Form>
                                    <Link
                                        className='mx-5 text-white mt-1'
                                        style={{ textDecoration: 'none', fontSize: '1.3rem' }}
                                        to={'/'}
                                        onClick={() => {
                                            dispatch(logIn(false));
                                            localStorage.removeItem('isLogUsername');
                                            localStorage.removeItem('isLogPassword');
                                        }}
                                    >Log Out
                                    </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </>) : null
                }

            </Navbar>
        </div>
    )
}
