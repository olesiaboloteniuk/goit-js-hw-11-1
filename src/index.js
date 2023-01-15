import { searchingImg } from "./file";
import Notiflix from "notiflix";
import renderMarkup from "./templates/renderMarkup.hbs";
import simplelightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const btnSearch = document.querySelector('.search-form');
const input = document.querySelector('.search-form__input');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const message = document.querySelector('.end-collection-text');

btnSearch.addEventListener('submit', searchHandler);
btnLoadMore.addEventListener('click', loadingPhoto)
let inputValue = "";
let limit = 40;
let firstPage = 1;
btnLoadMore.setAttribute("disabled", true);
btnLoadMore.classList.add("hide-it");
message.classList.add("hide-it");



function searchHandler(ev) {
	ev.preventDefault();
	btnLoadMore.removeAttribute("disabled");
	btnLoadMore.classList.remove("hide-it");
	gallery.innerHTML = "";
	searchingImg(inputValue,firstPage, limit).then(
		result => {
			console.log(result.hits);
			const totalPages = result.totalHits / limit;
	
			if (result.total === 0) {
				btnLoadMore.classList.add("hide-it");
				Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
			}
			else {
				imgRender(result);
				btnLoadMore.classList.remove("hide-it");
			}

		}
	)
}

function imgRender(img) {
	gallery.insertAdjacentHTML("beforeend", renderMarkup(img.hits))
	// gallery.innerHTML = renderMarkup(img.hits);
	new simplelightbox('.gallery a')
	btnLoadMore.classList.remove("hide-it")
}

function inputHandler(event) {
	inputValue = event.target.value;
}
input.addEventListener('input', inputHandler)


function loadingPhoto() {
	firstPage += 1;
	searchingImg(inputValue, firstPage, limit).then(
		res => {
			const totalPages = res.totalHits / limit;

			if (firstPage >= totalPages) {
				btnLoadMore.style.display = "none";
			

			}

			imgRender(res);
		}
	)

}
