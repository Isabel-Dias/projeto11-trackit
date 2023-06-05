import logo from "../logo.png"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner'

export default function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('');
    const [photo, setPhoto] = useState('')
    const [disabledValue, setDisabledValue] = useState(false)
    const navigate = useNavigate();

    const signInInfo = {
        email: email,
        name: userName,
        image: photo,
        password: password
    }

    const config = {
        headers: {
            "Authorization": "Wwg468IhUF8aR65U5HPKqdeP"
        }
    }

    return (
        <SCSignIn>
            <img src={logo} alt="trackit_logo" />
            <form onSubmit={signInCheck} disabled={disabledValue}>
                <FormContainer>
                    <input data-test="email-input" placeholder="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input data-test="password-input" placeholder="senha" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <input data-test="user-name-input" placeholder="nome" type="text" required value={userName} onChange={e => setUserName(e.target.value)} />
                    <input data-test="user-image-input" placeholder="foto" type="url" required value={photo} onChange={e => setPhoto(e.target.value)} />
                    <button data-test="signup-btn" type="submit" opacity={disabledValue == false ? 1 : 0.7}>
                        {disabledValue == true ? <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#ffffff"
                            ariaLabel="three-dots-loading"
                            visible={true}
                        /> : 'Cadastrar'}
                    </button>
                </FormContainer>
                <Link data-test="login-link" to={'/'} style={{ textDecoration: 'none' }}>
                    <p>Já tem uma conta? Faça login!</p>
                </Link>

            </form>

        </SCSignIn>
    )

    function signInCheck(event) {
        event.preventDefault();
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', signInInfo, config)
        setDisabledValue(true)
        promise.then(p => {
            navigate('/')
        })
        promise.catch(p => {
            alert(p.message)
            setDisabledValue(false)
        })
    }
}

const SCSignIn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top: 70px;

    img {
        height: 208px;
    }
    p {
    color: #52B6FF;
    text-decoration: underline;

    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;

    margin-top: 20px;

    &:hover {
        cursor: pointer;
    }
   }
`
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    margin-top: 30px;

    input {
        width: 303px;
        height: 45px;

        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin: 3px;
        padding-left: 12px;

        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #52B6FF;
        box-shadow: none;
        border: none;
        opacity: ${props => props.opacity};

        width: 303px;
        height: 45px;

        border-radius: 5px;
        margin: 3px;

        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;

        color: #FFFFFF;

        &:hover {
            cursor: pointer;
        }
    }
`