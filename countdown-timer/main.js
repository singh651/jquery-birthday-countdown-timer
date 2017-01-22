(function initCountDownTimer() {


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
        showTimer(countDowmTime);
        break;
      } else {
        countDowmTime[i] = --currentElement;
        console.log(countDowmTime);
         showTimer(countDowmTime)
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

    function showTimer(array) {
      // debugger
      var pageNumberElements = $('.col-lg-3 .text-wrapper');
      $(pageNumberElements).each(function (index) {
        $(this).text(array[index]);
      });
    }
  }, 1000);
}


})();
      
      // Following function creates array with parameters for countDown function
      function getBirthdayDateDifference() {
        // Create user birthday date
        var birthDayDate = $('[name="birthday"]').val();
        var birthMonthDate = $('[name="birthmonth"]').val();
        var birthdayYear = moment().format('YY');
        var userBorthday = moment(birthDayDate + '-' + birthMonthDate + '-' + birthdayYear).format('DD/MM/YYYY');
        // Get current date
        var currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
        // Count time difference bettwen current date and user birthday
        var milisecondsDifference = moment(userBorthday, "DD/MM/YYYY HH:mm:ss").diff( moment(currentDate, "DD/MM/YYYY HH:mm:ss") );
        if (milisecondsDifference < 0) {
          // Add one year to user birthday for positive difference 
          var birthdayYear = moment().add(1, 'years').format('YY');
          var userBorthday = moment(birthDayDate + '-' + birthMonthDate + '-' + birthdayYear).format('DD/MM/YYYY');
          var currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
          var milisecondsDifference = moment(userBorthday,"DD/MM/YYYY HH:mm:ss").diff( moment(currentDate,"DD/MM/YYYY HH:mm:ss") );
        }
        // Get time duration between two dates
        var differenceTimeDuration = moment.duration(milisecondsDifference);
        // Create array with parameters
        var countDownTimeParameters = [differenceTimeDuration.seconds(), differenceTimeDuration.minutes(), differenceTimeDuration.hours(), Math.round( differenceTimeDuration.asDays() )];
        return countDownTimeParameters;
      };