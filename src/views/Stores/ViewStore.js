import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStore, getStoreAreas, getStoreCustomers, getStorePurchaseHistory } from '../../Services/Stores'
import MapComponent from '../../components/Map/MapComponent'
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Loading from '../../components/Loading/Loading'
import Store from "@material-ui/icons/Store";

// Here we use Material Ui Components
import {
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography, List, ListItem, ListItemAvatar, IconButton, ListItemText,
  Avatar
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Mail'
import { Phone, House, Accessibility, Warning, RoomService } from '@material-ui/icons'
import {
  TableCell, TableHead, TableRow, Table, TableBody
} from "@material-ui/core";
import CardHeader from 'components/Card/CardHeader'
import CardIcon from 'components/Card/CardIcon'
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { Modal } from '@material-ui/core';
import PurchasesTable from 'components/Purchases/PurchasesTable';
import CustomerTable from 'components/UserTable/index';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(styles);


function ViewStore(props) {
  const classes = useStyles();
  let { id } = useParams('id')
  let { item } = props.location
  let [data, setData] = React.useState(null)
  let [storeAreas, setStoreAreas] = React.useState(null)
  let [storeCustomers, setStoreCustomers] = React.useState(null)
  let [loading, setLoading] = React.useState(true)
  let [open, setOpen] = React.useState(false)
  let [orderModal, setPurchaseModal] = React.useState(false)
  let [type, setType] = React.useState('Today')
  let [orders, setPurchases] = React.useState(null)
  let [earned, setEarned] = React.useState(100)

  const calculateEarned = (res) => {
    let price = 0;
    let arr = res && res.filter(item => item.status == "DELIVERED")
    for (var i in arr) {
      price += arr[i].price
    }
    setEarned(price)
  }



  React.useEffect(() => {
    getStore(id).then(res => {
      setData(res)
    })
    getStoreAreas(id).then(res => {
      setStoreAreas(res)
      let subareas = ""
      for (let i in res) {
        subareas += res[i].sub_area + ","
      }
      subareas = subareas.slice(0, -1)
      getStoreCustomers(subareas).then(res => {
        setStoreCustomers(res)
      })
      getStorePurchaseHistory(id, 1).then(res => {
        console.log("Store Purchases are ", res)
        setPurchases(res)
        calculateEarned(res);
        setLoading(false)
      })
    })
  }, [])

  const [startDate, setSDate] = React.useState(new Date())
  const [endDate, setEDate] = React.useState(new Date())
  const handleDateSearch = () => {
    if (startDate == null) {
      alert("Please select a Start Date")
      return;
    }
    if (endDate == null) {
      alert("Please select a End Date")
      return;
    }
    if (startDate > endDate) {
      alert("Start Date can't be greater than END DATE")
      return;
    }
    setLoading(true)
    getStorePurchaseHistory(id, 0, 1, {
      start: startDate,
      end: endDate,
    }).then(res => {
      console.log(res)
      setPurchases(res)
      calculateEarned(res)
      setType(`${moment(startDate).format('DD/MM/YY')}-${moment(endDate).format('DD/MM/YY')}`)
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      console.log(e)
      if (!e.response) {
        alert('Network Error')
      }
      else {
        alert(e.response.data.detail)
      }
      // setErr(true)
    })
  }


  if (loading || (data == null)) return <Loading open={loading} />
  return (
    <Grid container>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={12} md={10}>
          <Card elevation={3} style={{ marginTop: '20px' }}>
            <CardContent >
              <Typography color="textSecondary" gutterBottom>
                Store Customers
              </Typography>
              <CustomerTable data={storeCustomers} />
            </CardContent>
          </Card>
        </Grid>
      </Modal>

      <Grid container item xs={12} sm={12} md={12}>
        <Grid item xs={12} sm={12} md={7}>
          <Card >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Store Information
              </Typography>
              <List dense={true}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Username"
                  />
                  <Typography>
                    {data.user.username}
                  </Typography>
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Store Owner"
                  />
                  <Typography>
                    {data.owner_name}
                  </Typography>
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email"
                  />
                  <Typography>
                    {data.user.email}
                  </Typography>
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Phone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Phone"
                  />
                  <Typography>
                    {data.user.phone}
                  </Typography>
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <House />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Address"
                  />
                  <Typography>
                    {data.user.address}
                  </Typography>
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Push Token"
                  />
                  <Typography>
                    {data.user.push_token}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={5} style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} >


          <Avatar
            src={data.user.image}
            variant="square"
            style={{ width: '80%', resizeMode: 'contain', height: "auto" }} />

        </Grid>

      </Grid>


      <GridContainer xs={12} sm={12} md={12}>

        <GridItem xs={12} sm={6} md={4}>
          <Card style={{ marginTop: '20px', marginBottom: '20px' }} >
            <CardHeader color="info" stats icon>
              <CardIcon color="info" onClick={() => setOpen(true)} >
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Customers</p>
              <h3 className={classes.cardTitle}>{storeCustomers && storeCustomers.length}</h3>
            </CardHeader>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>{type} Earning</p>
              <h3 className={classes.cardTitle}>Rs.{earned}</h3>
            </CardHeader>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
            <CardHeader
              onClick={() => setPurchaseModal(true)}
              color="warning" stats icon  >
              <CardIcon color="warning">
                <RoomService />
              </CardIcon>
              <p className={classes.cardCategory}>{type} Purchases</p>
              <h3 className={classes.cardTitle}>{orders && orders.length}</h3>
            </CardHeader>
          </Card>
        </GridItem>

      </GridContainer>

      <br />
      <br />
      <Grid item xs={12} sm={12} md={12} >
        <Card elevation={3} style={{ marginTop: '20px' }}>
          <CardContent >
            <Typography color="textSecondary" gutterBottom>
              Store Purchases
            </Typography>

            <div style={styles2.container} noValidate>
              <TextField
                id="startdate"
                label="From"
                type="date"
                defaultValue={moment(startDate).format('YYYY-MM-DD')}
                value={moment(startDate).format('YYYY-MM-DD')}
                onChange={e => setSDate(moment(e.target.value, 'YYYY-MM-DD').toDate())}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginRight: '20px' }}
              />

              <TextField
                id="enddate"
                label="To"
                type="date"
                defaultValue={moment(endDate).format('YYYY-MM-DD')}
                value={moment(endDate).format('YYYY-MM-DD')}
                onChange={e => setEDate(moment(e.target.value, 'YYYY-MM-DD').toDate())}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button onClick={handleDateSearch} variant="contained" color="secondary" >Search</Button>
            </div>
            <PurchasesTable data={orders} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Card elevation={3} style={{ marginTop: '20px' }}>
          <CardContent >
            <Typography color="textSecondary" gutterBottom>
              Assigned Store Areas
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Store Area</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Delivery Boy</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {storeAreas?.map((item, index) => {
                  let link = item.delivery_boy_detail && `/admin/deliveryboys/${item.delivery_boy_detail.id}`
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.subarea_detail.name}, {item.subarea_detail.area_detail.name}</TableCell>
                      <TableCell>{item.subarea_detail.area_detail.area_detail.name}</TableCell>
                      <TableCell><Link to={link} >{item.delivery_boy_detail && item.delivery_boy_detail.user.username}</Link></TableCell>
                      <TableCell>
                        <Avatar alt="Remy Sharp" src={item.delivery_boy_detail && item.delivery_boy_detail.user.image} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>



      <Grid item xs={12} sm={12} md={12}>
        <Card elevation={3} style={{ marginTop: '20px', height: '70vh' }}>
          <CardContent >
            <MapComponent latitude={data.user.latitude} longitude={data.user.longitude} />
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default ViewStore



const styles2 = {
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
  },
  container: {
    paddingVertical: '20px',
    justifyContent: "space-around",
    alignItems: "center"
  }
};