import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom'
import AddCustomer from './AddCustomer'
import Loading from '../../components/Loading/Loading'

import {
  TableBody, TableCell, TableHead, TableRow
  , Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Select,
  Table, Avatar, Button, ButtonGroup, Fab, Grid
} from "@material-ui/core";
import { getCustomers } from "../../Services/Customers";
import { deletecustomer } from "Services/Customers";
import CustomerTable from "components/UserTable";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(styles);

export default function Customers() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [type, setType] = React.useState(false)
  React.useEffect(() => {
    (async () => {
      getCustomers().then(res => {
        console.log(res)
        setData(res)
        setLoading(false)
        console.log(res)
      }).catch(e => {
        if (!e.response) setMsg("Network Error")
        else setMsg(e.response.data.detail)
        setType("error")
        setErr(true)
      })
    })()
  }, [])

  const classes = useStyles();
  const history = useHistory()

  const [openDelete, setOpenDelete] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  const handleDelete = (id) => {
    setSelected(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeletePress = () => {
    console.log(selected)
    setLoading(true)
    deletecustomer(selected).then(res => {
      setOpenDelete(false);
      setType("success")
      setMsg("The Customer was deleted Successfully!")
      setErr(true)
      setLoading(false)
    }).catch(e => {
      if (!e.response) setMsg("Network Error")
      else setMsg(e.response.data.detail)
      setType("error")
      setErr(true)
    })
  };



  if (loading) return <Loading open={loading} />

  return (
    <GridContainer>
      <Snackbar open={err} autoHideDuration={2000} onClose={() => {
        setErr(false)
        window.location.reload()
      }} >
        <Alert severity={type}>
          {errorMsg || "Nothing Here"}
        </Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>

        <Card>
          <CardHeader color="primary">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={10} >
                <h4 className={classes.cardTitleWhite}>Getx Customers</h4>
                <p className={classes.cardCategoryWhite}>
                  Below, you can delete, and list the registered Customers.
                </p>
              </Grid>
              <Grid item xs={12} sm={12} md={2} >

                <Fab onClick={handleOpen} style={{ alignSelf: "flex-end" }}>
                  <AddIcon />
                </Fab>

              </Grid>
            </Grid>
          </CardHeader>
          <CardBody>
            <CustomerTable data={data} handleDelete={handleDelete} />
          </CardBody>
        </Card>
      </GridItem>
      <AddCustomer open={open} handleClose={handleClose} />

      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By Agreeing, you will delete the selected Customer!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeletePress()} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
