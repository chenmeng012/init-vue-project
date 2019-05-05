import _result from "lodash.result";
import cloneDeep from "lodash.clonedeep";
const get = (object, path, defaultValue) => {
  return _result(object, path, defaultValue);
};

const _ = {
  get,
  cloneDeep
};
export default _;
