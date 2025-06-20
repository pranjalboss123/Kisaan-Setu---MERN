import React, { useState, useEffect } from 'react'
import './Login.css'

import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';


const Login = () => {

    

    const [{ basket }, dispatch] = useStateValue();

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                console.log(auth)

                // history.push('/buyorsell')
                if (auth) { history.push('/buyorsell') }


                dispatch({
                    type: 'SET_USER',
                    user: auth.email
                })
            })
            .catch(err => alert(err.message))
    }

    const redirect = () => {
        history.push('/register')
    }

    return (
        <div className='login'>

            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="active"> Sign In </h2>

                    <div className="fadeIn first">
                        <img src="https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_960_720.png" id="icon" alt="User Icon" />
                    </div>

                    <form>
                        <input type="email" id="Username" className="fadeIn second" name="login" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                        <input type="password" id="password" className="fadeIn third" name="login" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                        <input onClick={signIn} type="submit" className="fadeIn fourth" value="Log In" />

                    </form>

                    <input type="submit" value='Redirect to Sign Up' onClick={redirect} />

                </div>
            </div>

        </div>
    )
}

export default Login
