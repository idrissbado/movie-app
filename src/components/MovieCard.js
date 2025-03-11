import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Star, StarFill } from "react-bootstrap-icons"

export default function MovieCard({ ele, index }) {
  // Find the index of this movie in the list
  const movieIndex = index !== undefined ? index : null

  return (
    <div className="MovieCard">
      <Card style={{ width: "20rem", height: "40rem" }} className="movie-card-container h-100 shadow-sm">
        <Link to={movieIndex !== null ? `/movie/${movieIndex}` : "#"} className="text-decoration-none">
          <Card.Img
            variant="top"
            src={ele.posterURL}
            alt={`${ele.title} Poster`}
            style={{ height: "25rem", objectFit: "cover" }}
            className="card-poster"
          />
          <Card.Body>
            <Card.Title className="text-danger fw-bold">{ele.title}</Card.Title>
            <hr />
            <Card.Text className="text-muted" style={{ height: "8rem", overflow: "hidden" }}>
              {ele.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between align-items-center bg-dark text-white">
            <div className="d-flex align-items-center">
              {[...Array(Math.floor(ele.rating / 2))].map((_, i) => (
                <StarFill key={i} className="text-warning me-1" />
              ))}
              {ele.rating % 2 !== 0 && <Star className="text-warning me-1" />}
            </div>
            <small>{ele.rating}/10</small>
          </Card.Footer>
        </Link>
      </Card>
    </div>
  )
}

