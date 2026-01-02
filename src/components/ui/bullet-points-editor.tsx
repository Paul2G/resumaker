import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from '@phosphor-icons/react';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import { BulletList, ListItem, ListKeymap } from '@tiptap/extension-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { Placeholder } from '@tiptap/extensions';
import { EditorContent, Extension, useEditor } from '@tiptap/react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  placeholder,
  onChange = () => {},
  className,
}: BulletPointsEditorProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'outline-none relative min-h-20 [&>p.is-editor-empty]:before:content-[attr(data-placeholder)] [&>p.is-editor-empty]:before:text-muted-foreground [&>p.is-editor-empty]:before:absolute [&>p.is-editor-empty]:before:top-0 [&>p.is-editor-empty]:before:pointer-events-none',
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ps-4',
        },
      }),
      ListItem,
      ListKeymap,
      Placeholder.configure({
        placeholder: placeholder,
      }),
      DisableTab,
    ],
    content: generateHTMLList(value),
    onUpdate: ({ editor }) => {
      if (!editor.isActive('bulletList') && !editor.isEmpty)
        editor.chain().toggleBulletList().run();

      onChange(parseHTMLList(editor.getHTML()));
    },
  });

  function generateHTMLList(items: string[]) {
    return items.length
      ? `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
      : undefined;
  }

  function parseHTMLList(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const listItems = doc.querySelectorAll('li');
    return Array.from(listItems)
      .map((li) => li.innerHTML || null)
      .filter(Boolean) as string[];
  }

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent  text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
    >
      <div className="p-1 flex gap-1">
        <Button
          size="icon-sm"
          variant={editor.isActive('bold') ? 'outline' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TextBIcon />
        </Button>
        <Button
          size="icon-sm"
          variant={editor.isActive('italic') ? 'outline' : 'ghost'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TextItalicIcon />
        </Button>
        <Button
          size="icon-sm"
          variant={editor.isActive('underline') ? 'outline' : 'ghost'}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <TextUnderlineIcon />
        </Button>
      </div>
      <Separator />
      <EditorContent className="px-3 py-2" editor={editor} />
    </div>
  );
}

export type BulletPointsEditorProps = Omit<
  React.ComponentProps<'div'>,
  'onChange'
> & {
  value?: string[];
  placeholder?: string;
  onChange?: (value: string[]) => void;
};
