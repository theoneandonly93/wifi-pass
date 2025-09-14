// @ts-nocheck
/// <reference types="mocha" />
import * as anchor from "@coral-xyz/anchor";
import type { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("wifi_pass", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.WifiPass as unknown as Program<any>;

  it("Initializes a hotspot!", async () => {
    const hotspot = anchor.web3.Keypair.generate();
    await program.methods
      .initializeHotspot("https://example.com/metadata.json")
      .accounts({
        hotspot: hotspot.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([hotspot])
      .rpc();
    // Fetch the account and check values
    const account = await program.account.hotspot.fetch(hotspot.publicKey);
    assert.equal(account.owner.toBase58(), provider.wallet.publicKey.toBase58());
    assert.equal(account.metadataUri, "https://example.com/metadata.json");
  });

  it("Issues a pass!", async () => {
    const pass = anchor.web3.Keypair.generate();
    await program.methods
      .issuePass({ daily: {} }, 86400)
      .accounts({
        pass: pass.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([pass])
      .rpc();
    const account = await program.account.pass.fetch(pass.publicKey);
    assert.equal(account.owner.toBase58(), provider.wallet.publicKey.toBase58());
    assert.equal(account.passType.daily, {});
  });
});
