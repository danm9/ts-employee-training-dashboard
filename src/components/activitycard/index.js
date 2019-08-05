import style from "./style.css";

const ActivityCard = props => {
  const {
    title,
    description,
    comments,
    position,
    options,
    currentOption,
    handleOptionChanged,
    item,
    currentColumn,
    handleClickDelete
  } = props;
  return (
    <div className={style.cardContainer}>
      <div className={style.cardGrid}>
        <div className={style.cardHeader}>
          <h1>{title}</h1>
          <h3>{position}</h3>
          <button
            onClick={e => {
              handleClickDelete(item, currentColumn);
            }}
          >
            XXX
          </button>
        </div>
        <div className={style.cardSeperator} />
        <div className={style.cardBody}>
          <p>{description}</p>
        </div>
        <div className={style.cardSeperator} />
        <div className={style.cardFooter}>
          <button>{comments || "0"} Comments</button>
          <select
            onChange={e => {
              console.log(item);
              handleOptionChanged(e.target.value, item, currentColumn);
            }}
          >
            {options.map(option => {
              return (
                <option
                  selected={currentOption === option.value}
                  value={option.value}
                >
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
