import axios from "axios";
import { IProduct } from "./IProduct";
import Papa from "papaparse";
const URL_DATA =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJ8VtTP7xSDDOVy783SLFVUP6yloXgSK9LOq0GoHf_7QtzEeFG-LoRrGoszu4L1D0ehOxao1dsPNZD/pub?output=csv";

const api = {
  list: async (): Promise<IProduct[]> => {
    return axios.get(URL_DATA, { responseType: "blob" }).then(
      (response) =>
        new Promise<IProduct[]>((resolve, reject) => {
          Papa.parse(response.data, {
            header: true,
            complete: (results) => {
              const products = results.data as IProduct[];

              return resolve(
                products.map((product) => ({
                  ...product,price:Number(product.price)
                })),
              );
            },
            error: (error) => reject(error.message),
          });
        })
    );
  },
};

export default api;
