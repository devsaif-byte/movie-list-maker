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
		console.log(elem);
		elem.parentElement.parentElement.parentElement.remove();
	}
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

	if (
		nameInput.value === "" &&
		languageInput.value === "" &&
		releaseInput.value === "" &&
		directorInput.value === ""
	) {
		console.log(`Please Enter Something first..`);
		msgDiv.innerHTML = `Please Enter Something first..`;
		card.appendChild(msgDiv);
	} else {
		const name = nameInput.value;
		const language = languageInput.value;
		const release = releaseInput.value;
		const director = directorInput.value;

		const movie = new Movie(name, language, release, director);
		console.log(movie);
		movie.addMovieCard();

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
		console.log(e.target.classList.contains("delete"));
		Movie.deleteMovieCard(e.target);
	}
});
