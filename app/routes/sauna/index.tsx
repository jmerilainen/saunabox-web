import MyMap from "~/components/Map";
import { useParentData } from "../sauna";

export default function SaunaIndex() {
  const { saunas } = useParentData();

  return (
      <div>
        <MyMap id="map" markers={saunas.map(sauna => sauna.location)} />
      </div>
  )
}