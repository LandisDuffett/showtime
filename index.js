const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

/*const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);*/
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
 
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempShow = fs.readFileSync(
  `${__dirname}/templates/template-show.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.Title, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    let movies = [];
    let series = [];
    //const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    /*const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
    cardsHtml.forEach(el => {
      if (el.Type === 'movie') {
        movies.push(el);
      }
      else {
        series.push(el);
      }
    });*/

    dataObj.forEach(el => {
      if (el.Type === 'movie') {
        movies.push(el);
      }
      else {
        series.push(el);
      }
    });
      
    movies = movies.map(el => replaceTemplate(tempCard, el)).join('');
    series = series.map(el => replaceTemplate(tempCard, el)).join('');
    const output1 = tempOverview.replace('{%MOVIE_CARDS%}', movies);
    const output2 = output1.replace('{%SERIES_CARDS%}', series);
    res.end(output2);

  } else if (pathname === '/show') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    console.log(query.id);
    const show = dataObj[query.id];
    const output = replaceTemplate(tempShow, show);
    res.end(output);

  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>page not found</h1>');
  }
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Listening to requests on port 8080');
})