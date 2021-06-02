const express = require('express') 
const cors = require('cors')
const app = express()

app.use(express.json()) 
app.use(cors())

let anecdotes = {
    "anecdotes":[
      {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
      },
      {
        "content": "Adding manpower to a late software project makes it later!",
        "id": "21149",
        "votes": 0
      },
      {
        "content": "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "id": "69581",
        "votes": 0
      },
      {
        "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "id": "36975",
        "votes": 0
      },
      {
        "content": "Premature optimization is the root of all evil.",
        "id": "25170",
        "votes": 0
      },
      {
        "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "id": "98312",
        "votes": 0
      }
    ]
  }

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/anecdotes', (req, res) => {
  res.json(anecdotes)
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

// 6.14
app.post('/api/anecdotes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const anecdote = {
    content: body.content, 
    id: generateId(),
  }

  anecdotes = anecdotes.concat(anecdote)

  response.json(anecdote)
})

// app.get('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const note = notes.find(note => note.id === id)

//   if (note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }
// })

// app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)

//   response.status(204).end()
// })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})