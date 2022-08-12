import React, { useState } from "react";
import "./login.css";

const Login = props => {
    const { onLoginSubmit, goToSignup, loginMessage, errorMessageLogin } =
        props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        // 1. create the data  object
        // 2. call the onLoginSubmit with data
        // 3. e. prevent default to prevent submit

        const data = { userId, password };
        onLoginSubmit(data);
        e.preventDefault();
    };

    return (
        <div className='Login justify-content-center  d-flex align-items-center vh-100 '>
            <div className=' auth-container p-5'>
                <h1 className="text-danger mt-4" style={{fontSize:80, fontFamily:"cursive"}}><strong>Theater</strong></h1>
                <h1 className="text-danger mt-4" style={{fontSize:40, fontFamily:"cursive"}}><>Login</></h1>

                <form onSubmit={handleSubmit} >
                    <div className='input-group'>
                        <input
                            className='form-control m-1 login_Id'
                            type='text'
                            placeholder='Enter User Id'
                            value={userId}
                            onChange={e => {
                                setUserId(e.target.value);
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type='password'
                            className='form-control m-1'
                            placeholder='Enter password'
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type='submit'
                            value='Log in'
                            className='form-control m-1 btn btn-danger'
                        />
                    </div>
                    <div className='input-group text-danger mx-2'>
                        Don't have an account?
                        <a href='#' onClick={goToSignup}>
                            Sign up!
                        </a>
                    </div>
                </form>

                <div className='error-msg text-danger m-1'>
                    {errorMessageLogin}
                </div>
                <div className='text-success m-1'>{loginMessage}</div>
            </div>
        </div>
    );
};

export default Login;