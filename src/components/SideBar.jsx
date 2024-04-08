import React from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserIcon,
  UserGroupIcon,
  ClipboardDocumentIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

export function DefaultSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 hidden lg:block">
      <List>
        <NavLink to="/dashboard">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </NavLink>

        <NavLink to="/users">
          <ListItem>
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </NavLink>
        <NavLink to="/products">
          <ListItem>
            <ListItemPrefix>
              <ClipboardDocumentIcon className="h-5 w-5" />
            </ListItemPrefix>
            Products
          </ListItem>
        </NavLink>
        <button onClick={logout}>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </button>

        {user && user.role === "admin" && (
          <div className="ml-2 mt-3">
            <h3 className="text-md font-bold">Administrator</h3>
            <NavLink to="/users">
              <ListItem>
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5" />
                </ListItemPrefix>
                Users
              </ListItem>
            </NavLink>
          </div>
        )}
      </List>
    </Card>
  );
}
