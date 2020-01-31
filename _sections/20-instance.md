---
title: Instance
---

A `<model>` can have multiple instances as childnodes. The first and required `<instance>` is called the _primary instance_ and represents the data structure of the record that will be created and submitted with the form. Additional instances are called _secondary instances_.

### Primary Instance

The _primary instance_ is the first instance defined by the form and should contain a single childnode. In the example below `<household>` will be populated with data and submitted. The primary instance's single child is the **document root** that XPath expressions are evaluated on (e.g. in the instance below the value of `/household/person/age` is 10).

{% highlight xml %}
<instance>
    <household id="mysurvey" orx:version="2014083101">
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

Any value inside a primary instance is considered a default value for that question. If that node has a corresponding input element that value will be displayed to the user when the question is rendered. For nodes of [type "binary"](#data-types), defaults use [file endpoint URIs](#file-endpoints).

Nodes inside a primary instance can contain attributes. The client application normally retains the attribute when a record is submitted. There are 3 pre-defined instance attributes:

| attribute     | description
|---------------|------------
| `id`          | on the childnode of the primary instance: This is the unique ID at which the form is identified by the server that publishes the Form and receives data submissions. For more information see [this Form List Specification](https://bitbucket.org/javarosa/javarosa/wiki/FormListAPI). \[required\]
| `orx:version` | on the childnode of the primary instance in the _http://openrosa.org/xforms/_ namespace: Form version which can contain any string value. Like [meta nodes](#metadata) this information is used as a _processing cue_ for the server receiving the submission.
| `odk:generated-by` | on the childnode of the primary instance in the _http://opendatakit.org/xforms_ namespace: optional string generated-by which is used to identify the tool and the version that generated the form. The tool and version must be separated by a space (e.g., `odk:generated-by="pyxform v1.0.0"`).
| `odk:prefix` | on the childnode of the primary instance in the _http://opendatakit.org/xforms_ namespace: optional string prefix which is included at the beginning of the [compact representation](#compact-record-representation-(for-sms))
| `odk:delimiter` | on the childnode of the primary instance in the _http://opendatakit.org/xforms_ namespace: optional string delimiter which is used to separate prefix, tags and values in the [compact representation](#compact-record-representation-(for-sms))
| `odk:tag` | on a question node (grandchild of the primary instance) in the _http://opendatakit.org/xforms_ namespace: optional string tag which is used to identify nodes that should be part of the [compact representation](#compact-record-representation-(for-sms))
| `jr:template` | on any repeat group node in the _http://openrosa.org/javarosa namespace_: This serves to define a default template for repeats and is useful if any of the leaf nodes inside a repeat contains a default value. It is not transmitted in the record and only affects the behavior of the form engine. For more details, see the [repeats](#repeats) section.

The primary instance also includes a special type of nodes for metadata inside the `<meta>` block. See the [Metadata](#metadata) section




### Secondary Instances - Internal

Secondary instances are used to pre-load read-only data inside a form. This data is searchable in XPath. At the moment the key use case is in designing so-called _cascading selections_ where the available options of a multiple-choice question can be filtered based on an earlier answer.

A secondary instance should get a unique `id` attribute on the `<instance>` node. This allows apps to query the data (which is outside the root, ie. the primary instance, and would normally not be reachable). It uses the `instance('cities')/root/item[country='nl']` syntax to do this.

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
<instance id="cities">
    <root>
        <item>
            <itextId>static_instance-cities-0</itextId>
            <country>nl</country>
            <name>ams</name>
        </item>
        <item>
            <itextId>static_instance-cities-1</itextId>
            <country>usa</country>
            <name>den</name>
      </item>
      <item>
            <itextId>static_instance-cities-2</itextId>
            <country>usa</country>
            <name>nyc</name>
      </item>
      <item>
        <itextId>static_instance-cities-5</itextId>
        <country>nl</country>
        <name>dro</name>
      </item>
    </root>
</instance>
<instance id="neighborhoods">
    <root>
        <item>
            <itextId>static_instance-neighborhoods-0</itextId>
            <city>nyc</city>
            <country>usa</country>
            <name>bronx</name>
        </item>
        <item>
            <itextId>static_instance-neighborhoods-3</itextId>
            <city>ams</city>
            <country>nl</country>
            <name>wes</name>
        </item>
        <item>
            <itextId>static_instance-neighborhoods-4</itextId>
            <city>den</city>
            <country>usa</country>
            <name>goldentriangle</name>
        </item>
        <item>
            <itextId>static_instance-neighborhoods-8</itextId>
            <city>dro</city>
            <country>nl</country>
            <name>haven</name>
        </item>
    </root>
</instance>
{% endhighlight %}

### Secondary Instances - External

The previous section discussed secondary instances with static read-only data that is present in the XForm document itself. Another type of secondary instances presents read-only data from an _external_ source. The external source can be static or dynamic and is specified using the additional `src` attribute with a URI value on an empty `<instance>` node. Querying an external instance is done in exactly the same way as for an [internal secondary instance](#secondary-instances---internal).

{% highlight xml %}
<instance id="countries" src="jr://file/country-data.xml"/>
{% endhighlight %}

See the [section on URIs](#uris) for acceptable URI formats that refer to an external secondary instance.
