---
title: Encryption 
---
Encrypted forms provide a mechanism to keep finalized data private even when using **http:** for communications (e.g., when SSL certificate is not there).It provides security for the duration in which the data is stored on a device and on the server.

### Form Definition

Encrypted form definitions must have an explicit `<submission/>` element with the following attributes:

- `method`: should always be set to `form-data-post`.
- `action`: should be the url to which the submission should be posted; this is the server url.  
- `base64RsaPublicKey`:base64 encoding of an RSA public key. The corresponding private key will be needed to decrypt submissions.

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
<submission method="form-data-post"
                action="https://my-opendatakit.appspot.com/submission"
                base64RsaPublicKey="MIIBIjANB...JCwIDAQAB" />
{% endhighlight %}


				

