import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Dopelganga Basics</title>
        <meta
          name="description"
          content="Basic Functionality for Dopelganga Wireless Platform"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;
