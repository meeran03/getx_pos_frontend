import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { Avatar } from "@material-ui/core";
import {useHistory} from 'react-router-dom'
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Tasks(props) {

  const classes = useStyles();
  const { func, rtlActive,url } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive
  });
  const [tasks,setTask] = React.useState(null)

  const history  = useHistory()
  React.useEffect(() => {
    func().then(res => {
      setTask(res)
      console.log("Tasks are : ", res)
    })

  },[])
  
  return (
    <Table className={classes.table}>
      <TableBody>
        {tasks?.map(task => (
          <TableRow key={task} className={classes.tableRow}>

            <TableCell className={tableCellClasses}>
              <Avatar src={task && task.user.image} />
            </TableCell>
            <TableCell className={tableCellClasses}>{task && task.user.username}</TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="View User"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button color="primary"
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick={() => history.push({pathname : `/admin/${url}/` + task.id, item : task.user})}
                >
                  View
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
};
