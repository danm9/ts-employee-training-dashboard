import { Component } from "preact";
import style from "./style.css";
import { Sidebar } from "../../components/sidebar";
import ActivityCard from "../../components/activitycard";
import React from "react";

const Card = props => {
  const { name, description, commentCount, position } = props;
  return (
    <ActivityCard
      title={name}
      description={description}
      comments={commentCount}
      position={position}
    />
  );
};

export default class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          id: "todo",
          name: "Todo"
        }
      ],
      cards: [
        {
          name: "Test",
          column: "todo"
        }
      ]
    };
  }

  render() {
    const { columns } = this.state;
    return (
      <div>
        <Sidebar />

        <div className={style.column}>
          <h1>{columns[0].name}</h1>
          <Card />
        </div>
        <div className={style.column}>
          <Card />
        </div>
      </div>
    );
  }
}
