import { readFile, writeFile } from 'node:fs/promises'
import { makeFileNameSequential, randInt, swap } from './utils.js'
// Eliminate problems with too few arguments
if( process.argv.length < 3 ) {
	console.log(`Parson's problem: produce files with lines scrambled.
ERROR: too few parameters.
Syntax:
node parson.js input-file
node parson.js input-file -o
node parson.js input-file --out
	
input-file can be any text file. This script will attempt to parse the name and produce a new file. Example:
input.js -> input.js.shuffled

If the -o/--out flag is specified, the script will output the result on stdout, rather than writing it to a file.
`)
	process.exit()
}


const inputFile = process.argv[2]
const flag = process.argv[3]
const doOutput = flag === '-o' || flag === '--out'



try {
	let input = (await readFile(inputFile)).toString()
	let lines = input.split('\n')
	
	let rows = lines.length
	
	for( let i=0; i<rows; i++ ) {
		let fromRow = randInt(rows)
		let toRow = fromRow
		while( toRow === fromRow ) {
			toRow = randInt(rows)
		}
		swap(lines, fromRow, toRow)
	}
	
	let output = lines.join('\n')
	
	if( doOutput ) {
		console.log(output)
	} else {
		let outputFile = await makeFileNameSequential(inputFile)
		await writeFile(outputFile, output)
		console.log('Saved shuffle to ' + outputFile)
	}

} catch(error) {
	console.error('An error occurred while reading/writing files:\n' + error.message)
}
