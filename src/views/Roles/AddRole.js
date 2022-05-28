import React from 'react'
import { Card, Typography, TextField, CardContent, InputLabel, Button, Modal, Snackbar } from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
import { addRole } from '../../Services/Role'

import AddAlert from "@material-ui/icons/AddAlert";
import { makeStyles } from '@material-ui/core'
import MultiSelect from 'components/MultiSelect/MultiSelect'


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
    cardRoleWhite: {
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
        minWidth: 200,
    },
}));

function AddRole(props) {
    const classes = useStyles();

    let [name, setName] = React.useState(null)
    let [permissions, setPermissions] = React.useState([])
    let [tc, setTC] = React.useState(false)

    const handleSubmit = async () => {
        let p = permissions.map(item => (props.permissions.find(p => p.name === item)).id)
        console.log(p)
        await addRole(name, p).then(res => {
            console.log(res)
            setTC(true)
            props.setMsg("Role Added Successfully!")
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
                        <Typography gutterBottom>Add A New Role</Typography>
                    </CardHeader>

                    <CardContent>
                        <form>
                            <InputLabel style={{ color: "#AAAAAA" }}>Role Name</InputLabel>
                            <TextField
                                value={name}
                                required
                                type="name"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <br />
                            <br />
                            <MultiSelect
                                name="Permissions"
                                data={props.permissions}
                                value={permissions}
                                setValue={setPermissions}

                            />

                            <br />
                            <CardFooter>
                                <Button color="primary" disableElevation variant="contained" onClick={() => handleSubmit()}>ADD ROLE</Button>
                            </CardFooter>

                        </form>
                        <Snackbar
                            place="tc"
                            color="info"
                            icon={AddAlert}
                            message="Role was created Successfully."
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

export default AddRole
