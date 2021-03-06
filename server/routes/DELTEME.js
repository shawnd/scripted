/*******************************************************************************
 * @license
 * Copyright (c) 2012 VMware, Inc. All Rights Reserved.
 * THIS FILE IS PROVIDED UNDER THE TERMS OF THE ECLIPSE PUBLIC LICENSE
 * ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THIS FILE
 * CONSTITUTES RECIPIENTS ACCEPTANCE OF THE AGREEMENT.
 * You can obtain a current copy of the Eclipse Public License from
 * http://www.opensource.org/licenses/eclipse-1.0.php
 *
 * Contributors:
 *     Andrew Eisenberg
 ******************************************************************************/

var fs = require('fs');
var path = require('path');

var CLIENT_TESTS = path.resolve(__dirname, '../../tests/client/scriptedClientTests.html');
var CLIENT_SERVER_TESTS = path.resolve(__dirname, '../../tests/client/scriptedClientServerTests.html');
var TEST_FILE = path.resolve(__dirname, '../../');

exports.install = function (app) {
	console.log (CLIENT_TESTS);
	console.log (CLIENT_SERVER_TESTS);
	function sendClientTests(req, res) {
		try {
			console.log ("Handling client tests");
			res.header('Content-Type', 'text/html');
			fs.createReadStream(CLIENT_TESTS).pipe(res);
		} catch (e) {
			console.trace(e);
		}
	}
	function sendClientServerTests(req, res) {
		try {
			console.log ("Handling client server tests");
			res.header('Content-Type', 'text/html');
			fs.createReadStream(CLIENT_SERVER_TESTS).pipe(res);
		} catch (e) {
			console.trace(e);
		}
	}
	function sendTestFile(req, res) {
		try {
			console.log ("Handling test file: " + req.path);
			res.header('Content-Type', 'text/javascript');
			fs.createReadStream(TEST_FILE + req.path).pipe(res);
		} catch (e) {
			console.trace(e);
		}
	}

	app.get('/clientTests', sendClientTests);

	app.get('/clientServerTests', sendClientServerTests);
	
	app.get('/tests/:path(*)', sendTestFile);

};
