import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      // console.log("from useProducts>>>>>>>>>", res);
      return res.data;
    },
  });
  return [products, refetch];
};

export default useProduct;
