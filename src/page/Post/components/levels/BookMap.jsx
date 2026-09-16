import { useState } from "react";

import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import BookCard from "./BookCard";

const BookMap = ({ level, levelIndex, setBook, addBook, deleteBook }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const API_KEY_GOOGLE_BOOKS = import.meta.env.VITE_API_KEY_GOOGLE_BOOKS;

  const searchBooks = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setBooks([]);
      return;
    }

    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(value)}&maxResults=8&printType=books&key=${API_KEY_GOOGLE_BOOKS}`;

      const response = await fetch(url);
      const data = await response.json();

      const results = (data.items || []).map((book) => {
        const info = book.volumeInfo;

        return {
          key: book.id,
          title: info.title || "",
          author: info.authors?.join(", ") || "",
          publishYear: info.publishedDate?.slice(0, 4) || "",
          src: info.imageLinks?.thumbnail?.replace("http://", "https://") || "",
        };
      });

      setBooks(results);
    } catch (error) {
      console.error("Error buscando libros:", error);
    }
  };

  const selectBook = (book) => {
    addBook(levelIndex, book);

    setSearch("");
    setBooks([]);
    setOpen(false);
  };

  console.log(search)

  return (
    <>
      <div className="flex flex-wrap gap-4">
        
        {level.books
          ?.filter((book) => book.key)
          .map((book, bookIndex) => (
            <BookCard key={`${book.key}-${bookIndex}`} book={book} bookIndex={bookIndex} levelIndex={levelIndex} setBook={setBook} deleteBook={deleteBook} />
          ))}

        <Button type="button" variant="ghost" className="h-65 w-45 cursor-pointer flex-col bg-black/35" onClick={() => setOpen(true)}>
          <Plus className="size-8" />
          <span>Agregar un libro</span>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Agregar un libro</h2>
              <p className="text-sm text-muted-foreground">Busca por título o autor y selecciona un libro.</p>
            </div>

            <Input
              id={`book-search-${levelIndex}`}
              type="search"
              placeholder="Buscar por título o autor..."
              value={search}
              onChange={(event) => searchBooks(event.target.value)}
              className="h-10"
            />

            <div className="h-96 overflow-y-auto border">
              {books.length > 0 ? (
                books.map((book) => (
                  <button
                    type="button"
                    key={book.key}
                    onClick={() => selectBook(book)}
                    className="flex w-full items-start gap-4 border-b p-4 text-left transition-colors last:border-b-0 hover:bg-muted"
                  >
                    {book.src ? <img src={book.src} alt="" className="h-20 w-14 shrink-0 object-cover" /> : <div className="h-20 w-14 shrink-0 bg-muted" />}

                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-5">{book.title}</p>

                      {book.author && <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>}

                      {book.publishYear && <p className="mt-1 font-mono text-xs text-muted-foreground">{book.publishYear}</p>}
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  {search ? "No se encontraron libros." : "Busca un libro para comenzar."}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookMap;
