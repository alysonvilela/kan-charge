import { PaginatedParams, PaginatedParamsData } from "@/types/queries";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"

interface UseListClientsQueryParams extends PaginatedParams {
    enabled: boolean
}

interface ClientData {
    id: number
}


const fetchClients = async (page = 1, pageSize = 10) => {
    const { data } = await axios.get<PaginatedParamsData<ClientData>>('/history', {
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
    queryKey: ['projects', page, pageSize],
    queryFn: () => fetchClients(page),
    placeholderData: keepPreviousData,
    enabled,
})



