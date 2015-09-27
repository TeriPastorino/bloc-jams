var createSongRow = function (songNumber, songName, songLength) {
    
  filterTimeCode(songLength);
    var template = 
          '<tr class="album-view-song-item">' 
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>' 
        + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>' 
        + '</tr>'
        ;
    
    var $row = $(template);

var clickHandler = function () {

  var songNumber = parseInt($(this).attr('data-song-number'));

  if (currentlyPlayingSongNumber !== null) {
    var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    currentlyPlayingCell.html(currentlyPlayingSongNumber);
  }
  if (currentlyPlayingSongNumber !== songNumber) {
    $(this).html(pauseButtonTemplate);
    setSong(songNumber - 1);
    updatePlayerBarSong();
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();

    var $volumeFill = $('.volume .fill');
    var $volumeThumb = $('.volume .thumb');
    $volumeFill.width(currentVolume + '%');
    $volumeThumb.css({
      left: currentVolume + '%'
    });

  } else if (currentlyPlayingSongNumber === songNumber) {
    if (currentSoundFile.isPaused()) {
      $(this).html(pauseButtonTemplate);
      $('.left-controls .play-pause').html(playerBarPauseButton);
      currentSoundFile.play();
      updateSeekBarWhileSongPlays();

    } else {
      $(this).html(playButtonTemplate);
      $('.left-controls .play-pause').html(playerBarPlayButton);
      currentSoundFile.pause();
      updateSeekBarWhileSongPlays();

    }
  }
};
    var onHover = function (event) {
   var songNumberCell = $(this).find('.song-item-number');
   var songNumber = parseInt(songNumberCell.attr('data-song-number'));

   if (currentlyPlayingSongNumber !== songNumber) {
     songNumberCell.html(playButtonTemplate);
   }
 };

 var offHover = function (event) {
   var songNumberCell = $(this).find('.song-item-number');
   var songNumber = parseInt(songNumberCell.attr('data-song-number'));

   if (songNumber !== currentlyPlayingSongNumber) {
     songNumberCell.html(songNumber);
   }
 };

 $row.find('.song-item-number').click(clickHandler);

 $row.hover(onHover, offHover);

 return $row;

 };

 var setCurrentAlbum = function (album) {

   currentAlbum = album;
   // #1
   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');


   $albumTitle.text(album.name);
   $albumArtist.text(album.artist);
   $albumReleaseInfo.text(album.year + ' ' + album.label);
   $albumImage.attr('src', album.albumArtUrl);


   $albumSongList.empty();


   for (var i = 0; i < album.songs.length; i++) {
     var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     $albumSongList.append($newRow);
   }

 };

 var trackIndex = function (album, song) {
   return album.songs.indexOf(song);
 };

 var getSongNumberCell = function (target) {
   return $('.song-item-number[data-song-number="' + target + '"]');
 }

 var setSong = function (target) {

   if (currentSoundFile) {
     currentSoundFile.stop();
   }

   currentlyPlayingSongNumber = parseInt(target + 1);
   currentSongFromAlbum = currentAlbum.songs[target];
   currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {

     formats: ['mp3'],
     preload: true
   });
 }

 var seek = function (time) {
   if (currentSoundFile) {
     currentSoundFile.setTime(time);
   }
 }
 setVolume = function (volume) {
   if (currentSoundFile) {
     currentSoundFile.setVolume(volume);
   }
 }
var nextSong = function (event) {
    var previousSongFromAlbum = currentlyPlayingSongNumber;

indexOfNextSong = trackIndex(currentAlbum, currentSongFromAlbum) + 1;

if (indexOfNextSong >= currentAlbum.songs.length) {
  indexOfNextSong = 0;
}

setSong(indexOfNextSong);
currentSoundFile.play();
updatePlayerBarSong();
updateSeekBarWhileSongPlays();

var lastSongNumber = previousSongFromAlbum;
var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

$nextSongNumberCell.html(pauseButtonTemplate);
$lastSongNumberCell.html(lastSongNumber);
}

var previousSong = function () {

  var nextSongFromAlbum = currentlyPlayingSongNumber;

  indexOfPreviousSong = trackIndex(currentAlbum, currentSongFromAlbum) - 1;
  if (indexOfPreviousSong === -1) {
    indexOfPreviousSong = currentAlbum.songs.length - 1;
  }

  // setsong indexOfNextSong vs. bloc content setSong(currentSongIndex + 1)
  setSong(indexOfNextSong);
  currentSoundFile.play();
  updatePlayerBarSong();
  updateSeekBarWhileSongPlays();

  var lastSongNumber = nextSongFromAlbum;
  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
}

