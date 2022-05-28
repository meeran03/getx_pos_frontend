import React from 'react'
import {Grid, Typography,Card, CardContent} from '@material-ui/core'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
import {useParams} from 'react-router-dom' 
import moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '@material-ui/core'
import { answerComplain } from 'Services/Complains'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Loading from '../../components/Loading/Loading'


export default function ComplainDetail(props) {
    const {id} = useParams()
    let {complain} = props.location
    const [answer,setAnswer] = React.useState(null)
    const [errorMsg,setMsg] = React.useState(false)
    const [err,setErr] = React.useState(false);
    const [type,setType] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log(complain.answer)
        setAnswer(complain.answer)
    },[])

    const handleSubmit = () => {
        setLoading(true)
        answerComplain(answer,id).then(res => {
            setMsg("Email Sent Successfully")
            setType("success")
            setLoading(false)
            setErr(true)
        }).catch(e => {
            setLoading(false)
            if (!e.response) setMsg("Network Error")
            else setMsg(e.response.data.detail)
            setType("error")
            setErr(true)
        })
    }

    const handleInstanceReady = ( { editor } ) => {
        // Will be triggered only once, when editor is ready for interaction.
            editor.setData( answer );
    };
    return (
        <Grid container>
            <Loading open={loading} />
            <Snackbar open={err} autoHideDuration={2000} onClose={() => {
                setErr(false)
                window.location.reload()
              }} >
                <Alert  severity={type}>
                  {errorMsg ||"Nothing Here" }
                </Alert>
            </Snackbar>
            <Grid item xs={12} sm={12} md={12} >
                <Typography gutterBottom variant="h4" >Complain Details</Typography>
                <Card>
                    <CardHeader>
                        <Typography gutterBottom variant="p" >Complain id #{id}</Typography>
                    </CardHeader>
                    <CardContent >
                        <div style={{flex:1,flexDirection:'row',display:'flex',justifyContent:"space-between"}}>
                            <Typography  >Customer Name</Typography>
                            <Typography  >{complain.customer_detail.user.username}</Typography>
                        </div>
                        <div style={{flex:1,flexDirection:'row',display:'flex',justifyContent:"space-between"}}>
                            <Typography  >Customer Email</Typography>
                            <Typography  >{complain.customer_detail.user.email}</Typography>
                        </div>
                        <div style={{flex:1,flexDirection:'row',display:'flex',justifyContent:"space-between"}}>
                            <Typography  >Date Created</Typography>
                            <Typography  >{moment(complain.date).format('LLL')}</Typography>
                        </div>

                        <div style={{marginTop:'20px'}}>
                            <Typography  gutterBottom variant="h5" >Title</Typography>
                            <Typography color="textSecondary" >{complain.title}</Typography>
                        </div>

                        <div style={{marginTop:'20px'}}>
                            <Typography  gutterBottom variant="h5" >Message</Typography>
                            <Typography color="textSecondary" >{complain.query}</Typography>
                        </div>
    
                    </CardContent>

                </Card>
            </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <CKEditor
                       editor={ ClassicEditor }
                        data={answer && answer}
                        onInstanceReady={handleInstanceReady}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                            editor.setData(complain.answer)
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setAnswer(data)
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                    
                    <br />
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        fullWidth
                    >
                        Send Mail
                    </Button>
                </Grid>
        </Grid>
    )
}