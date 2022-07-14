import EXAMPLE_SUBMISSIONS, { Submission } from "constants/ExampleSubmissions";
import styles from "css/pages/VotePage.module.css";
import { useEffect, useState } from "react";

function UserView({submissions, setSubmissions}:{submissions:Submission[], setSubmissions:React.Dispatch<React.SetStateAction<Submission[]>>}): JSX.Element {

  const [currentApplication, setCurrentApplication] = useState<number>(0);
  const [application, setApplication] = useState<Submission>(submissions[currentApplication]); 
  const [submitted, setSubmitted] = useState<number[]>([]);

  function getNextApplication(idx:number) {
    for (let i= idx+1; i < submissions.length; i++) {
      if (submitted.includes(currentApplication) ) {
        setCurrentApplication(i)
        break
      }
    }
  }


  useEffect(() => {
    
    getNextApplication(0);
  }, [])

  return (
    <div className={styles.userCard}>
      <h3>
        Application {currentApplication + 1}/{EXAMPLE_SUBMISSIONS.length}
      </h3>
      <h2>
        {application.name}
      </h2>
      <h1>
        {application.userFullname}
      </h1>
      <div className={styles.imagesContainer}>
        {application.assets.map((asset) => (
          <img className={styles.image} src={asset.src} alt={application.name} />
        ))}
      </div>
      <div>
        <button className={styles.downvote} onClick={() => {
          setSubmitted([...submitted, currentApplication]);
          setApplication({...application, downvotes:application.downvotes+1})
          setSubmissions(submissions.map((sub) => {
            if (sub.id.includes(currentApplication.toString())){
              return {...sub, downvotes:sub.downvotes+1}
            }
            return sub;
          }))

          getNextApplication(currentApplication);
        }}>Downvote</button>
        <button className={styles.upvote} onClick={() => {
          setSubmitted([...submitted, currentApplication]);
          setApplication({...application, upvotes:application.upvotes+1})
          setSubmissions(submissions.map((sub) => {
            if (sub.id.includes(currentApplication.toString())){
              return {...sub, upvotes:sub.upvotes+1}
            }
            return sub;
          }))
          getNextApplication(currentApplication);
        }}>Upvote</button>
      </div>
    </div>
  )
}

function AdminView(): JSX.Element {

  return (
    <div>
      
    </div>
  )
}

export default function VotePage(): JSX.Element {
  const randomExample: Submission =
    EXAMPLE_SUBMISSIONS[Math.floor(Math.random() * EXAMPLE_SUBMISSIONS.length)];
  console.log(randomExample);

  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    setSubmissions(EXAMPLE_SUBMISSIONS.map((sub) => (
      {...sub, upvotes:0, downvotes:0}
    )));
  }, []);

  interface User {
    id: number,
    type: string
  }

  const [user, setUser] = useState<User>({
    id: 0,
    type:"user"
  });

  // If desired, utility fonts have been pre-defined in FontClasses.css
  return (
    <div className={styles.container}>
      {user.type === "user" ? (
        <UserView submissions={submissions} setSubmissions={setSubmissions}/>
      ) : (
        <AdminView />
      )}
    </div>
  );
}
