# Falcor Path Utils
 
This repository contains utilities for transforming and manipulating Falcor Path objects.

## Example

~~~js
var util = require("falcor-path-syntax");
var collapsedPaths = util.collapse([

  ["genres", 0, "titles", 0, "name"],
  ["genres", 0, "titles", 0, "rating"],
  ["genres", 0, "titles", 1, "name"],
  ["genres", 0, "titles", 1, "rating"]
]);

// collapsed paths is ["genres", 0, "titles", {from: 0, to: 1}, ["name", "rating"]]
~~~
