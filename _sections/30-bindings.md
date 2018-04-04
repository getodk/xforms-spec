---
title: Bindings
---

A `<bind>` element wires together a primary instance node and the presentation of the corresponding question to the user. It is used to describe the datatype and various kinds of logic related to the data. A bind can refer to any node in the primary instance including repeated nodes. It may or may not have a corresponding presentation node in the [body](#body). 

An instance node does not require a corresponding `<bind>` node, regardless of whether it has a presentation node.

{% highlight xml %}
<bind nodeset="/d/my_intro" type="string" readonly="true()"/>
<bind nodeset="/d/text_widgets/my_string" type="string"/>
<bind nodeset="/d/text_widgets/my_long_text" type="string"/>
<bind nodeset="/d/number_widgets/my_int" type="int" constraint=". &lt; 10" jr:constraintMsg="number must be less than 10"  />
<bind nodeset="/d/number_widgets/my_decimal" type="decimal" constraint=". &gt; 10.51 and . &lt; 18.39" jr:constraintMsg="number must be between 10.51 and 18.39" />
<bind nodeset="/d/dt/my_date" type="date" constraint=". &gt;= today()" jr:constraintMsg="only future dates allowed" />
<bind nodeset="/d/dt/my_time" type="time"/>
<bind nodeset="/d/dt/dateTime" type="dateTime"/>
<bind nodeset="/d/s/my_select" type="select" constraint="selected(., 'c') and selected(., 'd'))" jr:constraintMsg="option c and d cannot be selected together" />
<bind nodeset="/d/s/my_select1" type="select1"/>
<bind nodeset="/d/geo/my_geopoint" type="geopoint"/>
<bind nodeset="/d/geo/my_geotrace" type="geotrace"/>
<bind nodeset="/d/geo/my_geoshape" type="geoshape"/>
<bind nodeset="/d/media/my_image" type="binary"/>
<bind nodeset="/d/media/my_audio" type="binary"/>
<bind nodeset="/d/media/my_video" type="binary"/>
<bind nodeset="/d/media/my_barcode" type="barcode"/>
<bind nodeset="/d/display/my_trigger" required="true()"/>
{% endhighlight %}

### Bind Attributes

The following attributes are supported on `<bind>` nodes. Only the nodeset attribute is required.

| attribute | description |
| --------- | --------- |
| `nodeset`   | Specifies the [path](#xpath-paths) to the instance node or attribute \[required\].
| `type`      | Specifies the data type. These are discussed below. Considered "string" if omitted or if an unknown type is provided.
| `readonly`  | Specifies whether the user is allowed to enter data, using a boolean expression. Considered `false()` if omitted. 
| `required`  | Specifies whether the question requires a non-empty value, using a boolean expression. Considered `false()` if omitted.
| `relevant`  | Specifies whether the question or group is relevant. The question or group will only be presented to the user when the XPath expression evaluates to `true()`. When `false()` the data node (and its descendants) are removed from the primary instance on submission.
| `constraint`| Specifies acceptable answers for the specified prompt with an XPath expression. Will only be evaluated when the node is non-empty.
| `calculate` | Calculates a node value with an XPath expression.
| `saveIncomplete` | Specifies whether to automatically save the draft record when the user reaches this question, options `true()` and `false()`. Considered false() if omitted.
| `jr:requiredMsg` | Specifies the custom message to be displayed when the `required` is violated. Attribute in "http://openrosa.org/javarosa" namespace.
| `jr:constraintMsg` | Specifies the custom message to be displayed when the `constraint` is violated.
| `jr:preload`| Preloaders for predefined meta data. See [preloaders](#preloaders---metadata).
| `jr:preloadParams` | Parameters used by `jr:preload`. See [preloaders](#preloaders---metadata).

### Data Types

| type 	     | description
|------------|------------
| `string`   | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#string), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `int`      | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#int), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `boolean`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#boolean), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `decimal`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#decimal), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `date`     | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#date), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `time` 	 | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#time), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `dateTime` | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#dateTime), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `geopoint` | Space-separated list of valid latitude (decimal degrees), longitude (decimal degrees), altitude (decimal meters) and accuracy (decimal meters)
| `geotrace` | Semi-colon-separated list of at least 2 geopoints, where the last geopoint's latitude and longitude is not equal to the first
| `geoshape` | Semi-colon-separated list of at least 3 geopoints, where the last geopoint's latitude and longitude is equal to the first
| `binary`   | String ID (with binary file attached to submission)
| `barcode`  | As string
| `intent`   | As string, used for [external applications](#declaring-external-application)

### XPath Paths

XPath paths are used in XForms to reference instance nodes to store or retrieve data. Both absolute and relative paths are supported, along with using the proper relative path context node, depending on the situation. Paths can currently only reference XML elements (not attributes, comments, or raw text). The references `.` and `..` are also supported at any point in the path. 

The following are examples of valid paths:

* `.`
* `..`
* `/`
* `node`
* `/absolute/path/to/node`
* `../relative/path/to/node`
* `./relative/path/to/node`
* `another/relative/path`
* `//node`


### XPath Operators

All [XPath 1.0 operators](http://www.w3.org/TR/xpath/#exprlex) are supported, i.e. `|`, `and`, `or`, `mod`, `div`, `=`, `!=`, `<=`, `<`, `>=`, `>`.

### XPath Predicates

Predicates are fully supported but with the limitations described in [XPath Axes](#xpath-axes) and [XPath Functions](#xpath-functions)

### XPath Axes

Only the _parent_, _child_ and _self_ axes are supported of the [XPath 1.0 axes](https://developer.mozilla.org/en-US/docs/Web/XPath/Axes).

### XPath Functions

A subset of [XPath 1.0 functions](http://www.w3.org/TR/xpath/#corelib), some functions of later versions of XPath, and a number of additional custom functions are supported. Some of the XPath 1.0 functions have been extended with additional functionality. 

| function                                  | description |
|-------------------------------------------|------|
<a id="fn:concat" href="#fn:concat">`concat(* arg*)`</a> | Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-concat) in that it may contain _1 argument_ and that all arguments can be _nodesets_ or strings. It concatenates all string values and _all node values_ inside the provided nodesets.
<a id="fn:selected" href="#fn:selected">`selected(string list, string value)`</a> | Checks if value is equal to an item in a space-separated list (e.g. `select` data type values).
<a id="fn:selected-at" href="#fn:selected-at">`selected-at(string list, int index)`</a> | Returns the value of the item at the 0-based index of a space-separated list or empty string if the item does not exist (including for negative index and index 0).
<a id="fn:count-selected" href="#fn:count-selected">`count-selected(node node)`</a> | Returns the number of items in a space-separated list (e.g. `select` data type values).
<a id="fn:jr:choice-name" href="#fn:jr:choice-name">`jr:choice-name(node node, string value)`</a> | Returns the label value in the active language corresponding to the choice option with the given value of a select or select1 question for the given data node. (sorry)
<a id="fn:jr:itext" href="#fn:jr:itext">`jr:itext(string arg)`</a> | Obtains an itext value for the provided reference in the active language.
<a id="fn:indexed-repeat" href="#fn:indexed-repeat">`indexed-repeat(nodeset arg, nodeset repeat1, int index1, [nodeset repeatN, int indexN]{0,2})`</a> | Returns a single node from a nodeset by selecting the 1-based index of a repeat nodeset that this node is a child of. It does this up to 3 repeat levels deep.
<a id="fn:if" href="#fn:if">`if(boolean condition, string then, string else)`</a> | Depending on the boolean value of the "condition", this function returns either the string result of the "then" parameter (if `true`) or of the "else" parameter (if `false`).
<a id="fn:true" href="#fn:true">`true()`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
<a id="fn:false" href="#fn:false">`false()`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
<a id="fn:boolean" href="#fn:boolean">`boolean(* arg)`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
<a id="fn:boolean-from-string" href="#fn:boolean-from-string">`boolean-from-string(string arg)`</a> | Returns true if arg is "true" or "1", otherwise returns false.
<a id="fn:not" href="#fn:not">`not(boolean arg)`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-not).
<a id="fn:number" href="#fn:number">`number(* arg)`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-number).
<a id="fn:decimal-date-time" href="#fn:decimal-date-time">`decimal-date-time(dateTime value)`</a> | Converts dateTime value to the number of days since January 1, 1970 UTC. This is the format used by Excel.
<a id="fn:decimal-time" href="#fn:decimal-time">`decimal-time(time value)`</a> | Converts time value to a number representing a fractional day in the device's timezone. For example, noon is 0.5 and 6pm is 0.75.
<a id="fn:int" href="#fn:int">`int(* arg)`</a> | Converts to an integer.
<a id="fn:string" href="#fn:string">`string(* arg)`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-string).
<a id="fn:format-date" href="#fn:format-date">`format-date(date value, string format)`</a> | Returns the provided date value formatted as defined by the format argument using the following identifiers:<br/>`%Y`: 4-digit year<br/>`%y`: 2-digit year<br/>`%m` 0-padded month<br/>`%n` numeric month<br/>`%b` short text month (Jan, Feb, etc)\*<br/>`%d` 0-padded day of month<br/>`%e` day of month<br/>`%a` short text day (Sun, Mon, etc).\* <br/>\* If form locale can be determined that locale will be used. If form locale cannot be determined the locale of the client will be used (e.g. the browser or app).
<a id="fn:format-date-time" href="#fn:format-date-time">`format-date-time(dateTime value, string format)`</a> | Returns the provided dateTime value formatted as defined by the format argument using the same identifiers as [`format-date`](#fn:format-date) plus the following:<br/>`%H` 0-padded hour (24-hr time)<br/>`%h` hour (24-hr time)<br/>`%M` 0-padded minute<br/>`%S` 0-padded second<br/>`%3` 0-padded millisecond ticks.\* <br/>\* If form locale can be determined that locale will be used. If form locale cannot be determined the locale of the client will be used (e.g. the browser or app).
<a id="fn:date" href="#fn:date">`date(* value)`</a> | Converts to date.
<a id="fn:regex" href="#fn:regex">`regex(string value, string expression)`</a> | Returns result of regex test on provided value. The regular expression is created from the provided expression string (`'[0-9]+'` becomes `/[0-9]+/`).
<a id="fn:coalesce" href="#fn:coalesce">`coalesce(string arg1, string arg2)`</a> | Returns first non-empty value of arg1 and arg2 or empty if both are empty and/or non-existent.
<a id="fn:join" href="#fn:join">`join(string separator, nodeset nodes*)`</a> | Joins the provided arguments using the provide separator between values.
<a id="fn:substr" href="#fn:substr">`substr(string value, number start, number end?)`</a> | Returns the substring beginning at the specified _0-based_ start index and extends to the character at end index - 1.
<a id="fn:string-length" href="#fn:string-length">`string-length(string arg)`</a> | Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-string-length) in that the argument is _required_.
<a id="fn:contains" href="#fn:contains">`contains(string haystack, string needle)`</a> | As in [XPath 1.0](https://www.w3.org/TR/xpath/#function-contains).
<a id="fn:starts-with" href="#fn:starts-with">`starts-with(string haystack, string needle)`</a> | As in [XPath 1.0](https://www.w3.org/TR/xpath/#function-starts-with).
<a id="fn:ends-with" href="#fn:ends-with">`ends-with(string haystack, string needle)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-ends-with).
<a id="fn:count" href="#fn:count">`count(nodeset arg)`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-count).
<a id="fn:count-non-empty" href="#fn:count-non-empty">`count-non-empty(nodeset arg)`</a> | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice7.html#fn-count-non-empty).
<a id="fn:sum" href="#fn:sum">`sum(nodeset arg)`</a> | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-sum).
<a id="fn:max" href="#fn:max">`max(nodeset arg*)`</a> | As in [XPath 2.0](http://www.w3.org/TR/xpath-functions/#func-max).
<a id="fn:min" href="#fn:min">`min(nodeset arg*)`</a> | As in [XPath 2.0](http://www.w3.org/TR/xpath-functions/#func-min).
<a id="fn:round" href="#fn:round">`round(number arg, number decimals?)`</a> | Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-round) in that a second argument may be provided to specify the number of decimals.
<a id="fn:pow" href="#fn:pow">`pow(number value, number power)`</a> | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-pow).
<a id="fn:log" href="#fn:log">`log(number arg)`</a> | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-log).
<a id="fn:log10" href="#fn:log10">`log10(number arg)`</a> | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-log10).
<a id="fn:abs" href="#fn:abs">`abs(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-abs).
<a id="fn:sin" href="#fn:sin">`sin(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-sin).
<a id="fn:cos" href="#fn:cos">`cos(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-cos).
<a id="fn:tan" href="#fn:tan">`tan(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-tan).
<a id="fn:asin" href="#fn:asin">`asin(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-asin).
<a id="fn:acos" href="#fn:acos">`acos(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-acos).
<a id="fn:atan" href="#fn:atan">`atan(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-atan).
<a id="fn:atan2" href="#fn:atan2">`atan2(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-atan2).
<a id="fn:sqrt" href="#fn:sqrt">`sqrt(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-sqrt).
<a id="fn:exp" href="#fn:exp">`exp(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-exp).
<a id="fn:exp10" href="#fn:exp10">`exp10(number arg)`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-exp10).
<a id="fn:pi" href="#fn:pi">`pi()`</a> | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-pi).
<a id="fn:today" href="#fn:today">`today()`</a> | Returns today's date without a time component.
<a id="fn:now" href="#fn:now">`now()`</a> | Returns the current datetime in the current time zone.
<a id="fn:random" href="#fn:random">`random()`</a> | Returns a random number between 0.0 (inclusive) and 1.0 (exclusive).
<a id="fn:uuid" href="#fn:uuid">`uuid(number?)`</a> | Without arguments, it returns a random [RFC 4122 version 4](http://tools.ietf.org/html/rfc4122) compliant UUID. With an argument it returns a random GUID with the provided number of characters.
<a id="fn:checklist" href="#fn:checklist">`checklist(number min, number max, string v*)`</a> | Check wether the count of answers that evaluate to true (when it converts to a number > 0) is between the minimum and maximum inclusive. Min and max can be -1 to indicate _not applicable_.
<a id="fn:weighted-checklist" href="#fn:weighted-checklist">`weighted-checklist(number min, number max, [string v, string w]*)`</a> | Like checklist(), but the number of arguments has to be even. Each v argument is paired with a w argument that _weights_ each v (true) count. The min and max refer to the weighted totals.
<a id="fn:position" href="#fn:position">`position(node arg?)`</a> | Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-position) in that it accepts an argument. This argument has to be a single node. If an argument is provided the function returns the position of that node amongst its siblings (with the same node name).
<a id="fn:property" href="#fn:property">`property(string prop)`</a> | Tbd
<a id="fn:instance" href="#fn:instance">`instance(string id)`</a> | Returns a [secondary instance](#secondary-instances) node with the provided id, e.g. `instance('cities')/item/[country=/data/country]`. It is the only way to refer to a node outside of the primary instance. Note that it doesn't switch the XML Document (the primary instance) or document root for other expressions. E.g. `/data/country` still refers to the primary instance.
<a id="fn:current" href="#fn:current">`current()`</a> | In the same league as `instance(ID)` but always referring to the primary instance (and accepting no arguments). Unlike instance(ID), which always requires an absolute path, current() can be used with relative references (e.g. `current()/.` and `current()/..`).
<a id="fn:area" href="#fn:area">`area(node-set ns | geoshape gs)`</a> | Returns the calculated area in m2 of either a nodeset of geopoints or a geoshape value (not a combination of both) on Earth. It takes into account the circumference of the Earth around the Equator but does not take altitude into account.
<a id="fn:distance" href="#fn:distance">`distance(node-set ns | geoshape gs | geotrace gt)`</a> | Returns the distance in meters of either a nodeset of geopoints or a single geoshape value or a single geotrace value (not a combination of these) on Earth, in the sequence provided by the points in the parameter. It takes into account the circumference of the Earth around the Equator and does not take altitude into account.
<a id="fn:once" href="#fn:once">`once(* calc)`</a> | The parameter will be evaluated and returned if the context nodes's value is empty, otherwise the current value of the context node will be returned. The function is used e.g. to ensure that a random number is only generated once with `once(random())`.
<a id="fn:randomize" href="#fn:randomize">`randomize(nodeset arg, number seed)`</a> | Shuffles the nodeset argument using [Durstenfeld's version of the Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). The optional seed argument performs a (reproducable) seeded shuffle using Fisher Yates with a linear congruential pseudorandom number generator as the one used by the [next() function in Java v7](https://docs.oracle.com/javase/7/docs/api/java/util/Random.html#next(int)).

### Metadata

This section describes metadata about _the record_ that is created with the form. Metadata about _the form itself_ (id, version, etc) is covered in the [Primary Instance](http://localhost:4000/#primary-instance) section.

The namespace of the meta block is either the default XForms namespace or "https://openrosa.org/xforms". The latter is recommended.

{% highlight xml %}
<instance>
    <data id="myform" orx:version="637">
        <question2/>
        <casename/>
        <confirm/>
        <orx:meta>
            <orx:deviceID/>
            <orx:timeStart/>
            <orx:timeEnd/>
            <orx:userID/>
            <orx:instanceID/>
            <orx:audit/>>
        </orx:meta>
    </data>
</instance>
{% endhighlight %}

These meta elements have corresponding `<bind>` elements with either a calculation or with _preload attributes_. Note that when using a calculation these values may be recalculated, e.g. when a draft record is loaded. This could lead to undesirable results for example when the result is a random value or timestamp.

Using both a calculation and preload attributes is technically allowed but never recommended, because one will overwrite the other. 

The following meta elements are supported:

| element      | description                                       | default datatype | value             | namespace
|--------------|---------------------------------------------------|----------------------------------------------------------------------------
| `instanceID` | The unique ID of the record [required]            | string           | concatenation of 'uuid:' and uuid() | same as meta block
| `timeStart`  | A timestamp of when the form entry was started    | datetime         | now()                     | same as meta block
| `timeEnd`    | A timestamp of when the form entry ended          | datetime         | now()                     | same as meta block
| `userID`     | The username stored in the client, when available | string           |                             | same as meta block
| `deviceID`   | Unique identifier of device. Guaranteed not to be blank but could be 'not supported'. Either the cellular IMEI (with imei: prefix, e.g. imei:A0006F5E212), WiFi mac address (with mac: prefix, e.g mac:01:23:45:67:89:ab), Android ID (e.g. android_id:12011110), or another unique device ID for a webbased client (with domain prefix,e .g. enketo.org:SOMEID) | string | depends on client, prefixed | same as meta block
| `deprecatedID` | The `<instanceID/>` of the submission for which this is a revision. This revision will get a newly generated `<instanceID/>` and this field is populated by the prior value. Server software can use this field to unify multiple revisions to a submission into a consolidated submission record. | string |  | same as meta block
| `email`		| The user's email address when available. | string | | same as meta block
| `phoneNumber` | The phone number of the device, when available | string | | same as meta block
| `simSerial`	| SIM serial number of phone, when available. | string | |same as meta block
| `subscriberID`| IMSI of phone prefixed (with imsi: prefix, e.g. imsi:SD655E212), when available. | string | |same as meta block
| `audit`       | A CSV or zipped CSV file containing audit logs pertaining to the record, including timing data in a format that is yet to be documented. The file is attached in the same way as for an `<upload>` form control and binary instance node. Filename is determined by the client. | binary | filename | same as meta block

As mentioned in [Bind Attributes](#bind-attributes), there are two different preload attributes. A particular combination of pre-load attributes populates a value according to a **predetermined fixed formula**, when a **predetermined event** occurs. Different combinations handle different events and use a different calculation.

Supported preload attribute combinations are: 

| jr:preload    | jr:preloadParams  | value           		| event
|---------------|-------------------|-----------------------|-------------
| uid           |                   | see `instanceID` 		| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready) if no existing value
| timestamp     | start             | see `timeEnd` 		| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready) if no existing value
| timestamp     | end               | see `timeEnd`  		| [xforms-revalidate](https://www.w3.org/TR/xforms/#evt-revalidate)
| property   	| deviceid          | see `deviceID` 	 	| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready)
| property		| email             | see `email` 			| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready)
| property 		| username          | see `userID` 			| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready)
| property      | phone number      | see `phoneNumber`  	| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready)
| property      | simserial         | see `simSerial` 		| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready)
| property      | subscriberid	    | see `subscriberID`  	| [xforms-ready](https://www.w3.org/TR/xforms/#evt-ready)
