
// this is used in sidebar links and their tabs to represent that what category it belongs
// the imgURL belongs to the image of the the dashboard icon and other icons 
// the routes define where it goes to i.e. on which component it have to shift 
// the label is the name of the tab

// these all are kind of strings
export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};