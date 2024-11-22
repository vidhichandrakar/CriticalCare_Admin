import img from "../Media/Images/banner2.jpg";
import CollectionsIcon from "@mui/icons-material/Collections";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import EastIcon from "@mui/icons-material/East";
import cardimg from "../Media/Images/db7187e8-b7cf-47ed-8900-6de89dabde06.png";

export const AnalyticsSmallData = [
  {
    Heading: "Buy Now Clicks",
    numbers: "5",
    Days: "on last 7 days",
  },
  {
    href: "/admin/Transaction",
    Heading: "Transactions",
    numbers: "2",
    Days: "on last 7 days",
  },
  {
    Heading: "Total Revenue (INR)",
    numbers: "1000",
    Days: "on last 7 days",
  },
  {
    Heading: "Average Order Value",
    numbers: "1000",
    Days: "on last 7 days",
  },
];

export const BannerData = [
  {
    id: 1,
    Head: "Image",
    img: img,
    title: "Select screen to open on tapping banner",
    boxtitle: "None (no action on tapping banner)",
  },
  {
    id: 2,
    Head: "Image",
    img: img,
    title: "Select screen to open on tapping banner",
    boxtitle: "Specific Course",
  },
  {
    id: 3,
    Head: "Image",
    img: img,
    title: "Select screen to open on tapping banner",
    boxtitle: "Zoom Class Link",
  },
  {
    id: 4,
    Head: "Image",
    img: img,
    title: "Select screen to open on tapping banner",
    boxtitle: "External Link (sheikhshoeb.com)",
  },
];

export const AdditionalData = [
  {
    href: "/admin/Banner",
    icon: <CollectionsIcon />,
    heading: "Banner",
  },
  {
    href: "/admin/CouponMain",
    icon: <LoyaltyIcon />,
    heading: "Coupons",
  },
  {
    href: "/admin/Trics1FreeMockTest",
    icon: <BookmarkAddedIcon />,
    heading: "Zoom",
  },
];

export const OfferData = [
  {
    href: "/admin/CreateCourses",
    icon: <CollectionsIcon />,
    head: "Course",
    title: "3 Published Course",
    button: "Create Course",
    arrow: <EastIcon />,
  },
  {
    href: "/admin/TestPortal",
    icon: <CollectionsIcon />,
    head: "Test Portal",
    title: "15 Tests Created",
    button: "Test Portal",
    arrow: <EastIcon />,
  },
  {
    href: "/admin/Transaction",
    icon: <CollectionsIcon />,
    head: "Total Transactions",
    title: "30000",
    button: "Total Transactions",
    arrow: <EastIcon />,
  },
  {
    icon: <CollectionsIcon />,
    head: "Total Revenue",
    title: "50000",
    button: "Total Revenue",
    arrow: <EastIcon />,
  },
];

export const TranscationCardData = [
  {
    Head: " Transactions ",
    number: "2",
  },
  {
    Head: " Transactions Amount",
    number: " ₹2",
  },
  {
    Head: " Avg Order Value ",
    number: "₹1",
  },
];

export const YourCoursesCardData = [
  {
    img: cardimg,
    head: "TRICS 1 FREE MOCK TEST FOR EDIC-1",
    Created: "Created by: Jitendra",
    Year: "1 Year",
    Price: " ₹1",
  },
  {
    img: cardimg,
    head: "TRICS 1 FREE MOCK TEST FOR EDIC-1",
    Created: "Created by: Jitendra",
    Year: "1 Year",
    Price: " ₹1",
  },
  {
    img: cardimg,
    head: "TRICS 1 FREE MOCK TEST FOR EDIC-1",
    Created: "Created by: Jitendra",
    Year: "1 Year",
    Price: " ₹1",
  },
  {
    img: cardimg,
    head: "TRICS 1 FREE MOCK TEST FOR EDIC-1",
    Created: "Created by: Jitendra",
    Year: "1 Year",
    Price: " ₹1",
  },
  {
    img: cardimg,
    head: "TRICS 1 FREE MOCK TEST FOR EDIC-1",
    Created: "Created by: Jitendra",
    Year: "1 Year",
    Price: " ₹1",
  },
];

export const columns = [
  {
    id: "User_Info",
    label: "User Info",
    align: "center",
  },
  {
    id: "user_name",
    label: "Full Name",
    align: "center",
  },
  {
    id: "updatedAt",
    label: "Date of registration",
    align: "center",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "center",
  },
];

export const teamColumns = [
  {
    id: "member_Name",
    label: "Member Name",
  },
  {
    id: "email_id",
    label: "Email ID",
    align: "center",
  },
  {
    id: "phone_no",
    label: "Phone No.",
    align: "center",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "center",
  },
];

export const testimonalColumns = [
  {
    id: "comment",
    label: "Comments",
  },
  {
    id: "author",
    label: "Author",
    align: "center",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "center",
  },
];
export const testPortalColumns = [
  {
    id: "test_name",
    label: "Test Name",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "center",
  },
];

export const CategoryPortalColumns = [
  {
    id: "category_name",
    label: "Categories",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "center",
  },
];

