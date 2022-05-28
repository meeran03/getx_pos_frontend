import React from 'react'
import {
  CardContent, TextField, InputLabel, Select, makeStyles, MenuItem, FormControl
} from '@material-ui/core'
import Card from "components/Card/Card.js";
import CardHeader from 'components/Card/CardHeader'// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { Avatar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { getSupplier } from 'Services/Supplier';
import { updateSupplier } from 'Services/Supplier';



function UpdateSupplier(props) {
  const [email, setEmail] = React.useState(null)
  const [phone, setPhone] = React.useState(null)
  const [address, setAddress] = React.useState(null)
  const [name, setName] = React.useState(null)

  const useStyles = makeStyles(styles)
  const classes = useStyles();

  let { id } = useParams('id')

  React.useEffect(() => {
    getSupplier(id).then(res => {
      console.log(res)
      console.log("I am executed", res)
      setEmail(res.email)
      setName(res.name)
      setAddress(res.address)
      setPhone(res.phone)
    })
  }, [])



  const handleSubmit = () => {
    let obj = { name, email, phone, address };
    updateSupplier(obj, id).then(res => console.log(res))
  }

  return (
    <div>
      <GridContainer spacing={3} >
        <GridItem xs={12} sm={12} md={8}>
          <Card >
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Update Supplier</h4>
              <p className={classes.cardemailWhite}>Supplier Details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}  >
                  <InputLabel>Supplier Name</InputLabel>
                  <TextField
                    placeholder="Name"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ marginTop: '20px' }}>
                <GridItem xs={12} sm={12} md={4}>
                  <InputLabel>Supplier email</InputLabel>
                  <TextField
                    placeholder="Email"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth={true}
                  >
                  </TextField>
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <InputLabel>Supplier phone</InputLabel>
                  <TextField
                    placeholder="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer style={{ marginTop: "20px" }}>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Address</InputLabel>
                  <TextField
                    placeholder="Enter Supplier address"
                    id="address"
                    fullWidth={true}
                    value={address}
                    multiline
                    rows={5}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => handleSubmit()} >Update</Button>
            </CardFooter>
          </Card>
        </GridItem>




      </GridContainer>
    </div>
  )
}

export default UpdateSupplier

const styles = {
  cardemailWhite: {
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
  large: {
    width: "200px",
    height: "200px",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: "10px",
    marginTop: "30px"
  },
  formControl: {
    margin: "20px",
    minWidth: 120,
  },
}