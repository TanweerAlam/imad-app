var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').pool;
var app = express();

var config = {
    user: 'tanweeralam1312',
    database: 'tanweeralam1312',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
app.use(morgan('combined'));

var articles = {
    'article-one' : {
        title: 'Article-one: Tanweer',
        heading: 'Article-one',
        date: 'Sep 5, 2016',
        content: `
            <p>This is some content of article-one. This is some content of article-one. This is some content of article-one. This is some content of article-one.
                This is some content of article-one. This is some content of article-one. This is some content of article-one. 
            </p>
        
            <p>This is some content of article-one. This is some content of article-one. This is some content of article-one. This is some content of article-one.
                This is some content of article-one. This is some content of article-one. This is some content of article-one. 
            </p>
        
            <p>This is some content of article-one. This is some content of article-one. This is some content of article-one. This is some content of article-one.
                This is some content of article-one. This is some content of article-one. This is some content of article-one. 
            </p>
            `
    },
    'article-two' : {
        title: 'Article-two: Tanweer',
        heading: 'Article-two',
        date: 'Sep 10, 2016',
        content: `
            <p>This is some content of article-two. This is some content of article-two. This is some content of article-two. This is some content of article-two.
                This is some content of article-two. This is some content of article-two. This is some content of article-two. 
            </p>
            `
    },
    'article-three': {
        title: 'Article-three: Tanweer',
        heading: 'Article-three',
        date: 'Dec 13, 2016',
        content: `
            <p>This is some content of article-three. This is some content of article-three. This is some content of article-three. This is some content of article-three.
                This is some content of article-three. This is some content of article-three. This is some content of article-three. 
            </p>
            `
    }
};

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/ui/style.css" rel="stylesheet"/>
      </head>
      <body>
        <div class="container">
          <div>
            <a href="/">Home</a>
          </div>
          <hr/>
          <h3>${heading}</h3>
          <div>
            ${date}
          </div>
          <div>
            ${content}
          </div>
        </div>
      </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res){
    //make a select request
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    //return a response with the results
});

var counter = 0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

//Recieving the Names 
var names = [];
app.get('/submit-name', function(req, res){ //URL: submit-name?name=xxxxx in query
    //Get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //Sending array is not possible so we'll use JSON strings
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function(req, res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
