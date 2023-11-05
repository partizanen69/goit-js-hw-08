import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const lastPlayedSecondsKey = 'videoplayer-current-time';

window.onload = () => {
  const player = new Player(document.querySelector('iframe#vimeo-player'));

  let secondsVideoPlayed = null;

  try {
    const seconds = JSON.parse(localStorage.getItem(lastPlayedSecondsKey));
    if (typeof seconds === 'number') {
      secondsVideoPlayed = seconds;
    } else {
      console.warn(
        'secondsVideoPlayed parsed from localStorage was not a number:',
        secondsVideoPlayed,
        '. Setting it to 0'
      );
    }
  } catch (err) {
    console.error(
      'Could not parse last secondsVideoPlayed from localStorage because of error',
      err
    );
  }

  if (secondsVideoPlayed === null) {
    secondsVideoPlayed = 0;
  }

  player.setCurrentTime(secondsVideoPlayed).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.error(
          'the time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        console.error('some other error occurred', error);
        break;
    }
  });

  player.on(
    'timeupdate',
    throttle(message => {
      const { seconds } = message;
      localStorage.setItem(lastPlayedSecondsKey, JSON.stringify(seconds));
    }, 1000)
  );
};
