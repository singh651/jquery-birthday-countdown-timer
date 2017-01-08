
(function initValidation() {
  debugger
  var $formsForValidate =  getElementForValidation();
   $formsForValidate.each(function (index, element) {
    $(element).on('submit' , function (e) {
      e.preventDefault();
      validation();
    })
   });


   function validation() {
     alert('validation');
   }

  var valuesForValidate = [];
  $elementsForValidate.each(function (index, element) {
    var celement = element.value;
    // valuesForValidate.push(currentValue);
  console.log(celement);
  });







  //----------------------------------------------

function getElementForValidation() {
  $elementsForValidate = $('[data-validate]');
return $elementsForValidate;
}

  //------------------------------
})();
