const express = require('express')
const app = express()

// Route 1: Circle calculations
app.get('/math/circle/:radius', (req, res) => {
  const r = parseFloat(req.params.radius)
  if (isNaN(r)) {
    return res.status(400).json({ error: 'Invalid radius' })
  }
  const area = Math.PI * r * r
  const circumference = 2 * Math.PI * r
  res.json({ radius: r, area, circumference })
})

// Route 2: Rectangle calculations
app.get('/math/rectangle/:length/:width', (req, res) => {
  const l = parseFloat(req.params.length)
  const w = parseFloat(req.params.width)
  if (isNaN(l) || isNaN(w)) {
    return res.status(400).json({ error: 'Invalid length or width' })
  }
  const area = l * w
  const perimeter = 2 * (l + w)
  res.json({ length: l, width: w, area, perimeter })
})


app.get('/math/power/:base/:exponent', (req, res) => {
  const base = parseFloat(req.params.base)
  const exponent = parseFloat(req.params.exponent)
  const root = req.query.root ? parseFloat(req.query.root) : null

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: 'Invalid base or exponent' })
  }

  let result = Math.pow(base, exponent)
  if (root && !isNaN(root)) {
    result = Math.pow(result, 1 / root)
  }

  res.json({ base, exponent, root, result })
})

// Server setup
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
