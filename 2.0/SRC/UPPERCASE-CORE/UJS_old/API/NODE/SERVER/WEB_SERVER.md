# `CLASS` global.WEB_SERVER
create web server.

## Parameters
* `REQUIRED` portOrParams 
* `OPTIONAL` portOrParams.port 
* `OPTIONAL` portOrParams.securedPort 
* `OPTIONAL` portOrParams.securedKeyFilePath 
* `OPTIONAL` portOrParams.securedCertFilePath 
* `OPTIONAL` portOrParams.noParsingParamsURI 
* `REQUIRED` requestListener 

## Static Members

### getEncodingFromContentType
get encoding from content type.
###### Parameters
* `REQUIRED` contentType 

## Public Members

### getNativeHTTPServer
get native http server.
###### Parameters
No parameters.

### getNativeHTTPSServer
get native https server.
###### Parameters
No parameters.
