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
import moment from 'moment';
import { deleteProduct } from 'Services/Products';
import { Avatar } from '@material-ui/core';
import { FormLabel, FormGroup, TextField, FormControlLabel, Checkbox } from '@material-ui/core';




export default function ProductTable(props) {
  const [priceFilterChecked, setPriceChecked] = React.useState(false)
  const [discountFilterChecked, setdiscountChecked] = React.useState(false)
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
      name: "Image",
      sort: true,
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "Category",
      options: {
        filter: true,
        filterType: 'dropdown'
      }
    },
    {
      name: 'Unit',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Type',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false
      }
    }];

  const searchProduct = (searchText) => {
    props.fetchData(searchText);
  }

  const options = {
    filterType: 'checkbox',
    count: props.data.count,
    rowsPerPageOptions: [],
    onTableChange: (action, tableState) => {
      console.log(action, tableState);

      // a developer could react to change on an action basis or
      // examine the state as a whole and do whatever they want

      switch (action) {
        case 'search':
          searchProduct(tableState.searchText);
          break;
        // case 'changePage':
        //   // sort(tableState.page, tableState.sortPurchase);
        //   props.fetchData(null, props.data.next)
        //   break;
        default:
          console.log('action not handled.');
      }
    },
  };
  const history = useHistory()


  return (
    <MUIDataTable
      title={"Products"}
      data={
        props.data?.map((item, index) => {
          return {
            "ID": item.id,
            "Name": item.name,
            "Type": item.type,
            "Unit": item.unit,
            "Category": item.category,
            "Image": (<img className='w-20 h-20' alt="Remy Sharp" src={item.image} />),
            "Actions": (
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button color="primary" onClick={() => history.push('/admin/products/update/' + item.id)} >UPDATE</Button>
                <Button color="secondary" onClick={() => props.handleClickOpen(item.id)} >DELETE</Button>
              </ButtonGroup>
            )
          }

        })}
      columns={columns}
      options={options}
    />
  )
}
