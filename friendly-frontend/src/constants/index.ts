//  friendly-frontend/src/constants/index.ts
// this file contains all the constants used in the application
// these all are used in the side bar tabs and their sections
// like dashboard, profile, friends .....  etc
export const SidebarLinks = [
    {
        imgURL : '../../public/assets/icons/Dashboard.png',
        route : '/friendly',
        label: "Dashboard"
    },
    {
        imgURL : '../../public/assets/icons/otherNav.png',
        route : '/friendly/profile',
        label: "Profile"
    },
    {
        imgURL : '../../public/assets/icons/otherNav.png',
        route : '/friendly/preferences',
        label: "Preferences"
    },
    {
        imgURL : '../../public/assets/icons/otherNav.png',
        route : '/friendly/friends',
        label: "Friends"
    },
    {
        imgURL : '../../public/assets/icons/otherNav.png',
        route : '/friendly/create-waves',
        label: "Create Waves"
    },
    {
        imgURL : '../../public/assets/icons/otherNav.png',
        route : '/friendly/change-password',
        label: "Change Password"
    }
];

export const LogoutLink = [
    {
        imgURL : '../../public/assets/icons/exit.png',
        route : '/',
        label: "Logout"
    }
];

