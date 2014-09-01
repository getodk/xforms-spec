---
title: Groups
---

A `<group>` combines elements together. If it has a child `<label>` element, the group is considered a _presentation group_ and will be displayed as a visually distinct group.

A `<group>` may or may not contain a `ref` attribute. If it does, the group is considered a _logical group_. A logical group has a corresponding element in the [primary instance](#instance) and usually a corresponding `<bind>` element. A logical group's `ref` is used as the context node for the relative `ref` paths of its descendants. 

A group can be both a logical and a presentation group. 

Groups may be nested to provide different levels of structure.

Apart from providing structure, a logical group can also contain a `relevant` attribute on its `<bind>` element, creating a powerful way to keep form logic maintainable (see [bind attributes](#bind-attributes)). 

The sample below that includes both the body and corresponding instance. The respondent group is a logical group and the context group is both a logical and a presentation group. The context group will only be shown if both first name and last name are filled in.

{% highlight xml %}
<h:head>
    <h:title>My Survey</h:title>
    <model>
        <instance>
            <data id="mysurvey">
                <respondent>
                    <firstname/>
                    <lastname/>
                    <age/>
                </respondent>
                <context>
                    <location/>
                    <township/>
                    <population/>
                </context>
                <meta>
                    <instanceID/>
                </meta>
            </data>
        </instance>
        ....
        <bind nodeset="/data/context" 
              relevant="string-length(../respondent/firstname) > 0 and 
               string-length(../respondent/lastname) > 0" />
        ....
    </model>
</h:head>
<h:body>
    <group ref="/data/respondent">
        <input ref="firstname">
          <label>What is your first name?</label>
        </input>
        <input ref="lastname">
          <label>What is your last name?</label>
        </input>
        <input ref="age">
          <label>What is your age?</label>
        </input>
    </group>
    <group ref="/data/context">
        <label>Context</label>
        <input ref="location">
          <label>Record the location</label>
        </input>
        <input ref="township">
          <label>What is the name of the township</label>
        </input>
        <input ref="population">
          <label>What is the estimated population size</label>
        </input>
    </group>
</h:body>
{% endhighlight %}
