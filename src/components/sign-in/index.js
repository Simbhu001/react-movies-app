import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logIn } from '../../redux/slice/user.slice';
import { toast, ToastContainer } from 'react-toastify';

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('username is Required'),
    password: Yup.string()
        .min(4, 'Too Short!')
        .required(' password is Required'),
});

localStorage.setItem('userName', 'simbhu');
localStorage.setItem('userPassword', 'simbhu@tmdb');

export default function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleForm = (values) => {

        let defaultUserName = localStorage.getItem('userName');
        let defaultPassword = localStorage.getItem('userPassword');

        localStorage.setItem('isLogUsername', values.username);
        localStorage.setItem('isLogPassword', values.password);

        let logUser = localStorage.getItem('isLogUsername');
        let logPwd = localStorage.getItem('isLogPassword');


        if (logUser === defaultUserName && logPwd === defaultPassword) {
            dispatch(logIn(true));
            toast.success('User Login Successfully');
            return navigate('/home');
        } else {
            toast.error('Bad Credentials ! check it..')
            return navigate('/');
        }
    }

    return (
        <>
            <div className='container-fluid bg-dark' style={{ height: '100vh' }}>
                <div className='row'>
                    <div className='col-xs-1 col-sm-2 col-md-3 '></div>
                    <div className='col-xs-10 col-sm-8 col-md-6  pt-5'>
                        <div className='card m-5 p-5 pt-3'>
                            <h1>Sign In</h1>
                            <span>Sign In too Your Self Service Portal</span>
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validationSchema={loginSchema}
                                onSubmit={handleForm}
                            >
                                {
                                    ({ errors, touched }) => {
                                        return (
                                            <Form className="mt-3" >
                                                <div className='form-group mt-3'>
                                                    <Field
                                                        name='username'
                                                        type="text"
                                                        className='form-control'
                                                        placeholder='username'
                                                    />
                                                </div>
                                                {errors.username && touched.username ? <div className=' mt-1 text-danger'>{errors.username}</div> : null}
                                                <div className='form-group mt-3'>
                                                    <Field
                                                        name='password'
                                                        type="password"
                                                        className='form-control'
                                                        placeholder='password'
                                                    />
                                                </div>
                                                {errors.password && touched.password ? <div className='  mt-1 text-danger'>{errors.password}</div> : null}
                                                <div className='form-group mt-3'>
                                                    <button
                                                        style={{ backgroundColor: '#ff4c30', border: 'none' }}
                                                        className='form-control text-center text-white'
                                                        type='submit'>
                                                        LOGIN
                                                    </button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                }
                            </Formik>
                        </div>
                    </div>
                    <div className='col-xs-1 col-sm-2 col-md-3'></div>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </>
    )
}
