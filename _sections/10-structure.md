---
title: Structure
---

The high-level form definition is structured as follows:

* model 
    * instance
    * bindings
* body

The model contains the **[instance](#instance)**(s) and the **[bindings](#bindings)**. The instance is the XML data structure of the _record_ that is captured with the form. A binding describes an individual instance node and includes information such as _datatype, skip logic, calculations, and more_.

The **[body](#body)** contains the information required to _display_ a form. 

Below is an example of a complete and valid ODK XForm:

{% highlight xml %}
<?xml version="1.0"?>
<h:html xmlns="http://www.w3.org/2002/xforms" 
        xmlns:ev="http://www.w3.org/2001/xml-events" 
        xmlns:h="http://www.w3.org/1999/xhtml" 
        xmlns:jr="http://openrosa.org/javarosa" 
        xmlns:orx="http://openrosa.org/xforms/" 
        xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <h:head>
        <h:title>My Survey</h:title>
        <model>
            <instance>
                <data id="mysurvey" version="2014083101">
                    <firstname></firstname>
                    <lastname></lastname>
                    <age></age>
                    <meta>
                        <instanceID/>
                    </meta>
                </data>
            </instance>
            <bind nodeset="/data/firstname" type="string" required="true()" />
            <bind nodeset="/data/lastname"  type="string" />
            <bind nodeset="/data/age" type="integer" />
        </model>
    </h:head>
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
</h:html>
{% endhighlight %}
