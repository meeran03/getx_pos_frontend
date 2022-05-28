import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Grid,
  createStyles,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Input,
  ListItemText,
  Fab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonGroup,
} from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader' // core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Button from 'components/CustomButtons/Button.js'
import CardAvatar from 'components/Card/CardAvatar.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'

import { addProduct, deleteProductVariation, getProduct, updateProduct } from '../../Services/Products'
import Loading from '../../components/Loading/Loading'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { getCategories } from 'Services/Categories'
import Dropzone from 'react-dropzone-uploader'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getUnits } from 'Services/Unit'
import AddVariation from './AddVariation'
import { Add } from '@material-ui/icons'
import { useParams } from 'react-router-dom'

function ProductPage() {
  const [name, setName] = React.useState(null)
  const [category, setCategory] = React.useState(null)
  const [description, setDescription] = React.useState(null)
  const [image, setImage] = React.useState(null)
  const [unit, setUnit] = React.useState(null)
  const [units, setUnits] = React.useState([])

  const [open, setOpen] = React.useState(false)

  const useStyles = makeStyles(styles)
  const classes = useStyles()

  const [categories, setCategories] = React.useState(null)

  React.useEffect(() => {
    getCategories().then((res) => setCategories(res))
    getUnits().then((res) => setUnits(res))
  }, [])


  const [loading, setLoading] = React.useState(false)

  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [typePopup, setTypePopup] = React.useState(false)
  const [type, setType] = React.useState('single')

  const [variations, setVariations] = React.useState([])
  const handleAddVariation = () => {
    if (type == "single" && variations.length === 1) {
      return;
    }
    setOpen(true);
  }

  const { id } = useParams()
  React.useEffect(() => {
    getProduct(id).then((res) => {
      setName(res.name)
      setCategory(res.category_id)
      setDescription(res.description)
      setImage(res.image)
      setUnit(res.unit_id)
      setType(res.type)
      setVariations(res.variations)
    })
  }, [])

  const handleSubmit = () => {
    let obj = {
      name,
      image,
      category_id: category,
      unit_id: unit,
      description,
      type,
      id
    }
    setLoading(true)
    updateProduct(obj)
      .then((res) => {
        setMsg('Product Updated Successfully')
        setLoading(false)
        setTypePopup('success')
        setErr(true)
      })
      .catch((e) => {
        setLoading(false)
        if (!e.response) setMsg('Network Error')
        else setMsg(e.response.data.detail)
        setTypePopup('error')
        setErr(true)
      })
  }

  return (
    <div>
      <Loading open={loading} />
      <div>
        <Snackbar
          open={err}
          autoHideDuration={2000}
          onClose={() => {
            setErr(false)
            window.location.reload()
          }}
        >
          <Alert severity={typePopup}>{errorMsg || 'Nothing Here'}</Alert>
        </Snackbar>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Products</h4>
              <p className={classes.cardCategoryWhite}>Add A New Product</p>
            </CardHeader>
            <CardBody>
              <div className={'grid gap-4 grid-cols-3'}>
                <div xs={12} sm={12} md={3}>
                  <InputLabel>Product Name</InputLabel>
                  <TextField
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth={true}
                  />
                </div>

                <div xs={12} sm={12} md={4}>
                  <InputLabel>Product Category</InputLabel>
                  <TextField
                    placeholder="Category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth={true}
                    select
                  >
                    {categories?.map((item, index) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>

              <div className="grid" style={{ marginTop: '20px' }}>
                <div xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: '#AAAAAA' }}>
                    Description
                  </InputLabel>
                  <TextField
                    id="description"
                    fullWidth={true}
                    value={description}
                    multiline
                    rows={5}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div
                className="grid grid-cols-3 gap-4"
                style={{ marginTop: '20px' }}
              >

                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Product Unit</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={unit}
                      label="Unit"
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      {units.map(item => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </GridItem>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={(e) => {
                      if (type == "single" && e.target.value == "variable") {

                        setType(e.target.value)
                      }
                      else if (type == "variable" && e.target.value == "single") {
                        // only keep the first variation
                        setVariations([variations[0]])
                      }
                    }}
                  >
                    <MenuItem value={'single'}>Single</MenuItem>
                    <MenuItem value={'variable'}>Variable</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="grid grid-cols-3 gap-5 mt-6">
                <div>
                  <InputLabel style={{ color: '#AAAAAA' }}>
                    {image ? 'Change Image' : 'Front Image'}
                  </InputLabel>
                  <br />
                  <Button component="label">
                    {image ? 'Change Image' : 'Front Image'}
                    <input
                      accept="image/*"
                      type="file"
                      hidden
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => handleSubmit()}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </GridItem>


        <Grid item xs={12} sm={12} md={11}>
          <Card elevation={3} style={{ marginTop: '20px' }}>
            <CardHeader color="primary">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={10} >
                  <h4 className={classes.cardTitleWhite}>Product Variations</h4>
                </Grid>
                <Grid item xs={12} sm={12} md={2} >

                  <Fab onClick={handleAddVariation} style={{ alignSelf: "flex-end" }}>
                    <Add />
                  </Fab>

                </Grid>
              </Grid>
            </CardHeader>
            <CardContent >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Default Purchase Price</TableCell>
                    <TableCell>Default Selling Price</TableCell>
                    <TableCell>Stock Available</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {variations.map((variation, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{variation.name}</TableCell>
                        <TableCell>{variation.default_purchase_price}</TableCell>
                        <TableCell>{variation.default_sell_price}</TableCell>
                        <TableCell>{variation.quantity}</TableCell>
                        <TableCell>{variation.sku}</TableCell>
                        <TableCell>
                          <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button color="secondary" onClick={async () => {
                              await deleteProductVariation(variation.id)
                              setVariations(
                                variations.filter((item, i) => i !== index)
                              )
                            }} >DELETE</Button>
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
        <AddVariation product_id={id} deep={true} setVariations={setVariations} variations={variations} setLoading={setLoading} setErr={setErr} setType={setType} setMsg={setMsg} setOpen={setOpen} open={open} handleClose={() => setOpen(false)} />
      </div>
    </div>
  )
}

export default ProductPage

const styles = {
  cardCategoryWhite: {
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
}
