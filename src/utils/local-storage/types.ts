// Feel free to modify this!

export type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

export type SubmissionVote = {
  userUpvotes: Array<string>;
  userDownvotes: Array<string>;
  adminApproved: boolean;
  adminViewed: boolean;
};

export type O = {
  vote: SubmissionVote;
};
