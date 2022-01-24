const pictureTemplate = document.querySelector(`#picture`).content.querySelector(
    `.picture`
);

export const renderPicture = (photo) => {
  const newPicture = pictureTemplate.cloneNode(true);
  const newPictureImg = newPicture.querySelector(`.picture__img`);
  newPictureImg.src = photo.url;
  // newPicture.querySelector(`.picture__likes`).textContent = photo.likes;
  // newPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
  return newPicture;
};
