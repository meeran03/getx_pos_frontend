import React from 'react'
import { getComplains } from '../../Services/Complains'

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom'
import {
  TableBody, TableCell, TableHead, TableRow, Table, Avatar, Button,
  ButtonGroup, Fab, Grid, Modal, Typography, CardContent,
  Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@material-ui/core";

import ComplainsTable from '../../components/Complains/ComplainsTable'
import Loading from '../../components/Loading/Loading'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(styles);


function Purchases() {
  const [data, setData] = React.useState({
    count: 0,
    results: [],
    next: null,
    previous: null
  })
  const [loading, setLoading] = React.useState(true)
  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [page, setPage] = React.useState(1)

  const getData = () => {
    getComplains(page).then(res => {
      console.log(res)
      setData(res)
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      if (!e.response) setMsg("Network Error")
      else setMsg(e.response.data.detail)
      setErr(true)
    })
  }

  React.useEffect(() => {
    getData();
  }, [])



  const classes = useStyles();
  const history = useHistory()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    // deleteProduct(id).then(res => {
    //   setOpen(false);
    // })x
  };


  if (loading) {
    return <Loading open={Loading} />
  }
  return (
    <GridContainer>
      <Snackbar open={err} autoHideDuration={2000} onClose={() => {
        setErr(false)
        window.location.reload()
      }} >
        <Alert severity={"error"}>
          {errorMsg || "Nothing Here"}
        </Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>

        <Card>
          <CardHeader color="primary">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={10} >
                <h4 className={classes.cardTitleWhite}>Complains</h4>
                <p className={classes.cardCategoryWhite}>
                  Below, you can see the recent customer Complains.
                </p>
              </Grid>
              <Grid item xs={12} sm={12} md={2} >


              </Grid>

            </Grid>
          </CardHeader>
          <CardBody>

            <ComplainsTable getData={getData} setLoading={setLoading} setMsg={setMsg} setErr={setErr} data={data} />
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  )
}

export default Purchases



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
