import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/Button";

interface NameDialogProps {
  isOpen: boolean;
  placeholder: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export const NameDialog = ({ isOpen, placeholder, onSubmit, onCancel }: NameDialogProps) => {
  const { t } = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      inputRef.current?.focus();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  const handleCancel = () => {
    onCancel();
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="rounded-lg bg-white dark:bg-slate-800 shadow-2xl w-full max-w-md p-0 border-0 backdrop:bg-black/50 m-auto"
    >
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {t.enterBankName}
        </h2>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />
        <div className="flex gap-3 justify-end">
          <Button
            variant="default"
            onClick={handleCancel}
            className="text-sm"
          >
            {t.cancel}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="text-sm"
          >
            {t.compare}
          </Button>
        </div>
      </div>
    </dialog>
  );
};
