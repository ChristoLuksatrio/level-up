import React from 'react';
import CommentListItem from './CommentListItem';

export default function CommentList({ comments }) {

  return (
    comments.map((comment, index) => (
      <CommentListItem key={index} username={comment.username} avatar={comment.user_profile_pic} created_at={comment.created_at} text={comment.text} />
    ))
  )
}