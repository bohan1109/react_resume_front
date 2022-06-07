import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "../axios.config";
import Menu from './SelectMenu'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

export default function AutoGridNoWrap(props) {
  const [select, setSelect] = React.useState("");
  const [value, setValue] = React.useState("");

  const onChangeSelect = (e) => {
    const select = e.target.value;
    setSelect(select);
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };


  const handleSend = async (event) => {
    //event.preventDefault();
    setValue(value);
      await axios
            .get('api/message',{params:{
              select: select,
              value: value,
            }}).then((response) => {
              for (let i = 0; i < response.data.message.length; i++) {
                const time = response.data.message[i].createdAt;
                const time1 = new Date(time).toLocaleString(
                  "en-ZA",
                  {
                    timeZone: "Asia/Taipei",
                  }
                );
                const time2 = time1.replace(',',"")
                response.data.message[i].createdAt = time2;
                const firstName = response.data.message[i].name.slice(0, 1);
                response.data.message[i].firstName = firstName;
              }
              props.setMessage(response.data.message)
              props.setPage(0)
              
            }).catch((error) => {
            })
    
    
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
          <Menu setValue={setValue}/>
        </Grid>
        <Grid item xs zeroMinWidth>
          <TextField
            size="small"
            sx={{ maxWidth: "880px", width: "100%" }}
            id="outlined-required"
            label={value==="name"?"搜尋使用者":value==="content"?"搜尋留言":"搜尋"}
            value={select}
            onChange={onChangeSelect}
            onKeyDown={onKeyDownHandler}
          />
        </Grid>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          sx={{

            maxHeight: "35px",
            margin: "18px 16px 14px 16px",
            border: 1,
          }}
        >
          搜尋
        </Button>
      </Grid>
    </StyledPaper>
  );
}
