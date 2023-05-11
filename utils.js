import { access, constants } from 'node:fs/promises'

// Returns true if file exists
async function fileExists(filename) {
	try {
		await access(filename, constants.F_OK)
		return true
	} catch {
		// console.log('NOT EXIST: ', error)
		return false
	}
}

async function makeFileNameSequential(name) {
	let n = 2
	let newName = name + '.shuffled'
	let exists = await fileExists(newName)
	while( exists ) {
		newName = name + '.shuffled.' + n++
		exists = await fileExists(newName)
	}
	return newName
}

function makeFileNameInserted(name) {
	const xs = name.split('.')
	let newName = ''
	if (xs.length === 1) {
		newName = xs[0] + '.shuffled'
	} else {
		for (let i = 0; i < xs.length; i++) {
			if (i === xs.length - 1) {
				newName += 'shuffled.'
			}
			newName += xs[i]
			if (i < xs.length - 1) {
				newName += '.'
			}
		}
	}
	return newName
}

// Returns an integer 0 .. (n-1)
function randInt(n) {
	return Math.floor( Math.random() * n )
}

function swap(xs, i, j) {
	let temp = xs[i]
	xs[i] = xs[j]
	xs[j] = temp
}

export { fileExists, makeFileNameInserted, makeFileNameSequential, randInt, swap }
