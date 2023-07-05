"use strict";
import "./card.css";

const card = document.querySelector(".card-container");
class Movie {
	constructor(name, language, release, director) {
		this.name = name;
		this.language = language;
		this.release = release;
		this.director = director;
	}

	addMovieCard() {
		const row = document.querySelector(".row");
		const div = document.createElement("div");
		div.classList.add("col-lg-4");
		const markup = `
                <div class="card card-margin">
                    <div class="card-header no-border">
                      <h5 class="card-title">Name: ${this.name}</h5>
                    </div>
                        <div class="card-body pt-0 ">
                            <ul class="list-group text-dark">
                                <li class="list-group-item">Language: ${this.language}</li>
                                <li class="list-group-item">Year: ${this.release}</li>
                                <li class="list-group-item"><span>Director: ${this.director}</span></li>
                            </ul>
                        </div>
                            <div class="mt-3 text-end">
                              <a href="#" id="delete" class="btn btn-sm btn-danger delete">X</a>
                            </div>
                        </div>
                    </div> 
                </div>
          `;
		div.innerHTML = markup;
		row.appendChild(div);
	}

	static deleteMovieCard(elem) {
		elem.parentElement.parentElement.parentElement.remove();
	}
}

class Store {
	static getStored() {
		let movies;
		if (localStorage.getItem("movies") === null) {
			movies = [];
		} else {
			movies = JSON.parse(localStorage.getItem("movies"));
		}
		return movies;
	}

	static addToStore(movie) {
		let addMovies = Store.getStored();
		addMovies.push(movie);
		localStorage.setItem("movies", JSON.stringify(addMovies));
	}

	static removeFromStore(index) {
		let movies = Store.getStored();
		movies.splice(index, 1);
		localStorage.setItem("movies", JSON.stringify(movies));
	}
}

// Load and display stored movies
function loadStoredMovies() {
	const movies = Store.getStored();
	movies.forEach((movie) => {
		const { name, language, release, director } = movie;
		const movieObj = new Movie(name, language, release, director);
		movieObj.addMovieCard();
	});
}

// Submit the form
const btnSubmit = document.getElementById("submit");
var msgDiv = document.createElement("div");
msgDiv.classList.add("text-danger");

btnSubmit.addEventListener("click", () => {
	const nameInput = document.querySelector("#floatingName");
	const languageInput = document.querySelector("#floatingLanguage");
	const releaseInput = document.querySelector("#floatingReleaseDate");
	const directorInput = document.querySelector("#floatingDirector");

	// Input validation
	if (
		nameInput.value === "" ||
		languageInput.value === "" ||
		releaseInput.value === "" ||
		directorInput.value === ""
	) {
		msgDiv.innerHTML = `Please Enter all data first..`;
		card.appendChild(msgDiv);
	} else {
		const name = nameInput.value;
		const language = languageInput.value;
		const release = releaseInput.value;
		const director = directorInput.value;

		const movie = new Movie(name, language, release, director);
		movie.addMovieCard();
		// show from the local Storage
		Store.getStored();
		// add to localStorage
		Store.addToStore(movie);

		// Clear input fields
		nameInput.value = "";
		languageInput.value = "";
		releaseInput.value = "";
		directorInput.value = "";
	}
});

// Add event listener to delete button
document.addEventListener("click", function (e) {
	if (e.target.classList.contains("delete")) {
		// traverse through dom to select movie card from targeted element.
		const movieCard = e.target.parentElement.parentElement.parentElement;
		// creating index from an converted object to an array via Array.from static method.
		const index = Array.from(movieCard.parentNode.children).indexOf(movieCard);
		Movie.deleteMovieCard(e.target);
		Store.removeFromStore(index);
	}
});

// Load stored movies on page load
window.addEventListener("DOMContentLoaded", () => {
	loadStoredMovies();
});
