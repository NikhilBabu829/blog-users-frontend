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
import LoguutUser from './pages/UserPages/LogoutUser.jsx'
import CreateComment  from './pages/CommentPages/CreateComment.jsx'

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
    path : "/create-comment/:id",
    element : <CreateComment />
  },
  {
    path : "/login-user",
    element : <LoginUser/>
  },
  {
    path : "/logout-user/*",
    element : <LoguutUser/>
  },
  {
    path : "/update-user",
    element : <UpdateUser/>
  },
  {
    path : "/home",
    element : <Home />
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
