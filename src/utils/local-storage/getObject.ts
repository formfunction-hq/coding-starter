import { SubmissionInfo } from "utils/local-storage/types";

export default function getObject(key: string): SubmissionInfo | null {
  const value = localStorage.getItem(`${key}`);
  return value != null ? (JSON.parse(value) as SubmissionInfo) : null;
}
