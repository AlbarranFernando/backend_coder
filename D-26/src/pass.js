const express = require('express')
const app = express()
const path = require('path');
app.set('views', path.join(__dirname + '/views'));
/////////////PASSPORT INICIO/////////////////
/* -------------- PASSPORT ----------------- */
const passport = require('passport');
const bCrypt = require('bCrypt');
const pkg =require('passport-local');
const { Strategy : LocalStrategy } = pkg;
const User = require ('../models/user');

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err)
          return done(err);
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false)
        }
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          console.log('message', 'Invalid Password');
          return done(null, false) 
        }
        return done(null, user);
      }
    );
  })
);

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use('register', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    const findOrCreateUser = function(){
     User.findOne({'username':username},function(err, user) {
       if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        if (user) {
          console.log('User already exists');
          console.log('message','User Already Exists');
          return done(null, false)
        } else {
          var newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);

          
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    }
    process.nextTick(findOrCreateUser);
  })
)
 
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
/* ----------------------------------------- */
const cookieParser =  require ('cookie-parser')
const session =  require ('express-session')
const MongoStore =  require ('connect-mongo')
app.use(cookieParser())

app.use(session({
  store: MongoStore.create({ 
      //En Atlas connect App: Make sure to change the node version to 2.2.12:
      //mongoUrl: 'mongodb://daniel:daniel123@cluster0-shard-00-00.nfdif.mongodb.net:27017,cluster0-shard-00-01.nfdif.mongodb.net:27017,cluster0-shard-00-02.nfdif.mongodb.net:27017/sesiones?ssl=true&replicaSet=atlas-bwvi2w-shard-0&authSource=admin&retryWrites=true&w=majority',
      mongoUrl: 'mongodb://localhost/sesiones',
      //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600000,
      autoRemove: 'native' // Default
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
      maxAge: 600000
  }
}))
app.use(passport.initialize());
app.use(passport.session());


/////////////PASSPORT FIN/////////////////

/////////////RUTAS PASS INICIO////////////////


app.use(express.urlencoded({extended: true}))

/* --------- LOGIN ---------- */
app.get('/login', (req,res) => {
  console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        res.render("carga", {
            nombre: req.user.username
        })
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html')
    }
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req,res) => {
    res.redirect('/')        
})

app.get('/faillogin', (req,res) => {
    res.render('login-error', {});
})

/* --------- REGISTER ---------- */
app.get('/register', (req,res) => {
    res.sendFile(process.cwd() + '/public/register.html')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), (req,res) => {
    res.redirect('/') 
})

app.get('/failregister', (req,res) => {
    res.render('register-error', {});
})

app.get('/logout', (req,res) => {
    let nombre = req.user.username
    req.logout()
    res.render("logout", { nombre })
})
module.exports = app