var createSongRow = function(songNumber, songName, songLength) {
     
   var template =
         '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>';


    var $row = $(template);

//exercise create setSong function
 var setSong = function(songNumber) {
   currentlyPlayingSongNumber = parseInt(songNumber + 1);
   currentSongFromAlbum = currentAlbum.songs[songNumber];
 };
    
  var $row = $(template);

  
    var clickHandler = function() {
      var songNumber = parseInt($(this).attr('data-song-number'));
      //no song playing
      if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1 ];
          //call to click handler  
            updatePlayerBarSong();
        }

        else if (currentlyPlayingSongNumber === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            $('.left-controls .play-pause').html(playerBarButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }

    };
  
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
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

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
 
var setCurrentAlbum = function(album) {
  currentAlbum = album;

     $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text (album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl); 
     $albumSongList.empty();

     for (i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};


//john pretty lost on these and did not refactor, can we talk through?
var nextSong = function() { 
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
  
var getSongNumberCell = function(index) {
    return $('.song-item-number[data-song-number="' + index + '"]');
};
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.name);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.left-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};
var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.name);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.left-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};
var updatePlayerBarSong = function () {
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + ' - ' + currentAlbum.artist);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    
    $('.left-controls .play-pause').html(playerBarPauseButton);
    
};

 var albumList = [albumPicasso, albumMarconi, albumTolkien]
 var albumListCounter = 0; 

  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
  var pauseButtonTemplate = '<a class = "album-song-button"><span class="ion-pause"></span></a>';
  
//hold button for icons on player bar
  var playerBarButton = '<span class ="ion-play"></span>';
  var playerBarPauseButton = '<span class="ion-pause"></span>';

//create variables inthe global scope to hold current song/album information
  var currentAlbum = null;
  var currentlyPlayingSongNumber = null;
  var currentSongFromAlbum = null;

  var $previousButton = $('.left-controls .previous');
  var $nextButton = $('.left-controls .next');

  $(document).ready(function () {
    
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
   
  });
     
  /* 
   var albumCoverList = [albumPicasso, albumMarconi, albumTolkien];
   //set up for loop
   var i = 1;
   //add click listener event to albumCoverList var
   $albumImage.on('click', function(event) {
     //setup function(event)
     setCurrentAlbum(albumCoverList[i]);
     i++;
     if (i == albumCoverList.length) {
       i = 0;

     }
     console.log(currentAlbum);
   });   

*/