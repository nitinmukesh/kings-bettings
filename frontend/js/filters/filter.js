// JavaScript Document
myApp.filter('myFilter', function () {
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function (input, optional1, optional2) {

    var output;

    // Do filter work here
    return output;
  };

});

myApp.filter('indianCurrency', function () {
  return function (getNumber) {
    if (!isNaN(getNumber)) {
      var numberArr = getNumber.toString().split('.');
      var lastThreeDigits = numberArr[0].substring(numberArr[0].length - 3);
      var otherDigits = numberArr[0].substring(0, numberArr[0].length - 3);
      if (otherDigits != '') {
        lastThreeDigits = ',' + lastThreeDigits;
      }
      var finalNumber = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;
      if (numberArr.length > 1) {
        var getRoundedDecimal = parseInt(numberArr[1].substring(0, 2)) + 1;
        finalNumber += "." + getRoundedDecimal;
      }
      // return '₹' + finalNumber;
      return finalNumber;
    }
  };
});

// myApp.filter('formateDate', function () {
//   return function (input) {
//     return moment(input).formate("MM/DD/YYYY");
//   };
// });

myApp.filter('formatdate', function ($filter) {
  return function (timestamp) {
    var currentDate = new Date()
    var toFormat = new Date(timestamp)
    if (toFormat.getDate() == currentDate.getDate() && toFormat.getMonth() == currentDate.getMonth() && toFormat.getFullYear() == currentDate.getFullYear()) {
      return 'Today ' + $filter('date')(toFormat.getTime(), 'HH:mm')
    }
    if (toFormat.getDate() == (currentDate.getDate() - 1) && toFormat.getMonth() == currentDate.getMonth() && toFormat.getFullYear() == currentDate.getFullYear()) {
      return 'Yesterday ' + $filter('date')(toFormat.getTime(), 'HH:mm')
    }
    if (toFormat.getDate() == (currentDate.getDate() + 1) && toFormat.getMonth() == currentDate.getMonth() && toFormat.getFullYear() == currentDate.getFullYear()) {
      return 'Tomorrow ' + $filter('date')(toFormat.getTime(), 'HH:mm')
    }

    return $filter('date')(toFormat.getTime(), 'dd/MM/yyyy HH:mm')
  }
})