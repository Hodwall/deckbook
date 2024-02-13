const HexMapTool = (props: {
  id: string,
  type: string,
  icon?: any,
  tool: string | undefined,
  setTool: Function,
}) => {
  return (
    <button
      className={`tool-${props.id} ${props.tool === props.id ? 'active' : ''}`}
      onClick={() => props.setTool({ id: props.id, type: props.type })}>
      {props.icon ? <img src={props.icon} /> : <div className="hexmap-tool-label">{props.id}</div>}
    </button>
  );
};

export default HexMapTool;