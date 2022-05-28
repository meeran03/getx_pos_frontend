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


import { getProducts, deleteProduct, searchProducts } from '../../Services/Products'

import {
  TableBody, TableCell, TableHead, TableRow, Table, Avatar, Button,
  ButtonGroup, Fab, Grid, Modal, Typography, CardContent,
  Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@material-ui/core";
import ProductTable from "components/Products/ProductTable";
import Loading from '../../components/Loading/Loading'
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(styles);

export default function Products() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)

  const fetchData = (search, url) => {
    getProducts(search, url).then(res => {
      if (url != null) {
        setData(prev => ({
          ...res,
          results: prev.results.concat(res.results)
        }))
      }
      else {
        setData(res)
      }
      setLoading(false)
      console.log(res)
    })
  }

  const searchData = (search) => {
    searchProducts(search).then(res => {
      setData(prev => (
        prev.concat(res)
      ))
    })
  }


  React.useEffect(() => {
    fetchData();
  }, [])



  const classes = useStyles();
  const history = useHistory()

  const [selected, setselected] = React.useState([])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setselected(id)
    setOpen(true);
  };

  const handleDelete = () => {
    deleteProduct(selected).then(res => {
      setOpen(false);
      setMsg("Product Deleted Successfully")
      setLoading(false)
      setErr(true)
    }).catch(e => {
      setLoading(false)
      if (!e.response) setMsg("Network Error")
      else setMsg(e.response.data.detail)
      setErr(true)
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <Loading open={loading} />



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
                <h4 className={classes.cardTitleWhite}>Products</h4>
                <p className={classes.cardCategoryWhite}>
                  Below, you can delete,add and list the products.
                </p>
              </Grid>
              <Grid item xs={12} sm={12} md={2} >

                <Fab onClick={() => history.push('/admin/products/add')}>
                  <AddIcon />
                </Fab>

              </Grid>

            </Grid>
          </CardHeader>
          <CardBody>
            <ProductTable fetchData={searchData} handleClickOpen={handleClickOpen} setLoading={setLoading} setMsg={setMsg} setErr={setErr} data={data} />
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By Agreeing, you will delete the selected Product!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete()} color="primary" autoFocus>
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
