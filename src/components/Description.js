"use client"

import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button, Badge } from "react-bootstrap"
import { ArrowLeft, Star, StarFill } from "react-bootstrap-icons"

export default function Description({ list }) {
  const { id } = useParams()
  const movieIndex = Number.parseInt(id)
  const isValidMovie = !isNaN(movieIndex) && movieIndex >= 0 && movieIndex < list.length
  const movie = isValidMovie ? list[movieIndex] : null

  return (
    <Container className="py-4">
      {!isValidMovie ? (
        <div className="text-center py-5">
          <h2>Movie Not Found</h2>
          <p>Sorry, we couldn't find the movie you're looking for.</p>
          <Button as={Link} to="/" variant="primary">
            <ArrowLeft className="me-2" />
            Back to Movies
          </Button>
        </div>
      ) : (
        <>
          <Button as={Link} to="/" variant="outline-primary" className="mb-4">
            <ArrowLeft className="me-2" />
            Back to Movies
          </Button>

          <Row className="mb-5">
            <Col md={4} className="mb-4 mb-md-0">
              <img
                src={movie.posterURL || "/placeholder.svg"}
                alt={`${movie.title} Poster`}
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={8}>
              <h1 className="display-4 fw-bold text-danger mb-3">{movie.title}</h1>

              <div className="d-flex align-items-center mb-4">
                <div className="me-3">
                  <Badge bg="dark" className="p-2">
                    <span className="fs-5">{movie.rating}/10</span>
                  </Badge>
                </div>
                <div className="d-flex align-items-center">
                  {[...Array(Math.floor(movie.rating / 2))].map((_, i) => (
                    <StarFill key={i} className="text-warning me-1" size={20} />
                  ))}
                  {movie.rating % 2 !== 0 && <Star className="text-warning me-1" size={20} />}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-3">Synopsis</h3>
                <p className="lead">{movie.description}</p>
              </div>
            </Col>
          </Row>

          <div className="trailer-container">
            <h3 className="mb-3">Watch Trailer</h3>
            <div className="ratio ratio-16x9 shadow-lg">
              <iframe src={movie.trailer} title={`${movie.title} Trailer`} allowFullScreen className="rounded"></iframe>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}

