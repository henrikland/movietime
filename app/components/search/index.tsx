"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./search.module.css";

const Search: React.FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submit = () => {
    if (inputRef.current) {
      router.push(`/?q=${inputRef.current.value}`);
    }
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      submit();
    }
  };

  return (
    <>
      <input
        className={styles.input}
        type="search"
        placeholder="Search movies, tv-shows or actors"
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      <button onClick={submit}>Submit</button>
    </>
  );
};

export default Search;
