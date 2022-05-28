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
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import { FormLabel, FormGroup, TextField, FormControlLabel, Checkbox } from '@material-ui/core';




export default function StoreTable(props) {
    const columns = [
        {
            name: "ID",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Name",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: 'Email',
            options: {
                filter: false,
            },
        },
        {
            name: 'Phone',
            options: {
                filter: false,
            },
        },
        {
            name: "Address",
            sort: true,
            options: {
                filter: true,
                sort: true,
                filterType: "dropdown"
            }
        },
        {
            name: "Actions",
            options: {
                filter: false,
                sort: false
            }
        }];


    const options = {
        filterType: 'checkbox',
    };
    const history = useHistory()


    return (
        <MUIDataTable
            title={props.tableName || "Customers"}
            data={
                props.data?.map((item, index) => {
                    return {
                        "ID": item.id,
                        "Name": item.name,
                        "Email": item.email,
                        "Phone": item.phone,
                        "Address": item.address,
                        "Actions": (
                            <ButtonGroup disableElevation variant="contained" color="primary">
                                <Button onClick={() => history.push({ pathname: `/admin/${props.basePath || 'customers'}/update/` + item.id, item: item })} color="primary" >UPDATE</Button>
                                <Button onClick={() => history.push({ pathname: `/admin/${props.basePath || 'customers'}/` + item.id, item: item })} color="success" >View</Button>
                                <Button color="secondary" onClick={() => props.handleDelete(item.id)}>DELETE</Button>

                            </ButtonGroup>
                        )
                    }

                })}
            columns={columns}
            options={options}
        />
    )
}
