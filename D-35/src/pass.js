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

const FACEBOOK_CLIENT_ID = '435181561005181';
const FACEBOOK_CLIENT_SECRET = '0f2ec87d61d4099d2229cd0acc49c207';

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
////////////////NODEMAILER  INICIO//////////////

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host:'smtp.ethereal.email',
  port:587,
  auth: {
      user:'malvina.rempel@ethereal.email',
      pass:'PcSzrQQSfxQGwdDn52'
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})

const transporterGm = nodemailer.createTransport({
  service:'gmail',
  auth:{

    user:'xbackendx@gmail.com',
    pass:'abC12345679'
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})


////////////////NODEMAILER  FIN//////////////

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

app.get('/auth/facebook', passport.authenticate('facebook' ));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
   { successRedirect: '/login-email', 
    failureRedirect: '/faillogin' }
));

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req,res) => {
 
    res.redirect('/')        
})

app.get('/login-email', (req,res) => {
  console.log('ES POR ACA LOGIN');
  let nombre = req.user.displayName;
  let foto = req.user.photos[0].value;
  const mailOptions ={
    from:'Servidor Node.js',
    to:'malvina.rempel@ethereal.email',
    subject:'Login',
    html:'Ingreso ' + nombre + ' en la fecha ' + new Date().toLocaleString()
  }

  transporter.sendMail(mailOptions, (err, info)=>{
    if(err) {
        console.log(err)
        return err
    }
    console.log(info)
  })

  const mailOptionsGm ={
    from:'Servidor Node.js',
    to:'malvina.rempel@ethereal.email',
    to:'xbackendx@gmail.com',
    subject:'Login GM',
    html:'Ingreso ' + nombre + ' en la fecha ' + new Date().toLocaleString(),
    attachments: [
      {   // filename and content type is derived from path
          path: foto,
          filename: 'foto.jpg',
      }
  ] 
  }

  transporterGm.sendMail(mailOptionsGm, (err, info)=>{
    if(err) {
        console.log(err)
        return err
    }
    console.log(info)
  })


  res.redirect('/carga') 
})


app.get('/carga', (req,res) => {
 // console.log(req.user)
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
  console.log("ES POR ACA LOGOUT");
  let nombre = req.user.displayName;
  const mailOptions ={
    from:'Servidor Node.js',
    to:'malvina.rempel@ethereal.email',
    subject:'Logout',
    html:'Egreso ' + nombre + ' en la fecha ' + new Date().toLocaleString()
  }
  transporter.sendMail(mailOptions, (err, info)=>{
    if(err) {
        console.log(err)
        return err
    }
    console.log(info)

  })

    req.logout()
    res.render("logout", { nombre })
})
module.exports = app