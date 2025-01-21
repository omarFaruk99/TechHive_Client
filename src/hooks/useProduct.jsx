import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  const axiosPublic = useAxiosPublic();
  const { data: product = [], refetch } = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      console.log("from useProducts>>>>>>>>>", res);
      return res.data;
    },
  });
  return [product, refetch];
};

export default useProduct;
