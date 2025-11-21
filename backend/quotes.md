# quotes.md

Below is the complete notes + implementation for all three parts (1.1, 1.2, 1.3) based exactly on your context and the quote objects you provided.

---

# Quotes App — Endpoints Documentation
This file contains the full explanation and sample Express.js implementation for:

- **1.1 Fetch Categories**
- **1.2 Get Random Quote from Category**
- **1.3 Add a New Quote**

All examples use your categories and quote arrays exactly as given.

---

## 🔹 Initial Data (Given in the question)
```js
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
```

To handle dynamic category access, create a storage object:

```js
let quotes = {
  successQuotes,
  perseveranceQuotes,
  happinessQuotes
};
```

---

# **1.1 — Fetch Categories**
### **GET** `/quotebook/categories`

### ✔ Requirements
- Respond with **plain text**
- Each line must say:  
  **"A possible category is [category]"**
- One category per line

### ✔ Sample Output
```
A possible category is successQuotes
A possible category is perseveranceQuotes
A possible category is happinessQuotes
```

### ✔ Implementation
```js
app.get('/quotebook/categories', (req, res) => {
  let result = '';

  categories.forEach(cat => {
    result += `A possible category is ${cat}
`;
  });

  res.type('text').send(result);
});
```

---

# **1.2 — Random Quote of a Category**
### **GET** `/quotebook/quote/:category`

### ✔ Requirements
- Must respond with **JSON**
- Pick a **random quote** from the chosen category
- If category is invalid → return: 
  ```json
  {"error": "no category listed for [category]"}
  ```

### ✔ Implementation
```js
app.get('/quotebook/quote/:category', (req, res) => {
  const category = req.params.category;

  if (!categories.includes(category)) {
    return res.status(400).json({ error: `no category listed for ${category}` });
  }

  const selected = quotes[category];


  const randomIndex = Math.floor(Math.random() * selected.length);
  const randomQuote = selected[randomIndex];

  res.json(randomQuote);
});
```

---

#  **1.3 — Add a Quote**
### **POST** `/quotebook/quote/new`

### ✔ Requirements
- Accepts **category**, **quote**, **author** from `req.body`
- Must add to correct array:
  ```js
  { quote: "...", author: "..." }
  ```
- Respond with **plain text**:  
  **Success!**
- If invalid or missing:  
  ```json
  {"error": "invalid or insufficient user input"}
  ```  
  Status **400**

### ✔ Implementation
```js
app.post('/quotebook/quote/new', (req, res) => {
  const { category, quote, author } = req.body;

  if (!category || !quote || !author || !categories.includes(category)) {
    return res.status(400).json({ error: 'invalid or insufficient user input' });
  }

  quotes[category].push({ quote: quote, author: author });

  res.type('text').send('Success!');
});
```


