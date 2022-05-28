import React from 'react'
import MUIDataTable from "mui-datatables";
import { ButtonGroup, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import moment from 'moment'




const columns = [
    {
        name: "ID",
        options: {
            filter: false,
            sort: true
        }
    },
    {
        name: "Customer",
        options: {
            filter: true
        }
    },
    "Title", "Created At", "Answered",
    {
        name: "Actions",
        options: {
            filter: false
        }
    }];





export default function ComplainsTable(props) {
    const history = useHistory()

    const changePage = (page, order) => {
        props.getData(page);
    }

    const sort = (page, order) => {
        //
    }

    const options = {
        filterType: 'dropdown',
        serverSide: true,
        count: props.data.count,
        rowsPerPage: 10,
        rowsPerPageOptions: [],
        onTableChange: (action, tableState) => {
            console.log(action, tableState);

            // a developer could react to change on an action basis or
            // examine the state as a whole and do whatever they want

            switch (action) {
                case 'changePage':
                    changePage(tableState.page, tableState.sortPurchase);
                    break;
                case 'sort':
                    sort(tableState.page, tableState.sortPurchase);
                    break;
                default:
                    console.log('action not handled.');
            }
        },
    };

    return (
        <MUIDataTable
            title={"Complains"}
            data={
                props.data.results?.map((item, index) => {
                    return {
                        "ID": item.id,
                        "Customer": item.customer_detail.user.username,
                        "Title": item.title,
                        "Created At": moment(item.date).format("LLL"),
                        "Answered": item.answered ? "Yes" : "False",
                        "Actions": (
                            <ButtonGroup disableElevation variant="contained" color="primary">
                                <Button color="primary"
                                    onClick={() => history.push({ pathname: '/admin/complains/' + item.id, complain: item })}
                                >OPEN</Button>
                            </ButtonGroup>)
                    }

                })}
            columns={columns}
            options={options}
        />
    )
}
