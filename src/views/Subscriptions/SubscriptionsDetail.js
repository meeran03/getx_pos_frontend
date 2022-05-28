import React from 'react'
import { useParams } from 'react-router-dom'
import { getPurchase } from '../../Services/Purchases'
import PurchaseMapComponent from '../../components/Map/PurchaseMapComponent'

// Here we use Material Ui Components
import {
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography, List, ListItem, ListItemAvatar, IconButton, ListItemText,
  Avatar
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Mail'
import { Phone, House } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete';
import { getSubscription } from 'Services/Subscriptions'

function SubscriptionsDetail(props) {
  let { id } = useParams('id')
  let { item } = props.location
  const [loading, setLoading] = React.useState(true)
  let [data, setData] = React.useState({})
  React.useEffect(() => {
    getSubscription(id).then(res => {
      console.log(res)
      setData(res)
      setLoading(false)
      console.log(data.start_time)
      var m = new Date(res.start_time);
      console.log(m.toString())
    })


  }, [])

  if (loading) return null;

  return (
    <Grid container>

      <Grid item xs={12} sm={12} md={12}>
        <Card >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Subscription Information
            </Typography>
            <List dense={true}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Customer"
                />
                <Typography>
                  {data.customer_detail.user.username}
                </Typography>
              </ListItem>



              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Phone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Subscription Type"
                />
                <Typography>
                  {data.subscription_type_detail.name}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Status"
                />
                <Typography>
                  {data.status}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Product"
                />
                <Typography>
                  {data.product_detail.name}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Product Quantity"
                />
                <Typography>
                  {data.quantity}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Time Slot"
                />
                <Typography>
                  {data.time_slot == 1 ? "Morning" : "Evening"}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Price"
                />
                <Typography>
                  {data.price}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Start Time"
                />
                <Typography>
                  {(new Date(data.start_time)).toString()}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="End Time"
                />
                <Typography>
                  {(new Date(data.end_time)).toString()}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Last Delivered"
                />
                <Typography>
                  {(new Date(data.last_delivered)).toString()}
                </Typography>
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <House />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Payment Method"
                />
                <Typography>
                  {data.payment_method}
                </Typography>
              </ListItem>
              {/* 
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Push Token"
                  />
                  <Typography>
                    {data.push_token}
                  </Typography>
                </ListItem> */}
            </List>
          </CardContent>

        </Card>

      </Grid>
      <br />
      <br />



    </Grid>
  )
}

export default SubscriptionsDetail;
