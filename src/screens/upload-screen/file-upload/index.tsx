import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { TableIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUploadFileMutation } from "@/services/mutations/use-upload-file";
import { FileUploadProgress, getFileIconAndColor } from "@/types";

export function ImageUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  const publishFile = useUploadFileMutation();

  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource,
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
    );

    if (progress === 100) {
      setUploadedFiles((prevUploadedFiles) => {
        return [...prevUploadedFiles, file];
      });

      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.File !== file);
      });

      return;
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        if (item.File.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          };
        } else {
          return item;
        }
      });
    });
  };

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File !== file);
    });

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item !== file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilesToUpload((prevUploadProgress) => {
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {
          return {
            progress: 0,
            File: file,
            source: null,
          };
        }),
      ];
    });

    const fileUploadBatch = acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append("csv", file);

      const cancelSource = axios.CancelToken.source();

      return publishFile.mutate({
        formData,
        cancelSource,
        onUploadProgress: (progressEvent) =>
          onUploadProgress(progressEvent, file, cancelSource),
      });
    });

    try {
      await Promise.all(fileUploadBatch);
      alert("All files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    validator(file) {
      if (file.type !== "text/csv") {
        alert("Apenas arquivos CSV");
        return {
          code: "file-invalid-type",
          message: "File must be a CSV file",
        };
      }

      return null;
    },
  });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full h-[300px] py-6 border-2 border-dashed rounded-lg cursor-pointer bg-white-20 hover:bg-white-50 "
        >
          <svg
            className="w-10 h-10 mx-auto"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
              stroke="#4F46E5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="mt-3 text-slate-700 max-w-xs mx-auto">
            Click to{" "}
            <span className="font-medium text-indigo-600">
              Upload your file
            </span>{" "}
            or drag and drop your file here
          </p>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="txt/csv"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <ul className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => {
                return (
                  <li
                    key={fileUploadProgress.File.lastModified}
                    className="border rounded-lg"
                  >
                    <div className="flex items-start justify-between p-4">
                      <div className="space-y-2">
                        <TableIcon />
                        <h4 className="text-gray-800 font-semibold">
                          {getFileIconAndColor(fileUploadProgress.File).icon}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {fileUploadProgress.File.name.slice(0, 25)} -{" "}
                          {fileUploadProgress.progress}%
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (fileUploadProgress.source)
                            fileUploadProgress.source.cancel(
                              "Upload cancelled",
                            );
                          removeFile(fileUploadProgress.File);
                        }}
                        className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100"
                      >
                        Cancelar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <ul className="space-y-2 pr-3">
            {uploadedFiles.map((file) => {
              return (
                <li key={file.name} className="border rounded-lg unstyled">
                  <div className="flex items-start justify-between p-4">
                    <div className="space-y-2">
                      <TableIcon />
                      <h4 className="text-gray-800 font-semibold">
                        {file.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{file.size}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
