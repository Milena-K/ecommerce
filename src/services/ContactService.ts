import { AxiosResponse } from "axios";
import { ContactFormValues, Product } from "../definitions";
import { instances } from "./BaseService";

const { baseApiInstance } = instances;

const POST_URL = "posts";

const postContactMessage = (data: ContactFormValues): Promise<number> => {
    const dataWithUserId = {...data, userId: 1}
    return baseApiInstance.post(`${POST_URL}/add`, dataWithUserId)
      .then(res => res.status);
};

export const ContactService = {
    postContactMessage,
};
