import Fuse, { IFuseOptions } from "fuse.js";
import { CategorisedTransaction } from "../../types/types";

const options: IFuseOptions<CategorisedTransaction> = {
  includeScore: true,
  keys: ["description"],
  threshold: 0.05,
};

function loadFuse(data: CategorisedTransaction[]) {
  return new Fuse(data, options);
}

export default loadFuse;
