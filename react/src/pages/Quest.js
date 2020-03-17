import React from 'react';
import { Grid, Stepper, Step, StepLabel } from '@material-ui/core';
import {useHistory} from "react-router-dom"
import NavForApp from '../components/NavForApp';
import CreatePostBtn from '../components/CreatePostBtn'


export default function Quest(props) {
  let history=useHistory();
  let state = {};
  let quests={};
  let party_quests = {};

  if(props.location.state)
  {
    state = props.location.state.global;
    quests = props.location.state.quests;
    party_quests = props.location.state.party_quests;
    console.log(props);
  } else{
    history.push('/');
  }

  console.log(props);
  console.log(`Quest State is ${state}`);

  const nodes = [
    {
      title: 'start',
      isComplete: true,
      date: Date(Date.now()).toString()
    },
    {
      title: 'middle',
      isComplete: true,
      date: Date(Date.now()).toString()
    },
    {
      title: 'end',
      isComplete: false,
      date: Date(Date.now()).toString()
    }
  ]

  const posts = [
    {
      title: "post 1",
      date: Date(Date.now()).toString(),
      symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png",
      comment_count: 5,
    },
    {
      title: "post 1",
      date: Date(Date.now()).toString(),
      symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png",
      comment_count: 5,
    },
    {
      title: "post 1",
      date: Date(Date.now()).toString(),
      symbol: "https://cdn4.iconfinder.com/data/icons/must-have-outline/100/objects-29-512.png",
      comment_count: 5,
    }
  ] 

  const NodeBar = ({nodes}) => {
    return (
      <Grid item xs={12}>
        <Stepper >
          {nodes.map((node, index) => {
    
            return (
              <Step key={index} >
                <StepLabel className={node.isComplete ? 'completed-node' : 'uncompleted-node'} />
              </Step>
            );
          })}
        </Stepper>
      </Grid>
    )
  }
  
  const QuestList = ({posts}) => {
    return (
      <div>
        {
          posts.map((post, index) => (
            <QuestListItem title={post.title} date={post.date} symbol={post.symbol} comment_count={post.comment_count} index={index} />
          ))
        }
  
        <CreatePostBtn />

      </div>
    )
  }
  
  const QuestListItem = ({title, date, symbol, comment_count}) => {
    return (
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
        <img src={symbol} alt={title}/>
        <p>{comment_count}</p>
      </div>
    )
  }
  return (
    <>
    <NavForApp nav_title='QUEST' state={state} quests={quests} party_quests={party_quests}/>
    <Grid container >
      <Grid className='container-left' item sm={5}>
        <p>Hello</p>
      </Grid>

      <Grid className='container-right' item xs={12} sm={7} >
      <button onClick={()=>history.push({pathname:"/hall", state: {global:state, quests:quests, party_quests: party_quests}})}>Go Back</button>
        <NodeBar nodes={nodes} />
        <QuestList posts={posts}/>
        
      </Grid>
    </Grid>
    </>
  );
}