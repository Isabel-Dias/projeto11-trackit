import SignInPage from "../pages/SignInPage/SignInPage"
import LogInPage from "../pages/LogInPage/LogInPage"
import HabitsPage from "../pages/HabitsPage/HabitsPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LogInContext } from "./LogInContext"
import { useState } from "react"

export default function App() {
  const [logInStatus, setLogInStatus] = useState({}); 

  return (
    <>
      <BrowserRouter>
        <LogInContext.Provider value={{logInStatus, setLogInStatus}}>
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/cadastro" element={<SignInPage />} />
            <Route path="/habitos" element={<HabitsPage />} />
          </Routes>
        </LogInContext.Provider>
      </BrowserRouter>
    </>
  )
}


