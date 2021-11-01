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
| `nodeset`   | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice3.html#structure-bind-element) this specifies the [path](#xpath-paths) to the instance node or attribute \[required\].
| `type`      | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice6.html#model-prop-type) this specifies the data type. [These data types](#data-types) values are supported and is considered "string" if omitted or if an unknown type is provided.
| `readonly`  | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice6.html#model-prop-readOnly) this specifies whether the user is allowed to enter data, using a boolean expression. Considered `false()` if omitted. 
| `required`  | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice6.html#model-prop-required) this pecifies whether the question requires a non-empty value, using a boolean expression. Considered `false()` if omitted.
| `relevant`  | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice6.html#model-prop-relevant) this specifies whether the question or group is relevant. The question or group will only be presented to the user when the XPath expression evaluates to `true()`. When `false()` the data node (and its descendants) are removed from the primary instance on submission.
| `constraint`| As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice6.html#model-prop-relevant) this specifies acceptable answers for the specified prompt with an XPath expression. Will only be evaluated when the node is non-empty.
| `calculate` | As in [Xforms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice6.html#model-prop-calculate) this calculates a node value with an XPath expression.
| `saveIncomplete` | Specifies whether to automatically save the draft record when the user reaches this question, options `true()` and `false()`. Considered false() if omitted.
| `jr:requiredMsg` | Specifies the custom message to be displayed when the `required` is violated. Value can be string literal (`jr:constraintMsg="message"`) or a [translation function](#fn:Translation-Functions) call (`jr:constraintMsg="jr:itext('id')"`).
| `jr:constraintMsg` | Specifies the custom message to be displayed when the `constraint` is violated. Value can be string literal (`jr:requiredMsg="message"`) or a [translation function](#fn:Translation-Functions) call (`jr:requiredMsg="jr:itext('id')"`).
| `jr:preload`| Preloaders for predefined meta data. See [preloaders](#preloaders---metadata).
| `jr:preloadParams` | Parameters used by `jr:preload`. See [preloaders](#preloaders---metadata).
| `orx:max-pixels`| Specifies a transformation for uploaded images (binary datatype), e.g. `orx:max-pixels="1024"`. If the long edge of the image is larger than the provided number value, the image should be resized proportionally so that the long edge matches the provided pixel value.

### Data Types

The following are acceptable data type values.

| type 	     | description
|------------|------------
| `string`   | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#string), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `int`      | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#int), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `boolean`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#boolean), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `decimal`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#decimal), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `date`     | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#date), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `time` 	 | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#time), optionally in "http://www.w3.org/2001/XMLSchema" namespace
| `dateTime` | Deviates from [XML 1.0](http://www.w3.org/TR/xmlschema-2/#dateTime), in that it _includes the timezone offset_ (i.e. not normalized to UTC). The timezone offset is HH:MM, where both hours and minutes are required and are zero-padded, preceded by the + or - sign without any spaces. The offset may also equal "Z".
| `geopoint` | Space-separated list of valid latitude (decimal degrees), longitude (decimal degrees), altitude (decimal meters) and accuracy (decimal meters)
| `geotrace` | Semi-colon-separated list of at least 2 geopoints, where the last geopoint's latitude and longitude is not equal to the first
| `geoshape` | Semi-colon-separated list of at least 3 geopoints, where the last geopoint's latitude and longitude is equal to the first
| `binary`   | URI pointing to binary file. For user-uploaded files attached to a submission, only the filename with extension should be used without a scheme or subdirectories.
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

All [XPath 1.0 operators](https://www.w3.org/TR/1999/REC-xpath-19991116/#exprlex) are supported, i.e. `|`, `and`, `or`, `mod`, `div`, `=`, `!=`, `<=`, `<`, `>=`, `>`, `+`, `-`.

Note that the standard XPath type conversions are extended by this specification in the [`number()` function](#fn:number). This extended functionality provides the ability to perform arithmetic with, and compare, date and dateTime strings.

### XPath Predicates

Predicates are fully supported but with the limitations described in [XPath Axes](#xpath-axes) and [XPath Functions](#xpath-functions)

### XPath Axes

Only the _parent_, _child_ and _self_ axes are supported of the [XPath 1.0 axes](https://developer.mozilla.org/en-US/docs/Web/XPath/Axes).

### XPath Functions

A subset of [XPath 1.0 functions](https://www.w3.org/TR/1999/REC-xpath-19991116/#corelib), XForms functions, some functions of later versions of XPath, and a number of additional custom functions are supported. Some of the XPath/XForms functions have been extended with additional functionality.  

The XPath evaluator will automatically cast function arguments to their required data types by calling the `number()`, `string()`, `boolean()` functions, as described in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#section-Function-Calls). The XPath evaluator has no knowledge of the data type of the value stored in the model. In XForms, node values are always stored and obtained as strings.

_Note: since expression results are stored in the XForms model as strings using the `string()` function, a boolean `false` result, such as from the expression `1 > 2`, is stored in the model as the string `"false"`. When referring to that node in another expression as a boolean argument, the **string value** of that node ("false") is converted to a boolean by calling the `boolean()` function which returns the boolean `true` because `boolean("false") = true()`. To deal with this, it usually best to not do boolean comparisons with stored values (compare strings instead) or use [`boolean-from-string()`](#fn:boolean-from-string) in the XPath comparison expression._

The table below describes the functions, and the data types of their arguments and return values, using the following special argument characters:

* `?` argument is optional
* `*` argument can be repeated
* `|` alternative argument is allowed 

For convenience, the functions are categorized based on their main usage. Some functions could be argued to (also) belong in another category. However, the data type rules mentioned above are the same for all functions, regardless of the category they have been placed under.

| function                                  | returns | description |
|-------------------------------------------|---------|-------------|
<a id="fn:String-Functions" href="#fn:String-Functions">**String Functions**</a>|||
<a id="fn:string" href="#fn:string">`string(* arg)`</a> | string | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-string).
<a id="fn:concat" href="#fn:concat">`concat(string arg*|node-set arg*)`</a> | string | Deviates from [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-concat) in that it may contain _1 argument_ and that all arguments can be _node-sets_ or strings. It concatenates all string values and _all node values_ inside the provided node-sets.
<a id="fn:join" href="#fn:join">`join(string separator, node-set nodes*)`</a> |  string | Joins the provided arguments using the provide separator between values.
<a id="fn:substr" href="#fn:substr">`substr(string value, number start, number end?)`</a> |  string | Returns the substring beginning at the specified _0-based_ start index and extends to the character at end index - 1.
<a id="fn:substring-before" href="#fn:substring-before">`substring-before(string, string)`</a> |  string | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-substring-before).
<a id="fn:substring-after" href="#fn:substring-after">`substring-after(string, string)`</a> |  string | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-substring-after).
<a id="fn:translate" href="#fn:translate">`translate(string, string, string)`</a> |  string | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-translate).
<a id="fn:string-length" href="#fn:string-length">`string-length(string arg)`</a> |  number | Deviates from [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-string-length) in that the argument is _required_.
<a id="fn:normalize-space" href="#fn:normalize-space">`normalize-space(string arg?)`</a> | string | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-normalize-space)
<a id="fn:contains" href="#fn:contains">`contains(string haystack, string needle)`</a> |  boolean | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-contains).
<a id="fn:starts-with" href="#fn:starts-with">`starts-with(string haystack, string needle)`</a> | boolean | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-starts-with).
<a id="fn:ends-with" href="#fn:ends-with">`ends-with(string haystack, string needle)`</a> | boolean | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-ends-with).
<a id="fn:uuid" href="#fn:uuid">`uuid(number?)`</a> |  string | Without arguments, it returns a random [RFC 4122 version 4](http://tools.ietf.org/html/rfc4122) compliant UUID. With an argument it returns a random string with the provided number of characters.
<a id="fn:digest" href="#fn:digest">`digest(string src, string algorithm, string encoding?)`</a> |  string | As in [XForms 1.1](https://www.w3.org/TR/xforms/#fn-digest)
<a id="fn:pulldata" href="#fn:pulldata">`pulldata(string instance_id, string desired_element, string query_element, string query)`</a> | string | Returns a single value from a secondary instance based on the specified query. Shortcut for `instance(instance_id)/root/item[query_element=query]/desired_element`.
<a id="fn:Boolean-Functions" href="#fn:Boolean-Functions">**Boolean Functions**</a>|||
<a id="fn:if" href="#fn:if">`if(boolean condition, * then, * else)`</a> |  string | Deviates from [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice7.html#fn-if) in that the 2nd and 3rd parameter are objects and not strings.
<a id="fn:coalesce" href="#fn:coalesce">`coalesce(string arg1, string arg2)`</a> |  string | Returns first non-empty value of arg1 and arg2 or empty if both are empty and/or non-existent.
<a id="fn:once" href="#fn:once">`once(string calc)`</a> |  string | The parameter will be evaluated and returned if the context nodes's value is empty, otherwise the current value of the context node will be returned. The function is used e.g. to ensure that a random number is only generated once with `once(random())`.
<a id="fn:true" href="#fn:true">`true()`</a> | boolean | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-true).
<a id="fn:false" href="#fn:false">`false()`</a> |  boolean | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-false).
<a id="fn:boolean" href="#fn:boolean">`boolean(* arg)`</a> | boolean | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-boolean).
<a id="fn:boolean-from-string" href="#fn:boolean-from-string">`boolean-from-string(string arg)`</a> | boolean | Deviates from [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice7.html#fn-boolean-from-string) in that it returns `false` for any argument that is not "true" or "1".
<a id="fn:not" href="#fn:not">`not(boolean arg)`</a> | boolean | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-not).
<a id="fn:regex" href="#fn:regex">`regex(string value, string expression)`</a> |  boolean | Returns result of regex test on provided value. The regular expression is created from the provided expression string (`'[0-9]+'` becomes `/[0-9]+/`).
<a id="fn:checklist" href="#fn:checklist">`checklist(number min, number max, string v*)`</a> |  boolean | Check whether the count of answers that evaluate to true (when it converts to a number > 0) is between the minimum and maximum inclusive. Min and max can be -1 to indicate _not applicable_.
<a id="fn:weighted-checklist" href="#fn:weighted-checklist">`weighted-checklist(number min, number max, [string v, string w]*)`</a> | boolean | Like checklist(), but the number of arguments has to be even. Each v argument is paired with a w argument that _weights_ each v (true) count. The min and max refer to the weighted totals.
<a id="fn:Number-Functions" href="#fn:Number-Functions">**Number Functions**</a>|||
<a id="fn:number" href="#fn:number">`number(* arg)`</a> | number | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-number). In addition it will convert date- and dateTime-formatted strings to a number of days since January 1, 1970 UTC.
<a id="fn:random" href="#fn:random">`random()`</a> |  number | Deviates from [XForms 1.1](https://www.w3.org/TR/xforms11/#fn-random) by not supporting a parameter.
<a id="fn:int" href="#fn:int">`int(number arg)`</a> |  number | Converts to an integer (a whole number) by discarding the fractional component of a number.
<a id="fn:sum" href="#fn:sum">`sum(node-set arg)`</a> |  number | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-sum).
<a id="fn:max" href="#fn:max">`max(node-set arg*)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-max).
<a id="fn:min" href="#fn:min">`min(node-set arg*)`</a> | number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-min).
<a id="fn:round" href="#fn:round">`round(number arg, number decimals?)`</a> |  number | Deviates from [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-round) in that a second argument may be provided to specify the number of decimals.
<a id="fn:pow" href="#fn:pow">`pow(number value, number power)`</a> |  number | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-pow).
<a id="fn:log" href="#fn:log">`log(number arg)`</a> |  number| As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-log).
<a id="fn:log10" href="#fn:log10">`log10(number arg)`</a> |  number | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-log10).
<a id="fn:abs" href="#fn:abs">`abs(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-abs).
<a id="fn:sin" href="#fn:sin">`sin(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-sin).
<a id="fn:cos" href="#fn:cos">`cos(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-cos).
<a id="fn:tan" href="#fn:tan">`tan(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-tan).
<a id="fn:asin" href="#fn:asin">`asin(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-asin).
<a id="fn:acos" href="#fn:acos">`acos(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-acos).
<a id="fn:atan" href="#fn:atan">`atan(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-atan).
<a id="fn:atan2" href="#fn:atan2">`atan2(number arg, number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-atan2).
<a id="fn:sqrt" href="#fn:sqrt">`sqrt(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-sqrt).
<a id="fn:exp" href="#fn:exp">`exp(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-exp).
<a id="fn:exp10" href="#fn:exp10">`exp10(number arg)`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-exp10).
<a id="fn:pi" href="#fn:pi">`pi()`</a> |  number | As in [XPath 3.0](https://www.w3.org/TR/xpath-functions-30/#func-math-pi).
<a id="fn:Node-set-Functions" href="#fn:Node-set-Functions">**Node-set Functions**</a>|||
<a id="fn:count" href="#fn:count">`count(node-set arg)`</a> |  number | As in [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-count).
<a id="fn:count-non-empty" href="#fn:count-non-empty">`count-non-empty(node-set arg)`</a> | number | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice7.html#fn-count-non-empty).
<a id="fn:position" href="#fn:position">`position(node arg?)`</a> | number | Deviates from [XPath 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/#function-position) in that it accepts an argument. This argument has to be a single node. If an argument is provided the function returns the position of that node amongst its siblings (with the same node name).
<a id="fn:instance" href="#fn:instance">`instance(string id)`</a> |  node-set | As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice7.html#fn-instance). Note that it doesn't switch the document root for predicates. E.g. in `instance('cities')/item/[country=/data/country]`, the `/data/country` path still refers to the primary instance.
<a id="fn:current" href="#fn:current">`current()`</a> |  node-set | As in [XForms 1.1](https://www.w3.org/TR/xforms11/#fn-current). Used inside predicates of expressions that use instance() to enable referring to a node relative to the context of the _current_ question. E.g. as in `instance('countries')/item[name=current()/../name]/capital`).
<a id="fn:randomize" href="#fn:randomize">`randomize(node-set arg, number seed)`</a> |  node-set | Shuffles the node-set argument using the ["inside-out" variant of the Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_%22inside-out%22_algorithm). The optional seed argument performs a (reproducible) shuffle using the same algorithm with a _seeded_ Park Miller Pseudo Number Generator.
<a id="fn:Date-and-Time-Functions" href="#fn:Date-and-Time-Functions">**Date and Time Functions**</a>|||
<a id="fn:today" href="#fn:today">`today()`</a> |  string | Returns a string with today's local date in the format described under the [date datatype](#data-types).
<a id="fn:now" href="#fn:now">`now()`</a> |  string | Deviates from [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice7.html#fn-now) in that it returns the current date and time _including timezone offset_ (i.e. not normalized to UTC) as described under the [dateTime datatype](#data-types).
<a id="fn:format-date" href="#fn:format-date">`format-date(date value, string format)`</a> | string | Returns the provided date value formatted as defined by the format argument using the following identifiers:<br/>`%Y`: 4-digit year<br/>`%y`: 2-digit year<br/>`%m` 0-padded month<br/>`%n` numeric month<br/>`%b` short text month (Jan, Feb, etc)\*<br/>`%d` 0-padded day of month<br/>`%e` day of month<br/>`%a` short text day (Sun, Mon, etc).\* <br/>\* If form locale can be determined that locale will be used. If form locale cannot be determined the locale of the client will be used (e.g. the browser or app).
<a id="fn:format-date-time" href="#fn:format-date-time">`format-date-time(dateTime value, string format)`</a> | string | Returns the provided dateTime value formatted as defined by the format argument using the same identifiers as [`format-date`](#fn:format-date) plus the following:<br/>`%H` 0-padded hour (24-hr time)<br/>`%h` hour (24-hr time)<br/>`%M` 0-padded minute<br/>`%S` 0-padded second<br/>`%3` 0-padded millisecond ticks.\* <br/>\* If form locale can be determined that locale will be used. If form locale cannot be determined the locale of the client will be used (e.g. the browser or app).
<a id="fn:date" href="#fn:date">`date(* value)`</a> | string | Converts to a string in the ....date format.
<a id="fn:decimal-date-time" href="#fn:decimal-date-time">`decimal-date-time(dateTime value)`</a> | number | Converts dateTime value to the number of days since January 1, 1970 UTC.
<a id="fn:decimal-time" href="#fn:decimal-time">`decimal-time(time value)`</a> |  number | Converts time value to a number representing a fractional day in the device's timezone. For example, noon is 0.5 and 6pm is 0.75.
<a id="fn:Select-Functions" href="#fn:Select-Functions">**Select Functions**</a>|||
<a id="fn:selected" href="#fn:selected">`selected(string list, string value)`</a> | boolean | Checks if value is equal to an item in a space-separated list (e.g. `select` data type values).
<a id="fn:selected-at" href="#fn:selected-at">`selected-at(string list, number index)`</a> | string | Returns the value of the item at the 0-based index of a space-separated list or empty string if the item does not exist (including for negative index and index 0).
<a id="fn:count-selected" href="#fn:count-selected">`count-selected(node node)`</a> |  number | Returns the number of items in a space-separated list (e.g. `select` data type values).
<a id="fn:jr:choice-name" href="#fn:jr:choice-name">`jr:choice-name(node node, string value)`</a> |  string | Returns the label value in the active language corresponding to the choice option with the given value of a select or select1 question for the given data node. (sorry)
<a id="fn:Translation-Functions" href="#fn:Translation-Functions">**Translation Functions**</a>|||
<a id="fn:jr:itext" href="#fn:jr:itext">`jr:itext(string id)`</a> | string | Obtains an itext value for the provided reference in the active language from the `<itext>` block in the model.
<a id="fn:Repeat-Functions" href="#fn:Repeat-Functions">**Repeat Functions**</a>|||
<a id="fn:indexed-repeat" href="#fn:indexed-repeat">`indexed-repeat(node-set arg, node-set repeat1, number index1, [node-set repeatN, number indexN]{0,2})`</a> | string | Returns a single node value from a node-set by selecting the 1-based index of a repeat node-set that this node is a child of. It does this up to 3 repeat levels deep. E.g. `indexed-repeat(//node, /path/to/repeat, //index1, /path/to/repeat/nested-repeat, //index2)` is meant to be a shortcut for `//repeat[position()=//index1]/nested-repeat[position()=index2]/node` in native XPath syntax.
<a id="fn:Geographic-Functions" href="#fn:Geographic-Functions">**Geographic Functions**</a>|||
<a id="fn:area" href="#fn:area">`area(node-set ns|geoshape gs)`</a> | number | Returns the calculated area in m2 of either a node-set of geopoints or a geoshape value (not a combination of both) on Earth. It takes into account the circumference of the Earth around the Equator but does not take altitude into account.
<a id="fn:distance" href="#fn:distance">`distance(node-set ns|geoshape gs|geotrace gt)`</a> |  number | Returns the distance in meters of either a node-set of geopoints or a single geoshape value or a single geotrace value (not a combination of these) on Earth, in the sequence provided by the points in the parameter. It takes into account the circumference of the Earth around the Equator and does not take altitude into account.

### Metadata

This section describes metadata about _the record_ that is created with the form. Metadata about _the form itself_ (id, version, etc) is covered in the [Primary Instance](#primary-instance) section.

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
| `audit`       | A CSV or zipped CSV file containing audit logs pertaining to the record (e.g., timing, location). The file is attached in the same way as for an `<upload>` form control and binary instance node. Filename is determined by the client and file follows this [documented format](https://docs.getodk.org/form-audit-log). What data is recorded is configurable via [audit attributes](#audit-attributes). | binary | filename | same as meta block

#### Preload Attributes

As mentioned in [Bind Attributes](#bind-attributes), there are two different preload attributes. A particular combination of pre-load attributes populates a value according to a **predetermined fixed formula**, when a **predetermined event** occurs. Different combinations handle different events and use a different calculation.

Supported preload attribute combinations are: 

| jr:preload    | jr:preloadParams  | value           		| event
|---------------|-------------------|-----------------------|-------------
| uid           |                   | see `instanceID` 		| [odk-instance-first-load](#event:odk-instance-first-load)
| timestamp     | start             | see `timeEnd` 		| [odk-instance-first-load](#event:odk-instance-first-load)
| timestamp     | end               | see `timeEnd`  		| [xforms-revalidate](https://www.w3.org/TR/xforms/#evt-revalidate)
| property   	| deviceid          | see `deviceID` 	 	| [odk-instance-first-load](#event:odk-instance-first-load)
| property		| email             | see `email` 			| [odk-instance-first-load](#event:odk-instance-first-load)
| property 		| username          | see `userID` 			| [odk-instance-first-load](#event:odk-instance-first-load)
| property      | phone number      | see `phoneNumber`  	| [odk-instance-first-load](#event:odk-instance-first-load)
| property      | simserial         | see `simSerial` 		| [odk-instance-first-load](#event:odk-instance-first-load)
| property      | subscriberid	    | see `subscriberID`  	| [odk-instance-first-load](#event:odk-instance-first-load)

#### Audit Attributes

| attribute                   | description
| --------------------------- | -----------
| `odk:location-priority`     | `no-power`, `low-power`, `balanced`, or `high-accuracy` as defined in [LocationRequest](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest). Required to enable location in log.
| `odk:location-min-interval` | The desired minimum time, in seconds, location updates will be fetched. Required to enable location in log.
| `odk:location-max-age`      | The maximum time, in seconds, locations will be considered valid. Must be greater than or equal to `odk:location-min-interval`. Required to enable location in log.
| `odk:track-changes`         | Can be set to `"true"` or `"false"`. If true, whenever an answer is changed, the old value and new value will be added to the log. Attribute is not required and defaults to false.
