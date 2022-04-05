import EXAMPLE_SUBMISSIONS, { Submission } from "../../constants/ExampleSubmissions";
import { Vote } from "./VoteService";

/// This goes to the UI and is shown on the main page
interface CurrentAdminVoteContent {
  submission: Submission
  vote: Vote
  index: number
  total: number
}

export default class AdminVoteService {

  /// Both these properties will be persisted per Admin id

  /// This is set from the local state of votes per submission
  submissionVotes: Record<string, Vote> = {}

  isApproved: Record<string, boolean> = {}

  constructor() {
  }

  getCurrentVoteContent(): CurrentAdminVoteContent | undefined {

    /// Property given from local storage of voted submissions
    const votedSubmissions: Submission[] = []

    let results: Submission[] = []
    for (const r of votedSubmissions) {
      if (this.isApproved[r.id] == undefined) {
        results.push(r)
      }
    }

    const last = results.pop()
    if (!last) return  undefined

    const vote = this.submissionVotes[last.id]
    if (!vote) return undefined

    return {
      submission: last,
      vote: vote,
      index: 0,
      total: 1
    }
  }

  approveSubmission(id: string): CurrentAdminVoteContent | undefined {
    this.isApproved[id] = true
    return this.getCurrentVoteContent()
  }

  rejectSubmission(id: string): CurrentAdminVoteContent | undefined {
    this.isApproved[id] = false
    return this.getCurrentVoteContent()
  }
}
