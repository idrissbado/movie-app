"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { Nav, Navbar, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./App.css"
import MovieList from "./components/MovieList"
import Filter from "./components/Filter"
import AddMovie from "./components/user/AddNewMovie"
import Description from "./components/Description"
import { Film } from "react-bootstrap-icons"

const MovieInfo = [
  {
    id: Math.random(),
    title: "THE GOOD DOCTOR",
    trailer: "https://www.youtube.com/embed/fYlZDTru55g",
    description:
      "Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABZD4o7qojurv9t5wyRwEO1alifA9KULIsEom_dCtOTnADHHGgeRQYNy9MLAw3QobU1y4RK669EOaRYGOcpHGDuJU1WhsiYvlHXU.webp?r=1a8",
    rating: 10,
  },
  {
    id: Math.random(),
    title: "FIFTY SHADES OF GREY",
    trailer: "https://www.youtube.com/embed/SfZWFDs0LxA",
    description:
      "Literature student Anastasia Steele's life changes forever when she meets handsome, yet tormented, billionaire Christian Grey.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcvjTMSGOyK_Voc7kPfBf7D2-k-PJpptnIPLcSydYVQv0F1rkKYN75D0EbU6023xiwKYpsApfsmujpv1g_uKcbHofaYw9uio1JA.webp?r=4b5",
    rating: 9.5,
  },
  {
    id: Math.random(),
    title: "BREADED LIFE",
    trailer: "https://www.youtube.com/embed/ULLUjOjDQ7I",
    description:
      "A spoiled brat whose life takes a drastic turn after a dramatic circumstance forces him to fend for himself in the streets.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVwuSctUNMJChyAO6Iyt04C0Qxf5huKXnveFTZ2EQYEXhVxoDi9cb1Z4omcxBKRTE3tcFpJiusWU5g_XpyS5jfgx6pppYp0r7PzpY8uullTJRLLGntDhlzhSj9BpX4KpYtF2XOBYgytA8AjNUJojOPpDR6_TZcX_q6Y.webp?r=46c",
    rating: 8.5,
  },
  {
    id: Math.random(),
    title: "KING OF BOYS",
    trailer: "https://www.youtube.com/embed/N2-nCy4Qh1c",
    description:
      "King of Boys tells the story of Alhaja Eniola Salami (played by Sola Sobowale), a businesswoman and philanthropist with a promising political future. She is drawn into a struggle for power which in turn threatens everything.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABRfbNOddxWrJjaDmitxe4s4KfluBe0efumBmpkctbiXT9k6LdzK9OtmFUmWnCuhwe4zK8lEAc9D2qESiB_BoTd-AZMQgPeHnQf49PmsHlPzevl3JmxvHfRJn1UWl-x8HbmsR.jpg?r=b9c",
    rating: 9.5,
  },
  {
    id: Math.random(),
    title: "WRONG SIDE OF THE TRACKS",
    trailer: "https://www.youtube.com/embed/Rl9cRMT3ixA",
    description:
      "An angry war veteran who hates the drug dealers infiltrating his neighborhood sets out to reform his teen granddaughter, who's being led astray by them.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbnd3R8_70lv0Ur3tKPuviTn9miMY6ZEFG5Wlltx8GNSjEHFuCjvMWrLYhBS6PfVILfFm3eI1I9MHfAun0cz5H8Z7YEhrH__80gj0Ugy3du81VKhA9LIyCgeYBPc56wgWE53.jpg?r=e16",
    rating: 8.0,
  },
  {
    id: Math.random(),
    title: "BLOOD SISTERS",
    trailer: "https://www.youtube.com/embed/QU9ZMi3I3w4",
    description:
      "Bound by a dangerous secret, best friends Sarah and Kemi are forced to go on the run after a wealthy groom disappears during his engagement party",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABReTiPnPyye9IJ4emZYIg9frlxcKXzZGmW0wj7EvDEj2ENjGU4OLVf9IGKBP0UM79qlINOru8tdhW1HGGL2OT02X1BoIj8HEQ3hzfMQ9T5o4-r-aweUsOtp8pii5vTG5AB9n48i6uLRSlqsw1o7asJkOLBRHnlDC1EBEY_FOhbf7kRgGMcZq7n3MOo3FFhA.jpg?r=e96",
    rating: 9.6,
  },
  {
    id: Math.random(),
    title: "SAVAGE BEAUTY",
    trailer: "https://www.youtube.com/embed/bOXQZvKnP64",
    description:
      "A mysterious woman enters the lives of a powerful cosmetics company family seeking revenge for the damage their products have caused.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABdZYC_NKDy_PVrO5xOLMN7cUPVfi2rw5Uo1GpcuXKRxhT7txCqcK0867OiBk80VaeMn_iZSDSJb0tOLGO6Hiee4edR9hw_i8FdJ9A895eWRm629km7v65ifmrf61A27TkCf3.jpg?r=a6e",
    rating: 9.6,
  },
  {
    id: Math.random(),
    title: "VIVO",
    trailer: "https://www.youtube.com/embed/QLR-YU77XfI",
    description:
      "A music-loving kinkajou embarks on the journey of a lifetime to fulfill his destiny and deliver a love song for an old friend.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABZGhkFeZala0snKI-EQp6KlYR6W7-SU51jvH5UQrBHmk4atmlgMz0Q2jPC0wCShWyrub_eTr7yuwb9v45Nfznn7zDsmYO3-RPuxqNL-ukxSKZrcsAUHqKsc-ckDaEtyo33c-.jpg?r=cc3",
    rating: 10.0,
  },
  {
    id: Math.random(),
    title: "WISH DRAGON",
    trailer: "https://www.youtube.com/embed/uWIpfkqkvdg",
    description:
      "Determined teen Din is longing to reconnect with his childhood best friend when he meets a wish-granting dragon that shows him the magic of possibilities.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABb304oBB_SjBMSKb-KWoWf47Zehkvcgr76FHl3r6NxIhC90AW1GKY5wbS4JiZDvABg7WkwUD1fsBy2hnwAqHYwIiAkySffu-lhhEjfxr3NMDgXrRYpdTyPtqqg0VnJH69h6A.jpg?r=d98",
    rating: 9.6,
  },
  {
    id: Math.random(),
    title: "MEGA MIND",
    trailer: "https://www.youtube.com/embed/ead9HCX9fe4",
    description:
      "Evil genius Megamind finally defeats his nemesis, the superhero Metro Man. But without a hero, he loses all purpose and must find new meaning to his life.",
    posterURL:
      "https://occ-0-299-1167.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbFE_AwLSin7l4iBbztVyg2zNvmAIobsgef0VSNDfDxy41hXTBQJ7kvt-L97ehzLNywu5lWqZ8iOYg8ju9YBv3VXRAo9ByrWtg4.webp?r=f70",
    rating: 8.6,
  },
]

function App() {
  const [list, setList] = useState(MovieInfo)
  const [filtredList, setFiltredList] = useState(list)
  const [rate, setRate] = useState(0)
  const [keyword, setKeyword] = useState("")
  const location = useLocation()

  function adding(movie) {
    if (movie.title && movie.description && movie.posterURL) {
      setList([...list, movie])
    }
  }

  function filter(key, rate) {
    setKeyword(key)
    setRate(rate)
    setFiltredList(
      list.filter((element) => {
        return element.title.toLowerCase().includes(key.toLowerCase()) && element.rating >= rate
      }),
    )
  }

  useEffect(() => {
    filter(keyword, rate)
  }, [list, keyword, rate])

  return (
    <div className="App">
      <div className="Navbar">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <Film className="me-2" />
              Movies By Moonlight
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">{location.pathname === "/" && <Filter filter={filter} />}</Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="container">
                <MovieList list={filtredList} />
                <AddMovie adding={adding} />
              </div>
            </>
          }
        />
        <Route path="/movie/:id" element={<Description list={list} />} />
      </Routes>
    </div>
  )
}

export default App

