
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";
import type { ReactNode } from "react";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Dopelganga</title>
        <meta
          name="description"
          content="Decentralized WiFi and Cellular Service by Dopelganga"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
