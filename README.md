# Http(s) ProxyServer
Http(s) proxy server 🕵

Proxy server which routes your http/https requests through a local server, written in NodeJS. 

Mac Users : In order to route through the server you need to do the following: Go to System preferences>Network>Advanced>Proxies and set http/http(s) proxies to the local host defined in the node.js file.

Simple Management console implemented, type 'Blacklist' followed by the URL to block eg: (Blacklist www.google.com).

Type 'UnBlacklist' followed by the URL to unblock them.

Blacklisted Urls are written locally to a text file (out.txt). At the start of the program the blacklist is
read into a map object for speed.

