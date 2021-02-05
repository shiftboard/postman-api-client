var accessKeyID = pm.environment.get('accessKeyID');
var secretKey = pm.environment.get('secretKey');

var CryptoJS = require('crypto-js');

const query = pm.request.url.query;
const apiMethod = query.find(x => x.key == 'method').value;
fixBadParams(query);
const params = query.find(x => x.key == 'params').value;

var shaData, queryString;

if (request.method == 'POST') {
    var postData = JSON.stringify({ 'id': 1, 'jsonrpc': '2.0', 'method': apiMethod, 'params': JSON.parse(params) })
    shaData = postData;
    pm.globals.set('postData', postData);
    queryString = 'access_key_id=' + encodeURIComponent(accessKeyID);
}
else if (request.method == 'GET') {
    pm.request.url.addQueryParams('access_key_id=' + encodeURIComponent(accessKeyID));
    pm.request.url.addQueryParams('jsonrpc=2.0');
    pm.request.url.addQueryParams('id=1');

    queryString = query.filter(x => !x.disabled).map(x => x.key + '=' + encodeURIComponent(x.key == 'params' ? btoa(params) : x.value )).join('&');
    shaData = 'method' + apiMethod + 'params' + params;
}

var signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(shaData, secretKey));
queryString += '&signature=' + encodeURIComponent(signature);

pm.request.url.query = queryString;

// handle missing / disabled / empty params
function fixBadParams(query) {
    // if missing, add
    if (!query.find(x => x.key == 'params')) {
        pm.request.url.addQueryParams('params={}');
    }
    var qParams = query.find(x => x.key == 'params');
    // if disabled, enable but make it empty
    if (qParams.disabled) {
        qParams.value = '{}';
        qParams.disabled = false;
    }
    // if no value, give default value
    else if (!qParams.value) {
        qParams.value = '{}';
    }
}

function btoa(str) {
    var buffer;

    if (str instanceof Buffer) {
        buffer = str;
    } else {
        buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
}
