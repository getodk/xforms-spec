---
title: Submission 
---

The optional `<submission>` element provides instructions to the client about special submission behavior. The element is placed as a sibling of the primary instace inside the model. 

_Note that submission behavior can be highly variable between different clients. A client could be 100% ODK-Forms-spec-compliant but have a custom way of dealing with submissions to fit into an existing system. It is nevertheless considered helpful to document some special behavior that clients may choose to adopt._

{% highlight xml %}
<model>
    <instance>
        <data id="mysurvey" orx:version="2014083101">
          ...
        </data>
    </instance>
    <submission />
    <bind nodeset="/data/firstname" type="xsd:string" required="true()" />
    ...
</model>
{% endhighlight %}

### Submission Attributes

The following attributes are supported on the submission element. 

| attribute               | description
|-------------------------|----------------
| `method`                | This attribute is required and used only if the `action` attribute is used. The value should be set to `post`. In the past, the value `form-data-post` was used. Though this is now deprecated, it is recommended that a server accepts submissions for both methods and considers them aliases.
| `action`                | This attribute is optional and can be used for [encryption](#encryption) to specify a custom URL to send encrypted submissions to.
| `base64RsaPublicKey`    | This attribute is required to enable [encryption](#encryption). It is a base64-encoded RSA public key. The corresponding private key will be needed to decrypt submissions (and should not be included in the form definition).
| `orx:auto-send`         | Optional attribute that is either `"false"` or `"true"`. If true, any final records will be sent automatically by the client as soon as a connection is available.
| `orx:auto-delete`       | Optional attribute that is either `"false"` or `"true"`. If true, and successfully submitted records will be immediately deleted from the client.

### Encryption

Forms can enable encryption to provide a mechanism to keep finalized data private even when using **http:** for communications (e.g., when SSL certificate is not there). It provides security for the duration in which the data is stored on a device and on the server.

Encrypted form definitions must have an explicit `<submission/>` element with the following attributes: [TO FOLLOW]

The client generates a different symmetric encryption key for each finalized form and uses it to encrypt the submission and all media files. The `base64RsaPublicKey` is used to encrypt the symmetric key with the **RSA/NONE/OAEPWithSHA256AndMGF1Padding** algorithm.

Here is an excerpt used in an encrypted form:

{% highlight xml %}
<instance>
      <sample id="sample-v1.0">
        <orx:meta>
           <orx:instanceID/>
        </orx:meta>
        <name/>
      </sample>
</instance>
<submission 
  method="post"
  action="https://my-opendatakit.appspot.com/submission"
  base64RsaPublicKey="MIIBIjANB...JCwIDAQAB" />
{% endhighlight %}


				

