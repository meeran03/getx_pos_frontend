import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import { sendNotification } from '../../Services/Notifications.js'
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Loading from '../../components/Loading/Loading'
import { FormControl } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import Picker from 'emoji-picker-react';


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {

  const [title, setTitle] = React.useState()
  const [message, setMessage] = React.useState()

  const [errorMsg, setMsg] = React.useState(false)
  const [err, setErr] = React.useState(false);
  const [type, setType] = React.useState("error");
  const [loading, setLoading] = React.useState(false);
  const [noType, setNoType] = React.useState('ALL');

  const handleSubmit = () => {
    setLoading(true)
    sendNotification(title, message, noType).then(res => {
      setMsg("This notification was sent")
      setLoading(false)
      setType("success")
      setErr(true)
    }).catch(e => {
      setLoading(false)
      if (!e.response) setMsg("Network Error")
      else setMsg(e.response.data.detail)
      setType("error")
      setErr(true)
    })
  }

  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMessage(message + emojiObject.emoji)
  };

  return (
    <div>
      <Loading open={loading} />
      <Snackbar open={err} autoHideDuration={6000} onClose={() => {
        setErr(false)
        window.location.reload()
      }} >
        <Alert severity={type}>
          {errorMsg || "Nothing Here"}
        </Alert>
      </Snackbar>
      <div className='mockup-code bg-white text-primary-content' >
        <div className='card card-bordered p-8' >
          <div color="primary">
            <p className='text-primary font-sans font-bold text-4xl ' >Send Notifications</p>
            <p className='py-2 text-black font-sans font-light text-xl '>Use this to send Notifications to Every Member of Getx</p>
          </div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Send To</FormLabel>
              <RadioGroup row aria-label="send2" name="send21" value={noType} onChange={(e) => setNoType(e.target.value)}>
                <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
                <FormControlLabel value="STORE" control={<Radio />} label="STORES" />
                <FormControlLabel value="RIDER" control={<Radio />} label="RIDERS" />
                <FormControlLabel value="CUSTOMER" control={<Radio />} label="CUSTOMERS" />
              </RadioGroup>
            </FormControl>
            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-mono">Notification Title</span>
                </label>
                <textarea
                  class="textarea text-white h-24 textarea-bordered"
                  placeholder="Title"
                  onChange={e => (setTitle(e.target.value))}
                  value={title}
                ></textarea>
              </div>
            </div>

            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-mono">Notification Message</span>
                </label>
                <div class="flex flex-row justify-between " >
                  <textarea
                    class="w-2/3 textarea text-white h-24 textarea-bordered"
                    placeholder="Message"
                    onChange={e => (setMessage(e.target.value))}
                    value={message}
                  ></textarea>
                  <Picker className='w-1/3' onEmojiClick={onEmojiClick} />
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} class="my-3 btn btn-primary">Send Notification</button>
          </div>
        </div>
      </div>
    </div>
  );
}
