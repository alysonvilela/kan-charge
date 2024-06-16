import { PaginatedParams, PaginatedParamsData } from "@/types/queries";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { api } from "../api";
import { Charge } from "@/types/models/charge-model";

interface UseListClientsQueryParams extends PaginatedParams {
    enabled: boolean
}

const fetchClients = async (page = 1, pageSize = 10) => {
    const { data } = await api.get<PaginatedParamsData<Charge>>('/history', {
        params: {
            page,
            pageSize
        }
    })
    return data
}


export const useListClientsQuery = ({
    page = 1,
    pageSize = 10,
    enabled = false
}: UseListClientsQueryParams) => useQuery({
    queryKey: ['list-clients', String(page), String(pageSize)],
    queryFn: () => fetchClients(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled,
})



