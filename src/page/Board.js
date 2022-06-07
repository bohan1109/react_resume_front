import * as React from "react";
import { useState, useEffect } from "react";
import axios from "../axios.config";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Bar from "../component/Navbar";
import Message from "../component/Message";
import { IconButton, Link } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Edit from "../component/EditBtn";
import Delete from "../component/DeleteBtn";
import Select from "../component/SelectInput";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "../component/Pagination";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

export default function AutoGridNoWrap() {
  const [message, setMessage] = useState([{}]);
  const [a, setA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    axios.get("api/message").then((response) => {
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
      setLoading(true);
      setMessage(response.data.message);
    });
  }, [a]);
  const listItems = message
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((content, index) => (
      <StyledPaper
        key={index}
        sx={{
          maxWidth: "1050px",
          my: 1,
          mx: "auto",
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2} sx={{ alignItems: "center" }}>
          <Grid item>
            <Avatar>{content.firstName}</Avatar>
          </Grid>
          <Grid item xs={2} zeroMinWidth>
            <Typography noWrap>{content.name}</Typography>
          </Grid>
          <Grid item xs={6} zeroMinWidth>
            <Typography>{content.content}</Typography>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography component={"span"}>
              {content.owner === localStorage.getItem("account") &&
              localStorage.getItem("account") !== "guest" ? (
                <Edit
                  id={content.id}
                  content={content.content}
                  setA={setA}
                  a={a}
                />
              ) : (
                ""
              )}
            </Typography>
          </Grid>
          <Grid item xs={1} zeroMinWidth>
            <Typography component={"span"}>
              {content.owner === localStorage.getItem("account") &&
              localStorage.getItem("account") !== "guest" ? (
                <Delete id={content.id} setA={setA} a={a} />
              ) : (
                ""
              )}
            </Typography>
          </Grid>
          <Grid item xs={2} zeroMinWidth>
            <Typography>{content.createdAt}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    ));

  return (
    <div>
      <Bar setA={setA} a={a} />
      <Box sx={{ marginTop: "5vh", paddingLeft: "4vw" }}>
        <Link href="/">
          <IconButton>
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
        </Link>
      </Box>

      {!loading ? (
        <CircularProgress sx={{ marginLeft: "50%", marginTop: "10%" }} />
      ) : (
        <div>
          <Select
            setPage={setPage}
            setMessage={setMessage}
            setA={setA}
            setLoading={setLoading}
            a={a}
          />
          {listItems}
          <Message setA={setA} a={a} />
          <Pagination
            message={message}
            setPage={setPage}
            page={page}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      )}
    </div>
  );
}
