import { useContext, useEffect, useState } from "react";
import { LogInContext } from "../../components/LogInContext";
import { ProgressContext } from "../../components/ProgressContext";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

export default function TodayPage() {
    const navigate = useNavigate();
    const { logInStatus } = useContext(LogInContext);
    const { progress, setProgress } = useContext(ProgressContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const date = dayjs();
    

    useEffect(() => {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
            headers: {
            "Authorization": `Bearer ${logInStatus.token}`
            }
        });
        promise.then(p => {setTodayHabits(p.data)})
        promise.catch(p => {console.log(p.response);})
    }, [logInStatus.id])

    if (logInStatus != '') {
        return (
            <SCTodayPage>
                <SCTodayHeader>
                    <div data-test="header">
                        TrackIt
                        <img data-test="avatar" src={logInStatus.image} alt="login_photo" /> 
                    </div>
                </SCTodayHeader>
                <SCHabitsContainer>
                    <SCHabitsDone>
                        <h1 data-test="today">{weekday()}, {date.format('DD/MM')}</h1>
                        <h2 data-test="today-counter" style={progress == 0 ? {color: '#BABABA'} : {color: '#8FC549'}}>
                            {progress == 0 ? "Nenhum hábito concluído ainda" : progress + "% dos hábitos concluídos"}
                        </h2>
                        {todayHabits?.map(habit => {
                            return(
                                <div>
                                    {habit.name}
                                </div>
                            )
                            
                        })}
                    </SCHabitsDone>
                    <SCHabitBox>

                    </SCHabitBox>
                    {/* {todayHabits?.map(habit =>

                    )} */}
                </SCHabitsContainer>
                <SCTodayFooter data-test="menu">
                    <p data-test="habit-link" onClick={() => {navigate("/habitos")}}>Hábitos</p>
                    <SCProgressCircle data-test="today-link">
                        <CircularProgressbar 
                        value={progress} 
                        text={'Hoje'}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#ffffff",
                            pathColor: "#ffffff",
                            trailColor: "transparent" 
                        })}
                         />
                    </SCProgressCircle>
                    <p data-test="history-link">Histórico</p>
                </SCTodayFooter>
            </SCTodayPage>
        );
        
    } else {
        useEffect(() => {
            navigate('/'); 
        }, []); 
    }



    function weekday() {
        let day = ''
        switch (date.format('dddd')) {
            case "Sunday":
              day = "Domingo";
              break;
            case "Monday":
              day = "Segunda";
              break;
            case "Tuesday":
               day = "Terça-feira";
              break;
            case "Wednesday":
              day = "Quarta-feira";
              break;
            case "Thursday":
              day = "Quinta-feira";
              break;
            case "Friday":
              day = "Sexta-feira";
              break;
            case "Saturday":
              day = "Sábado";
        }
        return day;
    }
}

const SCTodayPage = styled.div`
    display: flex;
    flex-direction: column;
    
    margin-top: 75px;
    margin-bottom: 70px;
    padding: 0 20px;
    
    
    height: 520px;
    background-color: #E5E5E5;
`
const SCTodayHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 18px;

    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;

    width: 100%;
    height: 75px;

    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    div {
        width: 97px;
        height: 49px;
        left: 18px;
        top: 10px;

        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;

        color: #FFFFFF;
    }

    img {
        height: 51px;
        width: 51px;
        
        border-radius: 98.5px;
        
        position: fixed;
        left: 306px;
        top: 9px;
        background-color: #FFFFFF;
    }
`

const SCHabitsContainer = styled.div`
   height: 100%;
   background-color: #E5E5E5;
`

const SCHabitsDone = styled.div`
    width: 100%;
    height: 77px;

    padding: 30px 0;

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }

    h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
    }
    

` 

const SCHabitBox = styled.div`
    
`

const SCTodayFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 35px;

    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 70px;
    
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;

    background-color: #ffffff;
    
    p {
        color: #52B6FF;

        &:hover {
            cursor: pointer;
        }
    }
    
    
`
const SCProgressCircle = styled.div`
    width: 91px;
    height: 91px;
    
    position: fixed;
    left: 142px;
    top: 566px;

    &:hover {
        cursor: pointer;
    }

`
