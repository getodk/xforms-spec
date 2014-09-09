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
|`<input>`      | Used to obtain user input for data types: string, integer, decimal, and date.
|`<select1>`    | Used to display a single-select list (data type: select1)
|`<select>`     | Used to display a multiple-select list (data type: select)
|`<upload>`     | Used for image, audio, and video capture
|`<trigger>`    | Used to obtain user confirmation (e.g. by displaying a single tickbox or button). Will add value _"OK"_ to corresponding instance node when user confirms. If not confirmed the value remains empty. [review]() 

Within the user controls the following elements can be used:

| element       | description
|---------------|------------------
| `<group>`     | Child of `<body>`, another `<group>`, or a `<repeat>` that groups form controls together. See [groups](#groups) section for further details.
| `<repeat>`    | Child of `<body>` or `<group>` that can be repeated. See [repeats](#repeats) for further details.
| `<label>`     | Child of a [form control](#body-elements) element, `<item>`, `<itemset>` or `<group>` used to display a label. Only 1 `<label>` per form control is properly supported but can be used in [multiple languages](#languages)).
| `<hint>`      | Child of a [form control](#body-elements) element used to display a hint. Only 1 `<hint>` element per form control is properly supported but can be used in [multiple languages](#languages)).
| `<output>`    | Child of a `<label>` or `<hint>` element used to display an instance value.
| `<item>`      | Child of `<select>` or `<select1>` that defines an choice option.
| `<itemset>`   | Child of `<select>` or `<select1>` that defines a list of choice options to be obtained elsewhere (from a [secondary instance](#secondary-instances)).
| `<value>`     | Child of `<item>` or `<itemset>` that defines a choice value.

### Body Attributes

The following attributes are supported on body elements. Note that most attributes can only be used on specific elements. If such a specific attribute is used on elements that do not support it, it will usually be silently ignored. 

| attribute     | description
|---------------|----------------
| `ref` / `nodeset` | To link a body element with its corresponding data node and binding, both `nodeset` and `ref` attributes can be used. The convention that is helpful is the one used in XLSForms: use `nodeset="/some/path"` for `<repeat>` and `<itemset>` elements and use `ref="/some/path"` for everything else. The `ref` attribute can also refer to an itext reference (see [languages](#languages))
| `class`         | Equivalent to class in HTML and allows a list of space-separate css classes as value. This attribute is only supported on the `<h:body>` element for form-wide style classes.
| `appearance`    | For all form control elements and groups to change their appearance. See [appearances](#appearances)
| `jr:count`      | For the `<repeat>` element (see [repeats](#repeats)). This is one of the ways to specify how many repeats should be created by default.
| `jr:noAddRemove`| For the `<repeat>` element (see [repeats](#repeats)). This indicates whether the user is allowed to add or remove repeats. Can have values `true()` and `false()`
| `autoplay`      | For all 5 form control elements, this automatically plays a [video or audio 'label'](#media) if the question is displayed on its own page, when the user reaches this page.
| `accuracyThreshold` | For `<input>` with type `geopoint`, `geotrace`, or `geoshape` this sets the auto-accept threshold in meters for geopoint captures. [review]()
| `rows`          | Specifies the minimum number of rows a string `<input>` field gets in ODK Collect. In Enketo a similar effect is achieved by adding appearance="multiline". [pending](https://github.com/enketo/enketo-xslt/issues/26)

### Appearances

The appearance of the 5 form controls can be changed with the appearance attributes. Appearance values usually relate to a specific [data type](#data-types). See the [XLS Form specification](http://xlsform.org) for a list of appearance attributes are available for each data type. Multiple space-separated appearance values can be added to a form control

TO ADD: 3rd party app launching with an appearance [review]()
