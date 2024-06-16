import { Link } from "react-router-dom"

interface PaginationProps {
    currentPage: number
    lastPage: number
    canNext: boolean
    canPrev: boolean
}
export const Pagination = ({ currentPage, lastPage, canNext, canPrev }: PaginationProps) => {
    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
            <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
                <Link
                    to={`../${canPrev ? currentPage - 1 : currentPage}`}
                    className="hover:text-indigo-600 flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                    </svg>
                    Anterior
                </Link>
                <Link
                    to={`../${(canNext ? currentPage + 1 : currentPage)}`}
                    className="hover:text-indigo-600 flex items-center gap-x-2">
                    Próximo
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
            {/* On mobile version */}
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
                <Link
                    to={`../${canPrev ? currentPage - 1 : currentPage}`} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Anterior</Link>
                <div className="font-medium">
                    Página {currentPage} de {lastPage}
                </div>
                <Link
                    to={`../${(canNext ? currentPage + 1 : currentPage)}`} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Próximo</Link>
            </div>
        </div>
    )
}