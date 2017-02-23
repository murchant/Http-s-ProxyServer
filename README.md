# Http(s) ProxyServer
Http(s) proxy server 🕵

Proxy server which routes your http/https requests through a local server, written in NodeJS.

Simple Management console implemented, type 'Blacklist' followed by the URL to block eg: (Blacklist www.google.com).

Type 'UnBlacklist' followed by the URL to unblock them.

Blacklisted Urls are written locally to a text file (out.txt). At the start of the program the blacklist is
read into a map object for speed.

