import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { CircularProgress } from '@material-ui/core';
import { Typography } from '@material-ui/core';


export default function AlertDialogSlide(props) {


  return (
    <div>
      <Dialog
        open={props.open}
        keepMounted
        aria-labelledby="loading-title"
        aria-describedby="loading-description"
      >
        <DialogContent>
          <DialogContentText style={{display:"flex",alignItems : "center",justifyContent : "center"}} id="loading-description">
                <CircularProgress color="secondary" style={{alignSelf :"center"}} /><br/>
                <Typography style={{marginLeft: '20px'}} >PLEASE WAIT</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}