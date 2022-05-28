import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { useHistory } from 'react-router-dom'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { TableBody, TableCell, TableHead, Table, TableRow, Button, Avatar } from '@material-ui/core'

// import Purchases from '../Purchases/Purchases'
// import { getCustomers } from "Services/Customers";
// import { getDeliveryBoys } from "Services/DeliveryBoys";
// import { getStores } from "Services/Stores";
// import { getComplains } from "Services/Complains";
import { getPurchases } from "Services/Purchases";
import { MoneyOffRounded } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory()
  const [complains, setComplains] = React.useState(null)
  const [customers, setcustomers] = React.useState(0)
  const [riders, setriders] = React.useState(0)
  const [stores, setstores] = React.useState(0)
  const [sales, setSales] = React.useState(100)

  React.useEffect(() => {
    // getComplains(1,true).then(res => {
    //   setComplains(res.results)
    // })
    // getDeliveryBoys().then(res => setriders(res.length))
    // getStores().then(res => setstores(res.length))
    // getCustomers().then(res => setcustomers(res.length))
    // let price=0;
    // getPurchases(true).then(res => {
    //   for (let m in res) {
    //     price += res.price
    //   }
    // })
    // setSales(price)
  }, [])
  return (
    <div>
      <div class="w-full shadow stats">
        <div class="stat">
          <div class="stat-figure text-primary">
            <Icon>content_copy</Icon>
          </div>
          <div class="stat-title">No. of Riders</div>
          <div class="stat-value text-primary">{riders}</div>
          <div class="stat-desc">21% more than last month</div>
        </div>


        <div class="stat">
          <div class="stat-figure text-info">
            <MoneyOffRounded />
          </div>
          <div class="stat-title">Monthly Sales</div>
          <div class="stat-value text-info">Rs. {sales}</div>
          <div class="stat-desc">21% more than last month</div>
        </div>


        <div class="stat">
          <div class="stat-figure text-primary">
            <Store />
          </div>
          <div class="stat-value">{stores}</div>
          <div class="stat-title">Stores</div>
          <div class="stat-desc text-info">31 tasks remaining</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-accent">
            <Accessibility />
          </div>
          <div class="stat-title">No. of Customers</div>
          <div class="stat-value text-accent">{customers}</div>
          <div class="stat-desc">21% more than last month</div>
        </div>

      </div>

      {/* <div class="tabs my-8 p-4 tabs-boxed align-center ">
        <p  className="text-2xl font-sans font-extrabold text-primary" >Recent Registers</p>
        <a className="tab">Customers</a> 
        <a className="tab tab-active">Riders</a> 
        <a className="tab">Stores</a>
      </div> */}

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Recent Registers"
            headerColor="primary"
            tabs={[
              {
                tabName: "Customers",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    // func={() => getCustomers(0, true)}
                    url="customers"
                  />
                )
              },
              {
                tabName: "Riders",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    // func={() => getDeliveryBoys(false, 0, true)}
                    url="deliveryboys"
                  />
                )
              },
              {
                tabName: "Stores",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    // func={() => getStores(0, true)}
                    url="stores"
                  />
                )
              }
            ]}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Latest Complains</h4>
              <p className={classes.cardCategoryWhite}>
                Below, You can see today's Complains
              </p>
            </CardHeader>
            <CardBody>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {complains?.map((complain, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{complain.id}</TableCell>
                        <TableCell><Avatar src={complain.customer_detail.user.image} />  {complain.customer_detail.user.username}</TableCell>
                        <TableCell>{complain.title}</TableCell>
                        <TableCell>
                          <Button onClick={() => history.push({ pathname: '/admin/complains/' + complain.id, complain: complain })} color="success" >View</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>

        {/* <Purchases /> */}
      </GridContainer>
    </div>
  );
}
