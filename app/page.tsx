import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
// import { notFound } from "next/navigation";
import React from "react";
import Landing from "./components/Landing";
import Prompts from "./components/Prompts";

// async function getData(session: Session) {
//   const email = session?.user?.email;
//   const res = await fetch(
//     `https://bank-app-backend-production.up.railway.app/api/users/account/${email}`
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     notFound();
//   }

//   return res.json();
// }

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <Landing />
      </div>
    );
  }

  // const data = await getData(session);
  // console.log(data);

  return (
    <div>
      {/* <UserPrompt email={session?.user?.email} image={session?.user?.image} /> */}
      {/* <Prompts
        id={data.id}
        userName={data.userName}
        userEmail={data.userEmail}
        userImage={data.userImage}
        userAccount={data.userAccount}
      /> */}
      <Prompts email={session?.user?.email} image={session?.user?.image} />
    </div>
  );
};

export default Home;
