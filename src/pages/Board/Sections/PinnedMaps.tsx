import Map from "../../../components/Map/Map";
import useMapStore from "../../../store/useMapStore";


const PinnedMaps = () => {
  const [maps] = useMapStore((state) => [state.maps]);
  const pinned_maps = maps.reduce((results: any[], item: any) => {
    if (item.isPinned) results.push(item);
    return results;
  }, []);

  return (
    <div className="PinnedMaps">
      {
        pinned_maps.map((map) =>
          <Map
            data={map}
          />)
      }
    </div>
  );
};

export default PinnedMaps;