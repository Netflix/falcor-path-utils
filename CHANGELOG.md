# 0.7.2
## Bugs

- `iterateKeySet()` no longer attempts to treat `null` as a range object

# 0.7.1
## Features

- [Do not sort collapse map path items](https://github.com/Netflix/falcor-path-utils/pull/19)

## Breaking Changes

- `toPaths()` collapse for `["a", ["c", "b"]]` remains unchanged instead of sorting keys to `["a", ["b", "c"]]`
