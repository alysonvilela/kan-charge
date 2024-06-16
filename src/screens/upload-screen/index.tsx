import { HardDriveUploadIcon, SaveIcon, TableIcon } from "lucide-react"

const integrations = [
    {
        title: "Extensão",
        desc: "Arquivo CSV",
        icon: <TableIcon />

    }, {
        title: "Quantidade de linhas",
        desc: "1.000.01 linhas",
        icon: <HardDriveUploadIcon />

    }, {
        title: "Tamanho",
        desc: "1GB",
        icon: <SaveIcon />
    },
]

export const UploadScreen = () => {

    return (
        <section className="px-4 md:px-0 pt-16 w-full">
            <div className="max-w-md pb-16">
                <h1 className="text-slate-800 text-xl font-extrabold sm:text-2xl">Adicione os seus clientes</h1>
                <p className="text-slate-600 mt-2">Ao adicionar uma list de clientes, processamos o dado e enviamos um email contendo o boleto referente ao proximo pagamento.</p>
            </div>
            <div className="w-full h-[300px] rounded-lg border-2 border-dashed flex items-center justify-center mb-16">
                <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                    <svg className="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p className="mt-3 text-slate-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  file</span> or drag and drop your file here</p>
                </label>
                <input id="file" type="file" className="hidden" />
            </div>


            <div className="mx-auto">
                <div className="max-w-md">
                    <h1 className="text-gray-800 text-xl font-extrabold sm:text-2xl">Sobre seu aquivo</h1>
                </div>
                <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        integrations.map((item) => (
                            <li key={item.title} className="border rounded-lg">
                                <div className="flex items-start justify-between p-4">
                                    <div className="space-y-2">
                                        {item.icon}
                                        <h4 className="text-gray-800 font-semibold">{item.title}</h4>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                    <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100">Connect</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </section>
    )
}