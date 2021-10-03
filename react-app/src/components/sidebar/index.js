import { Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import Logout from "pages/logout";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "./styles.css";

const MENU = [
  {
    text: "Home",
    icon: HomeIcon,
    to: "home",
  },
  {
    text: "Perfil",
    icon: PermIdentityIcon,
    to: "profile",
  },
  {
    text: "Chat",
    icon: MailOutlineIcon,
    to: "chat",
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {MENU.map((item) => (
        <SidebarLink key={item.to} {...item} />
      ))}
      <Logout />
    </aside>
  );
};

const SidebarLink = ({ to, text, icon: Icon }) => {
  return (
    <Link to={to}>
      <ListItem>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </ListItem>
    </Link>
  );
};

export default Sidebar;
