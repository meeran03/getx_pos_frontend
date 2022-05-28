import React from 'react'
import {
  Card,
  Typography,
  TextField,
  CardContent,
  InputLabel,
  Button,
  Modal,
  Snackbar,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
} from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
import { updateUnit } from '../../Services/Unit'

import AddAlert from '@material-ui/icons/AddAlert'
import { makeStyles } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

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
    width: '100%',
  },
  cardUnitWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

function UpdateUnit(props) {
  const classes = useStyles()

  let [name, setName] = React.useState(null)
  let [tc, setTC] = React.useState(false)

  const handleSubmit = async () => {
    props.setLoading(true)
    await updateUnit(name, props.item.id)
      .then((res) => {
        console.log(res)
        setTC(true)
        props.setMsg('Unit Updated Successfully!')
        props.setLoading(false)
        props.setErr(true)
      })
      .catch((e) => {
        props.setLoading(false)
        console.log(e)
        if (!e.response) props.setMsg('Network Error')
        else props.setMsg(e.response.data.detail)
        props.setErr(true)
      })
  }

  React.useEffect(() => {
    if (props.show) {
      setName(props.item.name)
    }
  }, [props.item])

  return (
    <Modal
      open={props.show}
      onClose={props.handleClose}
      className={classes.modal}
    >
      <div>
        <Card>
          <CardHeader>
            <Typography gutterBottom>Update Unit</Typography>
          </CardHeader>

          <CardContent>
            <form>
              <InputLabel style={{ color: '#AAAAAA' }}>
                Unit Name
              </InputLabel>
              <TextField
                value={name && name}
                required
                type="name"
                onChange={(e) => setName(e.target.value)}
              />
              <br />

              <CardFooter>
                <Button
                  color="primary"
                  disableElevation
                  variant="contained"
                  onClick={() => handleSubmit()}
                >
                  Update UNIT
                </Button>
              </CardFooter>
            </form>
            <Snackbar
              place="tc"
              color="info"
              icon={AddAlert}
              message="Unit was updated Successfully."
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

export default UpdateUnit
