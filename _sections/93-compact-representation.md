---
title: Compact Record Representation (for SMS) 
---
ODK XForms records are generally represented as XML using the structure of the [primary instance](primary-instance). It is also possible to define how a record can be represented more compactly, usually for SMS submission. 

For this representation:
- The value of the `prefix` attribute on the primary instance's single child is included at the beginning of every record.

- Questions that have a `tag` attribute are represented as the `tag` value followed by the element's value. Questions without a `tag` attribute are omitted.

- The value of the `delimiter` attribute on the primary instance's single child is used to separate components of the compact representation (prefix, tags, values). Defaults to a single space (` `) if not explicitly specified.

Given the following ODK XForm definition:

{% highlight xml %}
<instance>
    <household id="household_survey" orx:version="2018061801" odk:prefix="hh" odk:delimiter="+">
    	<meta>
          <instanceID odk:tag="id" />
        </meta>
        <person>
            <firstname odk:tag="fn" />
            <lastname odk:tag="ln" />
            <age />
        </person>
    </household>
</instance>
{% endhighlight %}

Full records might look like:

{% highlight xml %}
<household id="household_survey" orx:version="2018061801" odk:prefix="hh" odk:delimiter="+">
	<meta>
		<instanceID>uuid:82724cc5-df6f-46bf-86d5-26683ae35d5b</instanceID>
	</meta>
	<person>
		<firstname odk:tag="fn" />
		<lastname odk:tag="ln">Bar</lastname>
		<age>10</age>
	</person>
</household>
{% endhighlight %}

{% highlight xml %}
<household id="household_survey" orx:version="2018061801" odk:prefix="hh" odk:delimiter="+">
	<meta>
		<instanceID>uuid:82724cc5-df6f-46bf-86d5-26683ae35d5b</instanceID>
	</meta>
	<person>
		<firstname odk:tag="fn">Mary Kate</firstname>
		<lastname odk:tag="ln">Doe</lastname>
		<age>15</age>
	</person>
</household>
{% endhighlight %}

The compact representations of those records would be:
`hh+ln+Bar`

`hh+fn+Mary Kate+ln+Doe`

If the delimiter is included in one of the question values, it will be prepended by a slash. For example, the first name `"Mary Kate"` would be represented as `"Mary\ Kate"` if the default space delimiter is used.

As in the regular representation, nodes that are not relevant are not included in the compact representation. Unlike in the regular representation, nodes that are relevant but empty are not included in the compact representation, even if they have an `odk:tag`.