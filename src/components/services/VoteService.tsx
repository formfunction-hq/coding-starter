import EXAMPLE_SUBMISSIONS, { Submission } from "../../constants/ExampleSubmissions";

/// This goes to the UI and is shown on the main page
interface CurrentVoteContent {
  submission: Submission
  index: number
  total: number
}

export interface Vote {
  upvote: number
  downvote: number
}

export default class VoteService {

  /// Both these properties will be persisted per User id

  submissionVotes: Record<string, Vote> = {}
  isVoted: Record<string, boolean> = {}

  getCurrentVoteContent(): CurrentVoteContent | undefined {
    let results: Submission[] = []
    for (const r of EXAMPLE_SUBMISSIONS) {
      if (!(this.isVoted)[r.id]) {
        results.push(r)
      }
    }
    const last = results.pop()
    if (!last) return  undefined
    return {
      submission: last,
      index: results.length + 1,
      total: EXAMPLE_SUBMISSIONS.length
    }
  }

  upvoteSubmission(id: string): CurrentVoteContent | undefined {
    this.isVoted[id] = true
    const vote = this.submissionVotes[id] || { upvote: 0, downvote: 0 }
    vote.upvote += 1
    this.submissionVotes[id] = vote
    console.log(id)
    console.log(this.submissionVotes[id])
    return this.getCurrentVoteContent()
  }

  downvoteSubmission(id: string): CurrentVoteContent | undefined {
    this.isVoted[id] = true
    const vote = this.submissionVotes[id] || { upvote: 0, downvote: 0 }
    vote.downvote += 1
    this.submissionVotes[id] = vote
    console.log(id)
    console.log(this.submissionVotes[id])
    return this.getCurrentVoteContent()
  }

  constructor() {
  }
}
