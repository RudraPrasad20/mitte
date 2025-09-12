"use client";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import {
  generateSigner,
  percentAmount,
  publicKey,
} from "@metaplex-foundation/umi";
import {
  createAndMint,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "Symbol must be at least 2 characters.",
  }),
  decimals: z.number().min(1, {
    message: "Decimal must be at least 1.",
  }),
  supply: z.number().min(1, {
    message: "Sypply must be at least 1.",
  }),
  imageUri: z.url().min(2, {
    message: "Image link not valid.",
  }),
});

function TokenLaunchpad() {
  const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!).use(
    mplCandyMachine()
  );

  const wallet = useWallet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: 9,
      supply: 1000000,
      imageUri: "",
    },
  });

  async function createToken(values: z.infer<typeof formSchema>) {
    const metadata = {
      name: values.name,
      symbol: values.symbol,
      uri: values.imageUri,
    };

    if (!wallet.connected || !wallet.publicKey) {
      toast("Wallet not connected", {
        description: "Please connect your wallet first.",
      });
      return; // make sure to exit the function
    }

    umi.use(walletAdapterIdentity(wallet));
    umi.use(mplTokenMetadata());

    const mint = generateSigner(umi);

    try {
      await createAndMint(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: values.decimals,
        amount: BigInt(values.supply) * BigInt(10 ** values.decimals),
        tokenOwner: wallet.publicKey
          ? publicKey(wallet.publicKey.toBase58())
          : undefined,
        tokenStandard: TokenStandard.Fungible,
        updateAuthority: umi.identity,
      }).sendAndConfirm(umi);

      toast("Successfully minted tokens. Mint address:", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{mint.publicKey.toString()}</code>
          </pre>
        ),
      });
    } catch (err) {
      console.error("Error minting tokens:", err);
      toast("Token creation failed", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">Please try again later.</code>
          </pre>
        ),
      });
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createToken)}
          className="space-y-6 sm:space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Name</FormLabel>
                <FormControl>
                  <Input placeholder="waltter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Symbol</FormLabel>
                <FormControl>
                  <Input placeholder="WALT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="decimals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Decimal</FormLabel>
                <FormControl>
                  <Input placeholder="9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Supply</FormLabel>
                <FormControl>
                  <Input placeholder="100000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base sm:text-lg"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TokenLaunchpad;
