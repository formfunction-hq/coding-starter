import EXAMPLE_SUBMISSIONS, { Submission } from "constants/ExampleSubmissions";
import styles from "css/pages/VotePage.module.css";
import { useState } from "react";
import setObject from "utils/local-storage/setObject";
import getObject from "utils/local-storage/getObject";


const SubmissionRenderer = (submission: Submission, username: string, updateSubmission: () => void) => {
  return <div>
    {submission.name}
    {submission.userFullname}
    {submission.assets.map(asset => <img src={asset.src} height="100" width="100" />)}
    {username === "admin" && <div>
      upvoters: {getObject(submission.id)?.upvoters?.length ?? 0}
      downvoters: {getObject(submission.id)?.downvoters?.length ?? 0}
    </div>}
    {username === "admin" && <div> <button onClick={() => {
      const object = getObject(submission.id);
      if (!object) {
        setObject(submission.id, {
          is_approved: true,
          is_rejected: false,
          upvoters: [] as string[],
          downvoters: [] as string[],
        });
      } else {
        setObject(submission.id, { ...object, is_approved: true });
      }
      updateSubmission();
    }}>approve</button>
      <button onClick={() => {
        const object = getObject(submission.id);
        if (!object) {
          setObject(submission.id, {
            is_approved: false,
            is_rejected: true,
            upvoters: [] as string[],
            downvoters: [] as string[],
          });
        } else {
          setObject(submission.id, { ...object, is_rejected: true });
        }
        updateSubmission();
      }}>reject</button>
    </div>}

    {username !== "admin" && <div> <button onClick={() => {
      const object = getObject(submission.id);
      if (!object) {
        setObject(submission.id, {
          is_approved: false,
          is_rejected: false,
          upvoters: [username],
          downvoters: [] as string[],
        });
      } else {
        setObject(submission.id, { ...object, upvoters: [...object.upvoters, username] });
      }
      updateSubmission();
    }}>upvote</button>
      <button onClick={() => {
        const object = getObject(submission.id);
        if (!object) {
          setObject(submission.id, {
            is_approved: false,
            is_rejected: false,
            upvoters: [username],
            downvoters: [] as string[],
          });
        } else {
          setObject(submission.id, { ...object, upvoters: [...object.upvoters, username] });
        }
        updateSubmission();
      }}  >downvote</button>
    </div>}
  </div>
}

export default function VotePage(): JSX.Element {
  /*
  use local storage as a db
  store mapping from submission_id -> (upvoters, downvoters, isApproved, isRejected)
  use textbox + state to store username 
  adminusername = "admin"
  */
  setObject("test", {
    upvoters: [] as string[],
    downvoters: [] as string[],
    is_approved: false,
    is_rejected: false,
  })

  const generateCurrentSubmission = (submissions: Submission[], username: string): Submission => {
    if (username === "admin") {
      for (let i = 0; i < submissions.length; i++) {
        if (!(getObject(submissions[i].id)?.is_approved ?? false) && !(getObject(submissions[i].id)?.is_rejected ?? false)) {
          return submissions[i];
        }
      }

    }
    for (let i = 0; i < submissions.length; i++) {
      if (!(getObject(submissions[i].id)?.is_approved ?? false) && !(getObject(submissions[i].id)?.is_rejected ?? false)) {

        if (!(getObject(submissions[i].id)?.upvoters?.length ?? 0) && !(getObject(submissions[i].id)?.downvoters?.length ?? 0)) {
          return submissions[i];
        }
      }
    }

    return submissions[0];
  }

  const updateSubmission = () => setCurrentSubmission(generateCurrentSubmission(EXAMPLE_SUBMISSIONS, user));
  const [user, setUser] = useState("admin");

  const [currSubmission, setCurrentSubmission] = useState(generateCurrentSubmission(EXAMPLE_SUBMISSIONS, user));
  console.log(getObject("test"));
  const randomExample: Submission =
    EXAMPLE_SUBMISSIONS[Math.floor(Math.random() * EXAMPLE_SUBMISSIONS.length)];
  console.log(randomExample);

  // If desired, utility fonts have been pre-defined in FontClasses.css
  return (
    <div className={styles.container}>
      <div className={styles.example}>
        <input type="text" value={user} onChange={(event) => setUser(event.target.value)} />
        <div className="header1Font">Welcome!</div>
        {SubmissionRenderer(currSubmission, user, updateSubmission)}
        <ul>
          <li className="body1Font">
            You&apos;re currently looking at <strong>VotePage.tsx</strong>
          </li>
          <li className="body1Font">
            Local storage helpers have been defined for your convenience under{" "}
            <strong>utils/local-storage</strong>
          </li>
          <li className="body1Font">
            Check your JS console for the data of an example submission.
          </li>
        </ul>
        <div className="body1Font">Good luck!</div>
      </div>
    </div>
  );
}
