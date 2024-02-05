"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics/", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const { topics } = await getTopics();
      setTopics(topics);
    };

    fetchTopics();
  }, []);

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border shadow-md hover:bg-slate-300 rounded-md border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={26} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
