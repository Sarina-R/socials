import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Mail, Twitter, Check, Copy } from "lucide-react";

const ShareModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const link = encodeURIComponent(window.location.href);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg w-80 sm:w-96 shadow-lg transition-transform transform scale-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Share</h3>
          <button className="hover:text-red-600" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={window.location.href}
            readOnly
            className={`w-full p-2 text-sm rounded-md border ${
              copied
                ? "border-green-600 dark:border-green-400"
                : "border-neutral-300 dark:border-neutral-700"
            } bg-neutral-200 dark:bg-neutral-800 focus:outline-none`}
          />
        </div>
        <div className="flex space-x-1 sm:space-x-4">
          <Button
            variant="ghost"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${link}`,
                "_blank"
              )
            }
          >
            <Facebook className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${link}&text=Check%20this%20out!`,
                "_blank"
              )
            }
          >
            <Twitter className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
                "_blank"
              )
            }
          >
            <Linkedin className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            onClick={() =>
              (window.location.href = `mailto:?subject=Check out this page&body=${window.location.href}`)
            }
          >
            <Mail className="w-5 h-5" />
          </Button>

          <Button variant="ghost" className="m-auto" onClick={handleCopyLink}>
            {copied ? (
              <Check className="w-5 h-5 m-auto text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
