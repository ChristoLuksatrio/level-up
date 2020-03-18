import React from 'react';  
import sword from '../images/sword.png'
import book from '../images/book.png'
import question from '../images/question.png'
import comment from '../images/comment.png';
import { Grid, Stepper, Step, StepLabel, Hidden } from '@material-ui/core';
import {useHistory, Link} from "react-router-dom";

export default function QuestListItem({title, created_at, symbol, id, handleClick, post}) {
  return (
    <Link onClick={(event)=> {
      event.preventDefault();
      return handleClick(id, post)}}>
    <Grid className='post-container' container>
      <Grid item xs={4} sm={4} md={3} lg={2} >
      <img src={sword} alt={title} width="120" height="120"/>
      </Grid>
      <Grid item className='post-detail' xs={8} sm={8} md={9} lg={10}>
      <h3>{title}</h3>
      <p>Created at: {(new Date(created_at)).toLocaleDateString()}</p>
        <Grid item className='comment-container'>
          <p>5</p>
          <img src={comment} alt='comment symbol' width='20px' height='20px' />
        </Grid>
      </Grid>
    </Grid>
    </Link>
  )
}