
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-dpkg-divert-29-pmb
=========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Limited but easy dpkg_divert for ansible 2.9 without galaxy collections.
<!--/#echo -->


Why?
----

The machine that shall play my playbook still runs an old Ubuntu with
ansible 2.9, which doesn't yet include the `community.general` collection.
I tried installing it with `ansible-galaxy`, but today, unfortunately,
the galaxy API seems to have random problems, so manually installing the
collection isn't reliable enough for me.

If you're using ansible 2.10 or later, you might want to use the
[community.general.dpkg_divert][com-gen-dd] module instead.


  [com-gen-dd]: https://docs.ansible.com/ansible/latest/collections/community/general/dpkg_divert_module.html



API
---

This module exports one function:

### dpkgDivert(bun, spec[, then])

Arranges a dpkg diversion on behalf of ubborg bundle `bun`.
Returns a promise for completion.

If `spec` is a string, it's a shorthand for `{ path: spec }` in its place.
Otherwise, `spec` should be an options object which supports these keys,
most of them optional:

* `path` (mandatory): String with absolute path to the file to be diverted.
* `enable`: Boolean, whether the diversion shall be added/updated
  (true, default) or removed (false).
* `rename`: Boolean, whether the maintainer's version of the file shall be
  moved (true, default) or left alone (false).
* `distFile`: The path (as a string) where to store the maintainer's version
  of the file.
  In case `enable` is a string but it's not an absolute path, it's seen
  as a suffix to `path`.
  Default: `'.distrib'`


If a `then` is given, it should be a function, and the promise from
`dpkgDivert` will be for `then.call(bun, normSpec, bun)`.
In its arguments, `normSpec` is a normalized¹ version of `spec`.
(¹ Mostly this means that missing options may have been set to their defaults.)





Usage
-----

see [test/usage.js](test/usage.js).


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
