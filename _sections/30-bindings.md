---
title: Bindings
---

A `<bind>` element wires together a primary instance node and the presentation of the corresponding question to the user. It is used to describe the datatype and various kinds of logic related to the data. A bind can refer to any node in the primary instance including repeated nodes_. It may or may not have a corresponding presentation node in the [body](#body). 

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
| `nodeset`   | Specifies the [path](#xpath-paths) to the instance node' \[required\].
| `type`      | Specifies the data type. These are discussed below. Considered string if omitted.
| `readonly`  | Specifies whether the user is allowed to enter data, options: `true()`, and `false()`. Considered false() if omitted.
| `required`  | Specifies whether the question requires a non-empty value, options: `true()`, and `false()`. Considered false() if omitted.
| `relevant`  | Specifies whether the question or group is relevant. The question or group will only be presented to the user when the XPath expression evaluates to true. When false the data node (and their descendants) is/are emptied.
| `constraint`| Specifies acceptable answers for the specified prompt with an XPath expression.
| `calculate` | Calculates a node value with an XPath expression.
| `saveIncomplete` | Specifies whether to automatically save the draft record when the user reaches this question, options `true()` and `false()`. Considered false() if omitted.
| `jr:constraintMsg` | The message that will be displayed if the specified constraint is violated.
| `jr:preload`| Preloaders for predefined meta data. See [preloaders](#preloaders---metadata).
| `jr:preloadParams` | Parameters used by `jr:preload`. See [preloaders](#preloaders---metadata).

### Data Types

| type 	     | description
|------------|------------
| `string`   | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#string)
| `int`      | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#int)
| `boolean`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#boolean)
| `decimal`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#decimal)
| `date`     | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#date)
| `time` 	 | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#time)
| `dateTime` | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#dateTime) [review]()
| `select`   | space-separated list of strings [review]()
| `select1`  | as string (spaces strongly discouraged) [review]()
| `geopoint` | space-separated list of valid latitude (decimal degrees), longitude (decimal degrees), altitude (decimal meters) and accuracy (decimal meters)
| `geotrace` | semi-colon separated list of at least 2 geopoints, where the last geopoint's latitude and longitude is not equal to the first
| `geoshape` | semi-colon separated list of at least 3 geopoints, where the last geopoint's latitude and longitude is equal to the first
| `binary`   | [review]()
| `barcode`  | as string [review]()

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


### XPath Expressions

All [XPath 1.0 expressions](http://www.w3.org/TR/xpath/#section-Expressions) are supported, i.e. `|`, `or`, `and`, `=`, `!=`, `<=`, `<`, `>=`, `>`. Note that predicate support is very limited (see next section).

### XPath Predicates

Only the `path/to[node=value]` predicate is supported. 

\[What about `xpath/to/node[2]`, `xpath/to/node[@attr=value]`, `xpath/to/node[position()=2]` in JavaRosa?. [review]()\]

### XPath Axes

Only the _parent_ and _child_ axes are supported of the [XPath 1.0 axes](https://developer.mozilla.org/en-US/docs/Web/XPath/Axes). [review]()

### XPath Functions

A subset of [XPath 1.0 functions](http://www.w3.org/TR/xpath/#corelib), some functions of later versions of XPath, and a number of additional custom functions are supported. Some of the XPath 1.0 functions have been extended with additional functionality. 

| function | description |
|---------|------|
| `concat(* arg*)` 							| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-concat) in that it may contain _1 argument_ and that all arguments can be _nodesets_ or strings. It concatenates all string values and _all node values_ inside the provided nodesets.
| `selected(string list, string value)` 	| Checks if value is equal to an item in a space-separated list (e.g. `select` data type values).
| `selected-at(string list, int index)` 	| Returns the value of the item at the 1-based index of a space-separated list or empty string if the item does not exist (including for negative index and index 0).
| `count-selected(string list)` 			| Returns the number of items in a space-separated list (e.g. `select` data type values).
| `jr:choice-name(string value, node node)` | Returns the label value in the active language corresponding to the choice option with the given value of a select or select1 question question for the given data node. (sorry)
| `indexed-repeat(nodeset arg, nodeset repeat1, int index1, [nodeset repeatN, int indexN]{0,2})` | Returns a single node from a nodeset by selecting the 0-based index of a repeat nodeset. It does this up to 3 repeat levels deep.
| `true()` 									| As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
| `false()` 								| As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
| `boolean(* arg)` 							| As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
| `boolean-from-string(string arg)` 		| Returns true if arg is "true" or "1", otherwise returns false.
| `not(boolean arg)`						| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-not).
| `number(* arg)` 							| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-number).
| `decimal-date(date value)` 				| Converts date value to a number.
| `decimal-date-time(dateTime value)` 		| Converts dateTime value to a number.
| `decimal-time(time value)` 				| Converts time value to a number.
| `int(* arg)` 								| Converts to an integer.
| `string(* arg)` 							| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-string).
| `format-date(date value, string format)` 	| Returns the date value formatted as defined by the format argument using the following identifiers:<br/>`%Y`: 4-digit year<br/>`%y`: 2-digit year<br/>`%m` 0-padded month<br/>`%n` numeric month<br/>`%b` short text month (Jan, Feb, etc)<br/>`%d` 0-padded day of month<br/>`%e` day of month<br/>`%H` 0-padded hour (24-hr time)<br/>`%h` hour (24-hr time)<br/>`%M` 0-padded minute<br/>`%S` 0-padded second<br/>`%3` 0-padded millisecond ticks<br/>`%a` short text day (Sun, Mon, etc)
| `date (* value)` 							| Converts to date.
| `regex(string value, string expression)` 	| Returns result of regex test on provided value. The regular expression is created from the provided expression string (`'[0-9]+'` becomes `/[0-9]+/`).
| `coalesce(string arg1, string arg2)` 		| Returns first non-empty value of arg1 and arg2 or empty if both are empty and/or non-existent.
| `join(string separator, nodeset nodes*)` 	| Joins the provided arguments using the provide separator between values.
| `substr(string value, number start, number end?)` | Returns the substring beginning at the specified _0-based_ start index and extends to the character at end index - 1.
| `string-length(string arg)`				| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-string-length) in that the argument is _required_.
| `count(nodeset arg)`						| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-count).
| `sum(nodeset arg)`						| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-sum).
| `max(nodeset arg*)`						| As in [XPath 2.0](http://www.w3.org/TR/xpath-functions/#func-max). [pending](https://code.google.com/p/opendatakit/issues/detail?id=1044)
| `min(nodeset arg*)`						| As in [XPath 2.0](http://www.w3.org/TR/xpath-functions/#func-min). [pending](https://code.google.com/p/opendatakit/issues/detail?id=1044)
| `round(number arg, number decimals?)`		| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-round) in that a second argument may be provided to specify the number of decimals. [pending](https://code.google.com/p/opendatakit/issues/detail?id=1045)
| `pow(number value, number power)`			| As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-pow).
| `today()`									| Returns today's datetime as a string [review]()
| `now()`									| same as today() [review]()
| `random()`								| Returns a random number between 0.0 (inclusive) and 1.0 (exclusive)
| `uuid()`									| Return a random [RFC 4122 version 4](http://tools.ietf.org/html/rfc4122) compliant UUID string [review]()
| `checklist(number min, number max, string v*)`				    | Check wether the count of answers that evaluate to true (when it converts to a number > 0) is between the minimum and maximum inclusive. Min and max can be -1 to indicate _not applicable_.
| `weighted-checklist(number min, number max, [string v, string w]*)`	| Like checklist(), but the number of arguments has to be even. Each v argument is paired with a w argument that _weights_ each v (true) count. The min and max refer to the weighted totals.
| `position(node arg?)`						| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-position) in that it accepts an argument. This argument has to be a single node. If an argument is provided the function returns the position of that node amongst its siblings (with the same node name). [review]()
| `property(string prop)`					| Tbd, this is **not** a valid XPath function in its current JavaRosa implementation. [pending](https://code.google.com/p/opendatakit/issues/detail?id=1034)
| `instance(string id)`						| Returns a [secondary instance](#secondary-instances) node with the provided id, e.g. `instance('cities')/item/[country=/data/country]`. It is the only way to refer to a node outside of the primary instance. Note that it doesn't switch the XML Document (the primary instance) or document root for other expressions. E.g. `/data/country` still refers to the primary instance.
| `current()`								| In the same league as `instance(ID)` but always referring to the primary instance (and accepting no arguments). Unlike instance(ID), which always requires an absolute path, current() can be used with relative references (e.g. `current()/.` and `current()/..`).
| `area(node-set ns | geoshape gs)`			| Returns the calculated area in m2 of either a nodeset of geopoints or a geoshape value (not a combination of both) on Earth. It takes into account the circumference of the Earth around the Equator but does not take altitude into account.	
| `once(* calc)`						| The parameter will be returned if the context nodes's value is empty, otherwise the current value of the context node will be returned. The function is used e.g. to ensure that a random number is only generated once with `once(random())`. [review]()

### Preloaders - Metadata

To be discussed. Not complete and not correct.

[review]()

| jr:preload    | jr:preloadParams | node            | description
|---------------|------------------|-----------------|-------------------
| instance      |                  | /meta/instanceID| Unique Instance ID generated by concatenating 'uuid:' with the value generated by the uuid() XPath function.
| timestamp     | start            | /meta/timeStart | Timestamp in datetime data format when the user opened the form. Only populated once.
| timestamp     | end              | /meta/timeEnd   | Timestamp in datetime data format when the user last saved the form. 
| property   	| deviceid         |      tbc        | Unique identifier of device. Guaranteed not to be blank but could be 'not supported'. Either the cellular IMEI (with imei: prefix, e.g. imei:A0006F5E212), WiFi mac address (with mac: prefix, e.g mac:01:23:45:67:89:ab), Android ID (e.g. android_id:12011110), or another unique device ID for a webbased client (with domain prefix,e .g. enketo.org:SOMEID).
| property		| email            |      tbc        | Populate with the user's email address if the client has access to this, otherwise 'not supported'.
| property 		| username         |      tbc        | Populate with username stored in the client. Can be blank if not set or 'not supported'. 
| property      | phone number     |      tbc        | Populate with phone number of device. Can be blank if not available (e.g. for desktop or tablet) or 'not supported'.
| property      | simserial        |      tbc        | SIM serial number of phone. May be blank (e.g. for desktop or tablet or 'not supported').
| property      | subscriberid	   |      tbc        | IMSI of phone prefixed (with imsi: prefix, e.g. imsi:SD655E212). May be blank (e.g., tablets).




