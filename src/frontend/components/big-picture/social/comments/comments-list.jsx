import React from "react";
import PropTypes from "prop-types";
import CommentsItem from "./comments-item";

const CommentsList = ({comments, visibleCommentsNum}) => {
  const visibleComments = comments.slice(0, visibleCommentsNum);

  return (
    <ul className="social__comments">
      {visibleComments.map((comment, i) => (
        <CommentsItem comment={comment} key={`comment-${i}`} />
      ))}
    </ul>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  visibleCommentsNum: PropTypes.number.isRequired,
};

export default CommentsList;
