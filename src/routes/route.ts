import HomePage from "../components/pages/HomePage";
import ProfilePage from "../components/pages/ProfilePage";
import TopupPage from "../components/pages/TopupPage";
import TransactionHistoryPage from "../components/pages/TransactionHistoryPage";
import TransactionPage from "../components/pages/TransactionPage";

export type RouteList = {
    path: string;
    component?: string;
};

export const componentMaps = {
    'HomePage': HomePage,
    'TopupPage': TopupPage,
    'TransactionPage': TransactionPage,
    'TransactionHistoryPage': TransactionHistoryPage,
    'ProfilePage': ProfilePage,
};

export const routeLists: RouteList[] = [
    { path: "/", component: "HomePage" },
    { path: "/topup", component: "TopupPage" },
    { path: "/transaction", component: "TransactionPage" },
    { path: "/transaction/history", component: "TransactionHistoryPage" },
    { path: "/profile", component: "ProfilePage" },
];