---
title: Namespaces
---

XML namespaces provide a way to avoid name conflicts for element and attribute names. In ODK XForms, the elements and attributes that are also in XForms 1.0 are in the [XForms namespace](https://www.w3.org/TR/xforms/#structure-namespace) which is declared as the default namespace in the example above (`xmlns="http://www.w3.org/2002/xforms"`). Setting a default namespace means that non-prefixed elements and attributes are assigned that namespace.

Elements and attributes that are specific to ODK XForms and not defined by the XForms 1.0 specification should be separately namespaced. For historical reasons, the `"http://openrosa.org/javarosa"` namespace (with the `jr` prefix in this document), and the `"http://openrosa.org/xforms"` namespace (with the `orx` prefix in this document) have been used.

For any new additions not defined in another specification, the `"http://www.opendatakit.org/xforms"` namespace is now preferred. It is assigned the `odk` prefix in this documentation. If a new feature is copied from another XForms implementation the originator's namespace will be used.

For more information about namespaces, see the [XML Namespaces specification](http://www.w3.org/TR/REC-xml-names/).