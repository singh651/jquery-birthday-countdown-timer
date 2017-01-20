

function countDowm(countDowmTime) {
  setInterval(function () {

  var timesSettings = {
    seconds: 3,
    minutes: 4,
    hours: 2
  }

  var position = ['seconds', 'minutes', 'hours', 'days'];

  for (var i = 0; i < countDowmTime.length; i++) {
    debugger
    var currentElement = countDowmTime[i];
    var nextElement = countDowmTime[i+1];
    if (currentElement === 0) {
      var a = verifyTheArrayElements(countDowmTime);
      for (var a = 0; a < countDowmTime.length; a++) {
        if (countDowmTime[a] === 0) {
          countDowmTime[a] = timesSettings[position[a]];  
        } else {
          countDowmTime[a]--;
          break;
        }
      }  
      console.log(countDowmTime);
      break;
    } else {
      countDowmTime[i] = --currentElement;
      console.log(countDowmTime);
      break;
    } 
  } 




  function verifyTheArrayElements(array) {
    var isAllArrayElementsAreZero;
    $(array).each(function (index, element) {
      if ( $(element) !== 0 ) {
        isAllArrayElementsAreZero = false;
      }
    }); 
    return isAllArrayElementsAreZero;
  }


  }, 1000);
}
