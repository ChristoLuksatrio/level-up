import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import NavForApp from "../components/NavForApp";
import StateContext from '../Context';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(50),
    height: theme.spacing(50),
  }
}));

const achievements = [
  {
    id:1,
    title: 'The Great Novigrad Heist',
    start_date: '10 June',
    end_date: '11 June',
    status: 'success'
  },
  {
    id:2,
    title: 'The Great Novigrad Heist',
    start_date: '10 June',
    end_date: '11 June',
    status: 'fail'
  },
  {
    id:3,
    title: 'The Great Novigrad Heist',
    start_date: '10 June',
    end_date: '11 June',
    status: 'in-progress'
  }
]

const HistoryMock = () => {
  return (
  <div>
    <button>Go Back</button>
    <p>Success</p>
    <p>Your Story</p>

  </div>
  )
}

export default function Legacy(props) {
  const classes = useStyles();
  let history=useHistory();
  let state = useContext(StateContext);
  if(!props.location.state){
    history.push('/');
  }
  if(props.location.state)
  {
    state = props.location.state;
    console.log(props);
  }
  
  console.log(`Legacy state ${state.firstName} ${state.lastName}`);

  return (
    <>
    <NavForApp nav_title="LEGACY" state={state}/>
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={6} md={6}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="https://img.favpng.com/2/14/7/accelerated-mobile-pages-one-call-away-responsive-web-design-non-governmental-organisation-png-favpng-kpXLYqN4PqkrrtxZxiZa8FLCW.jpg"/>
        <Typography component="h1" variant="h4">
          Your Legacy
        </Typography>
        <Typography component="h1" variant="h6">
          Your Name: {state.firstName} {state.lastName}
        </Typography>
        <Typography component="h1" variant="h6">
         TITLE: {state.title}
        </Typography>
      </div>
   </Grid>
   <Grid item xs={false} sm={6} md={6}>
      {/* <HistoryMock /> */}
      {
      achievements.map((achievement, index) => (
      <button onClick={()=>history.push({pathname:`/legacy/history/${achievement.id}`,state:state})}>
        <p>{achievement.title}</p>
        <p>{achievement.start_date}-{achievement.end_date}</p>
        <p>{achievement.status}</p>
      </button>
    ))}
    </Grid>
   </Grid>
   </>
  );
}
