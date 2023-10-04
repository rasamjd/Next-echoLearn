import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/app/models/User.model';
import databaseConncection from '@/app/db/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const newUser = new User({
    username: "sara",
    email: "",
    password: "toplang",
    interested: ["italian"],
  })

  newUser.save()
    .then(() => res.json('User added successfully!'))
    .catch((err: any) => res.status(400).json('Error: ' + err));

  databaseConncection()
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Error: " + err))
}
