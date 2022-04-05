import Body1 from "components/text/Body1";
import Body1Bold from "components/text/Body1Bold";
import Header1 from "components/text/Header1";
import EXAMPLE_SUBMISSIONS, { Submission } from "constants/ExampleSubmissions";
import styles from "css/pages/VotePage.module.css";
import { VoteContent } from "./VoteContent";
import VoteService from "../services/VoteService";
import { useState } from "react";

/* TODO:
  0. Create local storage for User and Admin Vote Content preference
  1. Create Admin Vote Content Page
  2. Finish User Vote Content Page
  3. Create Session for either going into User or Admin pages
 */

/*
 How I'm gonna store data through local storage

 create SessionStorageService

 -- User --

 getUserSession(id: string): UserSession { id }
 getUserVotePreferences(userId: id): UserVotePreference { submissionVotes, isVoted } --> VoteService(state) --> Renders in UI

 setUserVotePreference(data: UserVotePreference)

 -- Admin --

 getAdminUserSession(id: string): AdminUserSession { id }
 getAdminVotePreference(adminId: string): AdminVotePreference { submissionVotes, isApproved } --> AdminVoteService(state) --> Renders in UI

 setAdminVotePreference(data: AdminVotePreference)

 getAllUsersVotePreferences(): UserVotePreference[]  -->  AdminVoteService(allData) (logic for vote aggregation here) --> CurrentAdminVoteContent

 */

const voteService = new VoteService()

export default function VotePage(): JSX.Element {

  const currentVoteContent = voteService.getCurrentVoteContent()

  if (!currentVoteContent) return (<div>Need content!</div>)
  const [voteContent, setVoteContent] = useState(currentVoteContent)

  return (
    <div className={styles.container}>
      <div className={styles.example}>
        <Body1 className={styles.inline}>
          <VoteContent
            submission={currentVoteContent.submission}
            index={currentVoteContent.index}
            total={currentVoteContent.total}
            onDownvote={(id) => {
              const updatedVoted = voteService.downvoteSubmission(id)
              if (updatedVoted) setVoteContent(updatedVoted)
            }}
            onUpvote={(id) => {
              const updatedVoted = voteService.upvoteSubmission(id)
              if (updatedVoted) setVoteContent(updatedVoted)
            }}
          />
        </Body1>
      </div>
    </div>
  );
}
