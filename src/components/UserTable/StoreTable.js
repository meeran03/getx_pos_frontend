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




export default function CustomerTable(props) {
    const columns = [
        {
            name: "ID",
            options: {
                filter: false,
                sort: true
            }
        }, 
        {
           name : "Username",
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
            name: "Image",
            sort: true,
            options: {
                filter :  false,
                sort: false
            }
        },
        // {
        //     name: "Area",
        //     sort: true,
        //     options: {
        //         filter :  true,
        //         sort: true,
        //         filterType : "dropdown"
        //     }
        // },
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


    return(
        <MUIDataTable 
        title={"Stores"} 
        data={
            props.data?.map((item,index) => {
                return {
                    "ID" : item.user.id,
                    "Username" :item.user.username,
                    "Email" :item.user.email,
                    "Phone" :item.user.phone,
                    "Image" :(<Avatar alt="Remy Sharp" src={item.user.image} />),
                    // "Area" :item.subarea_detail && (item.subarea_detail.name + ", " + item.subarea_detail.area_detail.name) ,
                    "Actions" : (    
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button onClick={() => history.push({pathname : '/admin/stores/update/' + item.id, item : item})} color="primary" >UPDATE</Button>
                        <Button onClick={() => history.push({pathname : '/admin/stores/' + item.id, item : item.user})} color="success" >View</Button>
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
