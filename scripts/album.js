//Example Albums

var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { name: 'Blue', length: '4:26' },
    { name: 'Green', length: '3:14' },
    { name: 'Red', length: '5:01' },
    { name: 'Pink', length: '3:21' },
    { name: 'Magenta', length: '2:15' }
  ]
};

var albumMarconi = {
   name: 'The Telephone',
   artist: 'Guglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: 'assets/images/album_covers/20.png',
   songs: [
     { name: 'Hello, Operator?', length: '1:01' },
     { name: 'Ring, ring, ring', length: '5:01' },
     { name: 'Fits in your pocket', length: '3:21'},
     { name: 'Can you hear me now?', length: '3:14' },
     { name: 'Wrong phone number', length: '2:15'}
 ]
};

var albumTolkien = {
  name: 'The Hobbit',
  author: 'J.R.R. Tolkien',
  label: 'Mariner',
  year: '1937',
  albumArtUrl: 'assets/images/album_covers/09.png',
  songs: [
    { name: 'A short rest', length: '2:01' },
    { name: 'Over Hill and Under Hill', length: '3:01' },
    { name: 'Flies and Spiders', length: '3:44'},
    { name: 'The Return Journey', length: '5:14' },
    { name: 'Not at Home', length: '2:45'} 
  ]
};

var createSongRow = function(songNumber, songName, songLength) {
     
   var template =
         '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>';

   return template;
 
 };

  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
var setCurrentAlbum = function(album) {
    // #1
    // #2
     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
    // #3
     albumSongList.innerHTML = '';
 
    // #4
     for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
 
 };

  //var declared outside of window.onload
  var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
  var songRows = document.getElementsByClassName('album-view-song-item');

  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
  var pauseButtonTemplate = '<a class = "album-song-button"><span class="ion-pause"></span></a>';
  //store state of playing songs
  var currentlyPlayingSong = null;
  
  window.onload = function () {
    
    setCurrentAlbum(albumPicasso);
    
    //CP27 Adding Song Number to Pause button. trying to track what was selected?

    var findParentByClassName = function(element, target) {
      var currentParent = element.parentElement;
   //add condition to check if an ancestor with specified name doesn't exist
     if (element.parentNode === null) {
       alert('No Parent Found');
     }

      //check to see if starting element has a parent

      while (currentParent.className !=  target) {
        if (currentParent === null) {
          alert("No Parent found with that class name");
        }
        currentParent = currentParent.parentElement
      }
    return(currentParent);
};
   
  //where does this get inserted?
    var getSongItem = function(element){
      switch (element.className){
          //looking for elements
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
          return findParentByClassName(element,'song-item-number');
        case 'album-view-song-item':
          return element.querySelector('.song-item-number');
        case '.song-item-title':
        case '.song-item-duration':
          return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case '.song-item-number':
          return element;
        default:
          return;

      }
    };
    
    var clickHandler = function(targetElement) {
      var songItem = getSongItem(targetElement);
    //is currently playing song null? true set songItems content to pause button
    //and set currently playing song to the new songs #
      if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    
    //revert button to play if playing song clicked again
      } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
        
    //if clicked song != active song, set content to pause button      
      } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
      }
    };

    //elements to which we will be adding listeners
    
    songListContainer.addEventListener('mouseover', function (event) {
        //only target indivedual song rows during event delegation
        if (event.target.parentElement.className === "album-view-song-item") {
            event.target.parentElement.querySelector(".song-item-number").innerHTML = playButtonTemplate;
        // change the content from the number to the playbutton's HTML
        
        var songItem = getSongItem(event.target);
          if (songItem.getAttribute('data-song-number') !== (currentlyPlayingSong)) {
            songItem.innerHTML = playButtonTemplate;
        }
        //changing innerHTML of the Element
        }
    });
    
    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function (event) {
          //cache the song item
          var leavingSongItem = getSongItem(event.target);
          var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');
        
          //change content if mouseleave != current song
          
          if (leavingSongItem !== currentlyPlayingSong) {
            leavingSongItem.innerHTML = leavingSongItemNumber;
          }
        });
      
      songRows[i].addEventListener('click', function(event) {
             clickHandler(event.target);
       });
    }
     

     
   
   var albumCoverList = [albumPicasso, albumMarconi,albumTolkien];
   //set up for loop
   var i = 1;
   //add click listener event to albumCoverList var
   albumImage.addEventListener('click', function(event) {
     //setup function(event)
     setCurrentAlbum(albumCoverList[i]);
     i++;
     if (i == albumCoverList.length) {
       i = 0;

     }  
   });   
 };  
