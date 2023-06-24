// import { useContext, useEffect, useState } from 'react';
import { useEffect, useState } from 'react';

import CommentList from '../commentList/CommentList';
import NewComment from '../newComment/NewComment';
import styles from './Comments.module.css';
import { showNotification } from '@/Redux/notification/notificationActionCreator';
import { useDispatch } from 'react-redux';

function Comments(props) {
  const { eventId } = props;

  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    comment: ''
  });

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    dispatch(
      showNotification({
        title: 'Sending comment...',
        message: 'Your comment is currently being stored.',
        status: 'pending'
      })
    )

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setFormData({ email: '', name: '', comment: '' });
          return response.json()
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        dispatch(
          // notificationCtx.showNotification({
          showNotification({
            title: 'Success!',
            message: 'Your comment was saved.',
            status: 'success'
          })
        )
      })
      .catch((error) => {
        dispatch(
          // notificationCtx.showNotification({
          showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error'
          })
        )
      })
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;