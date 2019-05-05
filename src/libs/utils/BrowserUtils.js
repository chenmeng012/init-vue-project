import {DEFAULT_WINDOW_TITLE} from "../../config/app";

function setTitle(title) {
  title = title || DEFAULT_WINDOW_TITLE;
  window.document.title = title;
}

export default {
  setTitle
}
