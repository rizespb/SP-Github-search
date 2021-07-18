import React from "react";
import styles from "./Repo.module.css";

interface Iprops {
  title: string;
  description: string;
  ownerName: string;
  ownerImg: string;
  tags: Array<string>;
  langs: Array<string>;
}

const Repo: React.FC<Iprops> = (props) => {
  // Create tags array
  const tagsArray: Array<JSX.Element> = [];
  if (props.tags.length)
    props.tags.forEach((el, index) => {
      tagsArray.push(
        <span key={`tag-${index}`} className={styles.repo__tag}>
          {el}
        </span>
      );
    });

  // Create langs array
  let langsArray: Array<JSX.Element> = [];

  if (props.langs.length)
    props.langs.forEach((el, index) => {
      langsArray.push(
        <span key={`lang-${index}`} className={styles.repo__lang}>
          {el}
        </span>
      );
    });

  return (
    <div className={styles.repo}>
      <div className={styles.repo__title}>{props.title}</div>
      {tagsArray.length ? (
        <div className={styles.repo__tags}>
          <div className={styles.repo__tagsTitle}>Tags:</div>
          <div className={styles.repo__tagsContainer}>{tagsArray}</div>
        </div>
      ) : null}

      {langsArray.length ? (
        <div className={styles.repo__langs}>
          <div className={styles.repo__langsTitle}>Languages:</div>
          <div className={styles.repo__langsContainer}>{langsArray}</div>
        </div>
      ) : null}

      <div className={styles.repo__description}>
        <div className={styles.repo__descriptionTitle}>Description:</div>
        <div className={styles.repo__descriptionText}>{props.description}</div>
      </div>

      <div className={styles.owner}>
        <div className={styles.repo__ownerTitle}>Owner:</div>
        <div className={styles.repo__ownerName}>{props.ownerName}</div>
        <div className={styles.repo__ownerImg}>
          <img src={props.ownerImg} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default Repo;
