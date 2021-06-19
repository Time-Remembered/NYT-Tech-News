import axios from "axios";

const API = {
    get: (page: number) => {
       return axios
        .get(
          `${process.env.REACT_APP_API}?q=${process.env.REACT_APP_QUERY}&page=${
            page ? page : 1
          }&api-key=${process.env.REACT_APP_KEY}`
        )
    },
};

export default API;