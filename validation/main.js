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
   var validationRules = {
    'required' : function (value) {
      if (!value) {
        alert('empty field');
      }
    },
    'name' : function (value) {

    }

   }
    // Get all input elements to validate from current form
    var $inputesForValidate = $( 'input[type!="submit"]', $('[data-validate]').get(index) );
fieldValidation($inputesForValidate);
    function fieldValidation($inputesForValidate) {

      $inputesForValidate.each(function (index, element) {
        debugger
        if ( $(element).is('[data-validate-required]') ) {
          debugger
          var aa = $(element).val();
          validationRules.required(aa);
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
    // console.log(valuesForValidate);
   }


  // The following function selectes all form for validation
  function getElementForValidation() {
    $elementsForValidate = $('[data-validate]');
    return $elementsForValidate;
  }



  //---------------------------------------------End functions description-------------------------------------------------------
})();
