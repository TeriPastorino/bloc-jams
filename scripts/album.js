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
    + '  <td class="song-item-number">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

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
 
 window.onload = function() {
   
   setCurrentAlbum(albumPicasso);   
   var albumCoverList = [albumPicasso, albumMarconi,albumTolkien];
   //set up for loop
   var i = 1
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