const Treasure = (props: {
  data: {
    status: string,
    items: string[];
  },
  deleteHandler: () => void,
},
) => {
  return (
    <div className="Treasure">
      <div className="name">
        TREASURE - {props.data.status}
        <button onClick={props.deleteHandler}>X</button>
      </div>
      <div className="items">
        <div>
          {props.data.items.map((item) =>
            <span>{item}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Treasure;