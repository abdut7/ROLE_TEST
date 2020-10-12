# ROLE TEST
* The project following clean-onion architecture model
* The project developed microservice model (In this we have two sevices)
#### Execution of Production build
* Make webpack Build file of two services
   * ``npm run build-common``
   * ``npm run build-open``
* Run build file exists in /build Directry
   * ``node common.js``
   * ``node open.js``
## API DOCUMENTAION
[https://documenter.getpostman.com/view/3805752/TVRn26oW]

##### Available APIs in above documentation
* login_user
  * This API for login for user
* get_user
  * This API for get List of all users exists
* get_role
  * This API for get list of all Roles 
* get_role_module
  * This API for available(Permitted) modules in a specified Role
* create_role
  * This API for create a new Role (Initially,All modules permitted for a new Role befor updation)
* create_user
  * This API for create a new user under any Role (specifing in this key 'strUserRole')
* update_role_module
  * This API for update module permissions in a specific ROLE 
  * If make ``fale`` value in a module ,The changes (Can't permite) any user under that Role

  ## Solution Documentation
    * Every user have a ROLE name (set in user creation)
    * When Login user ,keep ROLE name in jwt token
    * In Each Request ,Resolve jwt token (Token verification) in Node middleware (code written in ./libs/middleware/jwtVerifier.ts)
    * Then get Role name from token append with request body 
    * Then check any permission allowed for that ROLE to that API (if not allows Return error message)

  ## Testing Documentation
   * Login with 
      ``{ 
          "strName": "admin",
          "strPassword":"admin123"
       }``
   * Then get Token,Assign that to all other Header Autherisation
   * Create a new Role  using ``create_role`` API
   * Create a new user using ``create_user`` with asign a ROLE name before created
   * Update (make false value for any API) using ``update_role_module`` ,Get json for all module from ``get_role_module`` API
   * check Permision allow or Not for that API befor make false value
     
 
