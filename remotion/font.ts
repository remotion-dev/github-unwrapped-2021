import { continueRender, delayRender } from "remotion";

const font = new FontFace(
  "Jelle",
  "url(https://jonnyburger.s3.eu-central-1.amazonaws.com/Jellee-Bold.woff2)"
);
const handle = delayRender();
font.load().then(() => {
  document.fonts.add(font);
  continueRender(handle);
});

export const getFont = () => font;
