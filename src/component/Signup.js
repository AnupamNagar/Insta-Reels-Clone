import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button,  CardActions} from '@mui/material';
// import { makeStyles } from '@mui/material/styles';
import './signup.css';
import  insta  from '../images/instagram.png';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { Link ,  useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import { database, storage } from '../Firebase';
// import { async } from '@firebase/util';

export default function Signup() {

  // const usestyles = makeStyles({
  //   text1 : {
  //     color:'grey',
  //     textAlign:'center'
  //   }
  // })

  // const classes = usestyles();

  const [email, setemail] = useState('');
  const [password , setpassword] = useState('');
  const [name , setname] = useState('');
  const [file , setfile] = useState(null);
  const [error , seterror] = useState('');
  const [loading , setloading] = useState(false);
  // const history = unstable_HistoryRouter();  
  const navigate = useNavigate();  // instead of useHistory
  const {signup} = React.useContext(Authcontext);

  const handleclick = async() =>{
    if(file == null){
      seterror('please uload your profile picture')
      setTimeout(() => {
        seterror('');
      }, 3000);
    }
    try{
      seterror('')
      setloading(true)
      let userobj = await signup(email, password)
      let uid = userobj.user.uid

      //profile picture upload karne ke liye 
      const uploadtask = storage.ref(`/users/${uid}/profileImage`).put(file);
      uploadtask.on('state_changed' , fn1, fn2 , fn3);

      function fn1(snapshot){
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log(`upload is ${progress} % done .`)
      }
      function fn2(err){
        seterror(err.message);
        setTimeout(() =>{
          seterror('')
        }, 2000)
        setloading(false);
        return ;
      }
      function fn3(){
        uploadtask.snapshot.ref.getDownloadURL().then((url) =>{
          console.log(url);
          database.users.doc(uid).set({
            email : email,
            userId : uid,
            fullname: name,
            profileUrl : url,
            createdAt : database.getTimeStamp()
          })
                
        })
        setloading(false)
        navigate('/');  
      }
    }
    catch(err){
      seterror(err.message);
      setTimeout(() => {
        seterror('')
      }, 3000);
    }
  }

  return (
    <div className='signup-wrapper'>
      <div className='signup-card'>
        <Card variant='outlined'>
          <div className='insta-logo'>
            <img src={insta} alt= ''></img>
          </div>
          {/* <CardActionArea> */}
            <CardContent>
              <Typography sx={{color:'grey' , textAlign:'center'}} variant="subtitle1" >
                Sign Up to see photos & videos from your friend
              </Typography>
              {
                error !== '' && <Alert severity="error">{error}</Alert>
              }

              <TextField id="outlined-basic" label="email" variant="outlined" fullWidth margin='dense' size='small'
                  value={email} onChange={(e)=>setemail(e.target.value)}/> 
              <TextField id="outlined-basic" label="username" variant="outlined" fullWidth margin='dense' size='small'
                  value={name} onChange={(e)=>setname(e.target.value)} /> 
              <TextField id="outlined-basic" label="password" variant="outlined" fullWidth margin='dense' size='small'
                  value={password} onChange={(e)=>setpassword(e.target.value)}/> 
              <Button color="secondary" fullWidth variant='outlined' startIcon={<CloudUploadIcon />}  component='label'>
                <input type='file' accept= 'image/*' hidden onChange={(e)=>setfile(e.target.files[0])}></input>
                Upload Profile Picture
              </Button>
            </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Button  color="primary" fullWidth variant='contained' disabled={loading} onClick={handleclick}>
              Sign up
            </Button>
          </CardActions>
          <CardContent>
              <Typography sx={{color:'grey' , textAlign:'center'}} variant="subtitle1" >
              By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
              </Typography>
          </CardContent>
        </Card>
        <Card sx={{marginTop:'2%'}}>
            <CardContent>
              <Typography sx={{color:'grey' , textAlign:'center' , height:'1vh' , marginTop:'2%'}} variant="subtitle1" >
                Have an account ? <Link to ='/login' style={{textDecoration:'none' , color:'blue'}}>Login</Link>
              </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
