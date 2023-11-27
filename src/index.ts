import {
  AptosWalletErrorResult,
  NetworkName,
  PluginProvider,
} from "@aptos-labs/wallet-adapter-core";
import type {
  AccountInfo,
  AdapterPlugin,
  NetworkInfo,
  SignMessagePayload,
  SignMessageResponse,
  WalletName,
} from "@aptos-labs/wallet-adapter-core";
import { TxnBuilderTypes, Types } from "aptos";

interface ShadowWindow extends Window {
  shadow?: PluginProvider;
}

declare const window: ShadowWindow;

export const ShadowWalletName = "Shadow" as WalletName<"Shadow">;

export class ShadowWallet implements AdapterPlugin {
  readonly name = ShadowWalletName;
  readonly url =
    "https://chrome.google.com/webstore/detail/shadow/lmmpaefggfcmnoddemmgdppddppnmhek";
  readonly icon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjM3NjMxIDQuMDkzMDlDOS4wOTE2MiA0LjA5MzA5IDguODE4NiA0LjIwNjE4IDguNjE3MyA0LjQwNzQ4TDAuMzkyOTg5IDEyLjYzMThDLTAuMTMxMDM4IDEzLjE1NTggLTAuMTMwOTkxIDE0LjAwNTQgMC4zOTMwOTcgMTQuNTI5NEw4LjkzMjggMjMuMDY3Mkw1LjAwOTI4IDI2Ljk5MDdDNC42NzExOCAyNy4zMjg4IDQuOTEwNjQgMjcuOTA2OSA1LjM4ODc5IDI3LjkwNjlMMjIuNjIzNiAyNy45MDY5QzIyLjkwODMgMjcuOTA2OSAyMy4xODEzIDI3Ljc5MzggMjMuMzgyNiAyNy41OTI1TDMxLjYwNyAxOS4zNjgxQzMyLjEzMSAxOC44NDQxIDMyLjEzMSAxNy45OTQ2IDMxLjYwNyAxNy40NzA2TDIzLjA2ODIgOC45MzE3NUwyNi45OTA2IDUuMDA5M0MyNy4zMjg3IDQuNjcxMiAyNy4wODkzIDQuMDkzMDkgMjYuNjExMSA0LjA5MzA5SDkuMzc2MzFaTTIwLjA0MjkgMTIuODg5NkgyMi40OTA3QzIyLjkzNTMgMTIuODg5NiAyMy4yOTU4IDEzLjI1IDIzLjI5NTggMTMuNjk0NlYxOC4xNzE1QzIzLjI5NTggMTguNjE2MSAyMi45MzUzIDE4Ljk3NjUgMjIuNDkwNyAxOC45NzY1SDIwLjA0MjlDMTkuNTk4MyAxOC45NzY1IDE5LjIzNzggMTguNjE2MSAxOS4yMzc4IDE4LjE3MTVWMTMuNjk0NkMxOS4yMzc4IDEzLjI1IDE5LjU5ODMgMTIuODg5NiAyMC4wNDI5IDEyLjg4OTZaTTE0LjY3NTkgMTIuODg5NkgxMi4yMjgxQzExLjc4MzQgMTIuODg5NiAxMS40MjMgMTMuMjUgMTEuNDIzIDEzLjY5NDZWMTguMTcxNUMxMS40MjMgMTguNjE2MSAxMS43ODM0IDE4Ljk3NjUgMTIuMjI4MSAxOC45NzY1SDE0LjY3NTlDMTUuMTIwNSAxOC45NzY1IDE1LjQ4MDkgMTguNjE2MSAxNS40ODA5IDE4LjE3MTVWMTMuNjk0NkMxNS40ODA5IDEzLjI1IDE1LjEyMDUgMTIuODg5NiAxNC42NzU5IDEyLjg4OTZaIiBmaWxsPSIjQjc5REZGIi8+Cjwvc3ZnPgo=";

  provider: PluginProvider | undefined =
    typeof window !== "undefined" ? window.shadow : undefined;

  async connect(): Promise<AccountInfo> {
    try {
      const accountInfo = await this.provider?.connect();
      if (!accountInfo) throw `${ShadowWalletName} Address Info Error`;
      return accountInfo;
    } catch (error: any) {
      throw error;
    }
  }

  async account(): Promise<AccountInfo> {
    const response = await this.provider?.account();
    if (!response) throw `${ShadowWalletName} Account Error`;
    return response;
  }

  async disconnect(): Promise<void> {
    try {
      await this.provider?.disconnect();
    } catch (error: any) {
      throw error;
    }
  }

  async signAndSubmitTransaction(
    transaction: Types.TransactionPayload,
    options?: any
  ): Promise<{ hash: Types.HexEncodedBytes }> {
    try {
      const response = await this.provider?.signAndSubmitTransaction(
        transaction,
        options
      );
      if ((response as AptosWalletErrorResult).code) {
        throw new Error((response as AptosWalletErrorResult).message);
      }
      return response as { hash: Types.HexEncodedBytes };
    } catch (error: any) {
      const errMsg = error.message;
      throw errMsg;
    }
  }

  async signAndSubmitBCSTransaction(
    transaction: TxnBuilderTypes.TransactionPayload,
    options?: any
  ): Promise<{ hash: Types.HexEncodedBytes }> {
    try {
      const response = await this.provider?.signAndSubmitTransaction(
        transaction,
        options
      );
      if ((response as AptosWalletErrorResult).code) {
        throw new Error((response as AptosWalletErrorResult).message);
      }
      return response as { hash: Types.HexEncodedBytes };
    } catch (error: any) {
      const errMsg = error.message;
      throw errMsg;
    }
  }

  async signMessage(message: SignMessagePayload): Promise<SignMessageResponse> {
    try {
      if (typeof message !== "object" || !message.nonce) {
        `${ShadowWalletName} Invalid signMessage Payload`;
      }
      const response = await this.provider?.signMessage(message);
      if (response) {
        return response;
      } else {
        throw `${ShadowWalletName} Sign Message failed`;
      }
    } catch (error: any) {
      const errMsg = error.message;
      throw errMsg;
    }
  }

  async network(): Promise<NetworkInfo> {
    try {
      const response = await this.provider?.network();
      if (!response) throw `${ShadowWalletName} Network Error`;
      return {
        name: response as NetworkName,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async onNetworkChange(callback: any): Promise<void> {
    try {
      const handleNetworkChange = async (newNetwork: {
        networkName: NetworkInfo;
      }): Promise<void> => {
        callback({
          name: newNetwork.networkName,
          chainId: undefined,
          api: undefined,
        });
      };
      await this.provider?.onNetworkChange(handleNetworkChange);
    } catch (error: any) {
      const errMsg = error.message;
      throw errMsg;
    }
  }

  async onAccountChange(callback: any): Promise<void> {
    try {
      const handleAccountChange = async (
        newAccount: AccountInfo
      ): Promise<void> => {
        if (newAccount?.publicKey) {
          callback({
            publicKey: newAccount.publicKey,
            address: newAccount.address,
          });
        } else {
          const response = await this.connect();
          callback({
            address: response?.address,
            publicKey: response?.publicKey,
          });
        }
      };
      await this.provider?.onAccountChange(handleAccountChange);
    } catch (error: any) {
      console.log(error);
      const errMsg = error.message;
      throw errMsg;
    }
  }
}
