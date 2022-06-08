import * as React from "react";
import axios from "../axios.config";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DialogContentText from '@mui/material/DialogContentText';
import Profile from './Profile'

const theme = createTheme({
  palette: {
    title: {
      main: "rgb(96 165 250)",
    },
  },
});

export default function MenuAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [login, setLogin] = React.useState(
    localStorage.getItem("loginToken") ? true : false
  );
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [againPassword, setAgainPassword] = React.useState("");
  const [value, setValue] = React.useState("1");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  const handleChange = (event,newValue) => {
    setValue(newValue);
    
    
  };

  const onChangeAccount = (e) => {
    const account = e.target.value;
    setAccount(account);
  };
  const onChangeName = (e) => {
    const Name = e.target.value;
    setName(Name);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeAgainPassword = (e) => {
    const againPassword = e.target.value;
    setAgainPassword(againPassword);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickLogout = () => {
    setOpen1(true);
    
  };
  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("account");
    props.setA(!props.a);
    setOpen1(false);
    setLogin(false);
  }

  const handleClose = () => {
    setOpen(false);
    setOpen1(false)

  };
  const handleOK = () => {
    setOpen2(false)
  }

  const handleGuest = async (event) => {
    event.preventDefault();
    await axios
      .post("api/login", {
        account: process.env.REACT_APP_GUEST_ACCOUNT,
        password: process.env.REACT_APP_GUEST_PASSWORD,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("loginToken", token);
        localStorage.setItem("account", response.data.account);
        props.setA(!props.a);
        //setLogin(true);
        setOpen(false);
      }).catch((error) => {
        console.log(error)
      });
  }
  
  const handleLogin = async (event) => {
    event.preventDefault();
    await axios
      .post("api/login", {
        account: account,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("loginToken", token);
        localStorage.setItem("account", response.data.account);
        props.setA(!props.a);
        if(localStorage.getItem("account")==="guest"){
          setLogin(false);
        }else{
          setLogin(true);
        }
        setAccount("");
        setPassword("")
        setOpen(false);
      }).catch((error) => {
        setLoginError(error.response.data.message)
        setOpen2(true)
      });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (
      account !== "" &&
      password !== "" &&
      name !== "" &&
      againPassword !== "" &&
      email !== ""
    ) {
      if (password === againPassword) {
        await axios
          .post("api/user", {
            name: name,
            account: account,
            password: password,
            email: email,
          })
          .then(async (response) => {
            await axios
              .post("api/login", {
                account: account,
                password: password,
              })
              .then((response) => {
                const token = response.data.token;
                localStorage.setItem("loginToken", token);
                localStorage.setItem("account", response.data.account);
                props.setA(!props.a);
                setLogin(true);
                setOpen(false);
                setName("")
                setAccount("")
                setPassword("")
                setEmail("")
                setAgainPassword("")
              })
              .catch((err) => {
                setLoginError(err.response.data.message)
                setOpen2(true)
              });
          }).catch((error) =>{
            setLoginError(error.response.data.message)
            setOpen2(true)
          });
      } else {
        setLoginError("兩次密碼不同")
        setOpen2(true)

      }
    } else {
      setLoginError("請填入完整資料")
        setOpen2(true)

    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="title">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#FFFFFF" }}
            >
              我的履歷
            </Typography>
            {localStorage.getItem("account")&&localStorage.getItem("account")!=="guest"?<Profile setA={props.setA} a={props.a} account={localStorage.getItem("account")} />:""}
            
            <Typography color="white" variant="body2">
              
              <Button
                variant="text"
                sx={{ color: "#FFFFFF" }}
                href="/board"
                style={{ textTransform: "none" }}
              >
                留言板
              </Button>
            </Typography>
            
            <Typography color="white" variant="body2">
              {login ? (
                <Button
                  variant="text"
                  sx={{ color: "#FFFFFF" }}
                  onClick={handleClickLogout}
                  style={{ textTransform: "none" }}
                >
                  登出
                </Button>
              ) : (
                <Button
                  variant="text"
                  sx={{ color: "#FFFFFF" }}
                  onClick={handleClickOpen}
                  style={{ textTransform: "none" }}
                >
                  登入
                </Button>
              )}
            </Typography>
            <Dialog open={open} onClose={handleClose}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="登入" value="1" />
                      <Tab label="註冊" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" sx={{ height: "420px", width: "420px" }}>
                    <DialogTitle>帳號登入</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="account"
                        label="帳號"
                        type="text"
                        value={account}
                        fullWidth
                        variant="standard"
                        onChange={onChangeAccount}
                      />
                      <TextField
                        margin="dense"
                        id="password"
                        label="密碼"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <Button variant="text" onClick={handleGuest}>訪客登入</Button>
                    <DialogActions>                      
                      <Button onClick={handleClose}>取消</Button>
                      <Button onClick={handleLogin}>登入</Button>
                    </DialogActions>
                  </TabPanel>
                  <TabPanel value="2" sx={{ height: "420px", width: "420px" }}>
                    <DialogTitle>註冊帳號</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="姓名"
                        type="text"
                        value={name}
                        fullWidth
                        variant="standard"
                        onChange={onChangeName}
                      />
                      <TextField
                        margin="dense"
                        id="account"
                        label="帳號"
                        type="text"
                        value={account}
                        fullWidth
                        variant="standard"
                        onChange={onChangeAccount}
                      />
                      <TextField
                        margin="dense"
                        id="password"
                        label="密碼"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="againPassword"
                        label="再次輸入密碼"
                        type="Password"
                        value={againPassword}
                        onChange={onChangeAgainPassword}
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="email"
                        label="信箱"
                        type="text"
                        value={email}
                        onChange={onChangeEmail}
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>取消</Button>
                      <Button onClick={handleRegister}>註冊</Button>
                    </DialogActions>
                  </TabPanel>
                </TabContext>
              </Box>
            </Dialog>
            <Dialog open={open1} onClose={handleClose}>
              <Box sx={{ height: "180px", width: "300px", typography: "body1" }}>
              <DialogTitle>登出</DialogTitle>
                    <DialogContent>
                    <DialogContentText component={'span'}>
            <Typography fontWeight="700" variant="h6">
              是否登出
            </Typography>
          </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>                      
                      <Button onClick={handleClose}>取消</Button>
                      <Button onClick={handleLogout}>登出</Button>
                    </DialogActions>
              </Box>
            </Dialog>
            <Dialog open={open2} onClose={handleClose}>
              <Box sx={{ height: "180px", width: "300px", typography: "body1" }}>
              <DialogTitle>登入錯誤</DialogTitle>
                    <DialogContent>
                    <DialogContentText component={'span'}>
            <Typography fontWeight="700" variant="h6">
              {loginError}
            </Typography>
          </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>                      
                      <Button onClick={handleOK}>確定</Button>
                    </DialogActions>
              </Box>
            </Dialog>

          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
