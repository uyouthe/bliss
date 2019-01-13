const lighten = rgba => makeRGBA(dodgeburn(sliceRGBA(rgba), 15))
const darken = rgba => makeRGBA(dodgeburn(sliceRGBA(rgba), -15))
const sliceRGBA = rgba => rgba.split(/\(|\)/)[1].split(', ')
const makeRGBA = tuple => tuple.length === 3 ?
      `rgb(${tuple.join(', ')})` :
      `rgba(${tuple.join(', ')})`

const dodgeburn = (tuple, amount) => {
  const saturatedTuple = tuple.slice(0, 3).map(x => limitAdd(parseInt(x), amount) + '')
  
  if (tuple.length === 3) {
    return saturatedTuple
  } else {
    return [...saturatedTuple, tuple[3]]
  }
}

const limitAdd = (value, amount) => {
  if (value + amount >= 255) {
    return 255
  } else if (value + amount <= 0) {
    return 0
  } else {
    return value + amount
  }
}

Array.prototype.slice.call(document.querySelectorAll('*')).forEach(node => {
	const style = getComputedStyle(node)
	if (style.backgroundImage === 'none') {
		const color = style.backgroundColor
		node.style.backgroundImage = `
      linear-gradient(${40 + Math.round(Math.random() * 100)}deg, ${darken(color)}, ${lighten(color)})
    `
  }
})
