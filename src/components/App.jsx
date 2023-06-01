import SignInPage from "../pages/SignInPage/SignInPage"
import LogInPage from "../pages/LogInPage/LogInPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />}>
          </Route>
          <Route path="/cadastro" element={<SignInPage email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


