---
title: Body
---

The `<body>` contains the information required to display a question to a user, including the type of prompt, the appearance of the prompt (widget), the labels, the hints and the choice options.

{% highlight xml %}
 <h:body>
    <input ref="/data/firstname">
        <label>What is your first name?</label>
    </input>
    <input ref="/data/lastname">
        <label>What is your last name?</label>
    </input>
    <input ref="/data/age">
        <label>What is your age?</label>
    </input>
</h:body>
{% endhighlight %}

### Body Elements

The following form control elements are supported:

| control       | description
|---------------|------------
|`<input>`      | This element is used to obtain user input for data types: string, integer, decimal, and date. As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-input) without Special Attributes support.
|`<select1>`    | Used to display a single-select list (data type: string). As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-selectOne) without Special Attributes support.
|`<select>`     | Used to display a multiple-select list (data type: string). As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-selectMany) without Special Attributes support.
|`<upload>`     | Used for image, audio, and video capture. As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-upload) without support for filename and mediatype child elements, nor the `incremental` attribute and only supporting the `binary` data type.
|`<trigger>`    | Used to obtain user confirmation (e.g. by displaying a single tickbox or button). Will add value _"OK"_ to corresponding instance node when user confirms. If not confirmed the value remains empty.
|`<range>`      | Used to obtain numeric user input from a sequential range of values. Mostly as in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-range). However, it does not support the `incremental` attribute, and the `step`, `start`, and `end` attributes are required.
|`<odk:rank>`   | Used to require user to rank/order options. The ordered options are recorded as a space-separated list (as with `<select>`). The recorded list always includes all options.

The following user interface elements are supported:

| element       | description
|---------------|---------------------------------------
| `<group>`     | Child of `<body>`, another `<group>`, or a `<repeat>` that groups form controls together. See [groups](#groups) section for further details. As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice9.html#ui-group).
| `<repeat>`    | Child of `<body>` or `<group>` that can be repeated. See [repeats](#repeats) for further details.

Within the form controls the following elements can be used:

| element       | description
|---------------|------------------
| `<label>`     | Child of a [form control](#body-elements) element, `<item>`, `<itemset>` or `<group>` used to display a label. Only 1 `<label>` per form control is properly supported but can be used in [multiple languages](#languages)). As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-commonelems-label) without support for Linking Attributes.
| `<hint>`      | Child of a [form control](#body-elements) element used to display a hint. Only 1 `<hint>` element per form control is properly supported but can be used in [multiple languages](#languages)). As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-commonelems-hint) without support for Linking Attributes.
| `<output>`    | Child of a `<label>` or `<hint>` element used to display an instance value, inline, as part of the label, or hint text. It can also be a child of a `<text>` [translation](#languages). As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-output) but only supporting the `value` attribute.
| `<item>`      | Child of `<select>` or `<select1>` or `<odk:rank>` that defines an choice option. As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-common-elements-item).
| `<itemset>`   | Child of `<select>` or `<select1>` or `<odk:rank>` that defines a list of choice options to be obtained elsewhere (from a [secondary instance](#secondary-instances)). As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice9.html#ui-common-elements-itemset).
| `<value>`     | Child of `<item>` or `<itemset>` that defines a choice value. As in [XForms 1.0](https://www.w3.org/TR/2003/REC-xforms-20031014/slice8.html#ui-common-choices-value).

Below is an example of a label, an output, a hint, an itemset and value used together to define a form control:

{% highlight xml %}
 <group ref="/data/loc">
    <label>Cities</label>
    ...
    <odk:rank ref="/data/loc/cities">
        <label>Rank these cities</label>
        <hint>Rank the cities in <output value="/data/loc/country"/> in order of importance with the most important at the top.</hint>
        <itemset nodeset="randomize(instance('cities')/root/item[country= /data/loc/country ])">
            <value ref="name"/>
            <label ref="label"/>
        </itemset>
    </odk:rank>
</group>
{% endhighlight %}

### Body Attributes

The following attributes are supported on body elements. Note that most attributes can only be used on specific elements. If such a specific attribute is used on elements that do not support it, it will usually be silently ignored. 

| attribute     | description
|---------------|----------------
| `ref` / `nodeset` | To link a body element with its corresponding data node and binding, both `nodeset` and `ref` attributes can be used. The convention that is helpful is the one used in XLSForms: use `nodeset="/some/path"` for `<repeat>` and `<itemset>` elements and use `ref="/some/path"` for everything else. The `ref` attribute can also refer to an itext reference (see [languages](#languages))
| `class`         | Equivalent to class in HTML and allows a list of space-separated css classes as value. This attribute is only supported on the `<h:body>` element for form-wide style classes.
| `appearance`    | For all form control elements and groups to change their appearance. See [appearances](#appearances)
| `jr:count`      | For the `<repeat>` element (see [repeats](#repeats)). This is one of the ways to specify how many repeats should be created by default.
| `jr:noAddRemove`| For the `<repeat>` element (see [repeats](#repeats)). This indicates whether the user is allowed to add or remove repeats. Can have values `true()` and `false()`
| `autoplay`      | For all form control elements, this automatically plays a [video or audio 'label'](#media) if the question is displayed on its own page, when the user reaches this page.
| `accuracyThreshold` | For `<input>` with type `geopoint`, `geotrace`, or `geoshape` this sets the auto-accept threshold in meters for geopoint captures. [review]()
| `value`         | For the `<output>` element to reference the node value to be displayed.
| `rows`          | Specifies the minimum number of rows a string `<input>` field gets.
| `mediatype`     | For the `<upload>` element. The string value specifies the kind of media picker that will be displayed. Unlike in XForms 1.0, only one value can be specified. Possible values vary by client and examples include `image/*`, `audio/*` and `video/*`. Ignored if `accept` is also specified.
|`accept`         | For the `<upload>` element. As from the [XForms 2.0 wiki](https://www.w3.org/community/xformsusers/wiki/XForms_2.0#The_upload_Element): "comma-separated list of suggested media types and file extensions used to determine the possible sources of data to upload."
|`start`          | For the `<range>` element. The lower bound of the range. This attribute is required and its value has to be valid for the data type used.
|`end`            | For the `<range>` element. The upper bound of the range. This attribute is required and its value has to be valid for the data type used.
|`step`           | For the `<range>` element. The increment between values that can be selected. This attribute is required and its value has to be valid for the data type used.


### Appearances

The appearance of all form controls and of a group can be changed with appearance attributes. Appearance values usually relate to a specific [data](#data-types) or [question](#body-elements) type. See the [XLS Form specification](http://xlsform.org) for a list of appearance attributes that are available for each data type. Multiple space-separated appearance values can be added to a form control in any order.

An appearance value may also work in conjunction with an [image label](#media) to substantially alter the appearance and behavior of a form control as is e.g. the case with appearance 'image-map'.

An appearance attribute can also be used to indicate that an [external app](#external-applications) should be used as a form control.


