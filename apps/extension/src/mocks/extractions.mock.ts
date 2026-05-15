import type { SelectedElementData } from '~schemas/inspector.schema';
import type {
  ExtractionErrorType,
  JsonBlueprint,
} from '~store/extraction-store';

export const mockSelectedElement: SelectedElementData = {
  tagName: 'button',
  id: null,
  className:
    'inline-flex items-center justify-center rounded-md text-sm font-medium',
  boundingRect: {
    top: 200,
    left: 150,
    width: 120,
    height: 40,
  },
  ariaAttributes: {
    role: 'button',
    'aria-label': 'Submit form',
    'data-variant': 'primary',
  },
  innerHTML: '<span class="flex items-center gap-2">Submit</span>',
};

export const mockJsonBlueprint: JsonBlueprint = {
  element: 'button',
  attributes: {
    className:
      'inline-flex items-center justify-center rounded-md text-sm font-medium',
    role: 'button',
  },
  styles: {
    layout: 'inline-flex',
    alignment: 'center',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  animations: [],
  assets: [],
  ariaAttributes: {
    role: 'button',
    label: 'Submit form',
  },
  childElements: [
    {
      element: 'span',
      attributes: { className: 'flex items-center gap-2' },
      content: 'Submit',
    },
  ],
};

export const mockGeneratedCode = `import { Button } from '@/components/ui/button';

export function SubmitButton() {
  return (
    <Button variant="primary" aria-label="Submit form">
      Submit
    </Button>
  );
}`;

export const mockSourceUrl = 'https://example.com/components/checkout';

export interface MockErrorFixture {
  type: ExtractionErrorType
  message: string
}

export const mockErrors: MockErrorFixture[] = [
  {
    type: 'shadow-dom',
    message:
      'Cannot traverse into shadow DOM boundary. The selected element resides within a closed shadow root.',
  },
  {
    type: 'cors',
    message:
      'Cross-origin stylesheet blocked access. Unable to extract computed styles from external origin.',
  },
  {
    type: 'llm-timeout',
    message:
      'The AI model timed out while generating the component code. Please try again.',
  },
  {
    type: 'insufficient-credits',
    message:
      'You need at least 1 credit to extract a component. Please purchase more credits.',
  },
];
