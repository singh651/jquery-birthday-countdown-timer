(function initCountDownTimer() {
      // debugger

  // Following function implement count down process 
  function countDown(countDowmTime) {
    var timeIntervalId = setInterval(function () {
      // Following object saves time settings for timer
      var timesSettings = {
        seconds: 3,
        minutes: 2,
        hours: 1,
      };
    // Following array saves names of countDown array elements
    var position = ['seconds', 'minutes', 'hours', 'days'];

    // Core of count down process
    for (var i = 0; i < countDowmTime.length; i++) {
      var currentElement = countDowmTime[i];
      // Check values of array elements
      if ( verifyTheArrayElements(countDowmTime) ) {
        clearInterval(timeIntervalId);
        alert('done');
        break;
      } else if (currentElement === 0) {
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

    // Following function verifies are each of array's elements zero 
    function verifyTheArrayElements(array) {
      var isAllArrayElementsAreZero = true;
      $(array).each(function (index, element) {
        if (element !== 0) {
          isAllArrayElementsAreZero = false;
        }
      }); 
      return isAllArrayElementsAreZero;
    }
  }, 1000);
}




})();

