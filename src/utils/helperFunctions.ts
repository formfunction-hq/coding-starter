import { O, User } from "./local-storage/types";
import EXAMPLE_SUBMISSIONS, { Submission } from "constants/ExampleSubmissions";
import getObject from "./local-storage/getObject";
import se
import setString from "./local-storage/setObject";

export const getVotables = (user: User): Array<Submission> => {

  return EXAMPLE_SUBMISSIONS.filter(
    (x) =>
      ! getObject(x.id)?.vote.userUpvotes.find(x=> x == user.id)
  );
};

export const voteSubmission = (
  submission: Submission,
  user: User,
  isUpvote: boolean
) => {

  let submissionStored = getObject(submission.id);
  if (submissionStored) {
      if (isUpvote)
      {submissionStored.vote.userUpvotes.push(user.id);}
      else {
          submissionStored.vote.userDownvotes.push(user.id)
      }
  } else {
    if (isUpvote) {
        submissionStored = {userUpvotes: [user.id], userDownvotes: [], adminApproved: false, adminViewed: false}
    }
    else {
        submissionStored = {userDownvotes: [user.id], userUpvotes: [], adminApproved: false, adminViewed: false}
    }
  }
  const state: O | null = getObject("globalState");
  state?.userSubmissionsMap.set(user.id, submission.id);
  if (isUpvote) {
    state?.votes?.get(submission.id)?.userUpvotes.push(user.id);
  } else {
    state?.votes?.get(submission.id)?.userDownvotes.push(user.id);
  }
  setString(submission.id, submissionStored);
};

export const adminApproval = (user:User, submission: Submission, isApproved: boolean) => {

}