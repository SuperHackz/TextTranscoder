import { useState, useCallback } from 'react';
import { validateInput } from '@/utils/encodingUtils';
import { useToast } from '@/hooks/use-toast';

interface UseEncodingProps {
  initialText?: string;
  initialEncoding?: string;
}

interface UseEncodingReturn {
  inputText: string;
  outputText: string;
  selectedEncoding: string;
  isValidInput: boolean;
  setInputText: (text: string) => void;
  setSelectedEncoding: (encoding: string) => void;
  convertText: () => void;
  copyToClipboard: () => void;
  clearAll: () => void;
  swapTexts: () => void;
}

export function useEncoding({ 
  initialText = '', 
  initialEncoding = 'utf8' 
}: UseEncodingProps = {}): UseEncodingReturn {
  const [inputText, setInputText] = useState(initialText);
  const [outputText, setOutputText] = useState('');
  const [selectedEncoding, setSelectedEncoding] = useState(initialEncoding);
  const [isValidInput, setIsValidInput] = useState(true);
  const { toast } = useToast();

  // Update input text and validate
  const handleSetInputText = useCallback((text: string) => {
    setInputText(text);
    setIsValidInput(validateInput(text, selectedEncoding));
  }, [selectedEncoding]);

  // Update encoding type and validate
  const handleSetSelectedEncoding = useCallback((encoding: string) => {
    setSelectedEncoding(encoding);
    setIsValidInput(validateInput(inputText, encoding));
  }, [inputText]);

  // Convert text based on selected encoding
  const convertText = useCallback(() => {
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
      let output = '';
      switch (selectedEncoding) {
        case 'utf8':
          output = inputText;
          break;
        case 'ascii':
          output = Array.from(inputText)
            .map(char => char.charCodeAt(0))
            .join(' ');
          break;
        case 'base64':
          output = btoa(unescape(encodeURIComponent(inputText)));
          break;
        case 'hex':
          output = Array.from(inputText)
            .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('');
          break;
        case 'binary':
          output = Array.from(inputText)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
          break;
        case 'url':
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
  }, [inputText, selectedEncoding, isValidInput, toast]);

  // Copy output to clipboard
  const copyToClipboard = useCallback(() => {
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
  }, [outputText, toast]);

  // Clear all fields
  const clearAll = useCallback(() => {
    setInputText('');
    setOutputText('');
    setIsValidInput(true);
    toast({
      title: "All fields cleared",
      variant: "default"
    });
  }, [toast]);

  // Swap input and output texts
  const swapTexts = useCallback(() => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setIsValidInput(validateInput(outputText, selectedEncoding));
    toast({
      title: "Input and output swapped",
      variant: "default"
    });
  }, [inputText, outputText, selectedEncoding, toast]);

  return {
    inputText,
    outputText,
    selectedEncoding,
    isValidInput,
    setInputText: handleSetInputText,
    setSelectedEncoding: handleSetSelectedEncoding,
    convertText,
    copyToClipboard,
    clearAll,
    swapTexts
  };
}
