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
  
import { registerStore } from 'Services/Stores';

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

export default function TransitionsModal(props) {
  const classes = useStyles();

  const [name,setName] = React.useState(null)
  const [phone,setPhone] = React.useState(null)
  const [password,setPassword] = React.useState(null)
  const [email,setEmail] = React.useState(null)
  const [image,setImage] = React.useState(null)


  const [city,setCity] = React.useState(null)
  const [area,setArea] = React.useState(null)
  const [cities,setCities] = React.useState(null)
  const [areas,setAreas] = React.useState(null)

  const handleSubmit =() => {
        if (name == null) {
            alert("Please enter a Store Name")
            return;
        }   
        if (phone == null) {
            alert("Please enter a Store Phone Number")
            return;
        } 
        if (email == null) {
            alert("Please enter a Store Email")
            return;
        } 
        if (image == null) {
            alert("Please upload a Store Image")
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
        registerStore(data).then((res) => {
          props.setMsg("Store Added Successfully")
          props.setType("success")
          props.setErr(true)
          props.setLoading(false)
        }).catch(e => {
          if (!e.response) props.setMsg("Network Error")
          else props.setMsg(e.response.data.detail)
          props.setType("error")
          props.setErr(true)
          props.setLoading(false)
        })
        
  }

    // React.useEffect(() => {
    //     getCities().then(res => {
    //         setCities(res)
    //     })
    // },[])


  return (
    <div>
      <Modal
        aria-labelledby="Add A New Store"
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
              <h4 className={classes.cardTitleWhite}>Stores</h4>
              <p className={classes.cardCategoryWhite}>Add A New Store</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>Store Name</InputLabel>
                  <TextField
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>Store Email</InputLabel>
                  <TextField
                    placeholder="Store Email"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
              </GridContainer>
            
              <GridContainer style={{marginTop: '20px'}}>
                <GridItem xs={12} sm={12} md={6}>
                <InputLabel>Store Phone</InputLabel>
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
                    <InputLabel>Store Password</InputLabel>
                    <TextField
                        placeholder="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth={true}
                    >
                    </TextField>
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={6}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="city-holder">City</InputLabel>
                        <Select
                            labelId="city-holder"
                            id="city"
                            value={city}
                            onChange={e => {
                                setCity(e.target.value);
                                console.log(e.target.value)
                                getAreas(e.target.value).then(res => setAreas(res))
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {cities?.map((item,index) => {
                                return(
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>


                {areas && (
                <GridItem xs={12} sm={12} md={6}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="area-holder">Store Area</InputLabel>
                        <Select
                            labelId="area-holder"
                            id="area"
                            value={area}
                            onChange={e => {
                                setArea(e.target.value);
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {areas?.map((item,index) => {
                            return(
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>
                )} */}
              </GridContainer>


              <GridContainer style={{marginTop: '20px'}}>

                <GridItem xs={12} sm={12} md={4}>
                <InputLabel style={{ color: "#AAAAAA" }}>{image ? "Change Image":"Store Image"}</InputLabel>
                    <br/>
                    <Button component="label">{image ? "Change Image":"Store Image"}
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