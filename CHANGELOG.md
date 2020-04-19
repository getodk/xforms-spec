
[2019-11-11]
--------------------
##### Removed
- `xforms-ready` event (replaced by `odk-instance-first-load`).
- XForms 1.0 deviation to interpret absolute path references to single nodes inside repeats as if they were relative to the repeat instance context they are used in.

##### Added
- Compact representation of a record: `odk:prefix`, `odk:delimiter`, `odk:tag` attributes
- Repeat instance naming convention.
- Record encryption via the `base64RsaPublicKey` attribute.
- Audit log CSV format.
- Location attributes for audit log: `odk:location-priority`, `odk:location-min-interval`, `odk:location-max-age` attributes.
- Track changes for audit log: `odk:track-changes` attribute.
- `odk-instance-first-load` event.
- `xforms-value-changed` event.
- `odk-new-repeat` event.
- `odk:setlocation` action.
- `substring-before()`, `substring-after()` functions.
- `translate()` function.
- `pull-data()` function.
- `normalize-space()` function.
- `jr:instance/last-saved` URI.

##### Changed
- Open Data Kit namespace URL.

[2018-07-09]
--------------------
#### Added
- `orx:max-pixels` bind attribute to transform uploaded images.
- Submission chapter.
- `orx:auto-send` submission element attribute.
- `orx:auto-delete` submission element attribute.
- `<odk:rank>` form control.
- [`digest`](https://getodk.github.io/xforms-spec/#fn:digest) function.

#### Changed
- Corrected argument order in [`jr:choice-name`](https://getodk.github.io/xforms-spec/#fn:jr:choice-name) function.
- Corrected Pseudo-number generator used in [`randomize`](https://getodk.github.io/xforms-spec/#fn:randomize) function.
- Simplified syntax requirements for [encryption](https://getodk.github.io/xforms-spec/#encryption).
- Clarified that the `start`, `end` and `step` attributes on the range control are required.
- Categorized XPath functions and clarified data type conversion rules.
- Clarified valid values for `jr:constraintMsg` and `jr:requiredMsg`.

#### Removed
- `property()` function (was never properly documented).

[2018-03-29]
--------------------
#### Added
* [`randomize`](https://getodk.github.io/xforms-spec/#fn:randomize) function
* [`audit`](https://getodk.github.io/xforms-spec/#metadata) metadata item
* [`distance`](https://getodk.github.io/xforms-spec/#fn:distance) function

#### Changed
* New preferred http://opendatakit.org/xforms namespace for new functionality.

[2018-03-13]
--------------------
#### Added
* [`if`](https://getodk.github.io/xforms-spec/#fn:if) function
* ["guidance" hints](https://getodk.github.io/xforms-spec/#languages)
* [`format-date-time`](https://getodk.github.io/xforms-spec/#fn:format-date-time) function

#### Changed
* Edited [Appearances](https://getodk.github.io/xforms-spec/#appearances)

#### Fixed
* Error in [`count-selected`](https://getodk.github.io/xforms-spec/#fn:count-selected) argument description

[2017-12-22]
--------------------
#### Added
* [Events and Actions](https://getodk.github.io/xforms-spec/#events-and-actions)

#### Changed
* Updated descriptions of [`decimal-time`](https://getodk.github.io/xforms-spec/#fn:decimal-time) and [`decimal-date-time`](https://getodk.github.io/xforms-spec/#fn:decimal-date-time)

[2017-09-19]
--------------------
#### Added
* [`count-non-empty`](https://getodk.github.io/xforms-spec/#fn:count-non-empty) function #127
* `format-date` localization for %a and %b #122

#### Removed
* `decimal-date` function #18
* `depend` function #145

[2017-05-05]
--------------------
#### Added
* [Range control](https://getodk.github.io/xforms-spec/#body-elements) #109
* Required namespace for `title` #22
* [`contains()`](https://getodk.github.io/xforms-spec/#fn:contains), [`starts-with()`](https://getodk.github.io/xforms-spec/#fn:starts-with) and [`ends-with()`](https://getodk.github.io/xforms-spec/#fn:ends-with) functions #105
* [`exp10()`](https://getodk.github.io/xforms-spec/#fn:exp10) function #107
* [`abs()`](https://getodk.github.io/xforms-spec/#fn:abs) function #106


[2017-02-06]
--------------------
#### Added
* Section on [external XML instances](http://getodk.github.io/xforms-spec/#secondary-instances---external) #86

[2017-02-01]
--------------------
#### Added
* Background context to [introduction](http://getodk.github.io/xforms-spec/#introduction) #81

[2017-01-05]
--------------------
#### Added
* Section on [namespaces used](http://getodk.github.io/xforms-spec/#namespaces) #72
* [`jr:RequiredMsg`](http://getodk.github.io/xforms-spec/#bind-attributes) bind attribute #68
* Trig [XPath functions](http://getodk.github.io/xforms-spec/#xpath-functions) #67

#### Fixed
* Inconsistent usage of XForm and XForms #70
* [`indexed-repeat`](http://getodk.github.io/xforms-spec/#xpath-functions) uses 1-based indexing #69

