import { Restaurant } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useStateValue } from "../StateProvider";
import CreateIcon from "@mui/icons-material/Create";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EggIcon from "@mui/icons-material/Egg";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { initialState } from "../reducer";

const NavBar = () => {
  const navigate = useNavigate();
  const [{ token }, dispatch] = useStateValue();

  const menuItems = [
    {
      listIcon: <CreateIcon style={{ color: "white", margin: "2px" }} />,
      listText: "Register",
      to: "/signup",
      display: !token,
    },
    {
      listIcon: <VpnKeyIcon style={{ color: "white" }} />,
      listText: "Login",
      to: "/login",
      display: !token,
    },    
  ];

  const options = [
    {
      listIcon: <EggIcon style={{ color: "white" }} />,
      listText: "Ingredient Search",
      to: "/recipeByIngredient",
      display: token,
    },
    {
      listIcon: <MonitorWeightIcon style={{ color: "white" }} />,
      listText: "Diet Plan",
      to: "/dietPlan",
      display: token,
    },
    {
      listIcon: <BookIcon style={{ color: "white" }} />,
      listText: "History",
      to: "/history",
      display: token,
    },
  ]

  return (
    <div>
      <AppBar position="sticky" style={{ background: "#022950" }}>
        <Toolbar>
          <div style={{flexGrow: 1, width:'25%', display: "flex", alignItems: "center"}}>
            <Button style={{textTransform: "capitalize"}} onClick={() => navigate("/")}>
            <IconButton>
              <Restaurant fontSize="large" style={{ color: "white" }} />
            </IconButton> </Button>
            
            <Typography
              style={{
                color: "white",
                cursor:"pointer"                
              }}
              
              onClick={() => navigate("/")}
              variant="h5"
            >
            The CookBook
            </Typography>

            {options.map(
              (listItem, key) =>
                listItem.display && (
                  <ListItem
                    button
                    key={key}
                    onClick={() => {
                      navigate(listItem.to);
                      window.scrollTo(0, 0);
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "auto",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ListItemIcon sx={{ minWidth: "23px" }}>
                        {listItem.listIcon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <span>
                            <b>{listItem.listText}</b>
                          </span>
                        }
                      ></ListItemText>
                    </div>
                  </ListItem>
                )
            )}       
          </div>
           
          {menuItems.map(
            (listItem, key) =>
              listItem.display && (
                <ListItem
                  button
                  key={key}
                  onClick={() => {
                    navigate(listItem.to);
                    window.scrollTo(0, 0);
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "auto",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ListItemIcon sx={{ minWidth: "23px" }}>
                      {listItem.listIcon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span>
                          <b>{listItem.listText}</b>
                        </span>
                      }
                    ></ListItemText>
                  </div>
                </ListItem>
              )
          )}
          {token && (
            <ListItem
              style={{ width: "min-content" }}
              button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                dispatch({ type: "SET_TOKEN", token: null });
                dispatch({ type: "SET_CART", cart: {} });
                dispatch({ type: "SET_USER", user: initialState.user });
                navigate("/");
              }}
            >
              <ListItemIcon style={{ margin: "0 -20px" }}>
                <ExitToAppIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>
                <b>Logout</b>
              </ListItemText>
            </ListItem>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
