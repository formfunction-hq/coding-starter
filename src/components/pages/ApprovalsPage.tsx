import EXAMPLE_SUBMISSIONS, { Submission } from "constants/ExampleSubmissions";
import getNumber from "utils/local-storage/getNumber";
import setNumber from "utils/local-storage/setNumber";
import EXAMPLE_USERS, { User } from "constants/ExampleUsers";
import styles from "css/pages/ApprovalsPage.module.css";
import { Navigate, useParams } from "react-router-dom";

export default function ApprovalsPage(): JSX.Element {
  const randomExample: Submission =
    EXAMPLE_SUBMISSIONS[Math.floor(Math.random() * EXAMPLE_SUBMISSIONS.length)];
  const { currentUserId } = useParams();
  const currentUser: User | undefined  = EXAMPLE_USERS.find((u: User) => u.id === currentUserId)

  const deny = (key: string) => {
    const prev: number = getNumber(key) || 0;
    setNumber(key, prev - 1);
  };

  const approve = (key: string) => {
    const prev: number = getNumber(key) || 0;
    setNumber(key, prev + 1);
  };


  if (currentUser === undefined) {
    return (
      <Navigate replace to="/"/>
    );
  }

  // If desired, utility fonts have been pre-defined in FontClasses.css
  return (
    <div className={styles.container}>
      <div className={styles.example}>
        <div className="header1Font">Welcome {currentUser.name}!</div>
        <button style={{ borderColor: 'red', borderRadius: '10px' }} onClick={() => deny(`approvals-${randomExample.id}`)}>Downvote</button>
        <button style={{ borderColor: 'purple', borderRadius: '10px' }} onClick={() => approve(`approvals-${randomExample.id}`)}>Upvote</button>
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
        <div className="body1Font">Good luck!</div>
      </div>
    </div>
  );
}
