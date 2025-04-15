"use client";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { useSession } from "next-auth/react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const url =
  process.env.NODE_ENV === "production"
    ? "https://campushome.vercel.app/"
    : "http://localhost:3000";

const authenticator = async () => {
  try {
    const response = await fetch(`${url}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication problem: ${error.message}`);
    }
    throw new Error("Authentication problem: Unknown error occurred");
  }
};

interface UploadedFile {
  filePath: string;
  url: string;
}

const ImageUpload = ({
  onFilesChange,
}: {
  onFilesChange: (filePaths: string[]) => void;
}) => {
  const IKUploadRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { data: session } = useSession();

  const onError = (error: { message: string }) => {
    setIsUploading(false);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSuccess = (res: { filePath: string; url: string }) => {
    setFiles((prev) => [...prev, res]);
    onFilesChange([...files.map((f) => f.filePath), res.filePath]);
    setIsUploading(false);
    toast.success("Image uploaded successfully");
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles.map((f) => f.filePath));
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (IKUploadRef.current && !session) {
      toast.error("You must be logged in to create a listing");
      setIsUploading(true);
      IKUploadRef.current.click();
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="space-y-4">
        {/* Hidden upload input */}
        <IKUpload
          className="hidden"
          ref={IKUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          fileName={`listing-${Date.now()}`}
          useUniqueFileName={true}
          folder="/listings"
          isPrivateFile={false}
          multiple // Enable multiple file uploads
        />

        {/* Upload button */}
        <button
          onClick={handleUploadClick}
          disabled={isUploading || !session}
          className="flex items-center justify-center border-2 border-dashed rounded-lg p-4 gap-2 w-full hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Upload size={20} />
          <span className="text-gray-600">
            {isUploading ? "Uploading..." : "Click to upload images"}
          </span>
        </button>
        <p className="text-sm text-gray-500">
          {!session ? (
            <p className="text-red-400">
              Login and set up your profile to create a listing
            </p>
          ) : (
            <p>Upload product photos (multiple allowed)</p>
          )}
        </p>

        {/* Preview area */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {files.map((file, index) => (
            <div key={file.filePath} className="relative group">
              <IKImage
                alt={`Listing image ${index + 1}`}
                path={file.filePath}
                transformation={[
                  {
                    height: 200,
                    width: 200,
                    crop: "maintain_ratio",
                  },
                ]}
                className="rounded-md object-cover h-full w-full"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ImageKitProvider>
  );
};

export default ImageUpload;
