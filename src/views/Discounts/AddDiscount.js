import React from 'react'
import { Card, Typography, TextField, CardContent, InputLabel, Button, Modal, Snackbar, FormGroup, FormControlLabel, Switch } from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
import { addDiscount } from '../../Services/Discount'

import AddAlert from "@material-ui/icons/AddAlert";
import { makeStyles } from '@material-ui/core'


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
    cardDiscountWhite: {
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

function AddDiscount(props) {
    const classes = useStyles();

    let [name, setName] = React.useState(null)
    let [percentage, setPercentage] = React.useState(null)
    let [active, setActive] = React.useState(0)
    let [tc, setTC] = React.useState(false)

    const handleSubmit = async () => {
        await addDiscount({ name, percentage, active }).then(res => {
            console.log(res)
            setTC(true)
            props.setMsg("Discount Added Successfully!")
            props.setLoading(false)
            props.setErr(true)
        }).catch(e => {
            props.setLoading(false)
            if (!e.response) props.setMsg("Network Error")
            else props.setMsg(e.response.data.detail)
            props.setErr(true)
        })

    }

    return (
        <Modal open={props.show} onClose={props.handleClose} className={classes.modal} >
            <div >
                <Card >
                    <CardHeader>
                        <Typography gutterBottom>Add A New Discount</Typography>
                    </CardHeader>

                    <CardContent>
                        <form>
                            <InputLabel style={{ color: "#AAAAAA" }}>Discount Name</InputLabel>
                            <TextField
                                value={name}
                                required
                                type="name"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <br />

                            <InputLabel style={{ color: "#AAAAAA" }}>Discount Percentage</InputLabel>
                            <TextField
                                value={percentage}
                                required
                                type="number"
                                onChange={(e) => setPercentage(e.target.value)}
                            />

                            <br />

                            <InputLabel style={{ color: "#AAAAAA" }}>Discount Status</InputLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch />}
                                    label={active === 1 ? "Active" : "Not Active"}
                                    checked={active} onChange={e => {
                                        console.log(e.target.checked)
                                        setActive(e.target.checked)
                                    }}
                                />
                            </FormGroup>

                            <br />
                            <CardFooter>
                                <Button color="primary" disableElevation variant="contained" onClick={() => handleSubmit()}>ADD DISCOUNT</Button>
                            </CardFooter>

                        </form>
                        <Snackbar
                            place="tc"
                            color="info"
                            icon={AddAlert}
                            message="Discount was created Successfully."
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

export default AddDiscount
