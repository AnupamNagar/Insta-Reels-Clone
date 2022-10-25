import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button,  CardActions } from '@mui/material';
// import { makeStyles } from '@mui/material/styles';
import './forgotpasssword.css';
import  insta  from '../images/instagram.png';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { Authcontext } from '../context/Authcontext';
import { Link , useNavigate } from 'react-router-dom';



export default function Forgotpassword() {

  const [email , setemail] = React.useState('');
  const [error , seterror] = React.useState('');
  const [loading , setloading] = React.useState(false);
  const {forgotpasssword} = useContext(Authcontext);
  const navigate = useNavigate();

  const handleclick = async() =>{
    try{
      seterror('');  // initially no error if email is correct
      setloading(true); // button disabled ho jayega
      await forgotpasssword(email);
      setloading(false);  // button enable ho jayega 
      navigate('/login');
    }
    catch(err){
      seterror(err.message);
      setTimeout(() => {
        seterror('');
      }, 2000);
      setloading(false);
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='login-card'>
        <Card variant='outlined'>
          <div className='insta-logo'>
            <img src={insta} alt= ''></img>
          </div>
          {/* <CardActionArea> */}
            <CardContent>
                {
                  error !== '' && <Alert severity="error">{error}</Alert>
                }
              <TextField id="outlined-basic" label="email" variant="outlined" fullWidth margin='dense' size='small' 
                value={email} onChange={(e) => setemail(e.target.value)} />  
            </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Button  color="primary" fullWidth variant='contained' onClick={handleclick} disabled={loading} >
              Send Email
            </Button>
          </CardActions>
          
        </Card>
        <Card sx={{marginTop:'2%'}}>
            <CardContent>
              <Typography sx={{color:'grey' , textAlign:'center' , height:'1vh' , marginTop:'2%'}} variant="subtitle1" >
                Don't have an account?  <Link to ='/signup' style={{textDecoration:'none' , color:'blue'}}>Sign up</Link>
              </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
