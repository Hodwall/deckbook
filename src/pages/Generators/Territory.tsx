const Territory = (props: {
  data: {
    name: string,
    landmark: string,
    lairs: {
      name: string,
      visibility: string;
    }[],
    locations: {
      name: string,
      visibility: string,
      description: string;
    }[];
  };
  deleteHandler: () => void,
}) => {
  return (
    <div className="Territory">
      <div className="name">
        {props.data.name}
        <button onClick={props.deleteHandler}>X</button>
      </div>
      {/* <div className="hazard-level">HAZARDOUS</div> */}
      {/* <div className="landmark"><span>LANDMARK</span>{props.data.landmark}</div> */}
      <div className="lairs">
        {props.data.lairs.map((lair) =>
          <div>
            <span>{lair.name} lair</span>
            <span className={lair.visibility}>{lair.visibility}</span>
          </div>
        )}
      </div>
      <div className="locations">
        {/* <span>LOCATIONS</span> */}
        {props.data.locations.map((location) =>
          <div className="location">
            <div>
              <span>{location.name}</span>
              <span className={location.visibility}>{location.visibility}</span>
            </div>
            <div>{location.description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Territory;