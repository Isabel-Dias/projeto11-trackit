import SignInPage from "../pages/SignInPage/SignInPage"
import LogInPage from "../pages/LogInPage/LogInPage"
import HabitsPage from "../pages/HabitsPage/HabitsPage"
import TodayPage from "../pages/TodayPage/TodayPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LogInContext } from "./LogInContext"
import { ProgressContext } from "./ProgressContext"
import { useState } from "react"

export default function App() {
  const [logInStatus, setLogInStatus] = useState(''); 
  const [progress, setProgress] = useState(0);
  return (
    <>
      <BrowserRouter>
        <LogInContext.Provider value={{logInStatus, setLogInStatus}}>
          <ProgressContext.Provider value={{progress, setProgress}}>
            <Routes>
              <Route path="/" element={<LogInPage />} />
              <Route path="/cadastro" element={<SignInPage />} />
              <Route path="/hoje" element={<TodayPage />} />
              <Route path="/habitos" element={<HabitsPage />} />
            </Routes>
          </ProgressContext.Provider>
        </LogInContext.Provider>
      </BrowserRouter>
    </>
  )
}


