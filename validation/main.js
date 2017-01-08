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
    // Get user's values
    var valuesForValidate = [];
    valuesForValidate = getValidateValues(index);
    // console.log(valuesForValidate);

    // The following function get user's values for future validation
    function getValidateValues(index) {
      var elementsForValidate = $('input[type!="submit"]', $('[data-validate]').get(index));
      elementsForValidate.each(function (index, element) {
        valuesForValidate.push( $(element).val() );
      });
      return valuesForValidate;
    }
   }

  // The following function selectes all form for validation
  function getElementForValidation() {
    $elementsForValidate = $('[data-validate]');
    return $elementsForValidate;
  }



  //---------------------------------------------End functions description-------------------------------------------------------
})();
