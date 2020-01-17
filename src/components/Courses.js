import React from "react";
import { Button } from "rbx";
import {
   buttonColor,
   getCourseTerm,
   getCourseNumber,
   timeParts
 } from "./utils";
 import db from "./firebase";
 import { hasConflict } from "./time";

 const Course = ({ course, state, user }) => (
   <Button
     color={buttonColor(state.selected.includes(course))}
     onClick={() => state.toggle(course)}
     onDoubleClick={user ? () => moveCourse(course) : null}
     disabled={hasConflict(course, state.selected)}
   >
     {getCourseTerm(course)} CS {getCourseNumber(course)}: {course.title}
   </Button>
 );

 const saveCourse = (course, meets) => {
   db.child("courses")
     .child(course.id)
     .update({ meets })
     .catch(error => alert(error));
 };

 const moveCourse = course => {
   const meets = prompt("Enter new meeting data, in this format:", course.meets);
   if (!meets) return;
   const { days } = timeParts(meets);
   if (days) saveCourse(course, meets);
   else moveCourse(course);
 };

 export default Course;