import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import cors from 'cors';

// Use the cors middleware with appropriate options
const corsMiddleware = cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: process.env.API, // or specify the origin of your frontend app
});

export default async function handler(req, res) {
  // Apply CORS middleware
  await corsMiddleware(req, res);

  // Your existing route definitions
  if (req.method === 'POST') {
    const { title, description } = await req.body;
    await connectMongoDB();
    await Topic.create({ title, description });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  }

  if (req.method === 'GET') {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  }

  if (req.method === 'DELETE') {
    const id = req.query.id;
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }

  // Handle other methods or invalid requests
  return NextResponse.error({ message: "Invalid method or route", status: 400 });
}
