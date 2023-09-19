import * as anchor from "@project-serum/anchor";
import * as token from "@solana/spl-token";
import { BankrunProvider } from "anchor-bankrun";

const { PublicKey, Signer, Keypair, SystemProgram } = anchor.web3;
const { BN, Program } = anchor;

import { expect, assert } from "chai";

import { startAnchor, Clock } from "solana-bankrun";

import { expectError } from "./utils";

import { AutocratV0 } from "../target/types/autocrat_v0";
import { ConditionalVault } from "../target/types/conditional_vault";
import { Clob } from "../target/types/clob";

import * as TwapCpmmIDL from "../target/idl/twap_cpmm.json";

import {
  createMint,
  createAccount,
  createAssociatedTokenAccount,
  mintTo,
  getAccount,
  mintToOverride
} from "spl-token-bankrun";

export type TwapCpmmProgram = Program<TwapCpmm>;

// this test file isn't 'clean' or DRY or whatever; sorry!
const TWAP_CPMM_PROGRAM_ID = new PublicKey(
  "E4JnykRAH6FsFXeaKTyax3bBvPp8dnQXjcuFhakCQyth"
);

const WSOL = new PublicKey("So11111111111111111111111111111111111111112");

describe("twap_cpmm", async function () {
  let provider,
    connection,
    program,
    payer,
    context,
    banksClient;

  before(async function () {
    context = await startAnchor("./", [], []);
    banksClient = context.banksClient;
    provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    program = new anchor.Program<TwapCpmm>(
      TwapCpmmIDL,
      TWAP_CPMM_PROGRAM_ID,
      provider
    );

    payer = program.provider.wallet.payer;
  });

  describe("#initialize_market", async function () {
    it("initializes a market", async function () {
      const mintAuthority = Keypair.generate();

      const base = await createMint(banksClient, payer, mintAuthority.publicKey, mintAuthority.publicKey, 9);
      const [market] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("WWCACOTMICMIBMHAFTTWYGHMB")],
        program.programId
      );
      let tx = await program.methods.initMarket()
        .accounts({market, base, quote: WSOL}).rpc();

      const storedMarket = await program.account.market.fetch(market);

      assert.ok(storedMarket.quote.equals(WSOL));
      assert.ok(storedMarket.base.equals(base));
    });
  });
});


