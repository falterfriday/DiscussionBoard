app.controller('userController', ['$scope', 'UsersFactory', '$location', '$cookies', '$routeParams','$timeout', '$mdSidenav', '$log', function($scope, UsersFactory, $location, $cookies, $routeParams,$timeout, $mdSidenav, $log){
	$scope.user = $cookies.getObject('user');
	$scope.viewser;
	$scope.toggleRight = buildToggler('right');
    
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
  	}
	function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    } 
   	$scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    }
	$scope.getUser = function(){
		UsersFactory.getUser($routeParams.id, function(results){
			$scope.viewser = results;
		})
	}
}]);