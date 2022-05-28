import React from 'react'
import {
    CardContent,
    TextField,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Grid,
    makeStyles,
    Fab,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    ButtonGroup,
} from '@material-ui/core'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader' // core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Button from 'components/CustomButtons/Button.js'
import CardAvatar from 'components/Card/CardAvatar.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'

import { addPurchase } from '../../Services/Purchases'
import Loading from '../../components/Loading/Loading'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { getCategories } from 'Services/Categories'
import Dropzone from 'react-dropzone-uploader'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getUnits } from 'Services/Unit'
// import AddVariation from './AddVariation'
import { Add } from '@material-ui/icons'
import SearchBox from 'components/SearchBox/SearchBox'
import { searchSuppliers } from 'Services/Supplier'
import moment from 'moment'
import { getDiscounts } from 'Services/Discount'
import ProductSearchBox from 'components/SearchBox/ProductSearchBox'

function AddPurchase() {
    const [invoice_no, setInvoiceNo] = React.useState(null)
    // const [discount, setDiscount] = React.useState(null)
    // const [discounts, setDiscounts] = React.useState([])
    const [date, setDate] = React.useState(new Date())

    const [open, setOpen] = React.useState(false)

    const useStyles = makeStyles(styles)
    const classes = useStyles()

    const [query, setQuery] = React.useState(null)

    React.useEffect(() => {
        // getCategories().then((res) => setCategories(res))
        // getDiscounts().then((res) => setDiscounts(res))
    }, [])


    const [loading, setLoading] = React.useState(false)

    const [errorMsg, setMsg] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const [typePopup, setTypePopup] = React.useState(false)
    const [searchResults, setSearchResults] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [quantity, setQuantity] = React.useState(0)
    const [supplier, setSupplier] = React.useState(null)

    const [variations, setVariations] = React.useState([])
    const handleSubmit = () => {
        let temp = variations.map(v => {
            return {
                id: v.id,
                quantity: v.quantity_bought,
                purchase_price: v.purchase_price,
            }
        })
        let obj = {
            variations: temp,
            date,
            invoice_no,
            final_total: total,
            // contact_id: supplier.id,
        }
        console.log(supplier)
        obj.contact_id = supplier.id
        console.log(obj)
        // setLoading(true)
        addPurchase(obj)
            .then((res) => {
                setMsg('Purchase Added Successfully')
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

    const getVariationsTotal = (variations) => {
        let total = 0;
        let quantity = 0;
        variations.forEach((item) => {
            total += parseInt(item.purchase_price) * parseInt(item.quantity_bought)
            quantity += parseInt(item.quantity_bought)
        }
        )
        console.log(total)
        // return total
        setTotal(total)
        setQuantity(quantity)
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
                            <h4 className={classes.cardTitleWhite}>Purchases</h4>
                            <p className={classes.cardCategoryWhite}>Add A New Purchase</p>
                        </CardHeader>
                        <CardBody>
                            <div className={'grid gap-4 grid-cols-3'}>
                                <div xs={12} sm={12} md={3}>
                                    <InputLabel>Purchase Invoice No</InputLabel>
                                    <TextField
                                        placeholder="Invoice No"
                                        id="invoice"
                                        value={invoice_no}
                                        onChange={(e) => setInvoiceNo(e.target.value)}
                                        fullWidth={true}
                                    />
                                </div>

                                <div xs={12} sm={12} md={4}>
                                    <InputLabel>Supplier </InputLabel>
                                    <SearchBox
                                        renderField="name"
                                        onChange={q => {
                                            setQuery(q.target.value)
                                            console.log(q.target.value)
                                            if (q != "") {
                                                searchSuppliers(q.target.value).then(res => {
                                                    setSearchResults(res)
                                                })
                                            }
                                        }}
                                        autoChange={(e, value, reason) => {
                                            console.log(value)
                                            console.log(searchResults.find(item => item.name == value))
                                            if (reason === "select-option") {
                                                setSupplier(searchResults.find(item => item.name == value))
                                            }
                                        }}
                                        value={query}
                                        data={searchResults}
                                    />
                                </div>
                            </div>

                            <div className="grid" style={{ marginTop: '20px' }}>
                                <div xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: '#AAAAAA' }}>
                                        Transaction Date
                                    </InputLabel>
                                    <TextField
                                        id="t-date"
                                        type="date"
                                        defaultValue={moment(date).format('YYYY-MM-DD')}
                                        value={moment(date).format('YYYY-MM-DD')}
                                        onChange={e => setDate(moment(e.target.value, 'YYYY-MM-DD').toDate())}
                                        //   className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ marginRight: '20px' }}
                                    />
                                </div>


                                {/* <div xs={12} sm={12} md={12}>
                                    <InputLabel id="demo-simple-select-label">Discount Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={discount}
                                        label="Type"
                                        onChange={(e) => {
                                            setDiscount(e.target.value)
                                        }}
                                    >
                                        {discounts.map(discount => (<MenuItem value={discount.id}>{discount.name}-{discount.percentage} %</MenuItem>))}
                                    </Select>
                                </div> */}
                            </div>



                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={() => handleSubmit()}>
                                Add
                            </Button>
                        </CardFooter>
                    </Card>
                </GridItem>


                <Grid item xs={12} sm={12} md={12}>
                    <Card elevation={3} style={{ marginTop: '20px' }}>
                        <CardHeader color="primary">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={10} >
                                    <h4 className={classes.cardTitleWhite}>Purchase Order Products</h4>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={2} >

                                    <Fab onClick={handleAddVariation} style={{ alignSelf: "flex-end" }}>
                                        <Add />
                                    </Fab>

                                </Grid> */}
                            </Grid>
                        </CardHeader>
                        <CardContent >
                            {/* A Search Box for searching product variations */}
                            <ProductSearchBox
                                onChange={(value) => {
                                    setVariations(prev => [...prev, value])
                                    console.log(value)
                                }}
                            />
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Default Selling Price</TableCell>
                                        <TableCell>Purchase Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {variations.map((variation, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{variation.name}</TableCell>
                                                <TableCell>{variation.default_sell_price}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="purchase-price"
                                                        type="number"
                                                        value={variation.purchase_price}
                                                        onChange={(e) => {
                                                            let temp = variations
                                                            temp[index].purchase_price = e.target.value
                                                            setVariations(temp)
                                                            getVariationsTotal(temp);
                                                        }}

                                                        fullWidth={true}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="purchase-quantity"
                                                        type="number"
                                                        value={variation.quantity_bought}
                                                        onChange={(e) => {
                                                            console.log(e.target.value)
                                                            let temp = variations
                                                            temp[index].quantity_bought = e.target.value
                                                            setVariations(temp)
                                                            getVariationsTotal(temp)
                                                        }}
                                                        fullWidth={true}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <ButtonGroup disableElevation variant="contained" color="primary">
                                                        <Button color="secondary" onClick={() => {
                                                            let temp = variations.filter((item, i) => i !== index)
                                                            setVariations(
                                                                temp
                                                            )
                                                            getVariationsTotal(temp)
                                                        }} >DELETE</Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>Total : {total}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>Total Quantity : {quantity}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
                {/* <AddVariation setVariations={setVariations} variations={variations} setLoading={setLoading} setErr={setErr} setType={setType} setMsg={setMsg} open={open} handleClose={() => setOpen(false)} /> */}
            </div>
        </div>
    )
}

export default AddPurchase

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
