(function initCountDownTimer() {
  var currentCoundDownProcess;
  $('.birthdayDate').on('submit', function(e){
    e.preventDefault();
    var userBirthdayDate = getBirthdayDateDifference();
    // Reset previous contDown process
    if (currentCoundDownProcess) {
      clearInterval(currentCoundDownProcess);
    }
    // Start current contDown process
    currentCoundDownProcess = countDown(userBirthdayDate);
  });

  // Following function implement count down process 
  function countDown(countDowmTime) {
    timeIntervalId = setInterval(function () {
      // Following object saves time settings for timer
      var timesSettings = {
        seconds: 59,
        minutes: 59,
        hours: 23,
      };
      // Following array saves names of countDown array elements
      var position = ['seconds', 'minutes', 'hours', 'days'];

      // Core of countdown process
      for (var i = 0; i < countDowmTime.length; i++) {
        var currentElement = countDowmTime[i];
        // Check values of array elements
        if ( verifyTheArrayElements(countDowmTime) ) {
          clearInterval(timeIntervalId);
          showTimer(countDowmTime);
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
          showTimer(countDowmTime);
          break;
        } else {
          countDowmTime[i] = --currentElement;
          showTimer(countDowmTime);
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

      // Following function get all fields for showing the current step of countDown process
      function showTimer(array) {
        var pageNumberElements = $('.col-lg-3 .text-wrapper');
        $(pageNumberElements).each(function (index) {
          $(this).text(array[index]);
        });
      }
    }, 1000);

    return timeIntervalId;
  }

  // Following function creates array with parameters for countDown function
  function getBirthdayDateDifference() {
    // Create user birthday date
    var birthDayDate = $('[name="birthday"]').val();
    var birthMonthDate = $('[name="birthmonth"]').val();
    var birthdayYear = moment().format('YYYY');
    var userBirthday = moment(birthdayYear + '-' + birthMonthDate + '-' + birthDayDate).format('DD/MM/YYYY');
    // Get current date
    var currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    // Count time difference bettwen current date and user birthday
    var milisecondsDifference = moment(userBirthday, "DD/MM/YYYY HH:mm:ss").diff( moment(currentDate, "DD/MM/YYYY HH:mm:ss") );
    if (milisecondsDifference < 0) {
      // Add one year to user birthday for positive difference 
      birthdayYear = moment().add(1, 'years').format('YYYY');
      userBirthday = moment(birthdayYear + '-' + birthMonthDate + '-' + birthDayDate).format('DD/MM/YYYY');
      currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
      milisecondsDifference = moment(userBirthday,"DD/MM/YYYY HH:mm:ss").diff( moment(currentDate,"DD/MM/HH:mm:ss") );
    }
    // Get time duration between two dates
    var differenceTimeDuration = moment.duration(milisecondsDifference);
    // Return array with parameters
    return [differenceTimeDuration.seconds(), differenceTimeDuration.minutes(), differenceTimeDuration.hours(), Math.round( differenceTimeDuration.asDays() )];
 }
})();
