const express = require('express')
const app = express()

let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];


// Circle calculations
app.get('/math/circle/:radius', (req, res) => {
  const r = parseFloat(req.params.radius)
  if (isNaN(r)) {
    return res.status(400).json({ error: 'Invalid radius' })
  }
  const area = Math.PI * r * r
  const circumference = 2 * Math.PI * r
  res.json({ radius: r, area, circumference })
})

// Rectangle calculations
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

// Fetch Categories
app.get('/quotebook/categories', (req, res) => {
  let responseText = categories.map(c => `A possible category is ${c}`).join('\n');
  res.type('text').send(responseText);
});

// Quotes of a category
app.get('/quotebook/quote/:category', (req, res) => {
  const category = req.params.category;

  if (!categories.includes(category)) {
    return res.status(400).json({ error: `no category listed for ${category}` });
  }

  let quotesArray = eval(category); 
  let randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];

  res.json(randomQuote);
});

// Add a quote
app.post('/quotebook/quote/new', express.json(), (req, res) => {
  const { category, quote, author } = req.body;

  if (!category || !quote || !author || !categories.includes(category)) {
    return res.status(400).json({ error: 'invalid or insufficient user input' });
  }

  let newQuote = { quote, author };
  eval(category).push(newQuote);

  res.type('text').send('Success!');
});

// Server setup
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
