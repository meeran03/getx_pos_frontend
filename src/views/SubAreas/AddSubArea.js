import React from 'react'
import { Card, Typography, TextField, CardContent, InputLabel, Button, Modal, Snackbar, MenuItem } from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
import { addCategory } from '../../Services/Categories'

import AddAlert from "@material-ui/icons/AddAlert";
import { makeStyles } from '@material-ui/core'
import { addArea } from 'Services/Areas'
import { addSubArea } from 'Services/SubAreas'
import { getAreas } from 'Services/Areas'


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

function AddSubArea(props) {
    const classes = useStyles();

    let [name, setName] = React.useState(null)
    let [area, setArea] = React.useState(null)
    let [areas, setAreas] = React.useState(null)

    React.useEffect(() => {
        getAreas().then(res => {
            setAreas(res)
        }).catch(e => alert(e.message))
    }, [])

    const handleSubmit = async () => {
        if (name !== null && area !== null) {
            addSubArea(name,area).then(res => {
                console.log(res)
                props.setMsg("Subarea Added Successfully!")
                props.setLoading(false)
                props.setErr(true)
            }).catch(e => {
                props.setLoading(false)
                if (!e.response) props.setMsg("Network Error")
                else {
                    let err = "";
                    for (let property in e.response.data) {
                        err += `${property} : ${e.response.data[property]}\n`
                    }
                    props.setMsg(err)
                }
                props.setErr(true)
                props.setLoading(false)
            })
        }
    }

    return (
        <Modal open={props.show} onClose={props.handleClose} className={classes.modal} >
            <div >
                <Card >
                    <CardHeader>
                        <Typography gutterBottom>Add A New Subarea</Typography>
                    </CardHeader>

                    <CardContent>
                        <form>
                            <InputLabel>Area</InputLabel>
                            <TextField
                                placeholder="Area"
                                id="price"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                fullWidth={true}
                                select
                                style={{ marginBottom: "20px" }}
                            >
                                {areas?.map((item, index) => (
                                    <MenuItem value={item.id} >{item.name}</MenuItem>
                                ))}
                            </TextField>
                            <InputLabel style={{ color: "#AAAAAA" }}>Subarea Name</InputLabel>
                            <TextField
                                value={name}
                                required
                                type="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />

                            <br />
                            <CardFooter>
                                <Button color="primary" disableElevation variant="contained" onClick={() => handleSubmit()}>ADD SUBAREA</Button>
                            </CardFooter>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </Modal>
    )
}

export default AddSubArea
