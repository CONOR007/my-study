const Vue = require("vue");
const express = require("express");
const server = express();
const fs = require('fs');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./index.template.html','utf-8');
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});
server.use('/dist',express.static('./dist'))
server.get("/", (req, res) => {
  renderer.renderToString({
    title:'标题',
    meta:`<meta name="description" content="标签需要三个{}"`
  },(err, html) => {
    if (err) {
      res.status(500).end("Internal Server Error");
			return; 
    }
    res.setHeader('Content-Type','text/html; charset=utf8')
    res.end(html); 
  });
});
server.listen(3000);