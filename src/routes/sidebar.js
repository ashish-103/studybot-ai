/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import Dashboard from "./page/dashboard/Dashboard"; // Import your component

const routes = [
  {
    path: "dashboard", // Relative to the parent route in Layout
    component: Dashboard, // Component to render for this route
    icon: "HomeIcon", // Optional: Can be used for sidebar icons
    name: "Dashboard", // Name that appears in Sidebar
  },
  // Add more routes as needed
];

export default routes;
