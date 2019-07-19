---
title: URIs
---

Throughout the XForm format URIs are used to refer to resources outside of the XForm itself. The `jr` "protocol" is used to indicate the resource is available in a sandboxed environment the client is aware of.

<span id="binary-endpoints" class="invisible-bookmark"></span>
### File Endpoints

These endpoints point to files. The following are currently supported:

| URI format                                 | description
|--------------------------------------------|----------------
| `jr://images/path/to/file.png`             | Points to an image resource in the sandboxed environment
| `jr://audio/path/to/file.mp3`              | Points to an audio resource in the sandboxed environment
| `jr://video/path/to/file.mp4`              | Points to a video resource in the sandboxed environment
| `jr://file/path/to/file.xml`               | Points to an XML resource in the sandboxed environment
| `jr://file-csv/path/to/file.csv`           | Points to an CSV resource in the sandboxed environment

### Virtual Endpoints

"Virtual" refers to the fact that there may or may not be an actual XML document behind the scenes. The following are currently supported:

| URI format                                 | description
|--------------------------------------------|----------------
| `jr://instance/last-saved`                 | Refers to the form instance that was **saved** most recently (as opposed to last-opened or last-finalized, for example).<br /><br />The most common use-case for this feature is to "auto-fill" specific form fields with the last-saved value via [`odk-instance-first-load`](#event:odk-instance-first-load).
