import { useState } from 'react'
import "./AllComponent/CSSFile/DashBoard.css"
import Sidebar from './AllComponent/AdminDashboardMain/SideBar'
import Home from './AllComponent/AdminDashboardMain/Main'
import LoginPage from './AllComponent/LoginFiles/LoginPage'
import RouterMain from './AllComponent/RouterMainFile/RouterMain'
import Dashboard from './AllComponent/DAshBoardRight/Dashboard/Dashboard'

function App() {

  return (
    <>
       <RouterMain />
       {/* <Dashboard /> */}
    </>
  )
}

export default App