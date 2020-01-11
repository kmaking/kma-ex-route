# KMA EX-Route

KMA Ex-Route is a Package for ExpressJS to Generate CRUD Route.

# Installation

```bash
npm require kma-ex-route
``` 

# Usage

#### Router file
```js
const express = require('express');
const router = express.Router();
const { Router } = require('kma-ex-route');

...

// Pass Express Route Instance
new Router(router)
    
    // Set Resources Prefix URI
    .prefix('user')
    
    // Set Controller
    .controller('user')
    
    // Generate Resource Routes
    .resource();
```

##### Above example will create new Resource Routes.
- `index` will generate `GET` route with URL `\`
- `store` will generate `POST` route with URL `\store`
- `show` will generate `GET` route with URL `\show`
- `delete` will generate `DELETE` route with URL `\delete`
- `update` will generate `PATCH` route with URL `\update`
- `status` will generate `PATCH` route with URL `\status`

#### Controller file
```js
/**
 * User Controller
 */
module.exports = {
    
    index: (req, res, next) => {
        // UserController@Index
    },
    
    store: (req, res) => {
        // UserController@Store
    },
    
    show: (req, res) => {
        // UserController@Show
    },
    
    delete: (req, res) => {
        // UserController@Delete
    },
    
    update: (req, res) => {
        // UserController@Update
    },
    
    status: (req, res) => {
        // UserController@Statuss
    },
}

```

# Available Method
## Route Class
Route support Resource routes that includes below routes.
 | Method     | URI       | Function      |
 |------------|-----------|---------------|
 | Get        | /         | index         |
 | Post       | /store    | store         |
 | GET        | /show     | show          |
 | Patch      | /update   | update        |
 | Delete     | /delete   | delete        |
 | Patch      | /status   | status        |
 
### `except`(routes)
##### Params
| routes Array
Exclude routes from Resources

### `only`(routes)
##### Params
| routes Array
Specific Routes for Resrouces

### `prefix`(_prefix)
##### Params
| _prefix string
Add Resource Route Controller

### `controller`(_controller)
##### Params
| _controller string
Add Resource Route Controller

### `middleware`(middlewares)
##### Params
| middlewares string
Apply Individual Middleware for each routes available in resource

### `add`(new_route)
##### Params
| new_route NewRoute
Add Extra Routes to Resource

### `resource`(middleware = [])
##### Params
| middleware Array
Give Middleware which apply to all resource routes

## NewRoute Class
New Route is used to add extra routes in resource routes.
### `uri`(_uri)
##### Params
| _uri string
Give URI for current route

### `method`(_method)
##### Params
| _method string
Give route type
Method must be get, post, patch, delete

### `middleware`(_middleware)
##### Params
| _middleware Array|String
Apply routes for current routes