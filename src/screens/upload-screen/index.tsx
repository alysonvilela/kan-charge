import { ImageUpload } from "./file-upload";

export const UploadScreen = () => {
  return (
    <section className="px-4 md:px-0 pt-16 w-full">
      <div className="max-w-md pb-16">
        <h1 className="text-slate-800 text-xl font-extrabold sm:text-2xl">
          Adicione os seus clientes
        </h1>
        <p className="text-slate-600 mt-2">
          Ao adicionar uma list de clientes, processamos o dado e enviamos um
          email contendo o boleto referente ao proximo pagamento.
        </p>
      </div>

      <ImageUpload />
    </section>
  );
};
