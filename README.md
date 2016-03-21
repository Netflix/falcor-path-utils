# Falcor Path Utils
 
This repository contains utilities for transforming and manipulating Falcor paths.

## Utility functions:

* `collapse(paths)`<br>
  Simplifies a set of paths. Example:

  ~~~js
  var util = require("falcor-path-utils");
  var collapsedPaths = util.collapse([
    ["genres", 0, "titles", 0, "name"],
    ["genres", 0, "titles", 0, "rating"],
    ["genres", 0, "titles", 1, "name"],
    ["genres", 0, "titles", 1, "rating"]
  ]);
  
  // collapsed paths is ["genres", 0, "titles", {from: 0, to: 1}, ["name", "rating"]]
  ~~~

* `iterateKeySet(keySet, note)`<br>
  Takes in a `keySet` and a `note` and attempts to iterate over it.

* `toTree(paths)`<br>
  Converts `paths` to a tree with null leaves. ([see spec](./test/toTree.spec.js))

* `toPaths(lengths)`<br>
  Converts a `lengthTree` to paths. ([see spec](./test/toPaths.spec.js))

* `pathsComplementFromTree(paths, tree)`<br>
  Returns a list of these `paths` that are not in the `tree`. ([see spec](./test/pathsComplementFromTree.spec.js))

* `pathsComplementFromLengthTree(paths, lengthTree)`<br>
  Like above, but for use with length tree.

* `hasIntersection(tree, path, depth)`<br>
  Tests to see if the intersection should be stripped from the total paths.

* `optimizePathSets(cache, paths, maxRefFollow)`<br>
  ([see spec](./test/optimizePathSets.spec.js))

* `pathCount(pathSet)`<br>
 Returns the number of paths in a PathSet.
 
  ~~~js
  var util = require("falcor-path-utils");
  console.log(util.pathCount(["titlesById", [512, 628], ["name","rating"]])) 
  // prints 4, because ["titlesById", [512, 628], ["name","rating"]] contains...
  // ["titlesById", 512, "name"]
  // ["titlesById", 512, "rating"]
  // ["titlesById", 628, "name"]
  // ["titlesById", 628, "rating"]
  ~~~
