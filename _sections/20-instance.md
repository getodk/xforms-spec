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

Secondary instances provide read-only access to data that can be queried from a form using XPath expressions. Key use cases include lookup tables and _cascading selections_ where the available options of a multiple-choice question can be filtered based on an earlier answer.

Each secondary instance MUST define a unique `id` attribute on the `<instance>` node. The instance data can then be accessed using the [instance](#fn:instance) XPath function. For example, `instance('cities')/root/item[country='nl']` selects all `<item>` elements in the `cities` secondary instance where `<country>` is `nl`.

#### Secondary Instances - Internal

Internal secondary instances are embedded directly in the XForm document. They contain static XML data and MAY include references to [translated strings](#languages) and [media](#media).

The example below defines two secondary instances with ids `cities` and `neighborhoods`.

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

#### Secondary Instances - External

External secondary instances reference data that is stored outside the XForm document. The external data source is specified using the `src` attribute on an empty `<instance>` element. For example:

{% highlight xml %}
<instance id="countries" src="jr://file/country-data.xml"/>
{% endhighlight %}

The document referenced by `src` becomes the content of the secondary instance identified by `countries`. See the [section on URIs](#uris) to learn more about the supported sources.

It MUST be possible to query any external secondary instance using XPath, the same way as [internal secondary instances](#secondary-instances---internal).

##### Secondary instances from CSV

CSV external secondary instances are referenced using the `jr://file-csv/` URI scheme. 

{% highlight xml %}
<instance id="cities" src="jr://file-csv/cities.csv"/>
{% endhighlight %}

Processors MUST support the following delimiters, in order of preference: 

1. `,` 
1. `;` 
1. tab (`\t`)

CSV files MUST:

* Include a header row
* Be encoded as UTF-8
* Follow [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180.html) rules for quoting and escaping special characters

Column names from the header row:

* MUST be unique
* MUST be valid XML element names

Empty cells MUST be represented as empty element values.

For querying CSV documents, processors MUST use the following XML-compatible representation:

* a root element named `root`
* an `item` element for each CSV row
* for each CSV column, a child element of `item` whose name is the column name and whose text value is the cell value

For example, the following CSV document:

{% highlight csv %}
name,label,population,geometry
FR-75C,Paris,2161000,48.8566 2.3522 0 0
JP-13,Tokyo,13960000,35.6895 139.6917 0 0
{% endhighlight %}

MUST be equivalent for querying to:

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

##### Secondary Instances from GeoJSON

GeoJSON secondary instances are referenced using the `jr://file/` URI scheme.

{% highlight xml %}
<instance id="boundaries" src="jr://file/boundaries.geojson"/>
{% endhighlight %}

GeoJSON files used to populate secondary instances MUST
* have a `.geojson` extension
* define a single top-level `FeatureCollection`
* only include features with `Point`, `LineString` or `Polygon` types

Members of `properties` MUST:

* be unique
* be valid XML element names 
* have JSON primitive values

For querying, processors MUST use the following XML-compatible representation:

* a root element named `root`
* an `item` child element for each GeoJSON `Feature`
* for each member of `properties` with a non-null value, a child element of `item`
* if a top-level `id` is present, use that as the `id` child of `item`
* a `geometry` child element of `item` containing the feature geometry encoded using the ODK format:
  * `Point` as `geopoint`
  * `LineString` as `geotrace`
  * `Polygon`  as `geoshape`

For example, the following GeoJSON document MUST be equivalent for querying to the XML shown in the CSV section above:

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