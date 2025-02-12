// src/__mocks__/react-router-dom.js
export const useNavigate = jest.fn();
export const useParams = jest.fn();
export const useLocation = jest.fn();
export const Link = jest.fn(({ children }) => <>{children}</>);
export const NavLink = jest.fn(({ children }) => <>{children}</>);
export const BrowserRouter = jest.fn(({ children }) => <>{children}</>);
