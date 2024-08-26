
# YoutubeFetchAPI

A simplified module for making requests with the YouTube Data API v3


## Install

```sh
$ npm install youtubefetchapi
```
# API Key

Get your YouTube Data API v3 Key here [https://console.cloud.google.com/apis/api/youtube.googleapis.com](https://console.cloud.google.com/apis/api/youtube.googleapis.com)
## Usage

```js
const { channelInfo } = require('youtubefetchapi');

try { // Support ChannelId && Username
    const response = await channelInfo(apiKey, channelId);
    console.log(response); // Return a JSON response;
  } catch (error) {
    console.error(error);
  }

/* Response
{
  id: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
  title: 'Google for Developers',
  description: 'Subscribe to join a community of creative developers and learn the latest in Google technology — from AI and cloud, to mobile and web.\n' +
    '\n' +
    'Explore more at developers.google.com\n' +
    '\n',
  customUrl: '@googledevelopers',
  publishedAt: '2007-08-23T00:34:43Z',
  statistics: {
    viewCount: '308604576',
    subscriberCount: '2380000',
    hiddenSubscriberCount: false,
    videoCount: '6265'
  }
}
*/
```


```js
const { videoInfo } = require('youtubefetchapi');

try { // Suport Video Url && Video Id
    const response = await videoInfo(apiKey, videoId);
    console.log(response); // Return a JSON response;
} catch (error) {
    console.error(error);
  }

/* Response
{
  id: 'bC8fvcpocBU',
  channelName: 'Google for Developers',
  title: 'Introducing Google for Developers!',
  isLive: 'none',
  duration: { time: 'PT1M19S', days: 0, hours: 0, minutes: 1, seconds: 19 },
  description: 'Welcome to Google for Developers - your one-stop destination for developer news, project inspiration, technical tutorials, and community building with other Google developers. This channel is 
where creativity meets technical expertise, helping you create cross-platform solutions for mobile web, cloud, and - you guessed it - machine learning. So, what are you waiting for? Hit that subscribe button 
and join our vibrant community of developers and innovators. Be the first to access exclusive content, live streams, and updates on the latest Google developer tools.\n' +
    '\n' +
    'Resources:\n' +
    '\n' +
    'Subscribe to Google for Developers → https://goo.gle/developers \n' +
    '\n' +
    '#GoogleDeveloper',
  statistics: {
    viewCount: '69351',
    likeCount: '777',
    favoriteCount: '0',
    commentCount: '37'
  },
  thumbnails: {
    default: {
      url: 'https://i.ytimg.com/vi/bC8fvcpocBU/default.jpg',
      width: 120,
      height: 90
    },
    medium: {
      url: 'https://i.ytimg.com/vi/bC8fvcpocBU/mqdefault.jpg',
      width: 320,
      height: 180
    },
    high: {
      url: 'https://i.ytimg.com/vi/bC8fvcpocBU/hqdefault.jpg',
      width: 480,
      height: 360
    },
    standard: {
      url: 'https://i.ytimg.com/vi/bC8fvcpocBU/sddefault.jpg',
      width: 640,
      height: 480
    },
    maxres: {
      url: 'https://i.ytimg.com/vi/bC8fvcpocBU/maxresdefault.jpg',
      width: 1280,
      height: 720
    }
  }
} */
```
## Author

- [@gabrielrleite](https://github.com/gabrielrleite)

