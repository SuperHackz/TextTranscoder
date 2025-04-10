import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OutputSectionProps {
  outputText: string;
  selectedEncoding: string;
  onCopy: () => void;
  onClear: () => void;
  onSwap: () => void;
}

// Map encoding values to display names
const encodingDisplayNames: Record<string, string> = {
  utf8: "UTF-8",
  ascii: "ASCII",
  base64: "Base64",
  hex: "Hex",
  binary: "Binary",
  url: "URL Encoding"
};

export default function OutputSection({
  outputText,
  selectedEncoding,
  onCopy,
  onClear,
  onSwap
}: OutputSectionProps) {
  return (
    <div className="flex-1">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <Label htmlFor="output-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Converted Output
          </Label>
          <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded-full">
            {encodingDisplayNames[selectedEncoding] || "UTF-8"}
          </Badge>
        </div>
        <div className="relative">
          <Textarea
            id="output-text"
            className="w-full h-64 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Converted text will appear here..."
            value={outputText}
            readOnly
          />
          <div className="absolute bottom-2 right-2">
            <button
              className="text-gray-500 hover:text-primary focus:outline-none focus:text-primary transition-colors"
              onClick={onCopy}
              title="Copy to clipboard"
            >
              <ClipboardCopy className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
          onClick={onClear}
        >
          Clear All
        </Button>
        <Button
          variant="outline"
          className="flex-1 border border-primary text-primary hover:bg-blue-50 font-medium"
          onClick={onSwap}
        >
          Swap Input/Output
        </Button>
      </div>
    </div>
  );
}
