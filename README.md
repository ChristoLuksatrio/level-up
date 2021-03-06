!['Banner'](https://github.com/begeh/level-up/blob/master/react/public/images/banner.png?raw=true)

# Level-Up

**Level-Up** is peer-based mentor-based skill-learning application. Our application aims to teach users the value of:
- Community skill learning
- Breaking down a skill into steps
- Good criticism
- Viewing failure as progress

Within **Level-Up**, you can:
- Form a Party of 6 passionate learners/teachers that have a skill to share with other members of the Party. 
- Create a Quest to learn a skill where you break down your skill into 5 stages, each with a detailed description of what you want to achieve and a deadline. 
- Assign a Mentor or yourself to determine your progress. 
- Inside your Quest, you can post your progress with Twitter-style posts, where your party members (and Mentor) can provide critique on your progress
- Upon completing your Quest, you get to see your progress written out in a Dungeons-and-Dragons style format so you can look back at your journey with a tinge of story-telling magic!

## Built with 🛠

Front-end:
- [React](https://github.com/facebook/create-react-app): Framework for us to build our pages in components that we can pass props into.
- [Sass](https://sass-lang.com/): Stylesheet language that allows us to use variables and nested rules.
- [Material UI](https://material-ui.com/): UI library for React components
- [Bootstrap](https://getbootstrap.com/): Minimal UI library 

Back-end:
- [Ruby on Rails](https://rubyonrails.org/): Runs on a separate folder as our server where we make API calls to
- [React Router Dom](https://www.npmjs.com/package/react-router-dom): Package that allows us to route our react pages
- [PostgreSQL](https://www.postgresql.org/): For databasing
- [Axios](https://github.com/axios/axios): For us to make API calls from our front to our back

## Setup

```sh
# Run the below on your within react folder

npm install

# Within your react folder (on a separate terminal), run the below to start your app:

npm start

# While in the rails-server folder, enter postgresql and run the following lines to create and connect to the database:

CREATE DATABASE "levelUp-api_development";
\c "levelUp-api_development";

# Open another terminal. Within your rails-server folder, migrate and seed the database with the commands below:

rake db:migrate
rake db:seed

# Within your rails-server folder (on a separate terminal), run the line below to start your server:

rails s

# Afterwards, you can view your app on https://localhost:3000/
# And you are set! Enjoy!

# Note: if you need to reset the database, run the line below in your rails-server folder:

rails db:reset

```

## Screenshots

!['Hall Page'](https://github.com/begeh/level-up/blob/master/react/public/images/Hall%20Page.png?raw=true)
!['Quest Page'](https://github.com/begeh/level-up/blob/master/react/public/images/Quest%20Page.png?raw=true)
!['Post Page'](https://github.com/begeh/level-up/blob/master/react/public/images/Post%20Page.png?raw=true)




