import React from "react";
import PropTypes from "prop-types";

const CommentsItem = ({comment}) => {
  return (
    <li className="social__comment">
      <img
        className="social__picture"
        src={`../img/${comment.avatar}`}
        alt="Аватар комментатора фотографии"
        width="35"
        height="35"
      />
      <p className="social__text">{comment.message}</p>
    </li>
  );
};

CommentsItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentsItem;
