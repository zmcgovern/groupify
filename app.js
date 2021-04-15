var express = require('express'),
  session = require('express-session'),
  passport = require('passport'),
  SpotifyStrategy = require('passport-spotify').Strategy,
  consolidate = require('consolidate');
require('dotenv').config();
var request = require('request');
var mysql = require('mysql');

// Connect to local database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "groupify"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var port = 8810;
var authCallbackPath = '/auth/spotify/callback';



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.

//Stores necessary information in database
var top_pick = [];
var discord = [];
var description = [];
var top_artists = [];
var top_artists_txt = '';
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:' + port + authCallbackPath,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log('Profile: ', profile)
        var options = {
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          console.log(body);
          let listening_data = body;
            var genres_array = [];
            var i;
            for (i = 0; i < listening_data.items.length; i++) {
              listening_data.items[i].genres.forEach(a => genres_array.push(a));
            }      
            
            var z;
            for (z = 0; z < listening_data.items.length; z++) {
              top_artists.push(listening_data.items[z].name);
            } 

            var y;
            for (y = 0; y < top_artists.length; y++) {
              if (y==0) {
                top_artists_txt += top_artists[y];
              }
              else if (top_artists[y]==top_artists[-1]) {
                top_artists_txt += ", and " + top_artists[y];
              }
              else {
              top_artists_txt += ", " + top_artists[y];
              }
            } 

            var j;
            var pop_genre=0;
            var rock_genre=0;
            var house_genre=0;
            var edm_genre=0;
            var rap_genre=0;
            var rb_genre=0;
            var hh_genre=0;
            var country_genre=0;
            var indie_genre=0;
            var unique_genre=1;

            for (j = 0; j < genres_array.length; j++) {
                if (genres_array[j].includes('pop')) {
                    pop_genre+=1;
                }
                if (genres_array[j].includes('rock')) {
                    rock_genre+=1;
                }
                if (genres_array[j].includes('house')) {
                    house_genre+=1;
                }
                if (genres_array[j].includes('edm')) {
                    edm_genre+=1;
                }
                if (genres_array[j].includes('rap')) {
                    rap_genre+=1;
                }
                if (genres_array[j].includes('r&b')) {
                  rb_genre+=1;
                }
                if (genres_array[j].includes('hip hop')) {
                  hh_genre+=1;
                }
                if (genres_array[j].includes('country')) {
                  country_genre+=1;
                }
                if (genres_array[j].includes('indie')) {
                  indie_genre+=1;
                }
            }  
            var obj = {
              pop: pop_genre, rock: rock_genre, house: house_genre, edm:edm_genre, rap:rap_genre, rb:rb_genre, hh:hh_genre, country:country_genre, indie:indie_genre, unique:unique_genre 
          };
            function findMax(obj) {
              var keys = Object.keys(obj);
              var max = keys[0];
              for (var i = 1, n = keys.length; i < n; ++i) {
                 var k = keys[i];
                 if (obj[k] > obj[max]) {
                    max = k;
                 }
              }
              return max;
          }
          
          var top_genre = findMax(obj);
        con.query("REPLACE INTO user (user_id, username, email, accessToken, refreshToken, top_genre, top_artists) VALUES ('"+profile.id+"', '"+profile.displayName+"', '"+profile.emails[0].value+"', '"+accessToken+"', '"+refreshToken+"', '"+top_genre+"', '"+JSON.stringify(top_artists)+"')", function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        con.query("SELECT genres.genre_name FROM genres LEFT JOIN user ON user.top_genre = genres.top_genre WHERE genres.top_genre = '"+top_genre+"'", function (err, result) {
          if (err) throw err;
          console.log('>> results: ', result );
          var string=JSON.stringify(result);
          console.log('>> string: ', string );
          var json =  JSON.parse(string);
          console.log('>> json: ', json);
          var result_genre =  json[0].genre_name;
          console.log('>> genre: ', result_genre);
          console.log('>> type ', typeof result_genre);
          top_pick.length = 0;
          top_pick.push(result_genre);
          console.log('>> variable ',top_pick);
      });
      con.query("SELECT genres.discord_link FROM genres LEFT JOIN user ON user.top_genre = genres.top_genre WHERE genres.top_genre = '"+top_genre+"'", function (err, result) {
        if (err) throw err;
        console.log('>> results: ', result );
        var string=JSON.stringify(result);
        console.log('>> string: ', string );
        var json =  JSON.parse(string);
        console.log('>> json: ', json);
        var result_link =  json[0].discord_link;
        console.log('>> genre: ', result_link);
        discord.length = 0;
        discord.push(result_link);
        console.log('>> variable ',discord);
    });
    con.query("SELECT genres.genre_description FROM genres LEFT JOIN user ON user.top_genre = genres.top_genre WHERE genres.top_genre = '"+top_genre+"'", function (err, result) {
      if (err) throw err;
      console.log('>> results: ', result );
      var string=JSON.stringify(result);
      console.log('>> string: ', string );
      var json =  JSON.parse(string);
      console.log('>> json: ', json);
      var result_description =  json[0].genre_description;
      console.log('>> genre: ', result_description);
      description.length = 0;
      description.push(result_description);
      console.log('>> variable ',description);
  });
        return done(null, profile);
      });
    });
    }
  )
);

var app = express();
// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(
  session({secret: 'keyboard cat', resave: true, saveUninitialized: true})
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

app.engine('html', consolidate.nunjucks);

app.get('/', function (req, res) {
  res.render('index.html', {user: req.user, artists: top_artists_txt});
});

// function findtxt(list) {
//   var y;
//   var top_txt = '';
//   for (y = 0; y < list.length; y++) {
//     top_txt += "<br>" + list[y];
//     console.log(top_artists_txt);
//   } 
//   console.log('>function',top_txt)
//   return top_txt
// }


app.get('/group', ensureAuthenticated, function (req, res) {
  res.render('group.html', {user: req.user, most_listened: top_pick[0], best_description: description[0], chosen_link: discord[0]}
    );
});

app.get('/aboutus', ensureAuthenticated, function (req, res) {
  res.render('About-Us.html', {user: req.user}
    );
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private','user-top-read'],
    showDialog: true,
  })
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  authCallbackPath,
  passport.authenticate('spotify', {failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


app.listen(port, function () {
  console.log('App is listening on port ' + port);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}