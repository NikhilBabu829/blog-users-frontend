import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterUser from './pages/UserPages/RegisterUser.jsx'
import LoginUser from './pages/UserPages/LoginUser.jsx'
import Context from './context/ContextProvider.jsx'
import UpdateUser from './pages/UserPages/UpdateUser.jsx'
import Home from './pages/Home.jsx'

const theme = createTheme({
  palette : {
    mode : "dark"
  }
})

const router = createBrowserRouter([
  {
    path : "/register-user",
    element : <RegisterUser/>
  },
  {
    path : "/login-user",
    element : <LoginUser/>
  },
  {
    path : "/update-user",
    element : <UpdateUser/>
  },
  {
    path : "/",
    element : <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </ThemeProvider>
)
