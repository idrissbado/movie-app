"use client"

import { useRef, useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"

export default function Filter({ filter }) {
  const searchRef = useRef()
  const [rate] = useState(0)

  function submitted(ev) {
    ev.preventDefault()
    filter(searchRef.current.value, rate)
  }

  return (
    <div>
      <Form inline="true" onSubmit={submitted}>
        <InputGroup>
          <Form.Control
            ref={searchRef}
            placeholder="Search movies..."
            aria-label="Search movies"
            onChange={submitted}
            className="border-0"
          />
          <Button variant="outline-light" type="submit">
            <Search />
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

