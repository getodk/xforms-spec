---
title: Languages 
---

Multi-lingual content for labels, and hints is supported. This is optional and can be done by replacing all language-dependent strings with 'text identifiers', which act as indexes into a multi-lingual dictionary in the model. The language strings can be identified with the `jr:itext()` [XPath function](#xpath-functions).

In the `<model>`, a multi-lingual dictionary has the following structure:

{% highlight xml %}
<itext>
    <translation lang="[language name]" default="true()">
        <text id="[text id]">
            <value>[translation of text with [text id]]</value>
        </text>
    </translation>
</itext>
{% endhighlight %}

Additional `<text>` entries are added for each localizable string. The `<translation>` block is duplicated for each supported language. The content should be the same (same set of text ids) but with all strings translated to the new language. The language name in the lang attribute should be human-readable, as it is used to identify the language in the UI. A default="" attribute can be added to a `<translation>` to make it the default language, otherwise the first listed is used as the default.
Every place localized content is used (all `<label>`s and `<hint>`s) must use a converted notation to reference the dictionary:

For example:

{% highlight xml %}
<label>How old are you?</label>
{% endhighlight %}

is changed to:

{% highlight xml %}
<label ref="jr:itext('how-old')" />
{% endhighlight %}

With the corresponding entries in `<itext>`:

{% highlight xml %}
<translation lang="English">
    ...
    <text id="how-old">
        <value>How old are you?</value>
    </text>
    ...
</translation>
<translation lang="Spanish">
    ...
    <text id="how-old">
        <value>¿Cuantos años tienes?</value>
    </text>
    ...
</translation>
...
{% endhighlight %}

Not every string must be localized. It is acceptable to intermix `<label>`s of both forms. Those which do not reference the dictionary will always show the same content, regardless of language.

It is even allowed to intermix both a `ref` and a regular value. In this case, if the itext engine is missing it will refer to the regular value. E.g.

{% highlight xml %}
<label ref="jr:itext('mykey')">a default value</label>
{% endhighlight %}

In general, all text ids must be replicated across all languages. It is sometimes only a parser warning if you do not, but it will likely lead to headaches.
Even within a single language, it is helpful to have multiple 'forms' of the same string. For example, a verbose phrasing used as the caption when answering a question, but a short, terse phrasing when that question is shown in the form summary. This can be done as follows:

{% highlight xml %}
<text id="how-old">
    <value form="long">How old are you?</value>
    <value form="short">Age</value>
</text>
{% endhighlight %}

There are two form attribute options for text strings:

| text type       | form attribute
|-----------------|----------------|
| single version  | _no form attr_ |
| short version   |  `short`       |

The different `forms` are only supported for question captions (`<label>`s inside user controls). The [media](#media) section describes how to add non-text form labels in a similar manner.
