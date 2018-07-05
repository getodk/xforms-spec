---
title: Events and Actions
---

XForm Events are dispatched following different steps in the form lifecycle. XForms Actions can be invoked in response to these events. This makes it possible to define exactly when certain tasks should occur.

### Events

The following subset of events defined by the [W3C XForms specification](https://www.w3.org/TR/xforms/#rpm-events) are supported:

| event                     | description |
| --------------------------| ----------- |
| <a id="event:xforms-ready" href="#event:xforms-ready">`xforms-ready`</a>            | Notification event dispatched after all form controls have been initialized. |
| <a id="event:xforms-value-changed" href="#event:xforms-value-changed">`xforms-value-changed`</a>    | Notification event dispatched after an instance data node's value changes. |

### Actions
The following subset of actions defined by the [W3C XForms specification](https://www.w3.org/TR/2003/REC-xforms-20031014/slice10.html#id2634509) are supported:

| action                    | description |
| --------------------------| ----------- |
| <a id="action:setvalue" href="#action:setvalue">`setvalue`</a>  | Explicitly sets the value of the specified instance data node. See [the W3C description](https://www.w3.org/TR/2003/REC-xforms-20031014/slice10.html#action-setvalue). `ref` can be used in place of `bind` to specify a node path instead of a node id. |
| <a id="action:setlocation" href="#action:setlocation">`odk:setlocation`</a>  | Sets the current location's [geopoint](#data-types) value in the instance data node specified in the `ref` attribute. Any `value` attribute or textContent will be ignored. Failure to retrieve the location will result in an empty string value. |

Action elements triggered by initialization events go in the model as siblings of `bind` nodes. Action elements triggered by control-specific events are nested in that control block. 

#### Setting a dynamic value after form load

{% highlight xml %}
<bind nodeset="/data/now" type="dateTime"/>
<setvalue event="xforms-ready" ref="/data/now" value="now()" />
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


