import { useState } from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import FeatureCards from "./FeatureCards";
import ThemeToggle from "./ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { validateInput } from "@/utils/encodingUtils";

export default function EncodingConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedEncoding, setSelectedEncoding] = useState("utf8");
  const [isValidInput, setIsValidInput] = useState(true);
  const { toast } = useToast();

  const handleInputChange = (value: string) => {
    setInputText(value);
    setIsValidInput(validateInput(value, selectedEncoding));
  };

  const handleEncodingChange = (value: string) => {
    setSelectedEncoding(value);
    setIsValidInput(validateInput(inputText, value));
  };

  const handleConvertText = () => {
    if (!inputText) {
      toast({
        title: "Please enter some text to convert",
        variant: "destructive"
      });
      return;
    }

    if (!isValidInput) {
      toast({
        title: "Input contains characters that cannot be encoded with the selected encoding",
        variant: "destructive"
      });
      return;
    }

    try {
      let output = "";
      switch (selectedEncoding) {
        case "utf8":
          output = inputText;
          break;
        case "ascii":
          output = Array.from(inputText)
            .map(char => char.charCodeAt(0))
            .join(" ");
          break;
        case "base64":
          output = btoa(unescape(encodeURIComponent(inputText)));
          break;
        case "hex":
          output = Array.from(inputText)
            .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("");
          break;
        case "binary":
          output = Array.from(inputText)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" ");
          break;
        case "url":
          output = encodeURIComponent(inputText);
          break;
      }

      setOutputText(output);
      toast({
        title: "Text converted successfully!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: `Error converting text: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const handleCopyToClipboard = () => {
    if (!outputText) {
      toast({
        title: "Nothing to copy",
        variant: "destructive"
      });
      return;
    }

    navigator.clipboard.writeText(outputText)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          variant: "default"
        });
      })
      .catch(error => {
        toast({
          title: `Failed to copy: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive"
        });
      });
  };

  const handleClearAll = () => {
    setInputText("");
    setOutputText("");
    toast({
      title: "All fields cleared",
      variant: "default"
    });
  };

  const handleSwapTexts = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setIsValidInput(validateInput(outputText, selectedEncoding));
    toast({
      title: "Input and output swapped",
      variant: "default"
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center relative">
        <div className="absolute right-0 top-0">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Text Encoder</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert your text to different encodings like UTF-8, ASCII, Base64, Hex, Binary, and URL encoding
        </p>
      </header>
      
      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Converter Interface */}
          <div className="flex flex-col lg:flex-row gap-6">
            <InputSection 
              inputText={inputText}
              setInputText={handleInputChange}
              selectedEncoding={selectedEncoding}
              setSelectedEncoding={handleEncodingChange}
              isValidInput={isValidInput}
              onConvert={handleConvertText}
            />
            
            <OutputSection 
              outputText={outputText}
              selectedEncoding={selectedEncoding}
              onCopy={handleCopyToClipboard}
              onClear={handleClearAll}
              onSwap={handleSwapTexts}
            />
          </div>
        </div>
      </div>
      
      <FeatureCards />
      
      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Text Encoder Tool &copy; {new Date().getFullYear()} • <a href="#" className="text-primary hover:underline">Privacy Policy</a></p>
      </footer>
    </div>
  );
}
