import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";

const BookCard = ({ book, bookIndex, levelIndex, setBook, deleteBook }) => {
  return (
    <div className="h-max w-45">
      <article className="relative h-65 w-45">
        <img className="size-full object-cover" src={book.src} alt={book.title} />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 cursor-pointer bg-black/35"
          onClick={() => deleteBook(levelIndex, bookIndex)}
        >
          <X />
        </Button>
      </article>

      <Field className="mt-3">
        <FieldLabel htmlFor={`book-notes-${levelIndex}-${bookIndex}`}>Notas</FieldLabel>

        <FieldContent>
          <Textarea
            id={`book-notes-${levelIndex}-${bookIndex}`}
            value={book.notes || ""}
            placeholder="Capítulos, observaciones o información relevante..."
            className="min-h-32 resize-none"
            onChange={(event) => setBook(levelIndex, bookIndex, "notes", event.target.value)}
          />

          <FieldDescription>Añade información que ayude a contextualizar esta lectura.</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  );
};

export default BookCard;
