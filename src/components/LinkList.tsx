"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : {}))
      .then(setCounts)
      .catch(() => setCounts({}));
  }, []);

  const handleClick = (id: string) => {
    // 새 탭으로 이동하므로 화면에는 바로 반영하고, 요청은 keepalive로 보냅니다.
    setCounts((prev) => (prev ? { ...prev, [id]: (prev[id] ?? 0) + 1 } : prev));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts ? (counts[link.id] ?? 0) : undefined}
            onClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
}
