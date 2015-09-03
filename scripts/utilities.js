//reusable forEach function that loops through an array with a callback function
//

function forEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}