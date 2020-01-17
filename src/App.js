import "rbx/index.css";
import { Button, Container, Message, Title } from "rbx";
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Courses from './components/Courses';
import CourseList from "./components/CourseList";
 import { timeParts } from "./components/utils";
 import db from "./components/firebase";

 const uiConfig = {
  signInFlow: "popup",
 signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
 callbacks: {
   signInSuccessWithAuthResult: () => false
 }
};
const Banner = ({ user, title }) => (
 <React.Fragment>
   {user ? <Welcome user={user} /> : <SignIn />}
   <Title>{title || "[loading...]"}</Title>
 </React.Fragment>
);
const Welcome = ({ user }) => (
 <Message color="info">
   <Message.Header>
     Welcome, {user.displayName}
     <Button primary onClick={() => firebase.auth().signOut()}>
       Log out
     </Button>
   </Message.Header>
 </Message>
);
const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});
const addScheduleTimes = schedule => ({
 title: schedule.title,
 courses: Object.values(schedule.courses).map(addCourseTimes)
});
const App = () => {
 const [schedule, setSchedule] = useState({ title: "", courses: [] });
 const [user, setUser] = useState(null);
 useEffect(() => {
   const handleData = snap => {
     if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
   };
   db.on("value", handleData, error => alert(error));
   return () => {
     db.off("value", handleData);
   };
 }, []);
 useEffect(() => {
   firebase.auth().onAuthStateChanged(setUser);
 }, []);
 return (
   <Container>
     <Banner title={schedule.title} user={user} />
     <CourseList courses={schedule.courses} user={user} />
   </Container>
  );
};
export default App;