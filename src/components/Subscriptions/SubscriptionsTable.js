import React from 'react'
import MUIDataTable from "mui-datatables";
import {ButtonGroup,Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import moment from 'moment'

const columns = [{
    name: "ID",
    options: {
     filter: false,
     sort: true
    }
   }, "Customer", "Type", "Timing","Start","End", "Status", "Price", {
    name: "Actions",
    options: {
     filter: false,
     sort: false
    }
   }];


const options = {
  filterType: 'checkbox',
};


export default function SubscriptionsTable(props) {
    const [data,setData] = React.useState([])
    const history = useHistory()

    return(
        <MUIDataTable 
        title={"Subscriptions"} 
        data={
            props.data?.map((item,index) => {
                console.log(item)
                return {
                    "ID" : item.id,
                    "Customer" :item.customer_detail.user.username,
                    "Status" :item.status,
                    "Price" :item.price,
                    "Type" : item.subscription_type_detail.name,
                    "Timing" : item.timing,
                    "Start" : moment(item.start_time).format("LL"),
                    "End" : moment(item.end_time).format("LL"),
                    "Actions" : (    
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" 
                        onClick={() => history.push('/admin/subscriptions/' + item.id)} 
                    >VIEW</Button>
                </ButtonGroup>)
                }

        })}
        columns={columns} 
        options={options} 
        />
    )
}
