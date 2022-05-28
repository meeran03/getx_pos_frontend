import React from 'react'
import MUIDataTable from "mui-datatables";
import {ButtonGroup,Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import { answerRequest } from 'Services/Credit';
import { Avatar } from '@material-ui/core';


const columns = [
    {
        name: "ID",
        options: {
            filter: false,
            sort: true
        }
   }, 
   "From",
    {
        name : "Amount" , 
        options : {
            filter :false
        }
    }, 
    {
        name : "Transaction ID" , 
        options : {
            filter :false
        }
    }, "Status",
    {
        name : "Image" , 
        options : {
            filter :false,
            sort : false
        }
    } ,    
    {
        name : "Actions" , 
        options : {
            filter :false,
            sort : false
        }
    }
];


const options = {
  filterType: 'dropdown',
};


export default function CreditTable(props) {

    const updateRequest = (status,id) =>  {
        props.setLoading(true)
        answerRequest(status,id).then(res => {
            props.setMsg("Status Updated Successfully")
            props.setType('success')
            props.setLoading(false)
            props.setErr(true)
        }).catch(e => {
            props.setLoading(false)
            if (!e.response) props.setMsg("Network Error")
            else props.setMsg(e.response.data.detail)
            props.setType("error")
            props.setErr(true)
        })
    }

    return(
        <MUIDataTable 
        title={"Credit Requests"} 
        data={
            props.data?.map((item,index) => {
                return {
                    "ID" : item.id,
                    "From" :item.customer_detail.user.username,
                    "Amount" :item.amount,
                    "Transaction ID" : item.transaction_id,
                    "Status" :(item.status),
                    "Image" : (<Avatar src={item.image} />),
                    "Actions" : (    
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" 
                        onClick={() => updateRequest("success",item.id)} 
                    >
                        Accept
                    </Button>
                    <Button color="secondary" 
                        onClick={() => updateRequest("rejected",item.id)} 
                    >
                        Reject
                    </Button>
                </ButtonGroup>)
                }

        })}
        columns={columns} 
        options={options} 
        />
    )
}
