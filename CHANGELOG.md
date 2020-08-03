# 0.7.5
## Changes
- [Bump mixin-deep from 1.3.1 to 1.3.2](https://github.com/Netflix/falcor-path-utils/pull/22)
- [Use NOINLINE to avoid inlining function definitions](https://github.com/Netflix/falcor-path-utils/pull/23)

<a name="0.7.4"></a>
### 0.7.4 (2019-09-02)


#### Bug Fixes

* **toTree:** handle empty path ([8aa75109](git+https://github.com/Netflix/falcor-path-utils.git/commit/8aa75109))


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
