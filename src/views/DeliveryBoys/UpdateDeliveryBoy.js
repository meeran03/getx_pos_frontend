import React from 'react'
import {CardContent,TextField,InputLabel,Select, makeStyles,MenuItem,FormControl
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
import { updateBoy } from 'Services/DeliveryBoys';
import { useParams } from 'react-router-dom';
import { getDeliveryBoy } from 'Services/DeliveryBoys';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loading from '../../components/Loading/Loading'


function UpdateDeliveryBoy(props) {
    const [username,setUsername] = React.useState(null)
    const [email,setEmail] = React.useState(null)
    const [status,setStatus] = React.useState(null)
    const [password,setPassword] = React.useState("")
    const [phone,setPhone] = React.useState(null)
    const [address,setAddress] = React.useState(null)
    const [image,setImage] = React.useState(null)
    const [token,setToken] = React.useState(null)


    const useStyles = makeStyles(styles)
    const classes = useStyles();

    let {id} = useParams('id')

    const [errorMsg,setMsg] = React.useState(false)
    const [err,setErr] = React.useState(false)
    const [loading,setLoading] = React.useState(true)
    const [type,setType] = React.useState(false)

    React.useEffect(() => {
        getDeliveryBoy(id).then(res => {
          setUsername(res.user.username)
          setEmail(res.user.email)
          setImage(res.user.image)
          setPhone(res.user.phone)
          setAddress(res.user.address)
          setToken(res.user.push_token)
          setStatus(res.status)
          setLoading(false)
        }).catch(e => {
          if (!e.response) setMsg("Network Error")
          else setMsg(e.response.data.detail)
          setType("error")
          setErr(true)
        })

    },[])
  
   

    const handleSubmit = () => {
      let obj = {username,image,email,password,phone,address,token,status};
      setLoading(true)
        updateBoy(obj,id).then(res => {
          console.log(res)
          setMsg("Rider has been successfully Updated")
          setType("success")
          setErr(true)
          setLoading(false)
        }).catch(e => {
          if (!e.response) setMsg("Network Error")
          else {
            let err = "";
            for (let property in e.response.data) {
              err += `${property} : ${e.response.data[property]}\n`
            }
            setMsg(err)
          }
          setType("error")
          setErr(true)
          setLoading(false)
        })
    }

    if (loading) return <Loading open={loading} />

    return (
        <div>
      <GridContainer spacing={3} >

      <Snackbar open={err} autoHideDuration={2000} onClose={() => {
                    setErr(false)
                    window.location.reload()
                  }} >
                    <Alert  severity={type}>
                      {errorMsg ||"Nothing Here" }
                    </Alert>
          </Snackbar>
        <GridItem xs={12} sm={12} md={4} className={classes.main}>
            <Card >
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Delivery Boy Profile Image</h4>
                </CardHeader>
                <CardContent>
                    <Avatar src={image && image} className={classes.large} />
                </CardContent>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card >
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Update Delivery Boy</h4>
              <p className={classes.cardemailWhite}>Delivery Boy Details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={3}  >
                  <InputLabel>Delivery Boy </InputLabel>
                  <TextField
                    placeholder="Username"
                    id="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InputLabel>Delivery Boy Password</InputLabel>
                  <TextField
                    placeholder="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
              </GridContainer>
            
              <GridContainer style={{marginTop: '20px'}}>
                <GridItem xs={12} sm={12} md={4}>
                <InputLabel>Delivery Boy email</InputLabel>
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
                  <InputLabel>Delivery Boy phone</InputLabel>
                  <TextField
                    placeholder="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="status-holder">Status</InputLabel>
                        <Select
                            labelId="status-holder"
                            id="status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>
              </GridContainer>

              <GridContainer style={{marginTop: '20px'}}>
                <GridItem xs={12} sm={12} md={12}>
                    <InputLabel>Delivery Boy Push Token</InputLabel>
                    <TextField
                        placeholder="Push Token"
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        fullWidth={true}
                    />
                </GridItem>
              </GridContainer>

              <GridContainer style={{marginTop : "20px"}}>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Address</InputLabel>
                  <TextField
                    label="Enter Delivery Boy address"
                    id="address"
                    fullWidth={true}
                    value={address}
                    multiline
                    rows={5}
                    onChange={(e) => setAddress(e.target.value)}
                  />
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
              <Button color="primary" onClick={() => handleSubmit()} >Update</Button>
            </CardFooter>
          </Card>
        </GridItem>
        



      </GridContainer>
        </div>
    )
}

export default UpdateDeliveryBoy

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
  main : {
      justifyContent : "center",
      alignItems : "center",
      alignSelf : "center",
      padding: "10px",
      marginTop: "30px"
  },
  formControl: {
    margin: "20px",
    minWidth: 120,
  },
}