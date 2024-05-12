import React from 'react'
import TestNavAndLeft from './TestNavAndLeft'
import TestProtalHeader from './TestProtalHeader'
import TestFirstPage from './TestFirstPage'

function TestPortalMain() {
  return (
    <div className="grid-container-TestPortal ">
        <TestProtalHeader />
        <TestNavAndLeft />
        <TestFirstPage />
      
    </div>
  )
}

export default TestPortalMain
