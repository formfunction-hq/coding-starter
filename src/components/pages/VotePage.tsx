import { useState } from "react";
import EXAMPLE_SUBMISSIONS, { Submission } from "constants/ExampleSubmissions";
import styles from "css/pages/VotePage.module.css";
import getNumber from "utils/local-storage/getNumber";
import setNumber from "utils/local-storage/setNumber";
import { Navigate } from "react-router-dom";

export default function VotePage(): JSX.Element {
  // TODO: Path param for submission ID.
  const randomExample: Submission =
    EXAMPLE_SUBMISSIONS[Math.floor(Math.random() * EXAMPLE_SUBMISSIONS.length)];
  const submissionIndex = EXAMPLE_SUBMISSIONS.indexOf(randomExample) + 1;
  const adminApprovals: number = getNumber(`approvals-${randomExample.id}`) || 0
  if (adminApprovals > 0) {
    // filter submissions for non-approved
    // grab next available submission.
    return (
      <Navigate replace to="/"/>
    );
  }

  const downvote = (key: string) => {
    const prev: number = getNumber(key) || 0;
    setNumber(key, prev - 1);
  };

  const upvote = (key: string) => {
    const prev: number = getNumber(key) || 0;
    setNumber(key, prev + 1);
  };

  // If desired, utility fonts have been pre-defined in FontClasses.css
  return (
    <div className={styles.container}>
      <div className={styles.example}>
        <h1 className="header1Font">APPLICATION {submissionIndex}/{EXAMPLE_SUBMISSIONS.length}</h1>
        <h2 className="header2Font">{randomExample.name}</h2>
        <button style={{ borderColor: 'red', borderRadius: '10px' }} onClick={() => downvote(randomExample.id)}>Downvote</button>
        <button style={{ borderColor: 'purple', borderRadius: '10px' }} onClick={() => upvote(randomExample.id)}>Upvote</button>
        <div className="row inline">
          {randomExample.assets.map((asset, i) => {
            // TODO: Use content type to show <video> tag instead.
            return (
              <div key={randomExample.id + "_" + i} className="column">
                <img src={asset.src} alt={randomExample.name}/>
              </div>
            );
          })}
        </div>
        <hr/>
      </div>
    </div>
  );
}
