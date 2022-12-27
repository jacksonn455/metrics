const express = require("express");
const lynx = require("lynx");
const request = require("request");
const app = express();
var opt = {}; 
opt.prefix = 'SampleNodeJSApp';
var metrics = new lynx('graphite', 8125, opt); // StatsD IP & Port 

//Example1 - Hit Count Home Page
app.get("/", (req, res) => {
    res.send("Welcome to HomePage");
    metrics.increment('HomePage.hitcount');
});

//Example2 - Gauges App
app.get("/GaugesApp", (req, res) => {
    res.send("Welcome to GaugesApp Page");
    request.get({
        url : 'https://www.middlewareinventory.com',
        time : true
      },function(err, response){
        console.log('MWI Request time in ms', response.elapsedTime);
        metrics.gauge('GaugesApp.mwi', response.elapsedTime);
      });
      request.get({
        url : 'https://www.google.com',
        time : true
      },function(err, response1){
        console.log('Google Request time in ms', response1.elapsedTime);
        metrics.gauge('GaugesApp.google', response1.elapsedTime);
      });

      
      
      
});


//Example3 - Timer App
app.get("/TimerApp", (req, res) => {
    res.send("Welcome to TimerApp Page");
    request.get({
        url : 'https://www.middlewareinventory.com',
        time : true
      },function(err, response){
        console.log('Request time in ms', response.elapsedTime);
        metrics.timing('TimerApp.mwi', response.elapsedTime); 
      });

      request.get({
        url : 'https://www.google.com',
        time : true
      },function(err, response1){
        console.log('Request time in ms', response1.elapsedTime);
        metrics.timing('TimerApp.google', response1.elapsedTime); 
      });

      
      
      
      
});


 //Example4 - User Defined Sets
 app.get("/Sets", (req, res) => {
    metrics.set('Sets.user', 'Sarav');
    metrics.set('Sets.user', 'Sarav');
    if (Math.random() > 0.9) 
    { 
        metrics.set('Sets.user', 'Jarvis'); 
    }
    setTimeout(pick, 1000);
});


app.listen('8080', () => {
    console.log("Started Listening in Port 8080");
});