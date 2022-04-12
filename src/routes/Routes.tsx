import { Route, Routes as RoutesImport } from "react-router-dom";
import ApprovalsPage from "components/pages/ApprovalsPage";
import VotePage from "components/pages/VotePage";

export default function Routes(): JSX.Element {
  // TODO: Redirect non-exact matches to /
  return (
    <RoutesImport>
      <Route path="/approvals/:currentUserId" element={<ApprovalsPage />} />
      <Route path="/" element={<VotePage />} />
    </RoutesImport>
  );
}
