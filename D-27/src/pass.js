const express = require('express')
const app = express()
const path = require('path');
app.set('views', path.join(__dirname + '/views'));
/////////////PASSPORT INICIO/////////////////
/* -------------- PASSPORT ----------------- */
const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;
const bCrypt = require('bCrypt');
const pkg =require('passport-local');
const { Strategy : LocalStrategy } = pkg;
const User = require ('../models/user');

const FACEBOOK_CLIENT_ID = '315974313260683';
const FACEBOOK_CLIENT_SECRET = '1ceb7ea6bd853655fc646f96fb6941cf';

/* passport.use('login', new FacebookStrategy({
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
) */;

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, function(accessToken, refreshToken, profile, done) {
    let userProfile = profile;
    return done(null, userProfile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
 
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
}); */
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
          nombre: req.user.displayName,
          foto: req.user.photos[0].value,
          email: req.user.emails[0].value,
          contador: req.user.contador 
        })
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html')
    }
})

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/carga', 
    failureRedirect: '/faillogin' }
));

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req,res) => {
    res.redirect('/')        
})

app.get('/carga', (req,res) => {
  console.log(req.user)
   res.redirect('/')        
})

app.get('/faillogin', (req,res) => {
    res.render('login-error', {});
})

/* --------- REGISTER ---------- */
/* app.get('/register', (req,res) => {
    res.sendFile(process.cwd() + '/public/register.html')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), (req,res) => {
    res.redirect('/') 
})

app.get('/failregister', (req,res) => {
    res.render('register-error', {});
}) */

app.get('/logout', (req,res) => {
    let nombre = req.user.username
    req.logout()
    res.render("logout", { nombre })
})
module.exports = app