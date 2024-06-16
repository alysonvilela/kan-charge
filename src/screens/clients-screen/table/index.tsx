import { Pagination } from "./_pagination"
import { useTableViewModel } from "./_container"

enum EChargeStatus {
    "EMAIL-SENT",
    "PROCESSED",
    "BILLET-CREATED",
}

type IChargeStatus = keyof typeof EChargeStatus

type ChargeStatusTranslation<T> = {
    [k in IChargeStatus]: T
}

const chargeLabel: ChargeStatusTranslation<{
    color: string
}> = {
    "EMAIL-SENT": {
        color: "text-green-600 bg-green-50",
    },
    "PROCESSED": {
        color: "text-blue-600 bg-blue-50",
    },
    "BILLET-CREATED": {
        color: "text-pink-600 bg-pink-50",
    },
}


export const ChargedTable = () => {
    const {
        response,
        page
    } = useTableViewModel()

    if (response.isFetching) {
        return <div>...Loading</div>
    }

    if (!response.data) {
        return (
            <div className="w-full h-[300px] rounded-lg border-2 border-dashed flex items-center justify-center mb-16">
                <p className="text-slate-600 mt-2">Não há registros</p>
            </div>
        )
    }

    return (
        <div className="relative h-max overflow-auto">
            <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 pr-6">Nome</th>
                        <th className="py-3 pr-6">Valor da cobrança</th>
                        <th className="py-3 pr-6">Status</th>
                        <th className="py-3 pr-6"></th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {
                        response.data.data.map(({ id, name, debtAmount, }) => (
                            <tr key={id}>
                                <td className="pr-6 py-4 whitespace-nowrap">{name}</td>
                                <td className="pr-6 py-4 whitespace-nowrap">{debtAmount}</td>

                                <td className="pr-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-2 rounded-full font-semibold text-xs ${"Active" == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                        Ativo
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination currentPage={page.currentPage} canNext={page.CAN_NEXT} canPrev={page.CAN_PREV} lastPage={page.lastPage} />
        </div>
    )
}