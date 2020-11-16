ODK XForms Spec
===========

Published at [https://getodk.github.io/xforms-spec/](https://getodk.github.io/xforms-spec/)


### Requirements for running locally

Install [Jekyll](https://jekyllrb.com/docs/installation/) (Windows users, see [here](https://jekyllrb.com/docs/windows/)) and [bundler](https://bundler.io).

Afterwards, to install all dependencies for this repo:

	bundle install

### Run locally

When editing use `jekyll serve` or `bundle exec jekyll serve` to build, start up a webserver and automatically rebuild on http://localhost:4000/xforms-spec/.


### Contributing

Pull requests are welcome for any agreed-upon issues! Propose a [specification addition or change](#specification-changes) or join the live conversation in the `xforms-spec` channel of the [ODK Slack](https://slack.getodk.org/).


### Specification changes

This specification is not a fixed document and is regularly extended with new features. Occassionally, poor earlier choices are removed, and behavior is clarified or corrected. To propose a small correction or clarification, just open an issue [here](https://github.com/getodk/xforms-spec/issues). For a more significant change in the XForms specification, the following approach should be used:

1. Post a proposal in the [ODK Forum](https://forum.getodk.org) (e.g. under the `Development` category and tagged with `spec-proposal` and `odk-xforms`). If you have a proposed XForm (and/or [XLSForm](https://xlsform.org)) syntax, please include it.
2. If the ODK community is interested and a syntax candidate emerges, there will be a decision made by the [TAB](https://github.com/getodk/governance/blob/master/TAB-GOVERNANCE.md#decision-making).
3. Once the extension is approved any relevant issues will be created in [this repo](https://github.com/getodk/xforms-spec/issues), in [pyxform](https://github.com/XLSForm/pyxform/issues) and in the [XLSForm documentation](https://github.com/XLSForm/xlsform.github.io/issues) and the implementation can go ahead.

If you propose a specification addition that does not make it through the approval process (e.g. because it is considered to be for a too-specific use case), the recommended way to add it to your own application is to use your own custom namespace for any new elements or attributes. This will avoid conflicts with any future features in the ODK XForms Specification (or the W3C XForms specification). If in the future, the situation changes and ODK would like to adopt the feature after all, the common practise would be to include it using your namespace.
