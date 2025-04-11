"use client";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/imagekit");
    console.log(response);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication problem: ${error.message}`);
    }
    throw new Error("Authentication problem: Unknown error occurred");
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  interface ErrorResponse {
    message: string;
    [key: string]: unknown;
  }

  const onError = (error: ErrorResponse) => {
    toast.error(`an error occured: ${error} `);
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image upload successfull");
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          if (IKUploadRef.current) {
            IKUploadRef.current?.click();
          }
        }}
        className="flex items-center justify-center border py-2 gap-4"
      >
        <Upload />
        <p className="text-base teaxt-gray-500">Upload a file</p>
      </button>
      <p>Upload your profile photo</p>
      {file && <p className="">{file.filePath}</p>}
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={200}
          height={200}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
