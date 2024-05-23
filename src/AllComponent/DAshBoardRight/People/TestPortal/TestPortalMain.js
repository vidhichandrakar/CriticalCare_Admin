import React, { useEffect, useState } from 'react'
import TestNavAndLeft from './TestNavAndLeft'
import TestProtalHeader from './TestProtalHeader'
import TestFirstPage from './TestFirstPage'
import { useLocation } from "react-router-dom"
import { getTestById } from '../../../ActionFactory/apiActions'

function TestPortalMain() {

  let location = useLocation();
  const test_id = location.state?.id;
  const [testData, setTestData] = useState([]);
  
  useEffect(() => {
    getTestById({
      test_id : test_id,
        callBack: (response) => {
          setTestData(response?.data);
          console.log("response?.dataresponse?.data",response?.data)
        },
      });
  },[test_id])
  return (
    <div className="grid-container-TestPortal ">
        <TestProtalHeader testData={testData}/>
        <TestNavAndLeft />
        <TestFirstPage testData={testData} />
      
    </div>
  )
}

export default TestPortalMain
