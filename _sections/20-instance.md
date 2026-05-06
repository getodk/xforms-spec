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
| `id`          | on the childnode of the primary instance: This is the unique ID at which the form is identified by the server that publishes the Form and receives data submissions. For more information see [the OpenRosa Form List API](https://docs.getodk.org/openrosa-form-list/). \[required\]
| `orx:version` | on the childnode of the primary instance in the _http://openrosa.org/xforms/_ namespace: Form version which can contain any string value. Like [meta nodes](#metadata) this information is used as a _processing cue_ for the server receiving the submission.
| `odk:prefix` | on the childnode of the primary instance in the _http://opendatakit.org/xforms_ namespace: optional string prefix which is included at the beginning of the [compact representation](#compact-record-representation-(for-sms))
| `odk:delimiter` | on the childnode of the primary instance in the _http://opendatakit.org/xforms_ namespace: optional string delimiter which is used to separate prefix, tags and values in the [compact representation](#compact-record-representation-(for-sms))
| `odk:tag` | on a question node (grandchild of the primary instance) in the _http://opendatakit.org/xforms_ namespace: optional string tag which is used to identify nodes that should be part of the [compact representation](#compact-record-representation-(for-sms))
| `jr:template` | on any repeat group node in the _http://openrosa.org/javarosa namespace_: This serves to define a default template for repeats and is useful if any of the leaf nodes inside a repeat contains a default value. It is not transmitted in the record and only affects the behavior of the form engine. For more details, see the [repeats](#repeats) section.

The primary instance also includes a special type of nodes for metadata inside the `<meta>` block. See the [Metadata](#metadata) section




### Secondary Instances

Secondary instances are used to access read-only data from a form. This data is searchable in XPath. A key use case is in designing _cascading selections_ where the available options of a multiple-choice question can be filtered based on an earlier answer.

A secondary instance should get a unique `id` attribute on the `<instance>` node. This allows apps to query the data which is outside the root (the primary instance) and would normally not be reachable. The [instance](#fn:instance) function is used for this purpose. For example, `instance('cities')/root/item[country='nl']` filters the items in the ``cities`` instance from the example below.

#### Secondary Instances - Internal

The example below defines two secondary instances with ids `cities` and `neighborhoods`. Internal secondary instances can define [translated strings](#languages) and references to [media](#media).

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

Secondary instances can give access to read-only data from an _external_ source. The external source can be static or dynamic and is specified using the additional `src` attribute with a URI value on an empty `<instance>` node. See the [section on URIs](#uris) to learn more about the supported sources.

Querying an external instance is done in exactly the same way as for an [internal secondary instance](#secondary-instances---internal), using an XML-compatible internal representation.

#### Secondary instances from files

In addition to XML file references, it's possible to create external secondary instances from CSV and GeoJSON files.

XML and GeoJSON files are referenced using the `jr://file/` URI scheme. CSV external secondary instances are referenced using the `jr://file-csv/` URI scheme. 

{% highlight xml %}
<instance id="countries" src="jr://file/country-data.xml"/>
<instance id="cities" src="jr://file-csv/cities.csv"/>
<instance id="boundaries" src="jr://file/boundaries.geojson"/>
{% endhighlight %}

CSV or GeoJSON external instances are converted into an XML-compatible representation with:

* a root element named `root`
* an `item` element for each CSV row or each GeoJSON `Feature`
* for CSV, a child of `item` for each column
* for GeoJSON, a child of `item` for each member of `properties`
* for GeoJSON, a `geometry` child of `item` containing the feature geometry represented in the ODK format (`Point` to `geopoint`, `LineString` and `MultiLineString` to `geotrace` and `Polygon` and `MultiPolygon` to `geoshape`).

GeoJSON external secondary instances MUST contain a single GeoJSON `FeatureCollection`.

For example, consider the following XML document:

{% highlight xml %}
<root>
  <item>
    <name>FR-75C</name>
    <label>Paris</label>
    <population>2161000</population>
    <geometry>48.8566 2.3522 0 0</geometry>
  </item>
  <item>
    <name>JP-13</name>
    <label>Tokyo</label>
    <population>13960000</population>
    <geometry>35.6895 139.6917 0 0</geometry>
  </item>
</root>
{% endhighlight %}

The following documents MUST be equivalent for querying:

<details>
<summary>CSV document</summary>

{% highlight csv %}
name,label,population,geometry
FR-75C,Paris,2161000,48.8566 2.3522 0 0
JP-13,Tokyo,13960000,35.6895 139.6917 0 0
{% endhighlight %}

</details>

<details>
<summary>GeoJSON document</summary>

{% highlight json %}
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "FR-75C",
        "label": "Paris",
        "population": 2161000
      },
      "geometry": {
        "type": "Point",
        "coordinates": [2.3522, 48.8566]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "JP-13",
        "label": "Tokyo",
        "population": 13960000
      },
      "geometry": {
        "type": "Point",
        "coordinates": [139.6917, 35.6895]
      }
    }
  ]
}
{% endhighlight %}

</details>

