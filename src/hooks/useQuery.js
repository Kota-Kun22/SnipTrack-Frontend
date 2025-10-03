import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

//i have use the new tanstack/react-query syntax here based on that i have made changes in useFetchTotalClicks function
export const useFetchTotalClicks = (token, onError) => {
    return useQuery({
        queryKey: ["url-totalclick"], // Changed: Wrap in array and use queryKey property
        queryFn: async () => { // Changed: Moved to queryFn property
            return await api.get(
                "/api/urls/totalClicks?startDate=2025-09-12&endDate=2025-12-01",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        select: (data) => {
            // data.data =>
            //  {
            //     "2024-01-01": 120,
            //     "2024-01-02": 95,
            //     "2024-01-03": 110,
            //   };
            const convertToArray = Object.keys(data.data).map((key) => ({
                clickDate: key,
                count: data.data[key], // data.data[2024-01-01]
            }));
            // Object.keys(data.data) => ["2024-01-01", "2024-01-02", "2024-01-03"]

            // FINAL:
            //   [
            //     { clickDate: "2024-01-01", count: 120 },
            //     { clickDate: "2024-01-02", count: 95 },
            //     { clickDate: "2024-01-03", count: 110 },
            //   ]
            return convertToArray;
        },
        onError,
        staleTime: 5000 // 5 seconds caching it 
    });
};