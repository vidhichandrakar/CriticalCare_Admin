import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Dashboard from '../DAshBoardRight/Dashboard/Dashboard';
import MainComponent from '../DAshBoardRight/Dashboard/ṂainComponent';
import User from '../DAshBoardRight/People/User';
import Transaction from '../DAshBoardRight/Analytics/Transaction';
import MainCourses from '../Courses/MainCourses.component';
import MyTeam from '../DAshBoardRight/People/MyTeam';
import TestPortal from '../DAshBoardRight/People/TestPortal/TestPortal';
import Testimonial from '../DAshBoardRight/Testimonial/Testimonial';
import Trics1FreeMockTest from '../DAshBoardRight/Courses/Trics1FreeMockTest';
import CreateCoupon from '../DAshBoardRight/Courses/CreateCoupon';
import Analytics from '../DAshBoardRight/Analytics/Analytics';
import UpcomingCoursesMain from '../UpcomingCourses/UpcomingCourses.Main';
import CouponMain from '../Coupons/Coupons.main';
import YourCourses from '../Courses/YourCourses';
import CreateCourses from '../Courses/MainCourses.component';
import Banner from '../DAshBoardRight/Banner/Banner';
import Chat from '../DAshBoardRight/Chat';
import LoginPage from '../LoginFiles/LoginPage';
import TestFirstPage from '../DAshBoardRight/People/TestPortal/TestFirstPage';
import TestSixthPage from '../DAshBoardRight/People/TestPortal/TestFirstPage';

const RouterMain = () => {
  return (
    <div>
     <Routes>
            {/* <Route exact path="/Dashboard" element= {<MainComponent />}> </Route> */}
            <Route exact path="/Dashboard" element= {<Dashboard />}> </Route>
            <Route exact path="/admin" element= {<LoginPage/>}> </Route>
            <Route exact path="/CreateCourses" element= {<CreateCourses />}> </Route>
            <Route exact path="/User" element= {< User />}> </Route>
            <Route exact path="/Transaction" element= {<Transaction />}> </Route>
            <Route exact path="/MainCourses" element= {<MainCourses />}> </Route>
            <Route exact path="/MyTeam" element= {<MyTeam />}> </Route>
            <Route exact path="/TestPortal" element= {<TestPortal />}> </Route>
            <Route exact path="/Testimonial" element= {<Testimonial />}> </Route>
            <Route exact path="/Trics1FreeMockTest" element= {<Trics1FreeMockTest />}> </Route>
            <Route exact path="/CreateCoupon" element= {<CreateCoupon />}> </Route>
            <Route exact path="/YourCourses" element= {<YourCourses />}> </Route>
            <Route exact path="/Analytics" element= {<Analytics />}> </Route>
            <Route exact path="/UpcomingCoursesMain" element= {<UpcomingCoursesMain />}> </Route>
            <Route exact path="/CouponMain" element= {<CouponMain />}> </Route>
            <Route exact path="/Banner" element= {<Banner/>}> </Route>
            <Route exact path="/chat" element= {<Chat />}> </Route>
            <Route exact path="/TestFirstPage" element= {<TestFirstPage />}> </Route>
            <Route exact path="/TestSixthPage" element= {<TestSixthPage />}> </Route>

    </Routes>
    </div>
  )
}

export default RouterMain