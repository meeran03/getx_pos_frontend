import React from 'react'
import { Card, Typography,TextField, CardContent,InputLabel,MenuItem ,Button, Modal, Snackbar } from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
import {addSubCategory} from '../../Services/SubCategories'
import {getCategories} from '../../Services/Categories'

import AddAlert from "@material-ui/icons/AddAlert";
import {makeStyles} from '@material-ui/core' 


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

function AddSubCategory(props) {
    const classes = useStyles();
    
    let [name,setName] = React.useState(null)
    let [categories,setCategories] = React.useState(null)
    let [category,setCategory] = React.useState(null)
    let [tags,setTags] = React.useState(null)
    let [tc,setTC] = React.useState(false)


    React.useEffect(() => {
        getCategories().then(res => {
            setCategories(res)
            props.setLoading(false)
        }).catch(e => {
            props.setLoading(false)
            if (!e.response) props.setMsg("Network Error")
            else props.setMsg(e.response.data.detail)
            props.setErr(true)
        })
    },[])

    const handleSubmit = async () => {
        if ( name !== null && category !== null) {
            props.setLoading(true)
            await addSubCategory(name,category,tags).then(res => {
                console.log(res)
                setTC(true)
                props.setMsg("SubCategory Added Successfully!")
                props.setLoading(false)
                props.setErr(true)
            }).catch(e => {
                props.setLoading(false)
                if (!e.response) props.setMsg("Network Error")
                else props.setMsg(e.response.data.detail)
                props.setErr(true)
            })
        }
    }

    return (
        <Modal open={props.show} onClose={props.handleClose} className={classes.modal} >
        <div >
            <Card >
                <CardHeader>
                    <Typography gutterBottom>Add A New Subcategory</Typography>
                </CardHeader>

                <CardContent>
                    <form>
                        <InputLabel>Product Category</InputLabel>
                        <TextField
                            placeholder="Category"
                            id="price"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth={true}
                            select
                            style={{marginBottom : "20px"}}
                        >
                            {categories?.map((item,index) => (
                                <MenuItem value={item.id} >{item.name}</MenuItem>
                            ))}
                        </TextField>

                        
                        <InputLabel className="mt-2"  style={{ color: "#AAAAAA",marginTop : 10 }}>Category Tags</InputLabel>
                        <TextField 
                            value={tags && tags}
                            required
                            type="Tags"
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <br/>

                        <InputLabel className="mt-2" style={{ color: "#AAAAAA" }}>SubCategory Name</InputLabel>
                        <TextField 
                            value={name}
                            required
                            type="name"
                            onChange={(e) => setName(e.target.value)}
                        />


                        {/* <InputLabel style={{ color: "#AAAAAA" }}>{image ? "Change Image":"Subcategory Image"}</InputLabel>
                        <br/>
                        <Button component="label">{image ? "Change Image":"Subcategory Image"}
                            <input accept="image/*" type="file" hidden onChange={handleCapture} />
                        </Button> */}

                        <br/>
                        <CardFooter>
                            <Button color="primary" disableElevation variant="contained" onClick={() => handleSubmit()}>ADD SUBCATEGORY</Button>
                        </CardFooter>

                    </form>
                    <Snackbar
                        place="tc"
                        color="info"
                        icon={AddAlert}
                        message="Category was created Successfully."
                        open={tc}
                        closeNotification={() => setTC(false)}
                        close
                    />
                </CardContent>
            </Card>
        </div>
        </Modal>
    )
}

export default AddSubCategory
