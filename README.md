# Parson problem shuffler

This script shuffles lines of programming code. Intended to be used for teaching programming.

```
Syntax:
node parson.js input-file
node parson.js input-file -o
node parson.js input-file --out
	
input-file can be any text file. This script will attempt to parse the name and produce a new file. Example:
input.js -> input.js.shuffled

If the -o/--out flag is specified, the script will output the result on stdout, rather than writing it to a file.
```
