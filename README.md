# node-proxy
A simple node proxy

### How to use
* Run `npm install` to install the dependencies
* Config the project in config.js
	<pre>
	{
	  API_BASE_PATH: "", // The prefix path is used to indentify if it needs to be redirected
	  DEFAULT_TARGET_PROXY_HOST: "", // Thr proxy server host, need to be defined with port
	  DEFAULT_PUBLIC_PATH: "./"	// The public folder where holds the index.html and other static assets
	}
	</pre>
* Run `node server.js`, the proxy server will be host at http://127.0.0.1:300. You can change the port in server.js as you want