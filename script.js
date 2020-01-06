var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.run(function($rootScope){
    $rootScope.obj={};
    $rootScope.obj.reglogdisp=true;

});

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
   
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
             
        })
        
        .state('Register', {
            url: '/Register',
            templateUrl: 'Register.html',
            controller: 'regController'
        })
        .state('Login', {
            url: '/Login',
            templateUrl: 'Login.html',
            controller: 'loginController'
        })
        
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'partial-about.html'
            
        })

        .state('tutor',{
            url: '/tutor',
            templateUrl: 'tutorhome.html',
            controller:'tutorController'
        })

        .state('tutorprofile',{
            url: '/tutorprofile',
            templateUrl:'tutorprofile.html',
            controller:'tutorController'
        })
        .state('student',{
            url: '/student',
            templateUrl: 'studenthome.html',
            controller: 'studentController'
        });
        
});

routerApp.controller('regController', function($scope,$http) {
    
    $scope.message = 'test';
   
        
        $scope.Firstname = null;
        $scope.Lasttname = null;
        $scope.Username = null;
        $scope.Password = null;
        $scope.Contact = null;
        $scope.Email = null;
        $scope.Address = null;
        $scope.Gender = null;
        $scope.Role = null;
        

$scope.postdata = function (Firstname,Lastname,Username,Password,Contact,Email,Address,Gender,Role) {

var data = {
Firstname: Firstname,
Lastname: Lastname,
Username: Username,
Password: Password,
Contact: Contact,
Email: Email,
Address: Address,
Gender: Gender,
Role: Role
    
};



$http.post('http://localhost:55510/api/user/post', JSON.stringify(data)).then(function (response) {

    if (response.data)
        $scope.msg = "Registered Successfully!";
    }, 
    
    function (response) {
                $scope.msg = "Service not Exists";
                           });

        };
        
        });





routerApp.controller('loginController', function($scope,$http,$state) {
    
            $scope.message = 'test';
           
                $scope.Username = null;
                $scope.Password = null;
     
        $scope.postdata = function (Username,Password) {
        
        var data = {
        Username: Username,
        Password: Password,
            
        };
       
        
        
        
        $http.post('http://localhost:55510/api/login', data)
        
        .then(function (response) {
        
                 if (response.data)
                {
                            var user = response.data[0];
                            delete user.Password;
                            localStorage.setItem('userInfo', JSON.stringify(user));
                            var a = localStorage.getItem('userInfo');
                            var role = JSON.parse(a).Role;            
                
                    
                        $scope.msg = "Authenticated"
               
                        
                       
                }  
                if(role == "T")
                {
                    $state.go("tutor");
                }
                else if(role == "S")
                {
                    $state.go("student");
                }  
                else 
                {
                    $state.go("home");
                }
                
            
           
            },
            
            function (response) {
                        $scope.msg = "Incorrect username or password";
                    });
        
                };
                
                });
routerApp.controller('tutorController', function($rootScope,$scope) {
    
            $rootScope.obj={
                reglogdisp: false,
                skillhistorydisp: true
            };
            var a = localStorage.getItem('userInfo');
                             var fname = JSON.parse(a) .Firstname;
                            var lname = JSON.parse(a) .Lastname;
                            $scope.fn=fname;
                            $scope.ln=lname;
                            
            
        });
        routerApp.controller('studentController', function($rootScope,$scope) {
    
            $rootScope.obj={
                reglogdisp: false,
                skillhistorydisp: true,
                student: true
            };
            var a = localStorage.getItem('userInfo');
                             var fname = JSON.parse(a) .Firstname;
                            var lname = JSON.parse(a) .Lastname;
                            $scope.fn=fname;
                            $scope.ln=lname;
                            
            
        });
/*routerApp.controller('logoutctrl', function($rootScope,$scope){
    $rootScope.obj={
        reglogdisp: true,
        skillhistorydisp: false,
        student: false
    };
    localStorage.clear();
})*/

