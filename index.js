

var request = require('request');
const moment = require('moment');
require('moment-duration-format');
const linkId = "aNaxZZZCEPQ";
const apiKey = "AIzaSyAoyN3b1hH4VTIe0ta2d5E0zgXg--Hg0l4";
var options = {
  'method': 'GET',
  'url': `https://www.googleapis.com/youtube/v3/videos?id=${linkId}&part=snippet,contentDetails,statistics&key=${apiKey}`,
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const data = JSON.parse(response.body);
  if('error' in data) {
    return console.log("API key not valid. Please pass a valid API key.");
  } else if(data.items[0]) {
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
    }
    console.log(Data_JSON)
    //return DataJSON = JSON.stringify("");
  } else {
    return console.log("Invalid Video ID");
  }
});
