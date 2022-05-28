import React from 'react'
import MUIDataTable from "mui-datatables";
import { ButtonGroup, Button, Chip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { answerRequest } from 'Services/Purchases';
import { Avatar } from '@material-ui/core';
import { DirectionsBikeOutlined, Person } from '@material-ui/icons';


const columns = [
    {
        name: "Purchase ID",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "Cancelled By",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "Reason",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        name: "Money",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "Status",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        name: "Cancelled At",
        options: {
            filter: false,
            sort: false
        }
    },
    {
        name: "Actions",
        options: {
            filter: false,
            sort: false
        }
    }
];





export default function CancelledPurchasesTable(props) {

    const updateRequest = (status, id) => {
        props.setLoading(true)
        answerRequest(status, id).then(res => {
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
    //

    const searchProduct = (searchText) => {
        props.fetchData(searchText);
    }

    const options = {
        filterType: 'dropdown',
        onTableChange: (action, tableState) => {

            // a developer could react to change on an action basis or
            // examine the state as a whole and do whatever they want

            switch (action) {
                case 'search':
                    props.setStatus(null)
                    searchProduct(tableState.searchText);
                    break;
            }
        },
        searchAlwaysOpen: true
    };
    function returnType(user) {
        if (user.is_customer) {
            return (
                <Chip
                    size="small"
                    icon={<Person />}
                    label={user.username}
                    clickable
                    color="primary"
                />)
        }
        if (user.is_deliveryBoy) {
            return (
                <Chip
                    size="small"
                    icon={<DirectionsBikeOutlined />}
                    label={user.username}
                    clickable
                    color="secondary"
                />)
        }

    }

    function returnStatus(item) {
        let color = 'primary';
        if (item.status == 'WAITING') color = 'secondary'
        if (item.status == 'REJECT') color = 'warning'

        return (
            <Chip
                size="small"
                label={item.status}
                clickable
                color={color}
            />)
    }

    return (
        <MUIDataTable
            title={"Cancelled Purchases"}
            data={
                props.data?.map((item, index) => {
                    return {
                        "Purchase ID": item.id,
                        "Cancelled By": returnType(item.cancelled_by_detail),
                        "Reason": item.reason,
                        "Money": item.order_detail.price,
                        "Status": returnStatus(item),
                        "Cancelled At": moment(item.cancelled_at).format('LL'),
                        "Actions": item.status == 'WAITING' ? (
                            <ButtonGroup disableElevation variant="contained" color="primary">
                                <Button color="primary"
                                    onClick={() => updateRequest("ACCEPT", item.id)}
                                >
                                    Accept
                                </Button>
                                <Button color="secondary"
                                    onClick={() => updateRequest("REJECT", item.id)}
                                >
                                    Reject
                                </Button>
                            </ButtonGroup>) : ''
                    }

                })}
            columns={columns}
            options={options}
        />
    )
}
