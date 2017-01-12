(function implementValidation() {
  // Get all form to validate
  var $formsForValidate = getElementForValidation();
  // Start validation after click on "Send" button
  $formsForValidate.each(function (index, element) {
    $(element).on('submit', function (e, index) {
      e.preventDefault();
      initValidation(index);
    });
  });



  //----------------------------------------------Start functions description----------------------------------------------------

  // The following function implements all validation process
  function initValidation(index) {

    // Set validation rule for each filed
    var validationRules = {
    'data-validate-required' : function (value, element) {
      if (!value) {
        alert('empty field');
      }
    },
    'data-validate-name' : function (value, element) {
      // User can write only fix length letter string on "name" filed 
      var onlyLetters = /[a-zA-Z]/g,
          minLengt = parseInt( $(element).attr('data-validate-minlength') ),
          maxLengt = parseInt( $(element).attr('data-validate-maxlength') );

      if ( onlyLetters.test(value) ) {
        if ( !(value.length >= minLengt && value.length < maxLengt) ) {
          alert('min max length');
        }
      } else {
        alert('only letters');
      } 
    },
    'data-validate-email' : function (value, element) {
      // The following variable saves regular expression for email validation
      var emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

      if ( !emailRegexp.test(value) ) {
        alert('encprrect email');
      }
    },
    'data-validate-date' : function (value, element) {
      var currentDate = moment().format('DD/MM/YYYY');
      if (value !== currentDate) {
        alert('error date');
      }
    },
    'data-validate-ip' : function (value, element) {
      debugger
      var ipRegexpValue = $(element).attr('data-validate-regexp');
      var ipRegexp = new RegExp(ipRegexpValue, 'm');
      if ( !ipRegexp.test(value) ) {
        alert('error ip');
      }
    }
   }
   

    // Get all input elements to validate from current form
    var $inputesForValidate = $( 'input[type!="submit"]', $('[data-validate]').get(index) );
    // Start fields validation
    fieldValidation($inputesForValidate);

    function fieldValidation($inputesForValidate) {
      $inputesForValidate.each(function (index, element) {
        // debugger
        var currentInputValue = $(element).val();
        var attributes = this.attributes;
        $(attributes).each(function (index, attribute) {
          // debugger
          var attributeName = attribute.name;
          if ( validationRules.hasOwnProperty(attributeName) ) {
          validationRules[attributeName](currentInputValue, element);
          // validationRules.attribute( $(element).val() );
          }
        });
        // if ( $(element).is('[data-validate-required]') ) {
        // }

        // if ( $(element).is('[name = "name"]') ) {
        //   validationRules.name( $(element).val() ); 
        // }
      });

    }
    // The following function get user's values for future validation
    // valuesForValidate = getValidateInputes(index);
    // function getValidateInputes(index) {
    //   debugger
    //   elementsForValidate.each(function (index, element) {
    //     valuesForValidate.push( $(element).val() );
    //   });
    //   return valuesForValidate;
    // }
   }


  // The following function selectes all form for validation
  function getElementForValidation() {
    $elementsForValidate = $('[data-validate]');
    return $elementsForValidate;
  };



  //---------------------------------------------End functions description-------------------------------------------------------
})();
