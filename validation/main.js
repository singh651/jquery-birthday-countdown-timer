(function implementValidation() {
  // Get all form to validate
  var $formsForValidate = getElementForValidation();
  // Start validation after click on "Send" button

  var errorRulesList = $('.formRulesList');
  var isFormValid;
  $formsForValidate.each(function (index, element) {
    $(element).on('submit', function (e, index) {
      e.preventDefault();
      // Clean rules before each validation
      cleanRulesList (errorRulesList);
      initValidation(index);
      if (isFormValid) {
        $(this).unbind('submit');
        $(this).submit();
      }
    });
  });

  //----------------------------------------Start functions description----------------------------------------------------

  // The following function implements all validation process
  function initValidation(index) {
    // Saves all error filed
    var errorFieldsList = [];

    // Set validation rule for each filed
    var validationRules = {
      'data-validate-required' : function (value, element) {
        if (!value) {
          createErrorFieldsList(element, errorFieldsList);
          showFormRules( $(element).attr('name') + ' must been required', errorRulesList);
        }
      },
      'data-validate-name' : function (value, element) {
        // User can write only fix length letter string on "name" filed 
        var onlyLetters = /[a-zA-Z]/g,
            minLengt = parseInt( $(element).attr('data-validate-minlength') ),
            maxLengt = parseInt( $(element).attr('data-validate-maxlength') );

        if ( onlyLetters.test(value) ) {
          if ( !(value.length >= minLengt && value.length < maxLengt) ) {
            createErrorFieldsList(element, errorFieldsList);
            showFormRules( $(element).attr('name') + ' has max length - 30 and min length - 5 symbols', errorRulesList);
          }
        } else {
          createErrorFieldsList(element, errorFieldsList);
          showFormRules( $(element).attr('name') + ' must contain only letters', errorRulesList);
        } 
      },
      'data-validate-email' : function (value, element) {
        // The following variable saves regular expression for email validation
        var emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

        if ( !emailRegexp.test(value) ) {
          createErrorFieldsList(element, errorFieldsList);
          showFormRules( $(element).attr('name') + ' must contain correct (DD/MM/YYYY) format', errorRulesList);
        }
      },
      'data-validate-date' : function (value, element) {
        var currentDate = moment().format('DD/MM/YYYY');
        if (value !== currentDate) {
          createErrorFieldsList(element, errorFieldsList);
          showFormRules( $(element).attr('name') + ' must contain current date', errorRulesList);
        }
      },
      'data-validate-ip' : function (value, element) {
        // Create regExp for ip validation 
        var ipRegexpValue = $(element).attr('data-validate-regexp');
        var ipRegexp = new RegExp(ipRegexpValue, 'm');
        if ( !ipRegexp.test(value) ) {
          createErrorFieldsList(element, errorFieldsList);
          showFormRules( $(element).attr('name') + ' must contain correct IP format', errorRulesList);
        }
      }
    };
   
    // Get all input elements to validate from current form
    var $inputesForValidate = $( 'input[type!="submit"]', $('[data-validate]').get(index) );

    // Clean all fileds before validation
    resetErrorHighlight($inputesForValidate);

    // Start fields validation
    fieldValidation($inputesForValidate);

    function fieldValidation($inputesForValidate) {
      $inputesForValidate.each(function (index, element) {
        var currentInputValue = $(element).val();
        var attributes = this.attributes;
        $(attributes).each(function (index, attribute) {
          var attributeName = attribute.name;
          if ( validationRules.hasOwnProperty(attributeName) ) {
            validationRules[attributeName](currentInputValue, element);
          }
        });
      });
    }

    // Verify is form valid
    if (errorFieldsList.length === 0) {
      isFormValid = true;
    } else {
      // Highlight all error fileds
      errorHighlight(errorFieldsList);
    }

  }

  // The following function crates list of all error fields 
  function createErrorFieldsList(element, array) {
    if ( $.inArray(element, array) === -1 ) {
      array.push(element);
    }
  }

  // The following function highlight all error field and set focus for first of them
  function errorHighlight(array) {
    $(array).each(function (index, element) {
      $(element).css('border', '2px solid red');
    });
    $(array).get(0).focus();
  }

  // The following function reset all error red border with input elements
  function resetErrorHighlight(inputList) {
    $(inputList).each(function (index, element) {
      $(element).css('border', '2px inset');
    });
  }

  // The following function resets earlier set rules
  function cleanRulesList(rulesList) {
    $(rulesList).empty();
  }

  // The following function shows error rules for each unvalid filed 
  function showFormRules(textRule, rulesList) {
    $(rulesList).append('<li>' + textRule + '</li>');
  }

  // The following function selectes all form for validation
  function getElementForValidation() {
    $elementsForValidate = $('[data-validate]');
    return $elementsForValidate;
  }

  //--------------------------------------End functions description-------------------------------------------------------

})();
