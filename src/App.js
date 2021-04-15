import React, { useState } from "react";

import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
import Button from "./components/UI/Button/Button";
import "./App.css";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    { text: "Do all exercises!", id: "g1" },
    { text: "Finish the homework.", id: "g2" },
  ]);

  const [localStorageExists, setLocalStorageExists] = useState(
    localStorage.getItem("ToDoList") ? true : false
  );

  const addGoalHandler = enteredText => {
    setCourseGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({
        text: enteredText,
        id: `g${prevGoals.length + 1}`,
      });
      return updatedGoals;
    });
  };

  const deleteItemHandler = goalId => {
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
    });
  };

  const saveToLocal = () => {
    if (courseGoals.length > 0) {
      localStorage.setItem("ToDoList", JSON.stringify(courseGoals));
      setLocalStorageExists(true);
    }
  };
  const loadFromLocal = () => {
    if (localStorage.getItem("ToDoList"))
      setCourseGoals(JSON.parse(localStorage.ToDoList));
  };
  let content = (
    <p style={{ textAlign: "center" }}>No items found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section id="buttons">
        <Button onClick={saveToLocal}>Save Items</Button>
        <br />
        <Button onClick={loadFromLocal} disabled={!localStorageExists}>
          Load Items
        </Button>
      </section>
      <section id="goal-form">
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">{content}</section>
    </div>
  );
};

export default App;
