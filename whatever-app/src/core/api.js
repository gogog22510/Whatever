// Speed up calls to hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

const apiRequest = (url, method) => (data = {}) => {
    if (method === "GET") {
        if (isEmpty(data)) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(data);
        }
        return fetch(url, {
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            method: method, // *GET, POST, PUT, DELETE, etc.
        });
    }
    // POST
    else {
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'content-type': 'application/json'
            },
            method: method, // *GET, POST, PUT, DELETE, etc.
        });
    }
};

export const simpleApiRequest = (request, callback, errCallback = undefined) => {
    return request
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                return response.text();
            }
        }) // parses response to JSON
        .then(jsonData => {
            try {
                return callback(jsonData);
            } catch (e) {
                throw e;
            }
        })
        .catch(err => {
            console.log(err);
            if (errCallback) {
                errCallback(err);
            }
        })
};

export default apiRequest