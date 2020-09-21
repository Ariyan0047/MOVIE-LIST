const addMovie = document.querySelector(".addMovie");
const modal = document.querySelector(".section_02");
const cancel = document.querySelector(".btnCancel");
const submit = document.querySelector(".btnSubmit");
const overlay = document.querySelector(".overlay");
const inputs = modal.querySelectorAll("input");
const part01 = document.querySelector(".part_01");

const movieList = [];

// REMOVING BODY TITLE
const updateUI = () => {
  if (movieList.length === 0) {
    part01.style.display = "block";
  } else {
    part01.style.display = "none";
  }
};

// REMOVING ADDED MOVIE LIST

const removeMovieList = (movieId) => {
  let index = 0;
  for (const movie of movieList) {
    if (movie.id == movieId) {
      break;
    }
    index++;
  }
  movieList.splice(index, 1);
  const addMovieList = document.querySelector(".addedMovieList");
  addMovieList.children[index].remove();
};

// ADDING MOVIE LISTS IN THE UI
const addMovieHandler = (id, movieTitle, movieUrl, movieRating) => {
  const list = document.createElement("li");
  list.className = "movie-element";
  list.innerHTML = `
  <div class= "movieUrl">
      <img src="${movieUrl}" alt="img">
  </div>
  <div class= "part02">
    <div class= movieTitle>
      <h1>${movieTitle}</h1>
    </div>
    <div class= "movieRating">
      <p>${movieRating}/5 stars<p>
    </div>
  </div>`;
  list.addEventListener("click", removeMovieList.bind(null, id));
  const addMovieList = document.querySelector(".addedMovieList");
  addMovieList.append(list);
};

// ADDING MODAL ON THE SCREEN
const addModal = () => {
  modal.classList.toggle("invisibleSection");
  overlay.classList.toggle("visible");
};

// CANCELLING THE MODAL & OVERLAY
const cancelModal = () => {
  addModal();
  clearInputHandler();
};

// CANCELLING THE MODAL & OVERLAY BY CLICKING ON THE MODAL
const cancelOverlay = () => {
  cancelModal();
};

// CLEARING PREVIOUS INPUTS
const clearInputHandler = () => {
  movieTitle.value = "";
  movieUrl.value = "";
  movieRating.value = "";
};

// SUBMITTING USER INPUT
const resultHandler = () => {
  const movieTitle = inputs[0].value.toUpperCase().trim();
  const movieUrl = inputs[1].value.trim();
  const movieRating = inputs[2].value.trim();

  // CONDITIONS FOR ADDING THE MOVIE LIST
  if (
    movieTitle.trim() === "" ||
    movieUrl.trim() === "" ||
    movieRating.trim() === "" ||
    +movieRating < 1 ||
    +movieRating > 5
  ) {
    alert(`INPUT FIELDS CAN'T BE EMPTY & MOVIE RATTING MUST BE BETWEEN 1 TO 6`);
    return;
  }

  // CUSTOM OBJECT TO SHOW DETAILS ABOUT MOVIE LIST IN THE CONSOLE
  const userInputs = {
    id: Math.random().toFixed(2),
    title: movieTitle,
    url: movieUrl,
    rating: movieRating,
  };

  movieList.push(userInputs);
  console.log(movieList);
  addModal();
  addMovieHandler(
    userInputs.id,
    userInputs.title,
    userInputs.url,
    userInputs.rating
  );
  clearInputHandler();
  updateUI();
};

// EVENT HANDLERS
addMovie.addEventListener("click", addModal);
cancel.addEventListener("click", cancelModal);
overlay.addEventListener("click", cancelOverlay);
submit.addEventListener("click", resultHandler);