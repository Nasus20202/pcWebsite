import { Contact } from "./components/Contact";
import { Home } from "./components/Home";
import { Panel } from "./components/Panel";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/kontakt',
    element: <Contact />
  }, {
    path: '/panel',
    element: <Panel />
  }
];

export default AppRoutes;
