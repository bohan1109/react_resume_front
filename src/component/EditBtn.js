import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "../axios.config";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [message, setMessage] = React.useState(props.content);
  const [error, setError] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };
  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessage(message);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if(message === ""){
      setOpen1(true)
    }else{
      await axios
      .put(
        "api/message",
        {
          id: props.id,
          content: message,
        },
        { headers: { token: localStorage.getItem("loginToken") } }
      )
      .then((response) => {
        props.setA(!props.a);
        setOpen(false);
      })
      .catch((error) => {
        alert("登入逾時請重新登入")
      localStorage.removeItem("loginToken")
      localStorage.removeItem("account")
      window.location.reload()
      });
    }
    
  };

  const handleClose = () => {
    setOpen(false);
    setMessage(props.content);
  };

  const handleCloseError =() => {
    setOpen1(false)
  }



  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <ModeEditOutlineIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>修改留言</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="message"
            fullWidth
            variant="standard"
            value={message}
            onChange={onChangeMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleEdit}>修改</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open1} onClose={handleCloseError}>
        <DialogTitle>修改留言</DialogTitle>
        <DialogContent>
        <Typography fontWeight="700" variant="h6">
              內容請勿為空
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError}>確定</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
