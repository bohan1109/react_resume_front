import * as React from "react";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "../axios.config";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await axios
      .delete("api/message",{
        data:{id:props.id},
        headers: {token : localStorage.getItem('loginToken')}
      }
      ).then((response) => {
        props.setA(!props.a)
        setOpen(false);
      }).catch((error) => {
      alert("登入逾時請重新登入")
      localStorage.removeItem("loginToken")
      localStorage.removeItem("account")
      window.location.reload()
    })
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>刪除留言</DialogTitle>
        <DialogContent sx={{ height: "60px", width: "240px" }}>
          <DialogContentText component={'span'}>
            <Typography fontWeight="700" variant="h6">
              是否刪除留言?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>否</Button>
          <Button onClick={handleDelete}>是</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
