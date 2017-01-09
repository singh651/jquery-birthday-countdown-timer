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
    'required' : function (value) {
      if (!value) {
        alert('empty field');
      }
    },
    'name' : function (value, element) {
      debugger
      var onlyLetters = /[a-zA-Z]/g;
      var minLengt = $(element).attr('data-validate-minlength');
      var maxLengt = $(element).attr('data-validate-maxlength');
      if ( onlyLetters.test(value) ) {
        if (value.length > minLengt && value.length < maxLengt) {

        } else {
        alert('min max length');
        }
      } else {
        alert('only letters');
      } 
    }

   }
   
    // Get all input elements to validate from current form
    var $inputesForValidate = $( 'input[type!="submit"]', $('[data-validate]').get(index) );
    // Start fields validation
    fieldValidation($inputesForValidate);


    function fieldValidation($inputesForValidate) {
      $inputesForValidate.each(function (index, element) {
        debugger
        var atributes = $(element).attributes;
        if ( $(element).is('[data-validate-required]') ) {
          validationRules.required( $(element).val() );
        }

        if ( $(element).is('[name = "name"]') ) {
          validationRules.name( $(element).val() ); 
        }
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
  }



  //---------------------------------------------End functions description-------------------------------------------------------
})();
