import { lazy } from "react";

export const _404 = lazy(() =>
  import(/*webpackChunkName:"notFound"*/ "./notFound")
);

export const NO_AUTH_ROUTES = [
  {
    path: "/login",
    key: "login",
    component: lazy(() => import(/*webpackChunkName:"login"*/ "./login")),
  },
  {
    path: "/register",
    key: "register",
    component: lazy(() => import(/*webpackChunkName:"register"*/ "./register")),
  },
];

export const AUTH_ROUTES = [
  {
    path: "/home",
    component: lazy(() => import(/*webpackChunkName:"home"*/ "./home")),
  },
  {
    path: "/logout",
    component: lazy(() => import(/*webpackChunkName: "logout"*/ "./logout")),
  },
  {
    path: "/user",
    component: lazy(() => import(/*webpackChunkName:"user"*/ "./user")),
  },
  {
    path: "/profile",
    component: lazy(() => import(/*webpackChunkName:"profile"*/ "./profile")),
  },
  {
    path: "/chat",
    component: lazy(() => import(/*webpackChunkName:"profile"*/ "./chat")),
  },
];
