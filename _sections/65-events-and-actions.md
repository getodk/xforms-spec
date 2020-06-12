---
title: Events and Actions
---

XForm Events are dispatched following different steps in the form lifecycle. XForms Actions can be invoked in response to these events. This makes it possible to define exactly when certain tasks should occur.

### Events

See the W3C XForms specification [section on events](https://www.w3.org/TR/xforms/#rpm-events). The following events are supported: 

| event                     | description |
| --------------------------| ----------- |
| <a id="event:odk-instance-first-load" href="#event:odk-instance-first-load">`odk-instance-first-load`</a><a id="event:xforms-ready"></a>            | dispatched the first time an instance is loaded |
| <a id="event:xforms-value-changed" href="#event:xforms-value-changed">`xforms-value-changed`</a>    | As in [XForms 1.1](https://www.w3.org/TR/xforms11/#evt-valueChanged). |
| <a id="event:odk-new-repeat" href="#event:odk-new-repeat">`odk-new-repeat`</a>	| dispatched when a new instance of a repeat is added to the primary instance. <a href="#the-odk-new-repeat-event">See more</a>.

*Note: `xforms-ready` was previously documented as the event dispatched the first time an instance is loaded. Since that definition does not match the W3C XForms event with the same name, it was deprecated in favor of `odk-instance-first-load`.*

#### The odk-new-repeat event
The `odk-new-repeat` event is dispatched when a new instance of a repeat is added to the primary instance and before recomputation of `calculates`, `constraints`, etc. Actions triggered by `odk-new-repeat` must be nested in the repeat form control.

The `odk-new-repeat` event is never dispatched for repeat instances that are part of the form definition. However, it is dispatched for repeat instances added by evaluation of the `jr:count` attribute value. See <a href="#creation-removal-of-repeats">creation, removal of repeats</a>.

The following example demonstrates giving a node in a repeat a default, user-modifiable value based on other user input:

{% highlight xml %}
<h:body>
    <input ref="/data/my_age">
        <label>Your age</label>
    </input>
    ...
    <repeat nodeset="/data/person">
        <setvalue event="odk-new-repeat" ref="/data/person/age" value="../../my_age + 2" />
        <input ref="/data/person/age">
            <label>Person's age</label>
        </input>
        ...
    </repeat>
</h:body>
{% endhighlight %}

### Actions
The following subset of actions defined by the [W3C XForms specification](https://www.w3.org/TR/2003/REC-xforms-20031014/slice10.html#id2634509) are supported:

| action                    | description |
| --------------------------| ----------- |
| <a id="action:setvalue" href="#action:setvalue">`setvalue`</a>  | Explicitly sets the value of the specified instance data node. See [the W3C description](https://www.w3.org/TR/2003/REC-xforms-20031014/slice10.html#action-setvalue). `ref` can be used in place of `bind` to specify a node path instead of a node id. |
| <a id="action:setgeopoint" href="#action:setgeopoint">`odk:setgeopoint`</a>  | Sets the current location's [geopoint](#data-types) value in the instance data node specified in the `ref` attribute. Any `value` attribute or textContent will be ignored. Failure to retrieve the location will result in an empty string value. |

Action elements triggered by initialization events go in the model as siblings of `bind` nodes. Action elements triggered by control-specific events are nested in that control block. Multiple triggering events may be specified as a space-separated list and in that case, initialization events may be specified in an action element nested in a control block. For example, the value `odk-instance-first-load odk-new-repeat` can be given to the `event` attribute of an action nested in a repeat. That action is then triggered once the first time the primary instance is loaded and every time an instance of the parent repeat is added.

#### Setting a dynamic value after form load

{% highlight xml %}
<bind nodeset="/data/now" type="dateTime"/>
<setvalue event="odk-instance-first-load" ref="/data/now" value="now()" />
{% endhighlight %}

#### Setting a static value when a node's value changes

{% highlight xml %}
<bind nodeset="/data/my_text" type="string" />
<bind nodeset="/data/my_text_changed" type="string" />
...
<input ref="/data/my_text">
    <setvalue event="xforms-value-changed" ref="/data/my_text_changed">Value changed!</setvalue>
</input>
{% endhighlight %}


