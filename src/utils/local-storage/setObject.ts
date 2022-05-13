import {SubmissionInfo } from "utils/local-storage/types";

export default function setString(key: string, value: SubmissionInfo) {
  localStorage.setItem(`${key}`, JSON.stringify(value));
}
