import { useState } from "react";

import defaultBooks from "data/books.json";
import { Book, Books, Visibility } from "types";
import { getBooksByVisibility, updateBookVisibility } from "./utils";
import { BookList, BookListProps } from "./BookList";
import { WishListHeader } from "./WishListHeader";
import styles from "./WishList.module.css";

type WishListProps = {
  books?: Books;
  setBookToDisplay: (book: Book | null) => void;
};

export const WishList = ({
  books: initialBooks = defaultBooks,
  setBookToDisplay,
}: WishListProps) => {
  const [books, setBooks] = useState<Books>(initialBooks);

  const { visible: visibleBooks, hidden: hiddenBooks } =
    getBooksByVisibility(books);

  const resetBooks = () => setBooks(initialBooks);

  const handleItemDragStart: BookListProps["onItemDragStart"] =
    (id: Book["id"]) => (ev) => {
      ev.dataTransfer.setData("book-id", id);
      ev.dataTransfer.effectAllowed = "move";
    };

  const handleZoneDrop =
    (dropZoneEffect: Visibility): BookListProps["onZoneDrop"] =>
    (ev) => {
      ev.preventDefault();

      const bookId = ev.dataTransfer.getData("book-id");
      const book = books.find((book) => book.id === bookId);

      if (!book) {
        return;
      }

      const updateVisibility = updateBookVisibility(books);

      if (dropZoneEffect === Visibility.Visible && book.isHidden) {
        const updatedBooks = updateVisibility(bookId, false);
        setBooks(updatedBooks);
        return;
      }

      if (dropZoneEffect === Visibility.Hidden && !book.isHidden) {
        const updatedBooks = updateVisibility(bookId, true);
        setBooks(updatedBooks);
        return;
      }
    };

  const handleZoneDragOver: BookListProps["onZoneDragOver"] = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const handleItemMouseEnter: BookListProps["onItemMouseEnter"] =
    (book: Book) => () => {
      setBookToDisplay(book);
    };

  const handleItemMouseLeave: BookListProps["onItemMouseLeave"] = () => {
    setBookToDisplay(null);
  };

  return (
    <section className={styles.wishlist}>
      <WishListHeader />
      <BookList
        type={Visibility.Visible}
        books={visibleBooks}
        onItemDragStart={handleItemDragStart}
        onItemMouseEnter={handleItemMouseEnter}
        onItemMouseLeave={handleItemMouseLeave}
        onZoneDrop={handleZoneDrop(Visibility.Visible)}
        onZoneDragOver={handleZoneDragOver}
      />
      <div>
        <h4 className={styles.hiddenListHeader}>Hidden list</h4>
        <BookList
          type={Visibility.Hidden}
          books={hiddenBooks}
          onItemDragStart={handleItemDragStart}
          onItemMouseEnter={handleItemMouseEnter}
          onItemMouseLeave={handleItemMouseLeave}
          onZoneDrop={handleZoneDrop(Visibility.Hidden)}
          onZoneDragOver={handleZoneDragOver}
        />
      </div>
      <button onClick={resetBooks}>Reset</button>
    </section>
  );
};