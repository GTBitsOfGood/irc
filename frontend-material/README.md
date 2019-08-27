# Frontend Documentation

##  Software Stack and Documentation
The frontend is written entirely in [React](https://reactjs.org/docs/getting-started.html).

The storefront is built off of Creative Tim's [Material Dashboard](https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial), which has many different custom components. Those components are built off of Google's [Material UI](https://material-ui.com/). Every page is made from components from both Material UI and Material Dashboard, as well as custom components.

When adding or modifying components, look at their import statement and view its documentation.

Examples:
`import Card from "components/Card/Card.jsx";`
This code comes from the Material Dashboard.

`import Input from '@material-ui/core/Input';`
This code comes from Material UI.

## Structure

 - config : This contains a lot of webpack files, which controls the development enviorment.
 - public : This contains the skeleton index.html file that the React code edits.
 - **src**: This contains all the React code, and controls the entire application. This is where the majority of code editing will occur.

 ## SRC structure

 - Assets: Standard assets that came with Material Dashboard. A lot of this stuff can be removed as it is not used. The main folder to edit is the scss folder, which can be edited to change the css of components. Make sure to edit the scss, not the css, as it complies down to css.
 - Components: Contains custom components and Material Dashboard components. If you want to create a component to be used throughout the application, add it here. An example of this is the `CallBackendApi.jsx` component.
 - Empty-States: Contains a few components for when a component is empty.
 - Layouts: Has `Dashboard.jsx` which controls switching tabs and the application as a whole.
 - Loaders: Has components for loading products.
 - Routes: This holds the information for each tab or (route)
 - Variables: Creates some sample charts for reporting.
 - **Views**: This is the most important folder in src. This contains the .jsx file for each tab, which is where most of the code editing occurs. The name of each folder/file relates to the purpose of each tab.
	 - Dashbord: Reporting Tab
	 - LandingPage: Login Page
	 - ShopList: Tab to log items given to clients
	 - ShopModify: Tab to edit items (Admin Only)
	 - TimeList: Tab to log hours volunteered by volunteers
	 - TimeModify; Tab to edit volunteer classes (Admin Only)
	 - UserModify: Tab to edit user permissions (Admin Only)
	 - UserProfile: Tab to reset user password
