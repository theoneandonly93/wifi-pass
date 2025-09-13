import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Dopleganga Basics</title>
        <meta
          name="description"
          content="Basic Functionality for Dopleganga Wireless Platform"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;
