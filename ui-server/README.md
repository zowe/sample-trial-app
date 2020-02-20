# ui-server

Provide simple HTTPS server to serve Sample Trial app plugins.

## Start Dev Server

```
npm start
```

Then visit `https://localhost:8080` to access the test server. 

## CLI Options

```
$ node src/index.js -h
Usage: explorer-ui-server [options]

Options:
  --version      Show version number                                   [boolean]
  -s, --service  service-for path                                  [default: ""]
  -b, --path     base path uri
  -d, --dir      base dir                         [required] [default: "../app"]
  -p, --port     listening port
  -k, --key      server key                                        [default: ""]
  -c, --cert     server cert                                       [default: ""]
  -x, --pfx      server pfx                                        [default: ""]
  -w, --pass     server pfx passphrase                             [default: ""]
  -f, --csp      csp whitelist ancestors frames                       [required]
  -v, --verbose  show request logs                    [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
```
