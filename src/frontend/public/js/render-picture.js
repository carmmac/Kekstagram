const pictureTemplate = document.querySelector(`#picture`)
  .content.querySelector(`.picture`);

export const renderPicture = (photo) => {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector(`.picture__img`)
    .src = `../photos/${photo.url}`;
  newPicture.querySelector(`.picture__likes`)
    .textContent = photo.likes;
  newPicture.querySelector(`.picture__comments`)
    .textContent = photo.comments.length;

  return newPicture;
};
