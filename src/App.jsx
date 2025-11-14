import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProfileCard from './components/ProfileCard.jsx'
import { profiles } from './data/profiles.js'

export default function App() {
  const [people, setPeople] = useState(profiles)
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  function handleLike(id) {
    setPeople(ps =>
      ps.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      <form
        onSubmit={e => {
          e.preventDefault()
          const trimmed = name.trim()
          const exists = people.some(
            p => p.name.toLowerCase() === trimmed.toLowerCase()
          )

          if (!trimmed || exists) {
            setError(true)
            return
          }

          const newProfile = {
            id: people.length + 1,
            name: trimmed,
            likes: 0
          }

          setPeople([...people, newProfile])
          setName('')
          setError(false)
        }}
      >
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name"
          className={`form-control mb-3 ${error ? 'is-invalid' : ''}`}
        />
        <button type="submit" className="btn btn-success mb-4">
          Add Profile
        </button>
      </form>

      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard
              id={p.id}
              name={p.name}
              likes={p.likes}
              onLike={handleLike}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
