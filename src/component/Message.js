import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "../axios.config";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

export default function AutoGridNoWrap(props) {
  const [message, setMessage] = React.useState("");

  const onChangeMessage = (e) => {
    const message = e.target.value;
    setMessage(message);
  };
  const handleSend = async (event) => {
    event.preventDefault();
    if (!message) {
      
    } else {
      if (localStorage.getItem("account") === null) {
        await axios
          .post("api/login", {
            account: process.env.GUEST_ACCOUNT,
            password: process.env.GUEST_PASSWORD,
          })
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem("loginToken", token);
            localStorage.setItem("account", response.data.account);
            props.setA(!props.a);
          }).then(async () =>{
            await axios
            .post(
              "api/message",
              {
                content: message,
              },
              { headers: { token: localStorage.getItem("loginToken") } }
            )
            .then((response) => {              
              props.setA(!props.a);
              setMessage("");
            })
            .catch((error) => {
              console.log(error);
            });
          })
          .catch((error) => {
              console.log(error);
          });
      }else{
        await axios
        .post(
          "api/message",
          {
            content: message,
          },
          { headers: { token: localStorage.getItem("loginToken") } }
        )
        .then((response) => {
          props.setA(!props.a);
          setMessage("");
        })
        .catch((error) => {
          alert("登入逾時請重新登入")
          localStorage.removeItem("loginToken")
          localStorage.removeItem("account")
          window.location.reload()
        });
      }
      
    }
  };

  return (
    <StyledPaper
      sx={{
        maxWidth: "1050px",
        my: 1,
        mx: "auto",
        p: 2,
      }}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>{localStorage.getItem("account") === "guest" || localStorage.getItem("account")===null?"g":localStorage.getItem("account").slice(0,1)}</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth>
          <TextField
            size="small"
            sx={{ maxWidth: "880px", width: "100%" }}
            id="outlined-required2"
            label={localStorage.getItem("account") === "guest" || localStorage.getItem("account")===null?"請輸入留言(目前為訪客身分)":"請輸入留言"}
            value={message}
            onChange={onChangeMessage}
          />
        </Grid>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          sx={{
            maxHeight: "30px",
            margin: "22px auto",
            border: 1,
          }}
        >
          傳送
        </Button>
      </Grid>
    </StyledPaper>
  );
}
