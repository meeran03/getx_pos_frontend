import React from 'react'
import {CardContent
  , Typography,TextField,
  InputLabel,ButtonGroup,Dialog,DialogTitle,DialogContent,
  DialogContentText,DialogActions,Select,Grid, makeStyles,Fab
} from '@material-ui/core' 
import Card from "components/Card/Card.js";
import CardHeader from 'components/Card/CardHeader'// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import AddIcon from '@material-ui/icons/Add';
import Button from "components/CustomButtons/Button.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Loading from '../../components/Loading/Loading'  

import {  TableCell, TableHead, TableRow,Table,TableBody  } from "@material-ui/core";
import { Avatar } from '@material-ui/core';
import { updateStore } from 'Services/Stores';
import { useParams } from 'react-router-dom';
import { getStoreAreas, deleteStoreArea, getStore } from 'Services/Stores';
import AddStoreArea from './AddStoreArea'
import UpdateStoreArea from './UpdateStoreArea';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


function UpdateStore(props) {
    const [username,setUsername] = React.useState(null)
    const [email,setEmail] = React.useState(null)
    const [owner,setOwner] = React.useState(null)
    const [contractImage,setContractImage] = React.useState(false)
    const [password,setPassword] = React.useState("")
    const [phone,setPhone] = React.useState(null)
    const [address,setAddress] = React.useState(null)
    const [image,setImage] = React.useState(null)
    const [token,setToken] = React.useState(null)
    const [loading,setLoading] = React.useState(true)

    let [storeAreas,setStoreAreas] = React.useState(null)

    const useStyles = makeStyles(styles)
    const classes = useStyles();

    const {item} = props.location
    let {id} = useParams('id')

    const [errorMsg,setMsg] = React.useState(false)
    const [err,setErr] = React.useState(false)
    const [type,setType] = React.useState(false)

    React.useEffect(() => {
        getStore(id).then(res => {
          setUsername(res.user.username)
          setEmail(res.user.email)
          setImage(res.user.image)
          setOwner(res.owner_name)
          setPhone(res.user.phone)
          setAddress(res.user.address)
          setContractImage(res.contract_image)
          setToken(res.user.push_token)
        }).catch(e => {
          if (!e.response) setMsg("Network Error")
          else setMsg(e.response.data.detail)
          setType("error")
          setErr(true)
        })

        getStoreAreas(id).then(res => {
          setStoreAreas(res)
          setLoading(false)
        }).catch(e => {
          if (!e.response) setMsg("Network Error")
          else setMsg(e.response.data.detail)
          setType("error")
          setErr(true)
        })

    },[])


    const [openDelete, setOpenDelete] = React.useState(false);
    const [corrected, setcorrected] = React.useState(false);

    const handleDelete = (id) => {
      setcorrected(id)
      setOpenDelete(true);
    };
  
    const handleDeleteClose = () => {
      setOpenDelete(false);
    };
  
    const handleDeletePress = () => {
      deleteStoreArea(corrected).then(res => {
        setOpenDelete(false);
        setMsg("Store Area Deleted Successfully")
        setType("success")
        setErr(true)
        setLoading(false)
      }).catch(e => {
        if (!e.response) setMsg("Network Error")
        else setMsg(e.response.data.detail)
        setType("error")
        setErr(true)
      })
    };

    const [open, setOpen] = React.useState(false);

    const handleAddArea = () => {
      setOpen(true);
    };
  
    const handleAreaClose = () => {
      setOpen(false);
    };

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [selected, setselected] = React.useState(false);

    const handleUpdateArea = (item) => {
      setselected(item)
      setOpenUpdate(true);
    };
  
    const handleUpdateAreaClose = () => {
      setOpenUpdate(false);
    };
    

    const handleSubmit = () => {
      let obj = {username,image,email,owner,password,phone,address,contractImage,token};
        setLoading(true)
        updateStore(obj,id).then(res => {
          console.log(res)
          setMsg("Store has been successfully Updated")
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

    if (loading) return <Loading open={loading}/>

    return (
        <div>
      <GridContainer spacing={3} >
          <Snackbar open={err} autoHideDuration={6000} onClose={() => {
                    setErr(false)
                    window.location.reload()
                  }} >
                    <Alert  severity={type}>
                      {errorMsg ||"Nothing Here" }
                    </Alert>
          </Snackbar>  
        <GridItem xs={12} sm={12} md={4} className={classes.main}>

        <div class="avatar">
          <div class="mb-8 rounded-full w-80 h-80 ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={image && image} />
          </div>
        </div> 
        <div class="avatar">
          <div class="mb-8 w-80 h-80 ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={contractImage && contractImage} />
          </div>
        </div> 
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card >
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Update Store</h4>
              <p className={classes.cardemailWhite}>Store Details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={3}  >
                  <InputLabel>Store </InputLabel>
                  <TextField
                    placeholder="Username"
                    id="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InputLabel>Store Password</InputLabel>
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
                <InputLabel>Store email</InputLabel>
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
                  <InputLabel>Store phone</InputLabel>
                  <TextField
                    placeholder="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <InputLabel>Store Owner</InputLabel>
                    <TextField
                        placeholder="Owner"
                        id="owner"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        fullWidth={true}
                    />
                </GridItem>
              </GridContainer>

              <GridContainer style={{marginTop: '20px'}}>
                <GridItem xs={12} sm={12} md={12}>
                    <InputLabel>Store Push Token</InputLabel>
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
                    label="Enter Store address"
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
                <InputLabel style={{ color: "#AAAAAA" }}>{image ? "Change Image":"Store Image"}</InputLabel>
                    <br/>
                    <Button component="label">{image ? "Change Image":"Store Image"}
                        <input accept="image/*" type="file" hidden onChange={e => setImage(e.target.files[0])} />
                    </Button>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                <InputLabel style={{ color: "#AAAAAA" }}>{image ? "Change Contract":"Store Contract Image"}</InputLabel>
                    <br/>
                    <Button component="label">{contractImage ? "Change Contract Image":"Store Contract Image"}
                        <input accept="image/*" type="file" hidden onChange={e => setContractImage(e.target.files[0])} />
                    </Button>
                </GridItem>

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => handleSubmit()} >Update</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
        <Grid item xs={12} sm={12} md={11}>
          <Card elevation={3} style={{marginTop: '20px'}}>
          <CardHeader color="primary">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={10} >
                  <h4 className={classes.cardTitleWhite}>Assigned Store Areas</h4>
              </Grid>
              <Grid item xs={12} sm={12} md={2} >

                <Fab onClick={handleAddArea} style={{alignSelf:"flex-end"}}>
                  <AddIcon  />
                </Fab>

              </Grid>
            </Grid>
          </CardHeader>
            <CardContent >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Store Area</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Delivery Boy</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {storeAreas?.map((itemArea,index) => {
                    return(
                    <TableRow key={index}>
                      <TableCell>{itemArea.id}</TableCell>
                      <TableCell>{itemArea.subarea_detail.name}, {itemArea.subarea_detail.area_detail.name}</TableCell>
                      <TableCell>{itemArea.subarea_detail.area_detail.area_detail.name}</TableCell>
                      <TableCell>{itemArea.delivery_boy_detail && itemArea.delivery_boy_detail.user.username}</TableCell>
                      <TableCell>
                        <Avatar alt="Remy Sharp" src={itemArea.delivery_boy_detail && itemArea.delivery_boy_detail.user.image} />
                      </TableCell>

                      <TableCell>
                        <ButtonGroup disableElevation variant="contained" color="primary">
                          <Button color="primary" onClick={() => handleUpdateArea(itemArea)} >UPDATE</Button>
                          <Button color="secondary" onClick={() => handleDelete(itemArea.id)} >DELETE</Button>

                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <AddStoreArea setLoading={setLoading} setErr={setErr} setType={setType} setMsg={setMsg} id={id} open={open} handleClose={handleAreaClose} />
        <UpdateStoreArea setLoading={setLoading} setErr={setErr} setType={setType} setMsg={setMsg} id={id} item={selected} open={openUpdate} handleClose={handleUpdateAreaClose} />
      
          <Dialog
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                By Agreeing, you will delete the selected Store Area!
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
        </div>
    )
}

export default UpdateStore

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
  }
}