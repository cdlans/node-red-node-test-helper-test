var should = require("should");
var helper = require("node-red-node-test-helper");
var functionNode = require("../node_modules/node-red/nodes/core/core/80-function");

helper.init(require.resolve('node-red'));

describe('node-red-node-test-helper', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });

    var flow = [
        {
            "id": "n1",
            "type": "function",
            // if global.get returns undefined, then an error is thrown and the test fails
            "func": "var os = global.get('osModule');\nif (os === undefined)\n    throw new Error('os is undefined');\nreturn msg;",
            "outputs": 1,
            "noerr": 0,
            "wires": [
                ["n2"]
            ]
        },
        { 
            id: "n2",
            type: "helper"
        }
    ]

    var settings = {
        functionGlobalContext: {
            osModule: require('os')
        }
    };

    it('should load the functionGlobalContext (1)', function (done) {
        
        helper.load(functionNode, flow, undefined, settings, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            n2.on("input", function (msg) {
                msg.payload.should.equal(1);
                done();
            });

            n1.receive({ payload: 1 });
        });
    });

    it('should load the functionGlobalContext (2)', function (done) {
        
        helper.load(functionNode, flow, undefined, settings, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            n2.on("input", function (msg) {
                msg.payload.should.equal(2);
                done();
            });

            n1.receive({ payload: 2 });
        });
    });

    it('should load the functionGlobalContext (3)', function (done) {
        
        helper.load(functionNode, flow, undefined, settings, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            n2.on("input", function (msg) {
                msg.payload.should.equal(3);
                done();
            });

            n1.receive({ payload: 3 });
        });
    });
    
    it('should load the functionGlobalContext (4)', function (done) {
        
        helper.load(functionNode, flow, undefined, settings, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            n2.on("input", function (msg) {
                msg.payload.should.equal(4);
                done();
            });

            n1.receive({ payload: 4 });
        });
    });
    
    it('should load the functionGlobalContext (5)', function (done) {
        
        helper.load(functionNode, flow, undefined, settings, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            n2.on("input", function (msg) {
                msg.payload.should.equal(5);
                done();
            });

            n1.receive({ payload: 5 });
        });
    });
});