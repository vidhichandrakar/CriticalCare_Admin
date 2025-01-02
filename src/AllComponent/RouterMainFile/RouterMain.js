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
import TestPortalMain from '../DAshBoardRight/People/TestPortal/TestPortalMain';
import TestSixthPage from '../DAshBoardRight/People/TestPortal/TestFirstPage';
import AddContent from '../Courses/AddContent/AddContent';
import Categores from '../DAshBoardRight/Categores';
import Subcategores from '../DAshBoardRight/Subcategores';
import TeamMember from '../DAshBoardRight/TeamMember';
import AddBolg from '../AddBlog/AddBolg';
import AddBlog from '../DAshBoardRight/AddBlog';
import EnrollStudent from '../DAshBoardRight/EnrollStudent';

const RouterMain = () => {
  return (
    <div>
     <Routes>
            <Route exact path="/admin" element= {<LoginPage/>}> </Route>
            <Route exact path="/admin/Dashboard" element= {<Dashboard />}> </Route>
            <Route exact path="/admin/CreateCourses" element= {<CreateCourses />}> </Route>
            <Route exact path="/admin/User" element= {< User />}> </Route>
            <Route exact path="/admin/Transaction" element= {<Transaction />}> </Route>
            <Route exact path="/admin/MainCourses" element= {<MainCourses />}> </Route>
            <Route exact path="/admin/MyTeam" element= {<MyTeam />}> </Route>
            <Route exact path="/admin/TestPortal" element= {<TestPortal />}> </Route>
            <Route exact path="/admin/Testimonial" element= {<Testimonial />}> </Route>
            <Route exact path="/admin/Trics1FreeMockTest" element= {<Trics1FreeMockTest />}> </Route>
            <Route exact path="/admin/CreateCoupon" element= {<CreateCoupon />}> </Route>
            <Route exact path="/admin/YourCourses" element= {<YourCourses />}> </Route>
            <Route exact path="/admin/Analytics" element= {<Analytics />}> </Route>
            <Route exact path="/admin/UpcomingCoursesMain" element= {<UpcomingCoursesMain />}> </Route>
            <Route exact path="/admin/CouponMain" element= {<CouponMain />}> </Route>
            <Route exact path="/admin/Banner" element= {<Banner/>}> </Route>
            <Route exact path="/admin/chat" element= {<Chat />}> </Route>
            <Route exact path="/admin/TestFirstPage" element= {<TestPortalMain />}> </Route> 
            <Route exact path="/admin/AddContent" element= {<AddContent />}> </Route>           
            <Route exact path="/admin/Categories" element= {<Categores />}> </Route>           
            <Route exact path="/admin/Subcategories" element= {<Subcategores />}> </Route>           
            <Route exact path="/admin/TeamMember" element= {<TeamMember />}> </Route>           
            <Route exact path="/admin/BLogs" element= {<AddBlog />}> </Route>           
            <Route exact path="/admin/EnrollStudent" element= {<EnrollStudent />}> </Route>           
    </Routes>
    </div>
  )
}

export default RouterMain