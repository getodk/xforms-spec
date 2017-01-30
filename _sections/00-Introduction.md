---
title: Introduction
---

The ODK XForms specification is a subset of the far larger [W3C XForms 1.0 specification](http://www.w3.org/TR/xforms/) used by tools in the [Open Data Kit](https://opendatakit.org) ecosystem. It contains a few additional features not found in the W3C XForms specification.

The purpose of this specification is to provide a common form description standard that many different kinds of compatible tools can be based on. Using a single, shared form description standard has the following advantages:
1. Users in the ODK ecosystem can mix and match tools and reassess which they use based on their changing needs. In particular, they don't get locked in to tools that may become deprecated or for which an attractive replacement become available.
1. Tool implementors in the ODK ecosystem can benefit from feedback from a broad range of collaborators when designing new core functionality.
1. Tool implementors in the ODK ecosystem can share core implementations.

This document is intended primarily for developers who build form processing engines or software form builders. Most organizations who use tools in the ODK ecosystem for data collection will prefer to create forms using the [XLSForm standard](http://xlsform.org/) or a graphical form builder.

A version of this specification was initially developed by the [OpenRosa Consortium](https://bitbucket.org/javarosa/javarosa/wiki/OpenRosaAPI). [JavaRosa](https://bitbucket.org/javarosa/javarosa/wiki/Home) is a Java library developed by the consortium as a J2ME app that implements this specification.

The document assumes at least a fair understanding of XML and XPath. It is also useful to refer to [XForms 1.0](http://www.w3.org/TR/2003/REC-xforms-20031014/) for details about shared features.
