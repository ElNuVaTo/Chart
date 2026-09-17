const Book = ({ book }) => {
  return (
    <article className="group relative aspect-2/3 w-full max-w-50 overflow-hidden rounded-none border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground">
      <img
        className="absolute grayscale-30 brightness-85 inset-0 size-full object-cover transition-all duration-300 group-hover:brightness-50"
        src={book.src}
        alt=""
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex-1 ">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/70">
              {book.publishYear}
            </span>
          </div>

          <h3 className="text-lg mb-2 font-semibold leading-tight text-white">
            {book.title}
          </h3>

          <p className="text-sm text-white/70">{book.author}</p>
        </div>
        <div className="flex-2">
          {book.notes && (
            <p className="border-t border-white/20 pt-1.75 text-xs leading-4.5 text-white/70">
              {book.notes}
            </p>
          )}
        </div>
      </div>

      <span className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/60" />
      <span className="absolute bottom-0 left-0 z-20 h-1 w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
    </article>
  );
};

export default Book;
