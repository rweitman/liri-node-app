var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

var twitterClient = new Twitter(twitterKeys);
var spotifyClient = new Spotify(spotifyKeys);