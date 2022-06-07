import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function TablePaginationDemo(props) {


  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

//   const list = props.message.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
//   console.log(list);
//   props.setMessage(list)

//   props.message  = props.message.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
//   props.setMessage(props.message)


  return (
    <TablePagination
      component="div"
      count={props.message.length}
      page={props.page}
      onPageChange={handleChangePage}
      rowsPerPage={props.rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        maxWidth: "1050px",
        my: 1,
        mx: "auto",
        p: 2,
      }}
    />
  );
}
