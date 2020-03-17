import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PartyBtn from './PartyBtn';
import QuestInfoBtn from './QuestInfoBtn';
import { useHistory } from "react-router-dom";
import { Hidden } from '@material-ui/core';
import './NavForApp.scss'
import logo from "../images/nav-logo.png";
import axios from 'axios';

export default function NavForApp(props){
  let history = useHistory();
  const state = props.state

  function loadQuests(){
    return axios.get("/quests")
    .then((res)=>{
      const yourQuests = res.data.filter(quest => quest.user_id === state.id);
      console.log(`Your quests ${JSON.stringify(yourQuests)}`)
      return yourQuests;
    })
    .then((res)=>{
      history.push({pathname:"/legacy",state:{global: state, quests: res}});
    });
  }

  return(
    <Navbar expand="lg">
      <Hidden smDown>
        <Navbar.Brand onClick={()=>history.push({pathname: "/hall", state: state})}>
        <img src={logo} alt='Level Up Logo' width="30" height="30"  />
        </Navbar.Brand>
      </Hidden>
      {props.nav_title === 'HALL' ? <PartyBtn /> : <></>}
      {props.nav_title === 'QUEST' ? <QuestInfoBtn /> : <></>}
      <Navbar.Brand >{props.nav_title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={loadQuests}>Legacy</Nav.Link>
            <Nav.Link onClick={()=>history.push({pathname: "/hall", state: state})}>Hall</Nav.Link>
            <Nav.Link onClick={()=>history.push("/")}
            >Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
  }