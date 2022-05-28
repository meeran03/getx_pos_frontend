import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Card, TextField, InputLabel, makeStyles, FormControl } from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { addProductVariation } from 'Services/Products';

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
//
export default function AddVariation(props) {
    const classes = useStyles();

    const [name, setName] = React.useState(null)
    const [selling_price, setSellingPrice] = React.useState(null)
    const [sku, setSku] = React.useState(null)

    const handleSubmit = () => {

        if (props.deep) {
            addProductVariation({
                product_id: props.product_id,
                name: name,
                default_sell_price: selling_price,
                sku: sku
            }).then(res => {
                props.setVariations(props.variations.concat({
                    name: name,
                    default_selling_price: selling_price,
                    sku: sku
                }))
                props.setOpen(false)
            })
        }
        else {
            props.setVariations(props.variations.concat({
                name: name,
                default_selling_price: selling_price,
                sku: sku
            }))
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="Add A New Variation"
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
                                <h4 className={classes.cardTitleWhite}>Variations</h4>
                                <p className={classes.cardCategoryWhite}>Add A New Variation</p>
                            </CardHeader>
                            <CardBody>

                                <GridContainer style={{ marginTop: '20px' }}>

                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl variant="filled" className={classes.formControl}>
                                            <TextField
                                                placeholder="Name"
                                                id="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                fullWidth={true}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>


                                <GridContainer style={{ marginTop: '20px' }}>

                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl variant="filled" className={classes.formControl}>
                                            <TextField
                                                placeholder="Selling Price"
                                                id="Selling Price"
                                                value={selling_price}
                                                onChange={(e) => setSellingPrice(e.target.value)}
                                                fullWidth={true}
                                                type="number"
                                            />
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer style={{ marginTop: '20px' }}>

                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl variant="filled" className={classes.formControl}>
                                            <TextField
                                                placeholder="SKU"
                                                id="SKU"
                                                value={sku}
                                                onChange={(e) => setSku(e.target.value)}
                                                fullWidth={true}
                                            />
                                        </FormControl>
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