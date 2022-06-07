import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../axios.config";
import Typography from "@mui/material/Typography";
import DialogContentText from '@mui/material/DialogContentText';


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [name, setName] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const [account, setAccount] = React.useState(props.account);
  const [email, setEmail] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleClickOpen = async () => {
    await axios.get("api/user", {
      headers: { token: localStorage.getItem("loginToken") },
    }).then((response) => {
      setName(response.data.message.name)
      setEmail(response.data.message.email)
      setNewEmail(response.data.message.email)
      setNewName(response.data.message.name)      
    }).catch((error) => {
      
      alert("登入逾時請重新登入")
      localStorage.removeItem("loginToken")
      localStorage.removeItem("account")
      setOpen(false)
      setOpen1(false)
      window.location.reload()
    });

    
    setOpen(true);
  };

  const handleClose = () => {
    if(newEmail === "" || newName === ""){
      setOpen2(true)
      setError("請勿輸入空值")
    }else if(newEmail===email&&newName===name) {
      setOpen(false);
    }else{
      setOpen1(true);
    }  
        
  };

  const handleCancel = () =>{
    setOpen(false);
    
  }

  const handleEditClose = () => {    
    setOpen1(false);
  }

  const handleEdit = async (event) => {
    event.preventDefault();
    await axios
    .put(
      "api/user",
      {
        name: newName,
        email: newEmail,
      },
      { headers: { token: localStorage.getItem("loginToken") } }
    ).then((response) => {
      setOpen(false)
      setOpen1(false)
      props.setA(!props.a)
    }).catch((error) =>{
      console.log()
      if(error.response.data.message ==="信箱格式錯誤"){
        setError(error.response.data.message)
        setOpen2(true);
      }else{
        alert("登入逾時請重新登入")
        localStorage.removeItem("loginToken")
        localStorage.removeItem("account")
        setOpen(false)
        setOpen1(false)
        window.location.reload()
      }
      
      
    })
  }
  const handleCloseError = () => {
    setOpen2(false)
    setOpen1(false)
    setNewEmail(email)
    setNewName(name)
  }

  const onChangeName = (e) => {
    setNewName(e.target.value)

  };

  const onChangeEmail = (e) => {
    setNewEmail(e.target.value)
  };

  return (
    <div>
      <Button
        variant="text"
        sx={{ color: "#FFFFFF" }}
        style={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        個人資料
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>個人資料</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            disabled
            margin="dense"
            id="account"
            label="帳號"
            type="text"
            value={account}
            fullWidth
            variant="standard"
            onChange={onChangeName}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="姓名"
            type="text"
            value={newName}
            fullWidth
            variant="standard"
            onChange={onChangeName}
          />

          <TextField
            margin="dense"
            id="mail"
            label="信箱"
            type="text"
            value={newEmail}
            onChange={onChangeEmail}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleClose}>修改</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open1} onClose={handleClose}>
        <DialogTitle>修改</DialogTitle>
        <DialogContent>
        <DialogContentText component={'span'}>
            <Typography fontWeight="700" variant="h6">
              是否修改個人資料
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>否</Button>
          <Button onClick={handleEdit}>是</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose}>
        <DialogTitle>錯誤</DialogTitle>
        <DialogContent>
        <DialogContentText component={'span'}>
            <Typography fontWeight="700" variant="h6">
              {error}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError}>是</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
