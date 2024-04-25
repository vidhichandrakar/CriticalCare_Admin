import React,{useState} from 'react'
import Header from '../../Courses/Header'
import SideBar from '../../AdminDashboardMain/SideBar'
import Dashboard from './Dashboard'

function ṂainComponent() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Dashboard/>
  </div>
  )
}

export default ṂainComponent
