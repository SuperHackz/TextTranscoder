/**
 * Validates input text based on the selected encoding type
 * @param text Input text to validate
 * @param encoding Selected encoding type
 * @returns Boolean indicating if the input is valid for the selected encoding
 */
export function validateInput(text: string, encoding: string): boolean {
  if (text.length === 0) {
    return true; // Empty input is considered valid
  }

  // Validation rules for different encodings
  switch (encoding) {
    case 'ascii':
      // Check if all characters are ASCII (codes 0-127)
      return /^[\x00-\x7F]*$/.test(text);
    case 'utf8':
    case 'base64':
    case 'hex':
    case 'binary':
    case 'url':
      // These encodings can handle all input characters
      return true;
    default:
      return true;
  }
}

/**
 * Gets encoding information for display
 * @param encoding Selected encoding type
 * @returns Object containing display name and description
 */
export function getEncodingInfo(encoding: string): { displayName: string; description: string } {
  const encodings: Record<string, { displayName: string; description: string }> = {
    utf8: {
      displayName: "UTF-8",
      description: "Universal character encoding that can represent any character."
    },
    ascii: {
      displayName: "ASCII",
      description: "Basic character encoding limited to 128 characters (English alphabet, numbers, symbols)."
    },
    base64: {
      displayName: "Base64",
      description: "Binary-to-text encoding scheme that represents binary data in ASCII format."
    },
    hex: {
      displayName: "Hex",
      description: "Hexadecimal representation of text (base 16 number system)."
    },
    binary: {
      displayName: "Binary",
      description: "Represents text as a sequence of binary digits (0s and 1s)."
    },
    url: {
      displayName: "URL Encoding",
      description: "Converts characters into a format that can be transmitted over the Internet."
    }
  };

  return encodings[encoding] || encodings.utf8;
}
