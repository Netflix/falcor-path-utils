<a name="0.7.3"></a>
### 0.7.3 (2019-08-30)


#### Bug Fixes

* **toTree:** support reserved keyword (#20) ([6ed1e78d](git+https://github.com/Netflix/falcor-path-utils.git/commit/6ed1e78d))


# 0.7.2
## Bugs

- `iterateKeySet()` no longer attempts to treat `null` as a range object

# 0.7.1
## Features

- [Do not sort collapse map path items](https://github.com/Netflix/falcor-path-utils/pull/19)

## Breaking Changes

- `toPaths()` collapse for `["a", ["c", "b"]]` remains unchanged instead of sorting keys to `["a", ["b", "c"]]`
