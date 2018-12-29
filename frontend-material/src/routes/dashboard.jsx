// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AccountBox from "@material-ui/icons/AccountBox";
import BubbleChart from "@material-ui/icons/BubbleChart";
import AccessTime from "@material-ui/icons/AccessTime";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import List from "@material-ui/icons/List";

// core components/views
import LandingPage from "views/LandingPage/LandingPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import ShopList from "views/ShopList/ShopList.jsx";
import TimeList from "views/TimeList/TimeList.jsx";
// admin views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import ShopModify from "views/ShopModify/ShopModify.jsx";
import TimeModify from "views/TimeModify/TimeModify.jsx";
import UserModify from "views/UserModify/UserModify.jsx";

const dashboardRoutes = [
  {
    path: "/landing",
    sidebarName: "Landing",
    navbarName: "Landing Page",
    icon: BubbleChart,
    component: LandingPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/shop",
    sidebarName: "Storefront",
    navbarName: "Storefront",
    icon: ShoppingCart,
    component: ShopList
  },
  {
    path: "/time",
    sidebarName: "Volunteer Time",
    navbarName: "Volunteer Time",
    icon: AccessTime,
    component: TimeList
  },
  // Admin Features
    {
    path: "/dashboard",
    sidebarName: "Reporting",
    navbarName: "Reports Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/modifyShop",
    sidebarName: "Modify Shop",
    navbarName: "Modify Shop",
    icon: List,
    component: ShopModify
  },
  {
    path: "/modifyTime",
    sidebarName: "Modify Time",
    navbarName: "Modify Time",
    icon: List,
    component: TimeModify
  },
  {
    path: "/modifyUser",
    sidebarName: "Edit Users",
    navbarName: "Edit Users",
    icon: AccountBox,
    component: UserModify
  },
  { redirect: true, path: "/", to: "/landing", navbarName: "Redirect" }
];

export default dashboardRoutes;
