/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface FairdropInterface extends ethers.utils.Interface {
  functions: {
    "addAirdrop(address,bytes32,string)": FunctionFragment;
    "airdrops(uint256)": FunctionFragment;
    "count()": FunctionFragment;
    "getAirdropAddress(uint256)": FunctionFragment;
    "getAirdropCID(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addAirdrop",
    values: [string, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "airdrops",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "count", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getAirdropAddress",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAirdropCID",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addAirdrop", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "airdrops", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAirdropAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirdropCID",
    data: BytesLike
  ): Result;

  events: {
    "AirdropCreated(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AirdropCreated"): EventFragment;
}

export class Fairdrop extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: FairdropInterface;

  functions: {
    addAirdrop(
      _token: string,
      _merkleRoot: BytesLike,
      _cid: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    airdrops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; cid: string }>;

    count(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAirdropAddress(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getAirdropCID(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  addAirdrop(
    _token: string,
    _merkleRoot: BytesLike,
    _cid: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  airdrops(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, string] & { addr: string; cid: string }>;

  count(overrides?: CallOverrides): Promise<BigNumber>;

  getAirdropAddress(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getAirdropCID(_id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addAirdrop(
      _token: string,
      _merkleRoot: BytesLike,
      _cid: string,
      overrides?: CallOverrides
    ): Promise<void>;

    airdrops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; cid: string }>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    getAirdropAddress(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getAirdropCID(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    AirdropCreated(
      addr?: string | null,
      id?: null
    ): TypedEventFilter<[string, BigNumber], { addr: string; id: BigNumber }>;
  };

  estimateGas: {
    addAirdrop(
      _token: string,
      _merkleRoot: BytesLike,
      _cid: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    airdrops(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    getAirdropAddress(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAirdropCID(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addAirdrop(
      _token: string,
      _merkleRoot: BytesLike,
      _cid: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    airdrops(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    count(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAirdropAddress(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAirdropCID(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
