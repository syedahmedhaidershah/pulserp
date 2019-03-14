PULSERP 0.0.1

PULSERP is in beta phase.

To setup the database, change credentials in:
"imports/config/db/index.js"

||||||||||      DEFINITIONS FOR IMPORTS     ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//////////////////////////////////////////////////////////////////////////////////////
MODULE "imports/defaults/index.js":

-   A module with default responses and methods.
-   Attributes:
    >   defRes:
            default 200 response, key: 'def'.
            Value:
                {
                    error: false,
                    message: 200
                }

    >   errRes:
            default error response, key: 'def'.
            Value:
                {
                    error: true,
                    message: 'An unhandled exception occured, please contact your administrator.'
                }

-   METHODS:
    >   setRetRes:
            Uses a default response body to generate another.
            Parameters:
                1st:    key / type ('def' or 'err')
                2nd:    Message (string for response's message attribute)
            Returns:
                An edited version of defRes or errRes with updated response's message

//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
MODULE "imports/functions/general.js":

-   A module with general methods required throughout the API.
-   METHODS:
    >   matchReqInt:
            Matches the request's body to the provided interface.
            Parameters:
                1st:    Request body as JSON
                2nd:    Interface (interfaces could be found in "imports/interfaces")
            Returns:
                TRUE:   if the request body matches the interface,
                FALSE:  if it doesn't

    >   isJson:
            Checks if the provided parameter is a JSON Object
            Parameters:
                1st:    JSON Object
            Returns:
                TRUE:   if the parameter is a JSON Object,
                FALSE:  if it isn't

    >   isJsonStr:        
            Checks if the provided parameter is a Stringified JSON
            Parameters:
                1st:    Stringified JSON / JSON String
            Returns:
                TRUE:   if the parameter is a JSON String,
                FALSE:  if it isn't

    >   generateSimpleQuery:
            Generates and returns a SQL Query String
            Parameters:
                1st:    Query array (Queries can be found in module "imports/queries.js")
                2nd:    JSON Object for query parameters
            Returns:
                if generated:   SQL Query string,
                else if not:    Empty String

//////////////////////////////////////////////////////////////////////////////////////

||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||







||||||||||      DEFINITIONS FOR INTERFACES     ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//////////////////////////////////////////////////////////////////////////////////////
MODULE "imports/interfaces/login.js":

-   Interface to match with request body for data while logging in.
-   params:
    >   username:   String
    >   password:   String
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
MODULE "imports/interfaces/register.js":

-   Interface to match with request body for data while registering user.
-   params:
    >   username: String,
    >   password: String,
    >   firstname: String,
    >   lastname: String,
    >   email: String,
    >   phone: String,
    >   package: number
//////////////////////////////////////////////////////////////////////////////////////

||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||







||||||||||      DEFINITIONS FOR ROUTES     ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//////////////////////////////////////////////////////////////////////////////////////
DIRECTORY "routes/":

-   Contains routers (API routes) as modules (exported functions not Objects).
//////////////////////////////////////////////////////////////////////////////////////