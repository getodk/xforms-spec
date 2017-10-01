---
title: Encryption 
---
Encrypted forms provide a mechanism to keep your data private even when using http: for communications (e.g., when you do not have an SSL certificate or https: is not available).

### Form Definition

Here is an excerpt used in an encrypted form:

{% highlight xml %}
<submission method="form-data-post"
                action="https://my-opendatakit.appspot.com/submission"
                base64RsaPublicKey="MIIBIjANB...JCwIDAQAB" />
{% endhighlight %}

The form encryption is governed by the settings on the [Settings Worksheet](https://opendatakit.org/help/form-design/xlsform/#settings_ws).Encrypted forms must specify a *submission_url* and a *public_key* on this worksheet.If both are specified, XLSForm will generate a encrypted-form definition.Encrypted form definitions must include a **unique OpenRosa instanceID** and have an explicit `<submission/>` element.Within this tag, the method attribute should always be `form-data-post`. The action attribute should be the url to which the submission should be posted; this is the server url. Finally, what identifies the form as an encryted form is the presence of a *base64RsaPublicKey* attribute. This should be the base64 encoding of the RSA public key that client uses to encrypt the symmetric encryption key it creates to encrypt a finalized instance of this form (a different symmetric encryption key is created for every finalized form).
				

