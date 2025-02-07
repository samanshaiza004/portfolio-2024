interface AsciiTextProps {
  text: string;
  enableWaves?: boolean;
  asciiFontSize?: number;
}

declare const AsciiText: React.FC<AsciiTextProps>;

export default AsciiText;
