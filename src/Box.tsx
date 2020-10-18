import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Box({ title, children }: Props) {
  return (
    <div style={{ border: "1px solid black", padding: 10 }}>
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}
