import { useState } from 'react'
import "./AllComponent/CSSFile/DashBoard.css"
import Sidebar from './AllComponent/AdminDashboardMain/SideBar'
import Home from './AllComponent/AdminDashboardMain/Main'
import LoginPage from './AllComponent/LoginFiles/LoginPage'
import RouterMain from './AllComponent/RouterMainFile/RouterMain'
import Dashboard from './AllComponent/DAshBoardRight/Dashboard/Dashboard'
import { ToastContainer } from 'react-toastify'
import Counter from './AllComponent/redux/Counter'

function App() {

  return (
    <>
       {/* <RouterMain />
       <ToastContainer containerId={"request"}/> */}
       {/* <Dashboard /> */}
       <Counter />
    </>
  )
}

export default App