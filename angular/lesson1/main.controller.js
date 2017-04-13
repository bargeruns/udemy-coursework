(function() {
  angular
    .module('myApp')
    .controller('MainController', ['$filter', MainController]);

  function MainController($filter) {
    var vm = this;
    vm.name = '';
    vm.lowercaseName = function() {
      return $filter('lowercase')(vm.name);
    }
  }
})();
