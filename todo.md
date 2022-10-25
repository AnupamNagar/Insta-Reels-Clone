# install
npx create-react-app
npm i react router dom 

# Material UI for styling
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

# signup page
copy "card"  from mui
for styling : sx={{color:'grey' , textAlign:'center'}} 
for input box => <TextField id="outlined-basic" label="Outlined" variant="outlined" />

# login page
copy & paste signup page & then modified it .
we use "caraousel concept" in it .
npm i pure-react-carousel

# Routing
<!-- <BrowserRouter>
      <Routes>
        <Route path="/login" element ={<Login></Login>} />
        <Route path="/signup" element ={<Signup></Signup>} />
      </Routes>
</BrowserRouter> -->

# firebSE.JS

# context Api
* Authcontext.JS
now signup page par signup ka function dene ke liye =>
* signup.js => import { Authcontext } from '../context/Authcontext';
    const {signup} = React.useContext(Authcontext);
* login.js => import { Authcontext } from '../context/Authcontext';
    const {login} = React.useContext(Authcontext);

# privateroute.js 
* if {user signup karke aya ho ya pahle se login ho tab hi vo Feed.js ke page par jaa sakata hai}
  else { user login page par redirect ho jayega }

# Forgotpassword.js
copy & paste login.js & login.css and then modified it.

# uploadfile.js
for uuid => npm i uuid

# post.js
# videos.js
# like.js
  like => daatabase updated
  onsnapshot => post data updated then
  like ka useeffect chalega dubara 
  & like state got updated 

# Navbar.js
* search for appbar on mui & copy & paste

# Intersection Observer Api => ye hume browser ke environment me mil jati h 
* we can resolve lazy loading feature using this Api
* Autoscrool feature 
* Infinite Scroll
* htmlelement.play() el async function h .  to jo video intersect nahi ho rahi hogi use pause karva denge
### IOA mujhe samajh me nahi ayi

# Deployment
  * npm install firebase-tools -g
  * firebase login/logou  => press Y
  * firebase init 
  * firebase use --add (optinally when we add another project)
  * press build
  * no
  * no
  * npm run build
  * firebase deploy