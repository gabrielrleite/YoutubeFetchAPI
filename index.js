

var request = require('request');
const moment = require('moment');
require('moment-duration-format');
const { URL } = require('url');
const validator = require('validator');

function linkConverter(link) {
    const fullLink = link.startsWith('http') ? link : `https://${link}`;
    const url = new URL(fullLink);
    const pathName = url.pathname;

    let result = '';

    switch (true) {
        case pathName.startsWith('/watch'):
            const videoId = url.searchParams.get('v');
            result = videoId;
            break;

        case pathName.startsWith('/shorts'):
            const shortId = pathName.split('/')[2];
            result = shortId;
            break;

        case pathName.startsWith('/channel'):
            const channelId = pathName.split('/')[2];
            result = channelId;
            break;

        case pathName.startsWith('/'):
            let channelName = pathName.split('/')[1];
            if (channelName.startsWith('@')) {
                channelName = channelName.substring(1);
            }
            result = channelName;
            break;

        default:
            result = 'Invalid URL';
            break;
    }

    return result;
}

function videoInfo(apiKey, linkId) {
    return new Promise((resolve, reject) => {
      const videoId = linkConverter(linkId);
      const options = {
        method: 'GET',
        url: `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${apiKey}`,
        headers: {}
      };
      
      request(options, function (error, response) {
        if (error) return reject(new Error(error));
  
        const data = JSON.parse(response.body);
  
        if ('error' in data) {
          return reject("API key not valid. Please pass a valid API key.");
        } else if (data.items[0]) {
          const idInfo = data.items[0].id;
          const mainInfo = data.items[0].snippet;
          const statisticsInfo = data.items[0].statistics;
          const contentInfo = data.items[0].contentDetails;
          const durationInfo = contentInfo.duration;
  
          const parseDuration = (isoDuration) => {
            const duration = moment.duration(isoDuration);
  
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();
  
            return { days, hours, minutes, seconds };
          };
  
          const { days, hours, minutes, seconds } = parseDuration(durationInfo);
  
          const Data_JSON = {
            id: idInfo,
            channelName: mainInfo.channelTitle,
            title: mainInfo.title,
            isLive: mainInfo.liveBroadcastContent,
            duration: {
              time: durationInfo,
              days: days,
              hours: hours,
              minutes: minutes,
              seconds: seconds,
            },
            description: mainInfo.description,
            statistics: statisticsInfo,
            thumbnails: mainInfo.thumbnails
          };
  
          return resolve(Data_JSON);
        } else {
          return reject("Invalid Video ID");
        }
      });
    });
  }

  function isChannelId(channelId) {
    const channelIdPattern = /^UC[a-zA-Z0-9_-]{22}$/;
    return channelIdPattern.test(channelId);
}

  function getYouTubeChannelUrl(linkId, apiKey) {
    if (!validator.isURL(linkId) && !isChannelId(linkId)) {
        if (linkId.startsWith('@') ) {
            linkId = linkId.substring(1);
        }
        return `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forUsername=${linkId}&key=${apiKey}`;
    } else if (isChannelId(linkId)) {
        return `https://www.googleapis.com/youtube/v3/channels?id=${linkId}&part=snippet,contentDetails,statistics&key=${apiKey}`;
    } else {
        const channelId = linkConverter(linkId);
        return `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet,contentDetails,statistics&key=${apiKey}`;
    }
}

  function channelInfo(apiKey, linkId) {
    return new Promise((resolve, reject) => {
    try {
        const url = getYouTubeChannelUrl(linkId, "AIzaSyAoyN3b1hH4VTIe0ta2d5E0zgXg--Hg0l4");

        const options = {
            method: 'GET',
            url: url,
            headers: {}
        };
        request(options, function (error, response, body) {
                if (error) {
                    console.error('Request failed:', error);
                    return;
                }

                const data = JSON.parse(body);

                
                if ('items' in data) {
                    const subData = data.items[0];
                    const channelId = subData.id;
                    const mainData = subData.snippet;
                    const statisticsData = subData.statistics;
                    const channelJSON = {
                        id: channelId,
                        title: mainData.title,
                        description: mainData.description,
                        customUrl: mainData.customUrl,
                        publishedAt: mainData.publishedAt,
                        statistics: statisticsData

                    };
                    return resolve(channelJSON);
                } else {
                    return reject('Invalid Channel')
                }
            });
    } catch (error) {
        console.error(error.message);
    }
  });
}


module.exports = {videoInfo, channelInfo};