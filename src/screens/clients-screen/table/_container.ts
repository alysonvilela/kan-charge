import { useListClientsQuery } from "@/services/queries/use-list-clients-query"
import { getPaginationStatus, pageSchema } from "@/types/pagination"
import { useParams } from "react-router-dom"

export const useTableViewModel = () => {
    const params = useParams<{
        page: string
    }>()

    const pageParams = pageSchema.parse({
        page: params?.page || "1",
    })

    const response = useListClientsQuery({ page: pageParams.page, pageSize: pageParams.pageSize, enabled: true })

    const { total } = response.data ?? {
        total: 0
    }
    const pageInfo = getPaginationStatus({
        page: pageParams.page,
        pageSize: pageParams.pageSize,
        total,
    })


    return {
        response,
        page: pageInfo
    }
}