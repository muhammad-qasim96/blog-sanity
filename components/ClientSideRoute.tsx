"use client";

import Link from "next/link";
import React, { FC } from "react";

interface ClientSideRouteProps {
  children: React.ReactNode;
  route: string;
}

const ClientSideRoute: FC<ClientSideRouteProps> = ({ children, route }) => {
  return <Link href={route}>{children}</Link>;
};

export default ClientSideRoute;
