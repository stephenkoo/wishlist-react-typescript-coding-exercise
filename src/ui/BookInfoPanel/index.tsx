import classNames from "classnames";
import { Book } from "types";
import styles from "./BookInfoPanel.module.css";

type BookInfoPanelProps = {
  book: Book;
};

export const BookInfoPanel = ({ book }: BookInfoPanelProps) => (
  <article className={styles.bookInfoPanel}>
    <div className={styles.titleAndAuthorContainer}>
      <h3 className={classNames(["typography--h2", styles.title])}>
        {book.title}
      </h3>
      <div className={classNames(["typography--h4", styles.author])}>
        {book.author}
      </div>
    </div>
    <div className={styles.publishersSummaryContainer}>
      <h5 className={classNames(["typography--h4", styles.summaryTitle])}>
        Publisher&apos;s summary
      </h5>
      <p>{book.publisherSummary}</p>
    </div>
    <img
      className={styles.bookCover}
      src={book.imageUrl}
      alt={`${book.title} book cover`}
      role="presentation"
    />
  </article>
);
