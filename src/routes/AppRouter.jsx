import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/Loader";
import CreateLead from "../pages/admin/leads/CreateLead";
import ViewLead from "../pages/admin/leads/ViewLead";
import EditLead from "../pages/admin/leads/EditLead";
import MemberTable from "../pages/admin/members/MemberTable";
import CreateMember from "../pages/admin/members/CreateMember";
import ViewMember from "../pages/admin/members/ViewMember";
import EditMember from "../pages/admin/members/EditMember";
import EditProfile from "../pages/admin/profile/EditProfile";
import ChangePassword from "../pages/admin/profile/ChangePassword";
import MemberLayout from "../layouts/MemberLayout";
import MemberDashboard from "../pages/member/Dashboard";
import MyLeads from "../pages/member/leads/MyLeads";
import ViewMemberLead from "../pages/member/leads/ViewLead";
import UpdateMemberLead from "../pages/member/leads/UpdateLead";
import MemberActivity from "../pages/member/Activity";

const LeadCapture = lazy(() => import("../pages/LeadCapture"));
const Login = lazy(() => import("../pages/Login"));

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Leads = lazy(() => import("../pages/admin/leads/Leads"));
const Members = lazy(() => import("../pages/admin/members/Members"));
const Activity = lazy(() => import("../pages/admin/Activity"));
const Profile = lazy(() => import("../pages/admin/profile/Profile"));

const MemberProfile = lazy(() => import("../pages/member/profile/Profile"));
const MemberEditProfile = lazy(() => import("../pages/member/profile/EditProfile"));
const MemberChangePassword = lazy(() => import("../pages/member/profile/ChangePassword"));


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <LeadCapture />
      </Suspense>
    ),
  },

  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },

  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminLayout />
      </Suspense>
    ),

    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "leads",
        element: <Leads />,
      },
      {
        path: "leads/create",
        element: <CreateLead />,
      },
      {
        path: "leads/:id",
        element: <ViewLead />,
      },
      {
        path: "leads/edit/:id",
        element: <EditLead />,
      },
      {
        path: "activity",
        element: <Activity />,
      },

      {
        path: "members",
        element: <Members />,
      },
      {
        path: "members/create",
        element: <CreateMember />,
      },
      {
        path: "members/:id",
        element: <ViewMember />,
      },
      {
        path: "members/edit/:id",
        element: <EditMember />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ]
  },
  {
    path: "/member",
    element: (
      <Suspense fallback={<Loader />}>
        <MemberLayout />
      </Suspense>
    ),

    children: [
      {
        path: "dashboard",
        element: <MemberDashboard />,
      },
      {
        path: "leads",
        element: <MyLeads />,
      },
      {
        path: "leads/:id",
        element: <ViewMemberLead />,
      },
      {
        path: "leads/update/:id",
        element: <UpdateMemberLead />,
      },
      {
        path: "activity",
        element: <MemberActivity />,
      },

      {
        path: "profile",
        element: <MemberProfile />,
      },
      {
        path: "edit-profile",
        element: <MemberEditProfile />,
      },
      {
        path: "change-password",
        element: <MemberChangePassword />,
      },
    ]
  },
]);

export default AppRouter;