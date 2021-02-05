# Shiftboard Postman Reference Client

This is a Postman collection for interacting with the API service for
[Shiftboard](https://shiftboard.com). The collection may be used directly, or as an example for
developing custom code using data from Shiftboard.

To make use of the script you will need an active account on [Shiftboard](https://shiftboard.com),
an API Access Key, and Signature Key enabled in your account.

For more information on the Shiftboard APIs, see the [documentation](http://www.shiftdata.com).


## Instructions

1. Select a request in the collection, or create a new one
2. Set the URI to **{\{shiftboardUriToken}}**
3. Fill out `method` with the Shiftboard API method you are using, e.g., **account.get**
4. Fill out `params` *(optional)*, e.g. **{"id":108}**
5. Select an HTTP method, either `GET` or `POST`.
  * For `POST` requests, set the request *Body* to **{\{postData}}**
6. Set your *Environment* (see below)
7. Hit *Send*


## Environment

To use these requests, you must have an *Environment* with three keys and values:

* `accessKeyId` - your unique API key from Shiftboard
* `secretKey` - your secret key from Shiftboard
* `shiftboardUri` - the URI for the API, e.g.:
  * Shiftboard in U.S. / Canada: **https://api.shiftdata.com/**
  * Shiftboard in E.U.: **https://api-data.eu.shiftboard.com/**


## Technical Notes

Each request uses the *Pre-request Script* in the collection to manage packaging up the request. It adds additional query parameters, encodes the `params`, does authentication, signs the request, and so on.

### LICENSE

MIT
