import { Component } from "preact";
import style from "./style.css";
import { Sidebar } from "../../components/sidebar";
import ActivityCard from "../../components/activitycard";
import React from "react";

const Card = props => {
  const {
    item,
    name,
    description,
    commentCount,
    position,
    options,
    currentColumn,
    handleOptionChanged
  } = props;
  return (
    <ActivityCard
      title={name}
      description={description}
      comments={commentCount}
      position={position}
      options={options}
      currentOption={currentColumn}
      handleOptionChanged={handleOptionChanged}
      item={item}
      currentColumn={currentColumn}
    />
  );
};
/**
 *
 * @param {Number} id
 * @param {String} name
 * @param {String} description
 * @param {Number} commentCount
 * @param {String} position
 */
const CardItem = (id, name, description, commentCount, position) => {
  let card = new Object();
  card.name = name;
  card.id = id;
  card.description = description;
  card.commentCount = commentCount;
  card.position = position;
  return card;
};

export default class Activities extends Component {
  constructor(props) {
    super(props);
    // Note: Card names MUST have a unique id otherwise they won't work.
    this.state = {
      columns: [
        {
          id: "todo",
          name: "Todo",
          cards: [CardItem(1, "test card", "some description", 20, "EST")]
        },
        {
          id: "doing",
          name: "Doing",
          cards: [
            CardItem(2, "test card", "some description", 20, "EST"),
            CardItem(3, "test card", "some description", 20, "EST")
          ]
        },
        {
          id: "done",
          name: "Done",
          cards: []
        }
      ]
    };
  }

  createAndFillColumns() {
    return this.state.columns.map(column => {
      return this.dispenseColumn(column);
    });
  }
  /**
   *
   * @param {{ id: String, name: String, cards:Array<CardItem>}} column
   */
  dispenseColumn(column) {
    return (
      <div id={column.id} className={style.column}>
        <h1>{column.name}</h1>
        {column.cards.map(card => {
          return (
            <Card
              item={card}
              name={card.name}
              description={card.description}
              commentCount={card.commentCount}
              position={card.position}
              currentColumn={column.id}
              handleOptionChanged={this.handleOptionChanged.bind(this)}
              options={this.state.columns.map(column => {
                return { value: column.id, name: column.name };
              })}
            />
          );
        })}
      </div>
    );
  }

  handleOptionChanged(option, card, columnName) {
    console.log(card);
    this.removeCard(columnName, card);
    this.addCard(option, card);
  }

  /**
   *
   * @param {String} columnName
   * @param {CardItem} card
   */
  addCard(columnName, card) {
    const { columns } = this.state;
    columns.forEach(e => {
      if (e.id === columnName) {
        console.log(`adding card to column ${e.id}`);
        console.log(card);
        e.cards.push(card);
      }
    });
    this.setState({ columns: columns });
  }
  /**
   *
   * @param {String} columnName
   * @param {Object<CardItem>} card
   */
  removeCard(columnName, card) {
    const { columns } = this.state;
    columns.forEach(e => {
      if (e.id === columnName) {
        e.cards.forEach((c, i) => {
          if (c.id === card.id) {
            console.log(`removing card with id ${card}`);
            e.cards.splice(i, 1);
            console.log(e.cards);
          }
        });
      }
    });
    this.setState({ columns: columns });
  }

  render() {
    const { columns } = this.state;
    return (
      <div>
        <Sidebar />
        <div className={style.columnContainer}>
          {this.createAndFillColumns()}
        </div>
      </div>
    );
  }
}
