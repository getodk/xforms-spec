---
title: Namespaces
---

XML namespaces provide a way to avoid name conflicts for element and attribute names. In ODK XForms, the elements and attributes that are also in XForms 1.0 are in the [XForms namespace](https://www.w3.org/TR/xforms/#structure-namespace) which is declared as the default namespace in the example above (`xmlns="http://www.w3.org/2002/xforms"`). Setting a default namespace means that non-prefixed elements and attributes are assigned that namespace.

Elements and attributes that are specific to ODK XForms and not defined by the XForms 1.0 specification should be separately namespaced. For historical reasons, the `"http://openrosa.org/javarosa"` namespace is used for many of these extensions. It is assigned the `jr` prefix in the example above and throughout this document.

For new additions, the `"http://openrosa.org/xforms"` namespace is preferred. It is assigned the `orx` prefix in this documentation.

For more information about namespaces, see the [XML Namespaces specification](http://www.w3.org/TR/REC-xml-names/).