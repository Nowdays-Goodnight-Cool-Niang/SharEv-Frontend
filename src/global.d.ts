declare namespace JSX {
  interface IntrinsicElements {
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

type TextBlock = {
  type: 'text';
  value: string;
};

type InputBlock = {
  type: 'input';
  fieldKey: string;
};

type TemplateBlock = TextBlock | InputBlock;

interface IInputFieldConfig {
  value: string;
  placeholder: string;
}

interface IEventCardTemplate {
  blocks: TemplateBlock[];
  fields: Record<string, InputFieldConfig>;
}
