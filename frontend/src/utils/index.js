import axios from "axios";

// const server = axios.create({ baseURL: "http://ec2-3-238-67-17.compute-1.amazonaws.com:5000/" });
const server = axios.create({
  baseURL: "se-project-recipe-recommender-production-6299.up.railway.app",
});

export { server };
