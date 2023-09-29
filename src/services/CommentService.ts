import { Product } from "../definitions";
import { instances } from "./BaseService";

const { baseApiInstance } = instances;

const COMMENTS_URL = "comments";

const getCommentsForProduct = (id: string) => {
  return baseApiInstance.get(`${COMMENTS_URL}/post/${id}`)
      .then(res => res.data.comments);
};


export const CommentService = {
    getCommentsForProduct
};
