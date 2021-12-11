import lighten from "polished/lib/color/lighten";
import { BASE_COLOR } from "../palette";

export const button: React.CSSProperties = {
  appearance: "none",
  padding: "14px 28px",
  border: 0,
  color: "white",
  backgroundColor: lighten(0.1, BASE_COLOR),
  borderRadius: 10,
  fontSize: 20,
  fontWeight: "bold",
  fontFamily: "Jelle",
  borderBottom: "3px solid " + BASE_COLOR,
};
