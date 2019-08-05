import { Component } from "preact";
import axios from "axios";
import style from "./style.css";
import { Sidebar } from "../../components/sidebar";
import ActivityCard from "../../components/activitycard";
import React from "react";
import { parse } from "../../parse/parse.config";
import {
  receiveCard,
  findCard,
  updateCard,
  deleteCard
} from "../../parse/functions";

const Card = props => {
  const {
    item,
    name,
    description,
    commentCount,
    position,
    options,
    currentColumn,
    handleOptionChanged,
    handleClickDelete
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
      handleClickDelete={handleClickDelete}
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
            CardItem(3, "test card", "some description", 20, "EST"),
            CardItem(4, "test card", "some description", 20, "EST"),
            CardItem(5, "test card", "some description", 20, "EST"),
            CardItem(6, "test card", "some description", 20, "EST")
          ]
        },
        {
          id: "done",
          name: "Done",
          cards: []
        }
      ],
      positions: ["Todo", "Doing", "Done"]
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
              handleClickDelete={this.handleClickDelete.bind(this)}
            />
          );
        })}
      </div>
    );
  }

  handleOptionChanged(option, card, columnName) {
    this.removeCard(columnName, card);
    this.addCard(option, card);
    findCard(card).then(obj => {
      const cardId = obj[0].id;
      updateCard(cardId, option);
    });
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

  handleClickDelete(card, columnName) {
    console.log(card);
    findCard(card).then(obj => {
      const cardid = obj[0].id;
      deleteCard(cardid);
    });

    this.removeCard(columnName, card);
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmitForm = event => {
    event.preventDefault();

    const { cardName, cardDescription, cardPosition } = this.state;

    const numberGenerator =
      Math.floor(Math.random() * 9000000000000000000) +
      1000000000000000000 * Math.random();

    axios({
      method: "post",
      url: parse.url + "functions/card",
      headers: {
        "X-Parse-Application-id": parse.appId,
        "X-Parse-REST-API-Key": parse.cKey,
        "Content-Type": "application/json"
      },
      data: {
        name: this.state.cardName,
        desc: this.state.cardDescription,
        position: this.state.cardPosition || "todo",
        user: parse.userPointer
      }
    });

    const columns = this.state.columns;

    if (!cardPosition || cardPosition === "todo" || cardPosition === "Todo") {
      columns[0].cards.push(
        CardItem(numberGenerator, cardName, cardDescription, 20, "EST")
      );
    }

    if (cardPosition === "doing" || cardPosition === "Doing") {
      columns[1].cards.push(
        CardItem(numberGenerator, cardName, cardDescription, 20, "EST")
      );
    }

    if (cardPosition == "done" || cardPosition == "Done") {
      columns[2].cards.push(
        CardItem(numberGenerator, cardName, cardDescription, 20, "EST")
      );
    }

    this.setState({ cardPosition: "Todo" });

    this.setState({ columns });
    document.getElementById("formId").reset();
  };

  componentDidMount() {
    receiveCard().then(cards => {
      const list = [];
      const todoList = [];
      const doingList = [];
      const doneList = [];
      cards.map((card, index) => {
        const column = {};
        const { name, desc, position } = card.attributes;
        if (position === "todo" || position === "Todo") {
          const todoCard = CardItem(index, name, desc, 20, "EST");
          todoList.push(todoCard);
        }

        if (position === "doing" || position === "Doing") {
          const doingCard = CardItem(index, name, desc, 20, "EST");
          doingList.push(doingCard);
        }

        if (position === "done" || position === "Done") {
          const doneCard = CardItem(index, name, desc, 20, "EST");
          doneList.push(doneCard);
        }
      });

      list.push({
        id: "todo",
        name: "Todo",
        cards: todoList
      });

      list.push({
        id: "doing",
        name: "Doing",
        cards: doingList
      });

      list.push({
        id: "done",
        name: "Done",
        cards: doneList
      });

      this.setState({ columns: list });
    });
  }

  render() {
    const { columns, positions } = this.state;
    return (
      <div>
        <Sidebar />
        <div className={style.columnContainer}>
          {this.createAndFillColumns()}
        </div>
        <form
          onSubmit={this.handleOnSubmitForm}
          style="margin-left: 200px; margin-top: 0px; float: left;"
          id="formId"
        >
          <input
            type="text"
            placeholder="Name"
            onChange={this.handleInputChange}
            name="cardName"
          />{" "}
          <br />
          <input
            type="text"
            placeholder="description"
            onChange={this.handleInputChange}
            name="cardDescription"
          />{" "}
          <br />
          <select name="cardPosition" onChange={this.handleInputChange} id="">
            {positions.map(x => {
              return (
                <option selected={positions[0] == x} value={x}>
                  {x}
                </option>
              );
            })}
          </select>
          <input
            type="submit"
            onChange={this.handleOnSubmitForm}
            value="Submit"
          />
        </form>
      </div>
    );
  }
}
