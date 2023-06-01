import logo from "../logo.png"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function LogInPage(props) {
    const {email, setEmail, password, setPassword} = props;
    const [disabledValue, setDisabledValue] = useState(false)
    
    const logInInfo = {
        email: email,
	    password: password
    }

    const config = {
        headers: {
            "Authorization": "Wwg468IhUF8aR65U5HPKqdeP"
        }
    }

    return (
        <SCLogInPage>
            <img src={logo} />
            <form onSubmit={logInCheck} disabled={disabledValue}>
                <FormContainer>
                    <input type="email" required placeholder="email" value={email}  onChange={e => setEmail(e.target.value)}/>
                    <input type="password" required placeholder="senha" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Entrar</button>
                </FormContainer>
            </form>
            <Link to={"/cadastro"} style={{ textDecoration: 'none' }}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
                
            
        </SCLogInPage>

    )

    function logInCheck(event) {
        event.preventDefault();
        setDisabledValue(true)
        console.log(logInInfo);
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', logInInfo)
        promise.then(p => {
            setDisabledValue(false)
        })
        promise.catch(p => console.log(p.response))
    };
};

const SCLogInPage = styled.div`
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
        background-color: #52B6FF;
        box-shadow: none;
        border: none;

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