import React, {useEffect, useState} from "react";
import CommentsList from "./social/comments/comments-list";
import SocialFooter from "./social/footer/social-footer";
import SocialHeader from "./social/header/social-header";
import {useDispatch, useSelector} from "react-redux";
import {getPhoto, getPhotoLoadIndicator} from "../../store/selectors";
import {fetchPhoto} from "../../store/api-action";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../loading/loading";
import {clearPhoto} from "../../store/action";
import {
  ADDITIONAL_VISIBLE_COMMENTS_NUM,
  INITIAL_VISIBLE_COMMENTS_NUM,
} from "../../_const";

const BigPicture = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();

  const isPhotoLoaded = useSelector((state) => getPhotoLoadIndicator(state));
  const photo = useSelector((state) => getPhoto(state));

  const [photoId, setPhotoId] = useState(id);
  const [visibleCommentsNum, setVisibleCommentsNum] = useState(0);
  const [isLoadMoreBtnVisible, setIsLoadMoreBtnVisible] = useState(false);

  const onPhotoLoad = () => {
    if (!isPhotoLoaded) {
      dispatch(fetchPhoto(photoId));
    } else {
      if (photo.comments.length > INITIAL_VISIBLE_COMMENTS_NUM) {
        setVisibleCommentsNum(INITIAL_VISIBLE_COMMENTS_NUM);
        setIsLoadMoreBtnVisible(true);
      } else {
        setVisibleCommentsNum(photo.comments.length);
      }
    }
  };

  const onLoadMoreBtnClick = () => {
    let newVisibleCommentsNum =
      visibleCommentsNum + ADDITIONAL_VISIBLE_COMMENTS_NUM;
    if (newVisibleCommentsNum > photo.comments.length) {
      newVisibleCommentsNum = photo.comments.length;
    }
    setVisibleCommentsNum(newVisibleCommentsNum);
  };

  const onCloseBtnClick = () => {
    setPhotoId(undefined);
    setIsLoadMoreBtnVisible(false);
    dispatch(clearPhoto());
    navigate(`/`, {replace: true});
  };

  useEffect(() => onPhotoLoad(), [isPhotoLoaded]);
  useEffect(() => {
    if (isPhotoLoaded && visibleCommentsNum >= photo.comments.length) {
      setIsLoadMoreBtnVisible(false);
    }
  }, [visibleCommentsNum]);

  if (!isPhotoLoaded) {
    return <Loading />;
  }

  return (
    <div className="big-picture__preview">
      {/* <!-- Просмотр изображения --> */}
      <div className="big-picture__img">
        <img
          src={`../photos/${photo.url}`}
          alt={`${photo.description}`}
          width="600"
          height="600"
        />
      </div>

      {/* <!-- Информация об изображении. Подпись, комментарии, количество лайков --> */}
      <div className="big-picture__social  social">
        <SocialHeader photo={photo} />

        {/* <!-- Комментарии к изображению --> */}
        <div className="social__comment-count">
          {visibleCommentsNum}
          {` `}из{` `}
          <span className="comments-count">{photo.comments.length}</span>
          {` `}
          комментариев
        </div>

        <CommentsList
          comments={photo.comments}
          visibleCommentsNum={visibleCommentsNum}
        />

        {/* <!-- Кнопка для загрузки новой порции комментариев --> */}
        <button
          type="button"
          className={`social__comments-loader  comments-loader  ${
            isLoadMoreBtnVisible ? `` : `hidden`
          }`}
          onClick={() => onLoadMoreBtnClick()}
        >
          Загрузить еще
        </button>

        {/* <!-- Форма для отправки комментария --> */}
        <SocialFooter />
      </div>

      {/* <!-- Кнопка для выхода из полноэкранного просмотра изображения --> */}
      <button
        type="reset"
        className="big-picture__cancel  cancel"
        id="picture-cancel"
        onClick={() => onCloseBtnClick()}
      >
        Закрыть
      </button>
    </div>
  );
};

export default BigPicture;
