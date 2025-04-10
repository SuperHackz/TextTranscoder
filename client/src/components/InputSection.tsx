import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

interface InputSectionProps {
  inputText: string;
  setInputText: (value: string) => void;
  selectedEncoding: string;
  setSelectedEncoding: (value: string) => void;
  isValidInput: boolean;
  onConvert: () => void;
}

const encodingDescriptions: Record<string, string> = {
  utf8: "UTF-8: Universal character encoding that can represent any character.",
  ascii: "ASCII: Basic character encoding limited to 128 characters (English alphabet, numbers, symbols).",
  base64: "Base64: Binary-to-text encoding scheme that represents binary data in ASCII format.",
  hex: "Hex: Hexadecimal representation of text (base 16 number system).",
  binary: "Binary: Represents text as a sequence of binary digits (0s and 1s).",
  url: "URL Encoding: Converts characters into a format that can be transmitted over the Internet."
};

export default function InputSection({
  inputText,
  setInputText,
  selectedEncoding,
  setSelectedEncoding,
  isValidInput,
  onConvert
}: InputSectionProps) {
  const [charCount, setCharCount] = useState(0);
  const [showValidation, setShowValidation] = useState(false);

  // Update character count when input text changes
  useEffect(() => {
    setCharCount(inputText.length);
    if (inputText.length > 0) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
    }
  }, [inputText]);

  return (
    <div className="flex-1">
      <div className="mb-4">
        <Label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Input Text
        </Label>
        <div className="relative">
          <Textarea
            id="input-text"
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-gray-200 transition-all"
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {showValidation && (
            <div className="absolute top-2 right-2">
              {isValidInput ? (
                <span className="text-success">
                  <Check className="h-5 w-5" />
                </span>
              ) : (
                <span className="text-destructive">
                  <AlertCircle className="h-5 w-5" />
                </span>
              )}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          Characters: {charCount}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="encoding-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Encoding
          </Label>
          <Select
            value={selectedEncoding}
            onValueChange={setSelectedEncoding}
          >
            <SelectTrigger id="encoding-select" className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Select encoding" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
              <SelectItem value="utf8">UTF-8</SelectItem>
              <SelectItem value="ascii">ASCII</SelectItem>
              <SelectItem value="base64">Base64</SelectItem>
              <SelectItem value="hex">Hex</SelectItem>
              <SelectItem value="binary">Binary</SelectItem>
              <SelectItem value="url">URL Encoding</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button 
            className="w-full bg-primary hover:bg-blue-600 text-white font-medium" 
            onClick={onConvert}
          >
            Convert
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p dangerouslySetInnerHTML={{ __html: encodingDescriptions[selectedEncoding] || encodingDescriptions.utf8 }}></p>
      </div>
    </div>
  );
}
