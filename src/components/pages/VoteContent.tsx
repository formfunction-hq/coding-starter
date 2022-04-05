import { Submission } from "../../constants/ExampleSubmissions";
import { Button } from "antd";
import { useState } from "react";


export interface VoteContentProps {
  submission: Submission
  index: number
  total: number
  onUpvote: (id: string) => void
  onDownvote: (id: string) => void
}

const VoteContent = (props: VoteContentProps) => {
  return (
    <div>
      Application {props.index}/{props.total}
      <br/>
      {props.submission.name}
      <br />
      {props.submission.userFullname}
      <br />
      {props.submission.assets.map((a) => {
        return (<img src={a.src} alt={a.src}/>)
      })}
      <button onClick={() => props.onDownvote(props.submission.id)}>Downvote</button>
      <button onClick={() => props.onUpvote(props.submission.id)}>Upvote</button>
      <br />
    </div>
  )
}

export { VoteContent }