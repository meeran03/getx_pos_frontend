import React from 'react'
import MUIDataTable from "mui-datatables";
import {
    ButtonGroup,
    Button, 
    DialogContentText, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogActions
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import { FormLabel, FormGroup, TextField, FormControlLabel,Checkbox } from '@material-ui/core';
import moment from 'moment';




export default function BillingHistoryTable(props) {
    let data = props.data || []
    const columns = [
        {
            name: "ID",
            options: {
                filter: false,
                sort: true
            }
        }, 
        {
           name : "Amount",
           options: {
                filter: false,
                sort: true
            }
        }, 
        {
            name: 'Type',
            options: {
              filter: true,
            },
        }, 
        {
            name: 'Status',
            options: {
              filter: false,
            },
        }, 
        {
            name: "Date",
            sort: true,
            options: {
                filter :  false,
                sort: true,
            }
        },
        {
            name : "Actions",
            options : {
                filter : false,
                sort : false
            }
        }];
    
    
    const options = {
      filterType: 'checkbox',
    };
    const history = useHistory()

    if (props.loading) return <div/>
    return(
        <MUIDataTable 
        title={"Recharge History"} 
        data={
            data && data?.map((item,index) => {
                return {
                    "ID" : item.id,
                    "Amount" :item.amount,
                    "Type" :(
                        <Button 
                            variant="contained"
                            size="small"
                            color={item.payment_detail.type_of == "JAZZ" ? "primary" : "secondary"}
                        >
                            {item.payment_detail.type_of}
                        </Button>),
                    "Status" :(
                    <Button 
                        variant="outlined"
                        size="small"
                        color={item.payment_detail.status == "success" ? "primary" : "secondary"}
                    >
                        {item.payment_detail.status}
                    </Button>),
                    "Date" : moment(item.date).format('DD/MM/YYYY'),
                    "Actions" : (    
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button onClick={() => {
                            props.setItem(item)
                            props.setOpen(true)
                        } } color="success" >View</Button>
                    </ButtonGroup>
                    )
                }

        })}
        columns={columns} 
        options={options} 
        />
    )
}
