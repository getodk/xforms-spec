---
title: Repeats
---

Repeats are sections that may be repeated in a form. They could consist of a single question or multiple questions. It is recommended to wrap a `<repeat>` inside a `<group>` though strictly speaking not required.

A `<repeat>` uses the nodeset attribute to identify which instance node (and its children) can be repeated.

{% highlight xml %}
...
<h:head>
    <h:title>A Survey with repeats</h:title>
    <model>
        <instance>
            <data id="repeats" version="2014083101">
                <person>    
                    <name />
                    <relationship />
                </person>
                <meta>
                    <instanceID/>
                </meta>
            </data>
        </instance>
        ...
    </model>
</h:head>
<h:body>
    <group ref="/data/person">
        <label>Person</label>
        <repeat nodeset="/data/person">
            <input ref="/data/person/name">
                <label>Enter name</label>
            </input>
            <input ref="/data/person/relationship">
                <label>Enter relationship</label>
            </input>
        </repeat>
    </group>
</h:body>
...
{% endhighlight %}

### Creation, Removal of Repeats

The default behaviour of repeats is to let the user create or remove repeats using the the user interface. ODK Collect will ask for the first repeat. Enketo will show the first repeat automatically. This can be disabled by adding the attribute `jr:noAddRemove="true()"` to the `<repeat>` element. 

There are 2 different ways to ensure that multiple repeats are automatically created when a form loads.

A. Multiple nodes can be defined in the primary instance of the XForm. E.g. see below for an instance that will automatically create 3 repeats for the above form.

{% highlight xml %}
...
<instance>
    <data id="repeats" version="2014083101">
        <person>    
            <name />
            <relationship />
        </person>
        <person>    
            <name />
            <relationship />
        </person>
        <person>    
            <name />
            <relationship />
        </person>
        <meta>
            <instanceID/>
        </meta>
    </data>
</instance>
...
{% endhighlight %}

B. Using the `jr:count` attribute on the `<repeat>` element. E.g. see below for the use of jr:count to automatically create 3 repeats for the above form. The value could also be a `/path/to/node` and clients should evaluate the number of repeats dynamically (Note: It is problematic to implement this in a truly dynamic fashion, i.e. when the value changes, to update the number of repeats).

{% highlight xml %}
...
<h:body>
    <group ref="/data/person">
        <label>Person</label>
        <repeat nodeset="/data/person" jr:count="3">
            <input ref="/data/person/name">
                <label>Enter name</label>
            </input>
            <input ref="/data/person/relationship">
                <label>Enter relationship</label>
            </input>
        </repeat>
    </group>
</h:body>
...
{% endhighlight %}

### Default Values in Repeats

There are two different ways to provide default values to elements inside repeats.

A. Specify the values inside a repeat group with a `jr:template=""` attribute in the primary instance. Any new repeat that does not yet exist in the primary instance will get these default values. The repeat group with the `jr:template` attribute is **not** part of the record itself. So in the example below is for a form in which only a single repeat was created for John.

{% highlight xml %}
...
<instance>
    <data id="repeats" version="2014083101">
        <person jr:template="" >    
            <name />
            <relationship>spouse</relationship>
        </person>
         <person>    
            <name>John</name>
            <relationship>father</relationship>
        </person>
        <meta>
            <instanceID/>
        </meta>
    </data>
</instance>
...
{% endhighlight %}

B. Specify the values for each repeat instance individually in the primary instance. In the example below the form will be loaded with 2 repeats with the values for John and Kofi.

{% highlight xml %}
...
<instance>
    <data id="repeats" version="2014083101">
        <person>    
            <name>John</name>
            <relationship>father</relationship>
        </person>
        <person>    
            <name>Kofi</name>
            <relationship>brother</relationship>
        </person>
        <meta>
            <instanceID/>
        </meta>
    </data>
</instance>
...
{% endhighlight %}

###  A Big Deviation with XForms

In XForms, relative XPaths should be evaluated _relative to context_, and absolute paths (/data/path/to/repeat) should be evaluated as _absolute paths without considering context_. If there are multiple repeats, the XPath /data/path/to/repeat would either return the first repeat (if e.g. a string value is requested), or all repeats (if a nodeset is requested).

However, in this spec, due to an unfortunate persistent historical error, **absolute paths** /data/path/to/repeat/node **inside repeats are always evaluated as if the are relative to the current nodeset**. In other words, the absolute XPath `/data/path/to/repeat/node` when it is referred to from inside a repeat is evaluated as if it is the relative XPath `../node`.

_In order to rectify this error at some time in the future, it would be very helpful if any form builders around this spec [start generating relative references](https://github.com/SEL-Columbia/pyxform/issues/91) automatically._

