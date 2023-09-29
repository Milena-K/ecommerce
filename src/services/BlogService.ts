import { Post } from "definitions";
import { instances } from "./BaseService";

const { baseApiInstance } = instances;

const POST_URL = "posts";

type PostsResponse = {
  posts: Post[], total:number, skip: number, limit: number
}

const getAllBlogs = async (): Promise<PostsResponse> => {
    return await baseApiInstance.get(`${POST_URL}`).then((res) => res.data)
};

export const BlogService = {
    getAllBlogs,
};
