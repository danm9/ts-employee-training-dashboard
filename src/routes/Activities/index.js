import { Component } from "preact";
import style from "./style.css";
import { Sidebar } from "../../components/sidebar";
import ActivityCard from "../../components/activitycard";

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

import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";

/**
 * Your Component
 */
export function card({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.CARD, text },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}
export default class Activities extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className={style.column}>
          {[
            {
              name: "React Training",
              description:
                "Today I'm working on getting my development environment setup and working on various debug tasks",
              position: "CNST"
            },
            {
              name: "Clean Coder",
              description:
                "Today I'm working on getting my development environment setup and working on various debug tasks",
              position: "QUAL"
            },
            {
              name: "MVC PluralSight Training",
              description:
                "Today I'm working on getting my development environment setup and working on various debug tasks",
              position: "CNST"
            },
            {
              name: "Code Reviews",
              description:
                "Today I'm working on getting my development environment setup and working on various debug tasks",
              position: "QUAL"
            }
          ].map(i => {
            return (
              <Card
                className
                name={i.name}
                description={i.description}
                position={i.position}
                commentCount={i.commentCount || "0"}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
