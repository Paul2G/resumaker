import Document from '@tiptap/extension-document';
import { BulletList, ListItem, ListKeymap } from '@tiptap/extension-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, Extension, useEditor } from '@tiptap/react';

import { cn } from '@/lib/utils';

const DisableTab = Extension.create({
  addKeyboardShortcuts() {
    return {
      Tab: () => true,
      'Shift-Tab': () => true,
    };
  },
});

export function BulletPointsEditor({
  value = [],
  onChange = () => {},
  className,
}: BulletPointsEditorProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ps-4',
        },
      }),
      ListItem,
      ListKeymap,
      DisableTab,
    ],
    content: generateHTMLList(value),
    onCreate: ({ editor }) => editor.chain().focus().toggleBulletList().run(),
    onUpdate: ({ editor }) => {
      if (!editor.isActive('bulletList'))
        editor.chain().focus().toggleBulletList().run();

      onChange(parseHTMLList(editor.getHTML()));
    },
  });

  function generateHTMLList(items: string[]) {
    return `<ul>${items.map((item) => `<li><p>${item}</p></li>`).join('')}</ul>`;
  }

  function parseHTMLList(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const listItems = doc.querySelectorAll('li');
    return Array.from(listItems)
      .map((li) => li.textContent || null)
      .filter(Boolean) as string[];
  }

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
    >
      <EditorContent className="bullet-points-editor" editor={editor} />
    </div>
  );
}

export type BulletPointsEditorProps = Omit<
  React.ComponentProps<'div'>,
  'onChange'
> & {
  value?: string[];
  onChange?: (value: string[]) => void;
};
