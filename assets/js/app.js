angular.module('CrudApp', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/users', {templateUrl: 'assets/tpl/users_lists.html', controller: ListCtrl}).
      when('/servers', {templateUrl: 'assets/tpl/servers_lists.html', controller: ListCtrlServers}).
      when('/users/add-user', {templateUrl: 'assets/tpl/user_add-new.html', controller: AddCtrl}).
      when('/users/edit/:id', {templateUrl: 'assets/tpl/user_edit.html', controller: EditCtrl}).
      otherwise({redirectTo: '/users'});
}]);

function ListCtrl($scope, $http) {
  $http.get('api/users').success(function(data) {
    $scope.users = data;
  });
}

function ListCtrlServers($scope, $http) {
  $http.get('api/servers').success(function(data) {
    $scope.servers = data;
  });
}

function AddCtrl($scope, $http, $location) {
  $scope.master = {};
  $scope.activePath = null;

  $scope.add_new = function(user, AddNewForm) {

    $http.post('api/add_user', user).success(function(){
      $scope.reset();
      $scope.activePath = $location.path('/');
    });

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

  };
}

function EditCtrl($scope, $http, $location, $routeParams) {
  var id = $routeParams.id;
  $scope.activePath = null;

  $http.get('api/users/'+id).success(function(data) {
    $scope.users = data;
  });

  $scope.update = function(user){
    $http.put('api/users/'+id, user).success(function(data) {
      $scope.users = data;
      $scope.activePath = $location.path('/');
    });
  };

  $scope.delete = function(user) {
    console.log(user);

    var deleteUser = confirm('Are you absolutely sure you want to delete?');
    if (deleteUser) {
      $http.delete('api/users/'+user.id);
      $scope.activePath = $location.path('/');
    }
  };
}