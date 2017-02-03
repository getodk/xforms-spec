---
title: URIs
---

Throughout the XForm format URIs are used to refer to resources outside of the XForm itself. The `jr` "protocol" is used to indicate the resource is available in a sandboxed environment the client is aware of. At the moment only binary endpoints are supported.

### Binary Endpoints

Binary endpoints point to files. The following are supported:

| URI format                                 | description 
|--------------------------------------------|----------------
| `jr://images/path/to/file.png`             | points to an image resource in the sandboxed environment
| `jr://audio/path/to/file.mp3`              | points to an audio resource in the sandboxed environment
| `jr://video/path/to/file.mp4`              | points to a video resource in the sandboxed environment
| `jr://file/path/to/file.xml`               | points to an XML resource in the sandboxed enviroment.
