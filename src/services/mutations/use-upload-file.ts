import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosProgressEvent, AxiosResponse, CancelTokenSource } from "axios";
import { api } from "../api";


interface Response {
    success: boolean
}

interface UseUploadFileData {
    formData: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource
}

export const fetchUploadFile = async (
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource,
    formData: FormData,
) => {
    return api.post<Response>(
        `/upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress,
            cancelToken: cancelSource.token,
        }
    );
};

export const useUploadFileMutation = (
    options?: UseMutationOptions<AxiosResponse<Response>, AxiosError, UseUploadFileData>
) => useMutation<AxiosResponse<Response>, AxiosError, UseUploadFileData>({
    ...options,
    mutationKey: ['upload-file'],
    mutationFn: (data) => fetchUploadFile(data.onUploadProgress, data.cancelSource, data.formData),
})
