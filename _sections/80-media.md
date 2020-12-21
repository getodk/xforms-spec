---
title: Media
---

The `<itext>` element described in the [languages](#languages) section can also be used for **media labels**. Media labels can be used in addition to text labels or instead of text labels.

{% highlight xml %}
....
<itext>
    <translation default=true() lang="English">
        <text id="/widgets/select_widgets/grid_test/b:label">
            <value form="image">jr://images/b.jpg</value>
        </text>
        <text id="/widgets/display_widgets/text_media:label">
            <value form="audio">jr://audio/goldeneagle.mp3</value>
            <value>You can add a sound recording.</value>
        </text>
    </translation>
</itext>
...
{% endhighlight %}

### Supported Media Types

* "image"
* "audio"
* "video"
* "big-image"

By default, itext "image" values are not clickable. However, if you also include a "big-image", the image displayed by "image" will be clickable and will display a pannable, zoomable view of the file specified by "big-image". The user interface must provide a way to go back to the form after opening a "big-image". Specifying "big-image" alone has no effect, you must always include "image".

Files referenced by "image" and "big-image" may be the same; however, for performance reasons, it is recommended to create smaller thumbnail images to be referenced by "image".

#### Quality Levels

Audio quality level can be specified using the `odk:quality` [bind attribute](#bind-attributes). Valid quality values are:

* `normal` Should provide a "good enough" quality for most use cases
* `low` should provide smaller file size for when a drop in quality is allowable
* `voice-only` only needs to retain enough detail for recording one on one conversations with as much as possible saved in file size
* `external` uses an external application (other than the client itself) for recording audio
