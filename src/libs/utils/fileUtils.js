import ArrayUtils from "./ArrayUtils";

const imgExtensions = ["png", "jpg", "jpeg"];
const wordExtensions = ["doc", "docx"];
const excelExtensions = ["xls", "xlsx"];
const pptExtensions = ["ppt", "pptx"];
const pdfExtensions = ["pdf"];
const rarExtensions = ["rar","zip"];
const txtExtensions = ["txt"];

function getFileType(name) {
  let extension = getExtension(name);
  if (!extension) return "other";
  if (ArrayUtils.oneOf(extension, imgExtensions)) {
    return "picture";
  } else if (ArrayUtils.oneOf(extension, wordExtensions)) {
    return "word";
  } else if (ArrayUtils.oneOf(extension, excelExtensions)) {
    return "excel";
  } else if (ArrayUtils.oneOf(extension, pptExtensions)) {
    return "ppt";
  } else if (ArrayUtils.oneOf(extension, pdfExtensions)) {
    return "pdf";
  } else if (ArrayUtils.oneOf(extension, rarExtensions)) {
    return "rar";
  } else if (ArrayUtils.oneOf(extension, txtExtensions)) {
    return "txt";
  }
  else {
    return "other";
  }
};

function getExtension(name) {
  if (!name) return null;
  let dotIndex = String.prototype.lastIndexOf.call(name, ".");
  if (dotIndex > -1) {
    return name.substr(dotIndex + 1, name.length);
  }
  return null;
};

export default {
  getFileType
}
