import Home from "../Components/Pages/Home Page/Home";
import Pets from "../Components/Pets/Pets";
import Profile from "../Components/Pages/Profile/Profile";
import Search from "../Components/Pages/Search/Search"
import { SearchIcon } from "@chakra-ui/icons";
import { FaHome, FaUser, FaCoffee } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import HomeLoggedIn from "../Components/Pages/Home Page/HomeLoggedIn";
import Dashboard from "../Components/Pages/Admin Dashboard/dashboard";

const routes = [
  {
    path: "/",
    component: <Home />,
    label: "Home",
    protected: false,
    icon: <FaHome />,
  },

  {
    path: "/search",
    component: <Search />,
    label: "Search",
    protected: false,
    icon: <SearchIcon />,
  },
  {
    path: "/search",
    component: <Search />,
    label: "Search",
    protected: true,
    icon: <SearchIcon />,
  },
  {
    path: "/",
    component: <HomeLoggedIn />,
    label: "Home",
    protected: true,
    icon: <FaHome />,
  },
  {
    path: "/admin",
    component: <Dashboard />,
    label: "Admin Dashboard",
    protected: true,
    admin: true,
    icon: <FaCoffee />,
  },
  {
    path: "/profile",
    component: <Profile />,
    label: "Profile",
    protected: true,
    icon: <FaUser />,
  },
  {
    path: "/pets",
    component: <Pets />,
    label: "Pets",
    protected: true,
    icon: <MdPets />,
  },
];

export default routes;
