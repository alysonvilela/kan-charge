import { CancelTokenSource } from "axios";
import {
  FileImage,
  FolderArchive,
} from "lucide-react";

export interface FileUploadProgress {
  progress: number;
  File: File;
  source: CancelTokenSource | null;
}

enum FileTypes {
  csv = "text/csv",
  Other = "other",
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};


export const getFileIconAndColor = (file: File) => {
  if (file.type.includes(FileTypes.csv)) {
    return {
      icon: <FileImage size={40} className={ImageColor.fillColor} />,
      color: ImageColor.bgColor,
    };
  }

  return {
    icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
    color: OtherColor.bgColor,
  };
};