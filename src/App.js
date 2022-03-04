import { useEffect, useState } from "react"
import "./App.css"

function App() {
	const [searchTerm, setSearchTerm] = useState("")
	const [dateFrom, setDateFrom] = useState("")
	const [validTerm, setValidTerm] = useState()
	const [validDate, setValidDate] = useState()
	const [headlines, setHeadlines] = useState([])
	useEffect(() => {
		if (searchTerm) {
			fetch(
				`https://newsapi.org/v2/everything?q="${searchTerm}"&from=${dateFrom}&language=en&apiKey=18823addc6af412ea506e8c6c8328376`
			)
				.then((res) => res.json())
				.then((data) => setHeadlines(data.articles))
		}
	}, [validDate, validTerm])

	const newsArticles = headlines.map((article) => (
		<div className="articles">
			<h2>{article.title}</h2>
			<h4>{article.description}</h4>
			{/* <p>{article.content}</p> */}
			<a href={article.url}>{article.url}</a>
		</div>
	))

	function updateSearchTerm(e) {
		setSearchTerm(e.target.value)
	}
	function updateDate(e) {
		setDateFrom(e.target.value)
	}

	function processInputs() {
		setValidTerm(searchTerm)
		setValidDate(dateFrom)
	}

	return (
		<main className="main">
			<nav>
				<h1>NewsGetter3000</h1>
				<input
					type="text"
					className="search-box"
					placeholder="Search Headlines"
					onChange={updateSearchTerm}
				/>
				<input
					type="text"
					placeholder="From (yyyy-mm-dd)"
					className="search-box-small"
					onChange={updateDate}
				/>
				<button onClick={processInputs} className="btn">
					Search
				</button>
			</nav>
			<div className="article-container">{newsArticles}</div>
		</main>
	)
}

export default App
