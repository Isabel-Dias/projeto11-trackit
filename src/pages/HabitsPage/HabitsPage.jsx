import { useContext, useEffect, useState } from "react";
import { LogInContext } from "../../components/LogInContext";
import { ProgressContext } from "../../components/ProgressContext";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import axios from "axios";
import Weekdays from "../../components/Weekdays";


export default function HabitsPage() {
    const navigate = useNavigate();
    const { logInStatus } = useContext(LogInContext);
    const { progress, setProgress } = useContext(ProgressContext);
    const [visible, setVisible] = useState(false);
    const [habitName, setHabitName] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [disabledValue, setDisabledValue] = useState(false);
    const [habitsList, setHabitsList] = useState([]);
    const [toDelete, setToDelete] = useState('');

    const days = [
        { letter: "D", number: "0", selected: false },
        { letter: "S", number: "1", selected: false },
        { letter: "T", number: "2", selected: false },
        { letter: "Q", number: "3", selected: false },
        { letter: "Q", number: "4", selected: false },
        { letter: "S", number: "5", selected: false },
        { letter: "S", number: "6", selected: false }
    ]

    if (logInStatus != '') {

        useEffect(() => {
            const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
                {
                    headers: {
                        "Authorization": `Bearer ${logInStatus.token}`
                    }
                });
            promise.then(p => setHabitsList(p.data));
            promise.catch(p => console.log(p.message));
        }, []);

        return (
            <SCHabitsPage>
                <SCHabitsHeader>
                    <div data-test="header">
                        TrackIt
                        <img data-test="avatar" src={logInStatus.image} alt="login_photo" />
                    </div>
                </SCHabitsHeader>
                <SCHabitsContainer>
                    <SCMyHabits>
                        <p>Meus Hábitos</p>
                        <button data-test="habit-create-btn" onClick={() => { visible ? setVisible(false) : setVisible(true) }}>+</button>
                    </SCMyHabits>
                    <SCNewHabit data-test="habit-create-container" style={visible == false ? { display: 'none' } : { display: 'inline-block' }}>
                        <form onSubmit={saveHabit}>
                            <input data-test="habit-name-input" placeholder="nome do hábito" required disabled={disabledValue} type="text" onChange={e => setHabitName(e.target.value)} value={habitName} />
                            <SCWeekdaysContainer>
                                {days.map(day => {
                                    return (
                                        <button
                                            data-test="habit-day"
                                            type="button"
                                            style={!selectedDays.includes(day.number) ? { color: '#DBDBDB', backgroundColor: '#FFFFFF' } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}
                                            onClick={() => { selectDay(day.number) }} key={day.number}>
                                            {day.letter}
                                        </button>
                                    )
                                })}
                            </SCWeekdaysContainer>
                            <SCSubmitHabit>
                                <button data-test="habit-create-cancel-btn" onClick={() => { visible ? setVisible(false) : setVisible(true) }}>Cancelar</button>
                                <button data-test="habit-create-save-btn" disabled={disabledValue} type="submit">
                                    {disabledValue == true ? <ThreeDots
                                        height="100%"
                                        width="100%"
                                        radius="6"
                                        color="#ffffff"
                                        ariaLabel="three-dots-loading"
                                        visible={true}
                                    /> : 'Salvar'}
                                </button>
                            </SCSubmitHabit>
                        </form>
                        {habitsList == [] ? 'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!' : habitsList.map(
                            habit => {
                                return (
                                    <>
                                        <div data-test="habit-container" key={habit.id}>
                                            <p data-test="habit-name">{habit.name}</p>
                                            <p onClick={() => { deleteHabit(habit.id) }}>X</p>
                                        </div>
                                        <Weekdays habit={habit} />
                                    </>
                                )
                            }
                        )}
                    </SCNewHabit>

                </SCHabitsContainer>
                <SCHabitsFooter data-test="menu">
                    <p data-test="habit-link">Hábitos</p>
                    <SCProgressCircle data-test="today-link" onClick={() => { navigate("/hoje") }}>
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
                </SCHabitsFooter>
            </SCHabitsPage>
        );
    } else {
        useEffect(() => {
            navigate('/');
        }, [])
    }


    function saveHabit(event) {
        event.preventDefault();
        setDisabledValue(true)

        const newHabit = {
            name: habitName,
            days: selectedDays
        }

        const data = window.localStorage.getItem('Stored_Selected_Days');
        if (data !== null) setSelectedDays(JSON.parse(data));

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', newHabit, {
            headers: {
                "Authorization": `Bearer ${logInStatus.token}`
            }
        })
        promise.then(p => {
            setDisabledValue(false)
            setHabitName('')
            setVisible(false)
            setSelectedDays([])
            const newHabits = [...habitsList, p.data]
            setHabitsList(newHabits)
        })
        promise.catch(p => {
            console.log(p.message)
            setDisabledValue(false)
        })


    }

    function deleteHabit(habitID) {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitID}`,
            {
                headers: {
                    "Authorization": `Bearer ${logInStatus.token}`
                }

            }
        )
    }

    function selectDay(selectedDayNumber) {
        const data = window.localStorage.getItem('Stored_Selected_Days');
        if (data !== null) setSelectedDays(JSON.parse(data));

        let newArray = [...selectedDays, selectedDayNumber]

        if (!selectedDays.includes(selectedDayNumber)) {
            window.localStorage.setItem('Stored_Selected_Days', JSON.stringify(newArray));
            setSelectedDays(newArray)
        } else {
            selectedDays.splice(selectedDayNumber)
            newArray = [...selectedDays]
            setSelectedDays(newArray)
            window.localStorage.setItem('Stored_Selected_Days', JSON.stringify(newArray));
        }
    }

}

const SCHabitsPage = styled.div`
    display: flex;
    flex-direction: column;
    
    margin-top: 75px;
    margin-bottom: 70px;
    padding: 0 20px;
    
    
    height: 520px;
    background-color: #E5E5E5;
`
const SCHabitsHeader = styled.div`
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
    }
`

const SCHabitsContainer = styled.div`
    height: 100%;
    background-color: #E5E5E5;

    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;
`

const SCMyHabits = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;
    height: 77px;

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }

    button {
        width: 40px;
        height: 35px;

        background-color: #52B6FF;
        border-radius: 4.63636px;
        border: none;

        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;

        color: #FFFFFF;

        &:hover {
            cursor: pointer;
        }
    }
`
const SCNewHabit = styled.div`
    height: 180px;
    width: 100%;
    
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;

    background-color: #FFFFFF;

    input {
        width: 100%;
        height: 45px;

        background-color: #FFFFFF;
        
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
    }
`
const SCSubmitHabit = styled.div`
   
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 100%;

    button:nth-child(1) {

        width: 84px;
        height: 35px;
        
        margin-left: 10px;
        border: none;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #52B6FF;
        
        background-color: #FFFFFF;

        &:hover {
            cursor: pointer;
        }
    }

    button:nth-child(2) {
        width: 84px;
        height: 35px;

        padding: 10px;
        
        margin-left: 10px;
        border: none;
        border-radius: 4.63636px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;

        background-color: #52B6FF;

        &:hover {
            cursor: pointer;
        }
    }


`

const SCWeekdaysContainer = styled.div`
    margin-bottom: 30px;

    button {

        width: 30px;
        height: 30px;

        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-right: 5px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;

        &:hover {
            cursor: pointer;
        }
    }
`
const SCHabitBox = styled.div`
    
`

const SCHabitsFooter = styled.div`
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