/**
 * Generate Express Routes.
 * 
 * Route support Resource routes that includes below routes.
 * 
 * |------------|-----------|---------------|
 * | Method     | Uri       | Function      |
 * |------------|-----------|---------------|
 * | Get        | /         | index         |
 * | Post       | /store    | store         |
 * | GET        | /show     | show          |
 * | Patch      | /update   | update        |
 * | Delete     | /delete   | delete        |
 * | Patch      | /status   | status        |
 * |------------|-----------|---------------|
 * 
 */

class Router {

    /**
     * Register Express Route while creating object
     * 
     * @constructs Router
     */
    constructor(route, _controller_path = './controllers') {

        /**
         * @member {Route} route Express Route Object
         */
        this.route = route

        /**
         * @member {string} controller_path Controller Actual Path
         */
        this.controller_path = _controller_path


        /**
         * @member {array} is_routes Avaialble routes checking
         */
        this.is_routes = { index: true, store: true, show: true, delete: true, update: true, status: true }

        /**
         * @member {array} _specific_middleware Apply Middleware to Specific routes
         */
        this._specific_middleware = { index: [], store: [], show: [], delete: [], update: [], status: [] }

        /**
         * @member {array} other_routes Extra Routes
         */
        this.other_routes = []
    }

    /**
     * Exclude routes from Resources
     * 
     * @param {array} except_routes List of except routes from resource routes
     * @return this
     */
    except(except_routes) {
        except_routes.map((_route) => this.is_routes[_route] = false)
        return this;
    }

    /**
     * Specific Routes for Resrouces
     * 
     * @param {array} only_routes List of route want to generate for resrouces
     * @return this
     */
    only(only_routes) {
        only_routes.map((_route) => this.is_routes[_route] = false)
        for (var key in this.is_routes) {
            if (this.is_routes.hasOwnProperty(key)) {
                this.is_routes[key] = !this.is_routes[key]
            }
        }
        return this;
    }

    /**
     * Give Resource Route Prefix
     * 
     * @param {string} _prefix Resource url prefix
     * @return this
     */
    prefix(_prefix) {
        this.prefix = _prefix
        return this;
    }

    /**
     * Add Resource Route Controller
     * 
     * @param {string} _controller Resource controller
     * @return this
     */
    controller(_controller) {
        this.controller = _controller
        return this;
    }

    /**
     * Apply Individual Middleware for each routes available in resource
     * 
     * @param {array} middlewares middleware array for routes
     * @return this
     */
    middleware(middlewares) {
        for (var key in middlewares) {
            if (this._specific_middleware.hasOwnProperty(key)) {
                this._specific_middleware[key] = middlewares[key]
            }
        }

        return this;
    }

    /**
     * Add Extra Routes to Resource
     * 
     * @param {NewRoute} new_route NewRoute Object
     * @return this
     */
    add(new_route) {
        if (new_route instanceof NewRoute)
            this.other_routes.push(new_route.create())
        return this;
    }

    /**
     * Give Middleware which apply to all resource routes
     * 
     * @param {array} middleware Global Middleware
     * @return void
     */
    resource(middleware = []) {

        // Get Controller Instance
        const Controller = require(`./${this.controller_path}/${this.controller}.controller`);

        // Resource List
        if (this.is_routes.index) {
            this.route.get(`/${this.prefix}/`, middleware.concat(this._specific_middleware.index), Controller.index);
        }

        // Create Resource
        if (this.is_routes.store) {
            this.route.post(`/${this.prefix}/store`, middleware.concat(this._specific_middleware.store), Controller.store);
        }

        // Get Resource Information
        if (this.is_routes.show) {
            this.route.get(`/${this.prefix}/show`, middleware.concat(this._specific_middleware.show), Controller.show);
        }

        // Delete Resource By Id
        if (this.is_routes.delete) {
            this.route.delete(`/${this.prefix}/delete`, middleware.concat(this._specific_middleware.delete), Controller.delete);
        }

        // Update Resource By Id
        if (this.is_routes.update) {
            this.route.patch(`/${this.prefix}/update`, middleware.concat(this._specific_middleware.update), Controller.update);
        }

        // Update Resource Status By Id
        if (this.is_routes.status) {
            this.route.patch(`/${this.prefix}/status`, middleware.concat(this._specific_middleware.status), Controller.status);
        }

        // Register Other Routes if given
        this.other_routes.map(other_route => {
            this.route[other_route.type](`/${this.prefix}/${other_route.uri}`, middleware.concat(other_route.middleware), Controller[other_route.method]);
        })
    };
}



/**
 * Generate New Route.
 *
 * New Route is used to add extra routes in resource routes.
 */
class NewRoute {

    /**
     * Register callback method of controller
     *
     * @constructs Router
     */
    constructor(callback) {
        this._uri = ''
        this._callback = callback
        this._middleware = []
        this._type = 'get'
    }

    /**
     * Give URI for current route
     *
     * @param {string} __uri Give uri after prefix
     * @return this
     */
    uri(__uri) {
        this._uri = __uri
        return this;
    }

    /**
     * Give route type
     * 
     * @param {stirng} __method Method must be get, post, patch, delete
     * @return this
     */
    method(__method) {
        this._type = __method
        return this;
    }

    /**
     * Apply routes for current routes
     * 
     * @param {string} _middleware Middleware for current routes
     * @return this
     */
    middleware(_middleware) {
        this.middleware = _middleware
        return this;
    }

    /**
     * Get new routes paramteres
     * @return object
     */
    create() {
        return {
            'uri': this._uri,
            'middleware': this._middleware,
            'method': this._callback,
            'type': this._type
        }
    }
}

module.exports = {
    Router,
    NewRoute
}