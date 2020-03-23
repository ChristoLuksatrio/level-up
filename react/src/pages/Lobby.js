import React, { useState, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

import axios from 'axios';

import NavEmpty from '../components/NavEmpty';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Returns all the quests that contain the relevant user id
let returnUserQuests = async (id) => {
  return await axios.post(`/user_quests`, { user_id: id })
    .then((res) => {
      console.log(res.data)
      return res.data;
    })
}
// Returns all the quests that contain the relevant party_id
let returnPartyQuests = async (party_id) => {
  return await axios.post("/party_quests", { party_id: party_id })
    .then((res) => {
      return res.data
    })
}
// Returns the party members of the current party
let returnPartyMembers = async (party_id) => {
  return await axios.post("/user_party_members", { party_id })
    .then((response) => {
      console.log(response)
      let list = [];
      response.data.forEach(user => {
        list.push({ name: user.name, title: user.title });
      })
      return list;
    })
}

export default function Lobby(props) {
  const state = props.location.state;
  console.log(`New State: ${state}`)
  console.log(`Received email: ${props.location.state.email} and password: ${props.location.state.password}`);

  const classes = useStyles();
  let history = useHistory();
  const [lobbyName, setLobbyName] = useState(null); //Create lobby
  const [lobbyCode, setLobbyCode] = useState(null); //Join Lobby



  // This can be split later on if we get our MVP done but it works fine for now
  async function handleJoinSubmit(event) {
    event.preventDefault();
    console.log(`lobbyname is ${lobbyName}`); //Create lobby
    console.log(`lobbycode is ${lobbyCode}`); //Join Lobby

    // If making Lobby
    if (lobbyName && !lobbyCode) {
      state.lobbyName = lobbyName
      // If joining Lobby
    } else if (lobbyCode && !lobbyName) {
      state.lobbyCode = lobbyCode
    }

    console.log(lobbyCode)

    let party_name = await axios.get(`/parties/${state.lobbyCode}`)
      .then((response) => {
        console.log(response)
        return response.data.party_name
      }).catch((err) => {
        if (err.response.request.status === 404) {
          alert("No lobby matching that code was found")
        } else if (err.response.request.status === 500) {
          alert("An error occurred, please contact the site administrator")
        }
        console.log(err.response)
        return null
      });

    console.log(party_name)

    if (party_name) {

      let quests = await returnUserQuests(state.id)
      console.log(quests)

      console.log(JSON.stringify(quests))

      let full_quests = [];
      let promises = [];
      quests.forEach((quest) => {
        promises.push(axios.get(`quest_object/${quest.id}`)
          .then((response) => {
            full_quests.push(response.data);
          })
        )
      }
      );

      await Promise.all(promises);

      console.log(`Full quests ${JSON.stringify(full_quests)}`);

      let party_quests = await returnPartyQuests(state.party_id)

      console.log(`This is party quests ${JSON.stringify(full_quests)}`)

      let party_full_quests = [];
      let party_promises = [];
      party_quests.forEach((quest) => {
        party_promises.push(axios.get(`quest_object/${quest.id}`)
          .then((response) => {
            party_full_quests.push(response.data);
          })
        )
      }
      );

      await Promise.all(party_promises);

      console.log(`Party full quests ${party_full_quests}`);

      // Set party_id to user defined lobbyCode
      let party_id = lobbyCode;

      console.log("Party id is: ", party_id)

      let party_members = await returnPartyMembers(party_id)
      
      const party_info = {
        id: party_id,
        name: party_name,
        members: party_members
      }
      console.log(`Party Id: ${party_id}, Party Name: ${party_name}, Party Members: ${JSON.stringify(party_members)}`);


      history.push({ pathname: "/hall", state: { global: state, quests: full_quests.sort((a, b) => b.quest.id - a.quest.id), party_quests: party_full_quests.sort((a, b) => b.quest.id - a.quest.id), party_info: party_info } });
    }

  }

  async function handleCreateSubmit(event) {
    event.preventDefault();
    console.log(`lobbyname is ${lobbyName}`); //Create lobby
    console.log(`lobbycode is ${lobbyCode}`); //Join Lobby

    // If making Lobby
    state.lobbyName = lobbyName

    // Creates a party and returns the a party object
    let party = await axios.post(`/parties`,
      {
        mentor_id: state.id,
        number_of_members: 1,
        party_name: lobbyName,
        user_id: state.id
      })
      .then((res) => {
        return res.data;
      })
    console.log(party)

    // Returns all the quests that contain the relevant user id
    let quests = await axios.post(`/user_quests`, { user_id: state.id })
      .then((res) => {
        return res.data;
      })

    console.log(JSON.stringify(quests))

    let full_quests = [];
    let promises = [];
    quests.forEach((quest) => {
      promises.push(axios.get(`quest_object/${quest.id}`)
        .then((response) => {
          full_quests.push(response.data);
        })
      )
    }
    );

    await Promise.all(promises);

    console.log(`Full quests ${JSON.stringify(full_quests)}`);

    let party_quests = await axios.post("/party_quests", { party_id: state.party_id })
      .then((res) => {
        return res.data
      })

    console.log(`This is party quests ${JSON.stringify(full_quests)}`)

    let party_full_quests = [];
    let party_promises = [];
    party_quests.forEach((quest) => {
      party_promises.push(axios.get(`quest_object/${quest.id}`)
        .then((response) => {
          party_full_quests.push(response.data);
        })
      )
    }
    );

    await Promise.all(party_promises);

    console.log(`Party full quests ${party_full_quests}`);

    //Use the returned party ID
    let party_id = party.id
    let party_name = party.party_name

    let party_members = await axios.get("/users")
      .then((response) => {
        let members = response.data.filter(user => user.party_id === party_id);
        let list = [];
        members.forEach(user => {
          list.push({ name: user.name, title: user.title });
        })
        return list;
      })

    console.log(`Party Id: ${party_id}, Party Name: ${party_name}, Party Members: ${JSON.stringify(party_members)}`);

    const party_info = {
      id: party_id,
      name: party_name,
      members: party_members
    }

    history.push({ pathname: "/hall", state: { global: state, quests: full_quests.sort((a, b) => b.quest.id - a.quest.id), party_quests: party_full_quests.sort((a, b) => b.quest.id - a.quest.id), party_info: party_info } });
  }

  return (
    <>
      <NavEmpty />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Join a Lobby
        </Typography>
          <form className={classes.form} onSubmit={handleJoinSubmit} validate="true">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="join-lobby"
              label="Lobby Code"
              name="lobbyCode"
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
              autoComplete="123"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Join Lobby
          </Button>
          </form>
          <form className={classes.form} onSubmit={handleCreateSubmit} validate="true">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lobbyName"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
              label="Lobby Name"
              type="create-lobby"
              id="create-lobby"
              autoComplete="new-lobby"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create New Lobby
          </Button>
          </form>
        </div>
      </Container>
    </>
  );
}