"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);


var app = (0, _express2.default)();
var port = 8080;




app.listen(port, function () {
    return console.log("server en puerto " + port + ", en proces" + process.pid);
});

app.get("/", function (req, res) {
    res.send("Servidor funiocnado en el puerto " + port + ", en el proceso " + process.pid);
});
