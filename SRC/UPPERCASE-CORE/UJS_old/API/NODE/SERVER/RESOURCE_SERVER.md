# `CLASS` global.RESOURCE_SERVER
create resourec server.

## Parameters
* `REQUIRED` portOrParams 
* `OPTIONAL` portOrParams.port 
* `OPTIONAL` portOrParams.securedPort 
* `OPTIONAL` portOrParams.securedKeyFilePath 
* `OPTIONAL` portOrParams.securedCertFilePath 
* `OPTIONAL` portOrParams.noParsingParamsURI 
* `OPTIONAL` portOrParams.rootPath 
* `OPTIONAL` portOrParams.version 
* `OPTIONAL` requestListenerOrHandlers 
* `OPTIONAL` requestListenerOrHandlers.requestListener 
* `OPTIONAL` requestListenerOrHandlers.error 
* `OPTIONAL` requestListenerOrHandlers.notExistsResource 
* `OPTIONAL` requestListenerOrHandlers.preprocessor 

## Static Members

### getContentTypeFromExtension
get content type from extension.
###### Parameters
* `REQUIRED` ext 

### addPreprocessor
add preprocessor.
###### Parameters
* `REQUIRED` params 
* `REQUIRED` params.extension 
* `REQUIRED` params.preprocessor 

## Public Members

### getNativeHTTPServer
get native http server.
###### Parameters
No parameters.

### getNativeHTTPSServer
get native https server.
###### Parameters
No parameters.
