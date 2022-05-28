import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Card,TextField,InputLabel,makeStyles} from '@material-ui/core' 
import CardHeader from 'components/Card/CardHeader'// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
  
import { registerDeliveryBoy } from 'Services/DeliveryBoys';

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
    width : "100%"
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

export default function AddDeliveryBoy(props) {
  const classes = useStyles();

  const [name,setName] = React.useState(null)
  const [phone,setPhone] = React.useState(null)
  const [password,setPassword] = React.useState(null)
  const [email,setEmail] = React.useState(null)
  const [image,setImage] = React.useState(null)


  const handleSubmit =() => {
        if (name == null) {
            alert("Please enter a Delivery Boy Name")
            return;
        }   
        if (phone == null) {
            alert("Please enter a Delivery Boy Phone Number")
            return;
        } 
        if (email == null) {
            alert("Please enter a Delivery Boy Email")
            return;
        } 
        if (image == null) {
            alert("Please upload a Delivery Boy Image")
            return;
        } 

        if (phone.length != 11) {
            alert("Please enter a valid Phone Number")
            return;
        }

        let data={};
        data.phone = phone;
        data.image = image;
        data.name = name;
        data.email = email;
        data.password = password;
        props.setLoading(true)
        registerDeliveryBoy(data).then((res) => {
          props.setMsg("Rider Added Successfully")
          props.setType("success")
          props.setErr(true)
          props.setLoading(false)
        }).catch(e => {
          if (!e.response) props.setMsg("Network Error")
          else {
            let err = "";
            for (let property in e.response.data) {
              err += `${property} : ${e.response.data[property]}\n`
            }
            props.setMsg(err)
          }
          props.setType("error")
          props.setErr(true)
          props.setLoading(false)
        })
        
  }


  return (
    <div>
      <Modal
        aria-labelledby="Add A New Delivery Boy"
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
              <h4 className={classes.cardTitleWhite}>Delivery Boys</h4>
              <p className={classes.cardCategoryWhite}>Add A New Delivery Boy</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>Delivery Boy Name</InputLabel>
                  <TextField
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>Delivery Boy Email</InputLabel>
                  <TextField
                    placeholder="Delivery Boy Email"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
              </GridContainer>
            
              <GridContainer style={{marginTop: '20px'}}>
                <GridItem xs={12} sm={12} md={6}>
                <InputLabel>Delivery Boy Phone</InputLabel>
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
                    <InputLabel>Delivery Boy Password</InputLabel>
                    <TextField
                        placeholder="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth={true}
                    >
                    </TextField>
                </GridItem>
              </GridContainer>


              <GridContainer style={{marginTop: '20px'}}>

                <GridItem xs={12} sm={12} md={4}>
                <InputLabel style={{ color: "#AAAAAA" }}>{image ? "Change Image":"Delivery Boy Image"}</InputLabel>
                    <br/>
                    <Button component="label">{image ? "Change Image":"Delivery Boy Image"}
                        <input accept="image/*" type="file" hidden onChange={e => setImage(e.target.files[0])} />
                    </Button>
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