var togglePlayFromPlayerBar = function () {

  if (currentSoundFile) {
    //somethign is currently paused
    if (currentSoundFile.isPaused()) {

      //get the song that is currently playing 
      //-play the song
      //change the currently playing cell to play button
      //change the player bar to play button
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      currentlyPlayingCell.html(pauseButtonTemplate);
      $('.left-controls .play-pause').html(playerBarPauseButton);
      currentSoundFile.play();
    } else {
      //song is playing
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'); //pause button is clicked
      //change html pause player bar to pause
      //chang current playing song cell to pause
      currentlyPlayingCell.html(playButtonTemplate);
      $('.left-controls .play-pause').html(playerBarPlayButton);
      currentSoundFile.pause();
    }
  }
};

var updateSeekBarWhileSongPlays = function () {
  if (currentSoundFile) {
    currentSoundFile.bind('timeupdate', function (event) {
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');
      updateSeekPercentage($seekBar, seekBarFillRatio);
      setCurrentTimeInPlayerBar(this.getTime());
    });
  }
};

var updateSeekPercentage = function ($seekBar, seekBarFillRatio) {
  var offsetXPercent = seekBarFillRatio * 100;

  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({
    left: percentageString
  });

}

var setupSeekBars = function () {
  var setupSeekBarFillRatio = function (bar) {
    var offsetX = event.pageX - $(bar).offset().left;
    var barWidth = $(bar).width();
    return offsetX / barWidth;
  }
  
  var songSeekControl = $('.seek-control .seek-bar');
  var volumeControl = $('.volume .seek-bar');
  
  songSeekControl.click(function (event) {
    seek(setupSeekBarFillRatio(this) * currentSoundFile.getDuration());  
  });
  
  volumeControl.click(function (event) {
    setVolume(setupSeekBarFillRatio(this) * 100);  
  });
  
}

//add differenetiate behaviou based on the seek bar
var setupSeekBars = function () {
  var $seekBars = $('.player-bar, .seek-bar');
  
  var setupSeekBarFillRatio = function (bar) {
    var offsetX = event.pageX - $(bar).offset().left;
    var barWidth = $(bar).width();
    return offsetX / barWidth;
  }
  
  var songSeekControl = $('.seek-control .seek-bar');
  var volumeControl = $('.volume .seek-bar');
  
  songSeekControl.click(function (event) {
    seek(setupSeekBarFillRatio(this) * currentSoundFile.getDuration());  
  });
  
  volumeControl.click(function (event) {
    setVolume(setupSeekBarFillRatio(this) * 100);  
  });
//  $seekBars.click(function (event) {
//    var offsetX = event.pageX - $(this).offset().left;
//    var barWidth = $(this).width();
//
//    var seekBarFillRatio = offsetX / barWidth;
//
//
//    if ($(this).parent().attr('class') == 'seek-control') {
//      //song position seekBarFillRatio;
//      //} else {
//      //setVolume seekBarFillRatio;
//      seek(seekBarFillRatio * currentSoundFile.getDuration());
//    } else {
//      setVolume(seekBarFillRatio * 100);
//    }
//
//    updateSeekPercentage($(this), seekBarFillRatio);
//
//  });

  $seekBars.find('.thumb').mousedown(function (event) {
    var $seekBar = $(this).parent();
    $(document).bind('mousemove.thumb', function (event) {
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;

      if ($seekBar.parent().attr('class') == 'seek-control') {
        seek(seekBarFillRatio * currentSoundFile.getDuration());
      } else {
        setVolume(seekBarFillRatio);
      }

      updateSeekPercentage($seekBar, seekBarFillRatio);

    });

    $(document).bind('mouseup.thumb', function () {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });
  });
};

var updatePlayerBarSong = function () {

  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + ' - ' + currentAlbum.artist);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.left-controls .play-pause').html(playerBarPauseButton);
  setTotalTimeInPlayerBar(currentSongFromAlbum.length);
};


var albumList = [albumPicasso, albumMarconi, albumTolkien]
var albumListCounter = 0;

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

// Player bar element selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');
var $playPauseButton = $('.left-controls .play-pause');


//add this updateSeekBarWhileSongPlays()
var setCurrentTimeInPlayerBar = function(currentTime) {
$('.current-time').text(filterTimeCode(currentTime));

}

var setTotalTimeInPlayerBar = function(totalTime) {
  $('.total-time').text(totalTime);
}

var filterTimeCode = function(timeInSeconds) {
  timeInSeconds = Math.floor(parseFloat(timeInSeconds) );
  var wholeSeconds = timeInSeconds % 60;
  var wholeMinutes = Math.floor(timeInSeconds/ 60);
  return wholeMinutes + ":" + wholeSeconds;
};

$(function () {

  setCurrentAlbum(albumPicasso);
  setupSeekBars();
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playPauseButton.click(togglePlayFromPlayerBar);

  document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function () {
    albumListCounter++;
    if (albumListCounter >= albumList.length) {
      albumListCounter = 0;
    };
    setCurrentAlbum(albumList[albumListCounter]);
  });
});