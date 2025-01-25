import { apiClient } from "@/client/api";
import { getURL } from "@/client/helpers/get-url";
import { useFlowStore } from "@/hooks/local/flow";
import { APIResponseBody } from "@/types/api";
import { FlowComponentSchema } from "@/types/flow";
import { useQuery } from "@tanstack/react-query";

// ******************************
// Fetch all components
// ******************************

export const useGetComponentsTypes = () => {
  const { setLoadingComponentTypes, setComponentTypes } = useFlowStore();

  const getTypesFn = async () => {
    try {
      setLoadingComponentTypes(true);
      const response = await apiClient.get<
        APIResponseBody<FlowComponentSchema>
      >(`${getURL("COMPONENTS_TYPES")}`);
      const data = response?.data;

      // TODO:: check other code, error, message
      setComponentTypes(data?.data);
      return data;
    } catch (error: any) {
      console.error("An error has occurred while fetching types.");
      throw error;
    } finally {
      setLoadingComponentTypes(false);
    }
  };
  const queryResult = useQuery({
    queryKey: ["useGetComponentsTypes"],
    queryFn: getTypesFn,
  });

  return queryResult;
};
