---
title: Instance
---

A `<model>` can have multiple instances as childnodes. The first and required `<instance>` is called the _primary instance_ and should contain a single childnode that represents the data structure of the record that will be created and submitted with the form. In the form below, the `<household>` will be populated with data and submitted. The primary instance's single child is the **document root** that XPath expressions are evaluated on (e.g. in the instance below the value of `/household/person/age` is 10).

{% highlight xml %}
<instance>
    <household id="mysurvey" version="2014083101">
        <person>
            <firstname/>
            <lastname/>
            <age>10</age>
        </person>
        <meta>
          <instanceID/>
        </meta>
    </household>
</instance>
{% endhighlight %}

Any value inside a primary instance is considered a default value for that question. If that node has a corresponding input element that value will be displayed to the user when the question is parsed.

### Primary Instance 

Nodes inside a primary instance can contain attributes. The client application normally retains the attribute when a record is submitted. There are 2 pre-defined attributes:

* `id` on the childnode of the primary instance: This is the unique ID at which the form is identified the server that publishes the Form and receives data submissions. For more information see [this Form List Specification](https://bitbucket.org/javarosa/javarosa/wiki/FormListAPI). 
* `version` on the childnode of the primary instance can contain any string value.
* `jr:template` on any repeat group node: This serves to define a default template for repeats and is useful if any of the leaf nodes inside a repeat contains a default value. It is not transmitted in the record. For more details, see the [repeats](#repeats) section.

The primary instance also includes a special type of nodes for metadata inside the `<meta>` block. [pending]() - See also [Preloader](#preloaders---metadata) section


### Secondary Instances

Secondary instances are used to pre-load data inside a form. This data is searchable in XPath. At the moment the only use case is so-called _cascading selections_ where the available options of a multiple-choice question can be filtered based on an earlier answer.

A secondary instance should get a unique `id` attribute on the `<instance>` node. This allows apps to query the data (which is outside the root, ie. the primary instance) the data to be reachable in XPath using the `instance('the_id')/path/to/node` syntax.
