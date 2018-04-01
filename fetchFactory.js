var fetchFactory = (api, type = 'GET', headersdata = {}, bodydata = {}) => {
    /*
        document.getElementById("spinner").style.display = 'flex';
        Here we can show our spinner or something
    */

   function status(response) {
    if (response.status >= 200 && response.status < 300) {
        /*
            document.getElementById("spinner").style.display = 'none';
            Here we can hide our spinner
        */
        console.log("Headers Content Type ::", response.headers.get('Content-Type'));
        console.log("Headers Date ::", response.headers.get('Date'));

        console.log("Response status ::",response.status);
        console.log("Response statustext ::", response.statusText);
        console.log("Response type ::", response.type);
        console.log("Response url ::", response.url);
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  
    function json(response) {
        return response.json()
    }

    if(headersdata){
    var hdrobj = Object.keys(headersdata);
        if (hdrobj.length > 0) {
            for (var i = 0; i < hdrobj.length; i++) {
                request.setRequestHeader(hdrobj[i], headersdata[hdrobj[i]]);
            }
        }
    }
    var myInit = {};

    if (type !== 'GET') {
        myInit = { 
            method: type,
            mode: 'cors',// there could be basic, cors and opaque mode, for more info read the documentation
            headers: headersdata,
            body: JSON.stringify(bodydata), // data can be `string` or {object}!
            cache: 'default' 
        };
    }
    
    myInit = { 
        method: type,
        mode: 'cors',// there could be basic, cors and opaque mode, for more info read the documentation
        cache: 'default' 
    };

    function handleData(data) {
        return data;
    }
    return new Promise((resolves, rejects) => {
        fetch(api, myInit) 
        .then(status)
        .then(json)
        .then(data => {
            console.log('Request succeeded with JSON response', data);
            resolves(data);
        })
        .catch(err => {
            console.log('Fetch Error :-S', err.message);
        /*
            document.getElementById("spinner").style.display = 'none';
            Here we can show the error screen or err msg
        */
        });
    })
    
};

var batters = [];

//ajax request for member details for handling the http requests starts here
function battersDataFetchReq() {
    fetchFactory('some.json', 'GET')
    .then(function(data) {
        showBattersData(data)
    })
}

function showBattersData(res) {
    var rowdata = `
        <table id="batters" name="batters" class="table table-bordered table-hover">
        <caption>List of batters</caption>
        <th>#</th>
        <th>Id</th>
        <th>Type</th>
        <tbody id="batters_body">`;    
    batters = res.batters.batter;
    for(var i = 0; i < batters.length; i++) {
        rowdata += `
            <tr>
                <td>${[i + 1]}</td>
                <td>${batters[i].id}</td>
                <td>${batters[i].type}</td>
            </tr>`;
    }
    rowdata += `</tbody></table>`;
    document.getElementById('tableWrapper').innerHTML = rowdata;
}
