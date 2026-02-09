---
title: Repeats
---

Repeats are sections that may be repeated in a form. They could consist of a single question or multiple questions. It is recommended to wrap a `<repeat>` inside a `<group>` though strictly speaking not required.

A `<repeat>` uses the nodeset attribute to identify which instance node (and its children) can be repeated.

A `<repeat>` cannot have a label child element. To display a label it should be wrapped inside a `<group>` as shown below:

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

When a client needs to compactly show a single repeat instance in its user interface (e.g. as a collapsed repeat or a table-of-contents item), it is recommended to show the label of the first child of that repeat if that first child is a group.

### Creation, Removal of Repeats

The default behavior of repeats is to let the user create or remove repeats using the user interface. The user control for creating and removing repeats can be disabled by adding the attribute `jr:noAddRemove="true()"` to the `<repeat>` element.

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

B. Using the `jr:count` attribute on the `<repeat>` element. E.g. see below for the use of jr:count to automatically create 3 repeats for the above form. The value could also be a `/path/to/node` and clients should evaluate the number of repeats dynamically.

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
