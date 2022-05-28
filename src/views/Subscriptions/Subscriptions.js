import React from 'react'
import {getSubscriptions} from '../../Services/Subscriptions'

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from 'react-router-dom'
import { TableBody, TableCell, TableHead, TableRow,Table,Avatar,Button,
  ButtonGroup,Fab,Grid,Modal, Typography, CardContent ,
  Dialog,DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@material-ui/core";
import Loading from '../../components/Loading/Loading'

import SubscriptionsTable from '../../components/Subscriptions/SubscriptionsTable'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(styles);


function Subscriptions() {
    const [data,setData] = React.useState()
    const [loading,setLoading] = React.useState(true)
    
    const [errorMsg,setMsg] = React.useState(false)
    const [err,setErr] = React.useState(false);
    const [startDate,setSDate] = React.useState(new Date())
    const [endDate,setEDate] = React.useState(new Date())

  React.useEffect(() => {
    getSubscriptions().then(res => {
      setData(res)
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      console.log(e)
      if (!e.response) {
        setMsg('Network Error')
      }
      else {
        setMsg(e.response.data.detail)
      }
      setErr(true)
    })

  }, [])

  const handleDateSearch = () => {
    if (startDate == null) {
      setMsg("Please select a Start Date")
      setErr(true)
      return;
    }
    if (endDate == null) {
      setMsg("Please select a End Date")
      setErr(true)
      return;
    }
    if (startDate>  endDate) {
      setMsg("Start Date can't be greater than END DATE")
      setErr(true)
      return;
    }
    setLoading(true)
    getSubscriptions(0,0,0,0,1,{
      start : startDate,
      end : endDate,
    }).then(res => {
        console.log(res)
        setData(res)
        setLoading(false)
    }).catch(e => {
        setLoading(false)
        console.log(e)
        if (!e.response) {
          setMsg('Network Error')
        }
        else {
          setMsg(e.response.data.detail)
        }
        setErr(true)
    })
  }



  const classes = useStyles();



        if (loading) {
            return <Loading open={loading} />
        }
        return (
          <GridContainer>
            <Snackbar open={err} autoHideDuration={2000} onClose={() => {
                setErr(false)
                window.location.reload()
              }} >
                <Alert  severity={"error"}>
                  {errorMsg ||"Nothing Here" }
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
    
    
                </Grid>
    
              </Grid>
              </CardHeader>
              <CardBody>
              <div style={styles.container} noValidate>
                <TextField
                  id="startdate"
                  label="From"
                  type="date"
                  defaultValue={moment(startDate).format('YYYY-MM-DD')}
                  value={moment(startDate).format('YYYY-MM-DD')}
                  onChange={e => setSDate(moment(e.target.value,'YYYY-MM-DD').toDate())}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{marginRight: '20px'}}
                />

                <TextField
                  id="enddate"
                  label="To"
                  type="date"
                  defaultValue={moment(endDate).format('YYYY-MM-DD')}
                  value={moment(endDate).format('YYYY-MM-DD')}
                  onChange={e => setEDate(moment(e.target.value,'YYYY-MM-DD').toDate())}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button onClick={handleDateSearch} variant="contained" color="secondary" >Search</Button>
              </div>
                <SubscriptionsTable data={data} />
              </CardBody>
            </Card>
          </GridItem>
          
        </GridContainer>
)}

export default Subscriptions



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
