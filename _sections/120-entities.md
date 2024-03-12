---
title: Entities
page: entities
---

Version 2023.1.0

⚠️ In this specification, collections of Entities are referred to as Datasets. The term "Entity List" is generally recommended instead of "Dataset" in text that is intended for users rather than developers.

### Introduction

This specification is a sub-specification of the [ODK XForms Specification](./). It describes a semantic layer that identifies the subject of a form ("Entity") and its properties. Consumers that implement this specification can process form submissions to extract Entity information based on the directives provided in the form definition.

### Versions

| Version  | Changes |
|----------|-------------------------------------------------------------------------------------------------------------------|
| 2023.1.0 | Adds Entity updates from form submissions, still with Entities only created or updated on the server              |
| 2022.1.0 | Adds Entity creation from form submissions, with Entities only created on the server (no offline Entity creation) |

*See section on [Versioning](#versioning)*

### Glossary

**Entity**: A uniquely-identified thing that a form is about.

**Dataset**: A set of Entities of the same type.

**Entity Property**: A named value that belongs to an Entity.

**Immutable System Property**: An Entity Property that is used by the system and that can't be changed (`dataset`, `id`)

**Mutable System Property**: An Entity Property that is used by the system and that can be changed (`label`)

**User-defined Property**: Properties with arbitrary names defined by the form designer

**Entity Actions**: Actions that can be taken on Entities (`create`, `update`)

### Example of an entity-creating form

```xml
<?xml version="1.0"?>
<h:html xmlns="http://www.w3.org/2002/xforms" xmlns:entities="http://www.opendatakit.org/xforms/entities" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:h="http://www.w3.org/1999/xhtml" xmlns:jr="http://openrosa.org/javarosa" xmlns:odk="http://www.opendatakit.org/xforms" xmlns:orx="http://openrosa.org/xforms" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <h:head>
    <h:title>Trees registration</h:title>
    <model odk:xforms-version="1.0.0" entities:entities-version="2022.1.0">
      <instance>
        <data id="trees_registration" version="2022110901">
          <location/>
          <species/>
          <meta>
            <instanceID/>
            <entity dataset="trees" id="" create="true">
              <label/>
            </entity>
          </meta>
        </data>
      </instance>
      <bind nodeset="/data/location" type="geopoint" entities:saveto="geometry" />
      <bind nodeset="/data/species" type="string" entities:saveto="species" />

      <bind jr:preload="uid" nodeset="/data/meta/instanceID" readonly="true()" type="string"/>

      <bind nodeset="/data/meta/entity/@id" type="string"/>
      <setvalue event="odk-instance-first-load" ref="/data/meta/entity/@id" value="uuid()"/>
      <bind nodeset="/data/meta/entity/label" calculate="/data/species"  type="string"/>
    </model>
    ...
```

### Example of an entity-updating form

```xml
<?xml version="1.0"?>
<h:html xmlns="http://www.w3.org/2002/xforms" xmlns:h="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:jr="http://openrosa.org/javarosa" xmlns:orx="http://openrosa.org/xforms" xmlns:odk="http://www.opendatakit.org/xforms" xmlns:entities="http://www.opendatakit.org/xforms/entities">
    <h:head>
        <h:title>Trees circumference update</h:title>
        <model odk:xforms-version="1.0.0" entities:entities-version="2023.1.0">
            <instance>
                <data id="trees_update" version="20240108145123">
                    <tree/>
                    <circumference/>
                    <meta>
                        <instanceID/>
                        <entity dataset="trees" id="" update="1" baseVersion="">
                            <label/>
                        </entity>
                    </meta>
                </data>
            </instance>

            <instance id="trees" src="jr://file-csv/trees.csv"/>

            <bind nodeset="/data/tree" type="string"/>
            <bind nodeset="/data/circumference" type="int" entities:saveto="circumference_cm"/>

            <bind jr:preload="uid" nodeset="/data/meta/instanceID" type="string" readonly="true()"/>

            <bind nodeset="/data/meta/entity/@id" type="string" readonly="true()" calculate=" /data/tree "/>
            <bind nodeset="/data/meta/entity/@baseVersion" calculate="instance('trees')/root/item[name= /data/tree ]/__version" type="string" readonly="true()"/>
            <bind nodeset="/data/meta/entity/label" calculate="concat( /data/circumference , &quot;cm &quot;, instance('trees')/root/item[name= /data/tree ]/species)" type="string" readonly="true()"/>
        </model>
        ...
```

### Referencing existing entities in forms
Servers implementing this specification must serve datasets as CSV files which can be attached to forms as external secondary instances. Entity CSVs:

- MUST have a `name` column containing UUIDs for each entity
- MUST have a `label` column containing the label of each entity
- MUST have a `__version` column containing the version of each entity (starting with spec version 2023.1.0)
- MAY have arbitrarily many additional columns representing user-defined properties

### Namespacing
This specification uses the `http://www.opendatakit.org/xforms/entities` namespace for attributes added to nodes defined by the ODK XForms spec. In this document, the corresponding prefix used is `entities`.

Additions to the main instance are NOT namespaced. The specification describes exact XPath paths that consumers must look for.

### Versioning

Consumers of the ODK XForms specification may opt into this entities specification but don't have to. For this reason, the entities layer is versioned separately from ODK XForms using the `entities-version` attribute in the `http://www.opendatakit.org/xforms/entities` namespace.

The specification is versioned using a `YYYY.NN.MM` scheme:
* YYYY: the year of the release
* NN: the count of the release within the year. 
* MM: the patch version. This is incremented when changes that don’t impact compatibility are made to the specification document.

The `YYYY.NN` components of the version are only changed when a consumer built for an earlier version can no longer correctly use a form definition. For example, a version update will likely be made when multiple entities per form are supported.

Consumers MUST reject forms with a version code that is newer than what they can process.

### Declaring that a form creates entities

Entities are declared in the `entity` element in the [`meta` block](./#metadata) of the form definition. For entity creation, the `entity` element:

- MUST be a direct child of `meta` in the primary instance.
- MUST have attribute `id` populated by a [RFC 4122 version 4 UUID](https://www.rfc-editor.org/rfc/rfc4122)
  - Consumers of submissions that create entities MUST fail to create entities that don't have a UUID `id`
- MUST have attribute `dataset` representing the target Dataset for entities created from submissions of this form
  - Dataset names follow the same rules as form field names ([valid XML identifiers](https://www.w3.org/TR/xml/#NT-Name)) and additionally MUST NOT include `.` or start with `__`
- MUST have a `create` attribute populated with a "1" or "true" if the entity should be created
  - Consumers of submissions that create entities MUST interpret "1" or "true" as indications to create an entity and any other value as indication not to create an entity
  - Forms MAY use a bound expression to conditionally create entities (e.g. `<bind nodeset="/data/meta/entity/@create" type="string" calculate="/data/age > 18"/>`)
- MUST have a direct child `label` representing a human-readable label

### Declaring that a form updates entities

*Added in spec version 2023.1.0*

Entity updates are declared in the `entity` element in the [`meta` block](./#metadata) of the form definition. For entity updates, the `entity` element:

- MUST be a direct child of `meta` in the primary instance.
- MUST have attribute `id` populated by a [RFC 4122 version 4 UUID](https://www.rfc-editor.org/rfc/rfc4122) representing an existing entity
  - Consumers of submissions that update entities MUST fail if the `id` attribute does not contain a UUID or if `id` does not reference an existing entity
- MUST have attribute `dataset` representing the target Dataset for entities updated by submissions of this form
- MUST have a `update` attribute populated with a "1" or "true" if the entity should be updated
  - Consumers of submissions that update entities MUST interpret "1" or "true" as indications to update an entity and any other value as indication not to update an entity
- MUST have a `baseVersion` attribute that is populated with the version of the entity that the form had access to
- MAY also have a bind to a `create` attribute as previously defined. In that case, the form designer is responsible for making sure that the id is correctly populated in each case and that the `update` and `create` conditions don't result in both being truthy at the same time. If both are truthy, the spec consumer processing submissions should do both and one of them will fail.
- MAY have a direct child label representing a human-readable label

When a consumer of this specification applies an entity `update`, it:
- MUST treat a `baseVersion` value other than a positive integer as 0
- MUST increment the `baseVersion` of its local entity representation by 1 when an update is successfully applied

### Identifying entity properties

The `entities:saveto` [`bind` attribute](./#bind-attributes) declares that the form field specified by the `nodeset` attribute on the bind should be saved as an Entity Property. The attribute's value is the Entity Property's name and and has the following restrictions:
- `name` and `label` are reserved property names (for use when datasets are represented as itemset CSVs)
- Property names with `__` prefixes are reserved
- Property names follow the same rules as form field names ([valid XML identifiers](https://www.w3.org/TR/xml/#NT-Name))

The set of all Entity Properties defined across all forms that populate a specific Dataset define that Dataset’s schema. New properties can be introduced by forms that create or update Entities.
