const prod = {
  url: {
    API_BASE_URL: "http://13.50.136.196:8080",
  },
};

const dev = {
  url: {
    API_BASE_URL: "http://localhost:8080",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
