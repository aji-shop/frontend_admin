import React, { useState } from 'react'

import './style.css'

import User from '../../service/user'

export interface AuthViewProps {
    handleAuth(token: string, user: any): void,
}

export default function AuthView(props: AuthViewProps) {
    const [signInEmailValue, setSignInEmailValue]: [string, any] = useState('')
    const [signInPasswordValue, setSignInPasswordValue]: [string, any] = useState('')


    const handleSignInNameChange = (event: any) => {
        setSignInEmailValue(event.target.value)
    }

    const handleSignInPasswordChange = (event: any) => {
        setSignInPasswordValue(event.target.value)
    }

    const handleSignin = (event: any) => {
        event.preventDefault()
        User.auth({email: signInEmailValue, password: signInPasswordValue}).then(res => {
            props.handleAuth(res.data.token, res.data.user)
        }, err => {alert('Email or password is incorrect. Please try again')})
    }

    return (
        <>                  
            <div className="row auth bg-dark text-light">
                <form onSubmit={(event: any) => {handleSignin(event)}}>
                    <div className="form-group">
                        <label htmlFor="signInEmailInput">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="signInEmailInput"
                            value={signInEmailValue}
                            onChange={handleSignInNameChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="signInPasswordInput">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="signInPasswordInput"
                            value={signInPasswordValue}
                            onChange={handleSignInPasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>            
        </>
    )
}
