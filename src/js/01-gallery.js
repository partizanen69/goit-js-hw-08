// Add imports above this line
import simpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

console.log(galleryItems);

const galleyUlElement = document.querySelector('ul.gallery');

const imagesMarkup = galleryItems.reduce((acc, img) => {
  const singleImgMarkup = `
     <li class="gallery__item">
      <a class="gallery__link" href="${img.original}">
          <img class="gallery__image" src="${img.preview}" alt="${img.description}" />
      </a>
    </li>
  `;

  return acc + singleImgMarkup;
}, '');

galleyUlElement.insertAdjacentHTML('afterbegin', imagesMarkup);

const lightbox = new simpleLightbox('ul.gallery a.gallery__link', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
});
