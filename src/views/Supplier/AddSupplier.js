import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Card, TextField, InputLabel, makeStyles } from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Loading from '../../components/Loading/Loading'

import { registerSupplier } from '../../Services/Supplier';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AddSupplier(props) {
  const classes = useStyles();

  const [name, setName] = React.useState(null)
  const [phone, setPhone] = React.useState(null)
  const [address, setAddress] = React.useState(null)
  const [email, setEmail] = React.useState(null)

  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [type, setType] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = () => {
    if (name == null) {
      alert("Please enter a Supplier Name")
      return;
    }
    if (phone == null) {
      alert("Please enter a Supplier Phone Number")
      return;
    }
    if (email == null) {
      alert("Please enter a Supplier Email")
      return;
    }

    if (phone.length != 11) {
      alert("Please enter a valid Phone Number")
      return;
    }

    let data = {};
    data.phone = phone;
    data.name = name;
    data.email = email;
    data.address = address;
    setLoading(true)
    registerSupplier(data).then(() => {
      setLoading(false)
      setType("success")
      setMsg("Supplier was added Successfully")
      setErr(true)
    }).catch(e => {
      if (!e.response) setMsg("Network Error")
      else setMsg(e.response.data.detail)
      setType("error")
      setErr(true)
    })

  }


  return (
    <div>
      <Loading open={loading} />

      <Snackbar open={err} autoHideDuration={2000} onClose={() => {
        setErr(false)
        window.location.reload()
      }} >
        <Alert severity={type}>
          {errorMsg || "Nothing Here"}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="Add A New Supplier"
        aria-describedby="Fill in the Details"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>


          <GridContainer>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Suppliers</h4>
                <p className={classes.cardCategoryWhite}>Add A New Supplier</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Supplier Name</InputLabel>
                    <TextField
                      placeholder="Name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth={true}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Supplier Email</InputLabel>
                    <TextField
                      placeholder="Supplier Email"
                      id="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth={true}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer style={{ marginTop: '20px' }}>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Supplier Phone</InputLabel>
                    <TextField
                      placeholder="Phone"
                      id="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth={true}
                    >
                    </TextField>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Supplier Address</InputLabel>
                    <TextField
                      placeholder="address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth={true}
                    >
                    </TextField>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => handleSubmit()} >Add</Button>
              </CardFooter>
            </Card>

          </GridContainer>


        </Fade>
      </Modal>
    </div>
  );
}